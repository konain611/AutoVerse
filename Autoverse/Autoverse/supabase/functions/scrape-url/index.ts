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
    const { url } = await req.json();

    if (!url) {
      throw new Error('URL is required');
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      throw new Error('Invalid URL provided');
    }

    console.log(`Scraping URL: ${url}`);

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    console.log(`Fetched ${html.length} bytes from ${url}`);

    // Extract title using regex (simple approach for edge function)
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : url;

    // Remove script, style, nav, footer, header, and other non-content elements
    let cleanedHtml = html
      // Remove scripts
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      // Remove styles
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      // Remove nav elements
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      // Remove footer elements
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      // Remove header elements (but keep h1-h6)
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      // Remove aside elements
      .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove noscript
      .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
      // Remove form elements
      .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
      // Remove svg elements
      .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
      // Remove button elements
      .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '');

    // Try to extract main content from common containers
    const mainMatch = cleanedHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const articleMatch = cleanedHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    const contentMatch = cleanedHtml.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const bodyMatch = cleanedHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    
    // Use the best match available, falling back to body content
    let contentHtml = '';
    if (mainMatch && mainMatch[1].length > 200) {
      contentHtml = mainMatch[1];
      console.log('Using <main> content');
    } else if (articleMatch && articleMatch[1].length > 200) {
      contentHtml = articleMatch[1];
      console.log('Using <article> content');
    } else if (contentMatch && contentMatch[1].length > 200) {
      contentHtml = contentMatch[1];
      console.log('Using .content div');
    } else if (bodyMatch) {
      contentHtml = bodyMatch[1];
      console.log('Using <body> content (fallback)');
    } else {
      contentHtml = cleanedHtml;
      console.log('Using cleaned HTML (no containers found)');
    }

    // Extract text content by removing all HTML tags
    const textContent = contentHtml
      // Replace headings with text and newlines
      .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, '\n\n$2\n\n')
      // Replace paragraphs with text and newlines
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
      // Replace list items
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n• $1')
      // Replace block elements with newlines
      .replace(/<\/(div|section|tr|br)[^>]*>/gi, '\n')
      // Remove all remaining HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Decode common HTML entities
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&apos;/gi, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&#x2F;/gi, "/")
      // Clean up whitespace
      .replace(/[ \t]+/g, ' ')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    console.log(`Extracted ${textContent.length} characters of text content`);

    return new Response(
      JSON.stringify({ 
        title, 
        content: textContent,
        url 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in scrape-url function:', error);
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
