import { supabase } from '@/integrations/supabase/client';

export interface CrawlResult {
  success: boolean;
  error?: string;
  data?: CrawledPage[];
  total?: number;
  completed?: number;
  partial?: boolean;
  message?: string;
}

export interface CrawledPage {
  markdown?: string;
  html?: string;
  metadata?: {
    title?: string;
    description?: string;
    sourceURL?: string;
    statusCode?: number;
  };
}

export interface CrawlOptions {
  limit?: number;
  maxDepth?: number;
  includePaths?: string[];
  excludePaths?: string[];
}

/**
 * Crawl an entire website using Firecrawl API
 */
export async function crawlWebsite(
  url: string, 
  options?: CrawlOptions
): Promise<CrawlResult> {
  try {
    const { data, error } = await supabase.functions.invoke('firecrawl-crawl', {
      body: { url, options },
    });

    if (error) {
      console.error('Firecrawl invoke error:', error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (err) {
    console.error('Firecrawl error:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to crawl website' 
    };
  }
}
