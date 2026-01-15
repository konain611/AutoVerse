import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  initializeEmbedder, 
  addDocument, 
  getRAGState, 
  checkGeminiConnection,
  clearDocuments
} from "@/lib/localRAG";
import { crawlWebsite } from "@/lib/firecrawlApi";
import { 
  Globe, 
  Download, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Trash2,
  AlertCircle,
  Sparkles,
  Plus,
  X,
  Link as LinkIcon,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface RAGSetupPanelProps {
  onReady?: () => void;
}

interface ScrapedUrl {
  url: string;
  title: string;
  status: 'pending' | 'crawling' | 'processing' | 'done' | 'error';
  chunks?: number;
  pages?: number;
  error?: string;
}

export function RAGSetupPanel({ onReady }: RAGSetupPanelProps) {
  const [urlInput, setUrlInput] = useState("");
  const [urls, setUrls] = useState<ScrapedUrl[]>([]);
  
  const [isEmbedderLoading, setIsEmbedderLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [embedderProgress, setEmbedderProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  
  const [embedderReady, setEmbedderReady] = useState(false);
  const [geminiConnected, setGeminiConnected] = useState(false);
  const [isCheckingGemini, setIsCheckingGemini] = useState(false);
  const [documentCount, setDocumentCount] = useState(0);
  
  const [error, setError] = useState<string | null>(null);

  // Check connections on mount
  useEffect(() => {
    const init = async () => {
      try {
        const state = getRAGState();
        setEmbedderReady(state.isInitialized);
        setDocumentCount(state.documentCount);
        
        setIsCheckingGemini(true);
        const geminiOk = await checkGeminiConnection();
        setGeminiConnected(geminiOk);
      } catch (err) {
        console.error("Failed to check connections:", err);
        setGeminiConnected(false);
      } finally {
        setIsCheckingGemini(false);
      }
    };
    init();
  }, []);

  const checkConnections = async () => {
    try {
      const state = getRAGState();
      setEmbedderReady(state.isInitialized);
      setDocumentCount(state.documentCount);
      
      setIsCheckingGemini(true);
      const geminiOk = await checkGeminiConnection();
      setGeminiConnected(geminiOk);
    } catch (err) {
      console.error("Failed to check connections:", err);
      setGeminiConnected(false);
    } finally {
      setIsCheckingGemini(false);
    }
  };

  const handleInitEmbedder = async () => {
    setIsEmbedderLoading(true);
    setError(null);
    
    try {
      await initializeEmbedder((progress, message) => {
        setEmbedderProgress(progress);
        setProgressMessage(message);
      });
      setEmbedderReady(true);
      checkConnections();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load embedder");
    } finally {
      setIsEmbedderLoading(false);
    }
  };

  const addUrl = () => {
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) return;
    
    // Validate URL
    try {
      new URL(trimmedUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }
    
    // Check for duplicates
    if (urls.some(u => u.url === trimmedUrl)) {
      setError("This URL is already in the list");
      return;
    }
    
    setUrls(prev => [...prev, { 
      url: trimmedUrl, 
      title: trimmedUrl, 
      status: 'pending' 
    }]);
    setUrlInput("");
    setError(null);
  };

  const removeUrl = (urlToRemove: string) => {
    setUrls(prev => prev.filter(u => u.url !== urlToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUrl();
    }
  };

  const handleCrawlAll = async () => {
    const pendingUrls = urls.filter(u => u.status === 'pending');
    if (pendingUrls.length === 0) return;
    
    setIsScraping(true);
    setError(null);
    
    for (let i = 0; i < pendingUrls.length; i++) {
      const urlItem = pendingUrls[i];
      setCurrentUrlIndex(i);
      
      // Update status to crawling
      setUrls(prev => prev.map(u => 
        u.url === urlItem.url ? { ...u, status: 'crawling' as const } : u
      ));
      
      try {
        setProgressMessage(`Crawling ${urlItem.url}... (this may take a minute)`);
        
        // Use Firecrawl to crawl the entire website
        const result = await crawlWebsite(urlItem.url, {
          limit: 20, // Crawl up to 20 pages
          maxDepth: 3,
        });
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to crawl website');
        }
        
        const pages = result.data || [];
        console.log(`[RAG] Crawled ${pages.length} pages from ${urlItem.url}`);
        
        if (pages.length === 0) {
          throw new Error('No pages found on this website');
        }
        
        // Update status to processing
        setUrls(prev => prev.map(u => 
          u.url === urlItem.url ? { ...u, status: 'processing' as const, pages: pages.length } : u
        ));
        
        setProgressMessage(`Processing ${pages.length} pages...`);
        const beforeCount = getRAGState().documentCount;
        
        // Add each page to the knowledge base
        for (let j = 0; j < pages.length; j++) {
          const page = pages[j];
          const content = page.markdown || '';
          const title = page.metadata?.title || page.metadata?.sourceURL || urlItem.url;
          const pageUrl = page.metadata?.sourceURL || urlItem.url;
          
          if (content.length > 50) { // Only add pages with meaningful content
            setProgressMessage(`Processing page ${j + 1}/${pages.length}: ${title.substring(0, 40)}...`);
            await addDocument(content, pageUrl, title);
          }
        }
        
        const afterCount = getRAGState().documentCount;
        const chunksAdded = afterCount - beforeCount;
        
        // Update status to done
        setUrls(prev => prev.map(u => 
          u.url === urlItem.url ? { 
            ...u, 
            status: 'done' as const, 
            title: `${urlItem.url} (${pages.length} pages)`, 
            chunks: chunksAdded,
            pages: pages.length
          } : u
        ));
        
        setDocumentCount(afterCount);
      } catch (err) {
        console.error('Crawl error:', err);
        // Update status to error
        setUrls(prev => prev.map(u => 
          u.url === urlItem.url ? { 
            ...u, 
            status: 'error' as const, 
            error: err instanceof Error ? err.message : 'Failed to crawl' 
          } : u
        ));
      }
    }
    
    setIsScraping(false);
    setProgressMessage("");
    
    if (embedderReady && geminiConnected && getRAGState().documentCount > 0) {
      onReady?.();
    }
  };

  const handleClearDocs = () => {
    clearDocuments();
    setDocumentCount(0);
    setUrls([]);
  };

  const pendingCount = urls.filter(u => u.status === 'pending').length;
  const doneCount = urls.filter(u => u.status === 'done').length;
  const isReady = embedderReady && geminiConnected && documentCount > 0;

  return (
    <div className="space-y-4 p-4 bg-secondary/50 rounded-xl border border-border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">RAG Setup</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={checkConnections}
          disabled={isCheckingGemini}
        >
          {isCheckingGemini ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-2">
          {embedderReady ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-muted-foreground">Embedder</span>
        </div>
        <div className="flex items-center gap-2">
          {isCheckingGemini ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : geminiConnected ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className="text-muted-foreground">Gemini</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium">{documentCount}</span>
          <span className="text-muted-foreground">Chunks</span>
        </div>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 1: Initialize Embedder */}
      {!embedderReady && (
        <div className="space-y-2">
          <Button
            onClick={handleInitEmbedder}
            disabled={isEmbedderLoading}
            className="w-full"
          >
            {isEmbedderLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Model...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Load Embedding Model
              </>
            )}
          </Button>
          {isEmbedderLoading && (
            <div className="space-y-1">
              <Progress value={embedderProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">{progressMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* Gemini Status */}
      {/* {geminiConnected && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Gemini API</span>
          </div>
        </div>
      )} */}

      {/* Step 2: Add URLs */}
      {embedderReady && (
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">Add URLs to scrape</Label>
          <div className="flex gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="https://example.com"
              className="flex-1"
              disabled={isScraping}
            />
            <Button
              onClick={addUrl}
              disabled={isScraping || !urlInput.trim()}
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* URL List */}
          {urls.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {urls.map((urlItem) => (
                  <motion.div
                    key={urlItem.url}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 p-2 bg-background rounded-lg border border-border text-sm"
                  >
                    <div className="flex-shrink-0">
                      {urlItem.status === 'pending' && (
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                      {(urlItem.status === 'crawling' || urlItem.status === 'processing') && (
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      )}
                      {urlItem.status === 'done' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {urlItem.status === 'error' && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-foreground" title={urlItem.url}>
                        {urlItem.status === 'done' ? urlItem.title : urlItem.url}
                      </p>
                      {urlItem.status === 'crawling' && (
                        <p className="text-xs text-muted-foreground">Crawling website...</p>
                      )}
                      {urlItem.status === 'processing' && urlItem.pages && (
                        <p className="text-xs text-muted-foreground">Processing {urlItem.pages} pages...</p>
                      )}
                      {urlItem.status === 'done' && urlItem.chunks && (
                        <p className="text-xs text-muted-foreground">
                          {urlItem.pages} pages • {urlItem.chunks} chunks
                        </p>
                      )}
                      {urlItem.status === 'error' && (
                        <p className="text-xs text-destructive">{urlItem.error}</p>
                      )}
                    </div>
                    {urlItem.status === 'pending' && !isScraping && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeUrl(urlItem.url)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                    {urlItem.status === 'done' && (
                      <Badge variant="secondary" className="text-xs">
                        Done
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {/* Crawl Button */}
          {pendingCount > 0 && (
            <Button
              onClick={handleCrawlAll}
              disabled={isScraping}
              className="w-full"
            >
              {isScraping ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Crawling {currentUrlIndex + 1}/{pendingCount}...
                </>
              ) : (
                <>
                  <Layers className="mr-2 h-4 w-4" />
                  Crawl {pendingCount} Website{pendingCount > 1 ? 's' : ''} (Full)
                </>
              )}
            </Button>
          )}
          
          {isScraping && (
            <p className="text-xs text-muted-foreground text-center">{progressMessage}</p>
          )}
        </div>
      )}

      {/* Clear Documents */}
      {documentCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearDocs}
          className="w-full text-muted-foreground"
          disabled={isScraping}
        >
          <Trash2 className="mr-2 h-3 w-3" />
          Clear Knowledge Base ({doneCount} URLs, {documentCount} chunks)
        </Button>
      )}

      {/* Ready Indicator */}
      {isReady && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">RAG Ready! Start chatting below.</span>
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>How to use:</strong></p>
        <ol className="list-decimal list-inside space-y-0.5 ml-1">
          <li>Load the embedding model</li>
          <li>Add one or more URLs</li>
          <li>Click "Scrape" to build knowledge base</li>
          <li>Ask questions in the chat!</li>
        </ol>
      </div>
    </div>
  );
}
