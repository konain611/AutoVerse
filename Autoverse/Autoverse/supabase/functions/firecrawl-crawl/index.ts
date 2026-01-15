const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, options } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured. Please connect Firecrawl in Settings.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Crawling URL:', formattedUrl, 'with options:', options);

    // Start the crawl
    const response = await fetch('https://api.firecrawl.dev/v1/crawl', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        limit: options?.limit || 20,
        maxDepth: options?.maxDepth || 3,
        includePaths: options?.includePaths,
        excludePaths: options?.excludePaths,
        scrapeOptions: {
          formats: ['markdown'],
          onlyMainContent: true,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Request failed with status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If we got a crawl job ID, we need to poll for results
    if (data.id || data.jobId) {
      const jobId = data.id || data.jobId;
      console.log('Crawl job started with ID:', jobId);
      
      // Poll for results (max 60 seconds)
      const maxWaitTime = 60000;
      const pollInterval = 2000;
      const startTime = Date.now();
      
      while (Date.now() - startTime < maxWaitTime) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        
        const statusResponse = await fetch(`https://api.firecrawl.dev/v1/crawl/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
        
        const statusData = await statusResponse.json();
        console.log('Crawl status:', statusData.status, 'completed:', statusData.completed, 'total:', statusData.total);
        
        if (statusData.status === 'completed') {
          console.log('Crawl completed successfully with', statusData.data?.length || 0, 'pages');
          return new Response(
            JSON.stringify({ 
              success: true, 
              data: statusData.data || [],
              total: statusData.total,
              completed: statusData.completed
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        if (statusData.status === 'failed') {
          return new Response(
            JSON.stringify({ success: false, error: 'Crawl failed' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
      
      // Timeout - return partial results if available
      const finalResponse = await fetch(`https://api.firecrawl.dev/v1/crawl/${jobId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      const finalData = await finalResponse.json();
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: finalData.data || [],
          partial: true,
          message: 'Crawl timed out, returning partial results'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Direct response (shouldn't happen with crawl, but handle it)
    console.log('Crawl completed directly');
    return new Response(
      JSON.stringify({ success: true, data: data.data || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error crawling:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to crawl';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
