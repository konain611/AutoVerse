/**
 * Local RAG System with Gemini API
 * - Uses HuggingFace Transformers for embeddings (browser-based)
 * - Uses Gemini API for LLM via edge function
 * - Scrapes URLs via edge function (server-side)
 */

import { supabase } from "@/integrations/supabase/client";

// Dynamic import type for pipeline
// Embedder is dynamically loaded

// Types
interface Document {
  id: string;
  content: string;
  url: string;
  title: string;
  embedding?: number[];
}

interface RAGState {
  documents: Document[];
  embedder: any;
  isInitialized: boolean;
  isLoading: boolean;
}

// Global state
const state: RAGState = {
  documents: [],
  embedder: null,
  isInitialized: false,
  isLoading: false,
};

// Initialize the embedding model
export async function initializeEmbedder(
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  if (state.embedder) return;

  onProgress?.(10, "Loading embedding model...");

  try {
    // Dynamic import to prevent blocking module load
    const { pipeline } = await import("@huggingface/transformers");
    
    state.embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
      { 
        progress_callback: (data: any) => {
          if (data.status === "progress" && data.progress) {
            onProgress?.(10 + data.progress * 0.8, `Loading model: ${Math.round(data.progress)}%`);
          }
        }
      }
    ) as any;
    state.isInitialized = true;
    onProgress?.(100, "Model loaded!");
  } catch (error) {
    console.error("Failed to initialize embedder:", error);
    throw new Error("Failed to load embedding model. Check your internet connection for initial download.");
  }
}

// Generate embedding for text
async function generateEmbedding(text: string): Promise<number[]> {
  if (!state.embedder) {
    throw new Error("Embedder not initialized");
  }

  const output = await state.embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data as Float32Array);
}

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Scrape URL using edge function (no CORS proxy needed)
export async function scrapeUrl(
  url: string
): Promise<{ title: string; content: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-url', {
      body: { url },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return { 
      title: data.title || url, 
      content: data.content || '' 
    };
  } catch (error) {
    console.error("Scrape error:", error);
    throw new Error(`Failed to scrape URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Add document to RAG
export async function addDocument(
  content: string,
  url: string,
  title: string,
  onProgress?: (message: string) => void
): Promise<void> {
  if (!state.embedder) {
    throw new Error("Embedder not initialized");
  }

  console.log(`[RAG] addDocument called. Content length: ${content.length}, URL: ${url}`);
  onProgress?.("Splitting content into chunks...");

  // Split content into larger chunks for more context per chunk
  const chunks = splitIntoChunks(content, 500, 100);
  
  console.log(`[RAG] Split into ${chunks.length} chunks`);
  onProgress?.(`Creating embeddings for ${chunks.length} chunks...`);

  // Create embeddings for each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = await generateEmbedding(chunk);
    
    state.documents.push({
      id: `${url}-${i}`,
      content: chunk,
      url,
      title,
      embedding,
    });

    onProgress?.(`Processed chunk ${i + 1}/${chunks.length}`);
  }
  
  console.log(`[RAG] Total documents now: ${state.documents.length}`);
}

// Split text into overlapping chunks
function splitIntoChunks(text: string, chunkSize: number, overlap: number): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim().length > 50) {
      chunks.push(chunk);
    }
  }
  
  return chunks;
}

// Search for relevant documents
export async function searchDocuments(
  query: string,
  topK: number = 10
): Promise<Document[]> {
  console.log(`[RAG] searchDocuments called. Documents: ${state.documents.length}, Embedder ready: ${!!state.embedder}`);
  
  if (!state.embedder) {
    console.warn("[RAG] Embedder not initialized");
    return [];
  }
  
  if (state.documents.length === 0) {
    console.warn("[RAG] No documents in knowledge base");
    return [];
  }

  const queryEmbedding = await generateEmbedding(query);
  console.log(`[RAG] Generated query embedding, length: ${queryEmbedding.length}`);
  
  // Calculate similarities
  const similarities = state.documents.map(doc => ({
    doc,
    similarity: cosineSimilarity(queryEmbedding, doc.embedding!),
  }));
  
  // Log top similarities for debugging
  const sortedSims = [...similarities].sort((a, b) => b.similarity - a.similarity);
  console.log(`[RAG] Top 3 similarities:`, sortedSims.slice(0, 3).map(s => ({
    title: s.doc.title.substring(0, 30),
    similarity: s.similarity.toFixed(3)
  })));
  
  // Sort by similarity and return top K with very low threshold for max recall
  const results = sortedSims
    .slice(0, topK)
    .filter(item => item.similarity > 0.1) // Very low threshold for maximum content retrieval
    .map(item => item.doc);
    
  console.log(`[RAG] Returning ${results.length} relevant documents`);
  return results;
}

// Generate answer using Gemini API via edge function
export async function generateAnswer(
  query: string,
  context: Document[]
): Promise<string> {
  if (context.length === 0) {
    return "I don't have any relevant information in my knowledge base to answer this question. Please scrape a website first.";
  }

  try {
    const { data, error } = await supabase.functions.invoke('gemini-rag', {
      body: {
        query,
        context: context.map(doc => ({
          title: doc.title,
          content: doc.content,
        })),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return data?.answer || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(
      `Failed to get response from Gemini. ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Main RAG query function
export async function queryRAG(query: string): Promise<string> {
  const relevantDocs = await searchDocuments(query);
  return generateAnswer(query, relevantDocs);
}

// Get current state
export function getRAGState() {
  return {
    isInitialized: state.isInitialized,
    documentCount: state.documents.length,
  };
}

// Clear all documents
export function clearDocuments() {
  state.documents = [];
}

// Check if Gemini is configured (via edge function)
export async function checkGeminiConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-rag', {
      body: { query: 'test', context: [] },
    });
    return !error && !data?.error;
  } catch {
    return false;
  }
}
