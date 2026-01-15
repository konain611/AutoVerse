import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { query, context } = await req.json();
    console.log(`Received query: "${query}", context items: ${context?.length || 0}`);

    if (!query) {
      throw new Error('Query is required');
    }

    const hasContext = context && context.length > 0;
    
    const contextText = hasContext
      ? context.map((doc: { title: string; content: string }) => 
          `Source: ${doc.title}\n${doc.content}`
        ).join('\n\n---\n\n')
      : '';

    console.log(`Context length: ${contextText.length} characters`);

    // Enhanced system prompt for detailed, comprehensive answers
    const systemPrompt = hasContext
      ? `You are an expert knowledge assistant that provides DETAILED, COMPREHENSIVE answers based on the provided context.

YOUR MISSION:
- Provide thorough, well-structured answers that cover ALL relevant information from the context
- Include specific details, examples, definitions, and explanations found in the content
- If the topic is technical (like deep learning, AI, etc.), explain concepts thoroughly with any details available
- Use bullet points, numbered lists, and clear formatting for better readability
- Synthesize information from multiple context sources to give a complete picture

GUIDELINES:
1. Answer ONLY from the provided context - do not use external knowledge
2. If the question relates to the context, provide the MOST DETAILED answer possible
3. Include relevant quotes or specific information from the scraped content
4. If information is partial, share what you have and note what might be missing
5. If the question is completely unrelated to the context, politely redirect

The user has scraped website content and expects detailed, informative answers from that knowledge base.`
      : `You are a helpful assistant. The user has not scraped any website content yet. Politely tell them they need to scrape a website first before you can answer questions.`;

    const userPrompt = hasContext 
      ? `KNOWLEDGE BASE CONTENT:\n\n${contextText}\n\n---\n\nUSER QUESTION: ${query}\n\nProvide a DETAILED, COMPREHENSIVE answer using ALL relevant information from the knowledge base above. Include specific details, examples, and explanations. Format your answer clearly with sections if the topic is complex.`
      : `The user asked: "${query}"\n\nBut no website has been scraped yet. Tell them to scrape a website first.`;

    console.log('Calling Lovable AI Gateway...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 2048, // Increased for more detailed answers
        temperature: 0.5, // Slightly higher for more natural, detailed responses
      }),
    });

    console.log(`Lovable AI response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 
      'I could not generate a response. Please try again.';

    console.log(`Generated answer: ${answer.substring(0, 100)}...`);

    return new Response(
      JSON.stringify({ answer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in gemini-rag function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
