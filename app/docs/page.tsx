export default function DocsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 py-12 pr-8 border-r border-gray-800">
            <nav className="sticky top-24">
              <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Documentation</h3>
              <ul className="space-y-2">
                <li><a href="#introduction" className="text-gray-300 hover:text-white">Introduction</a></li>
                <li><a href="#getting-started" className="text-gray-300 hover:text-white">Getting Started</a></li>
                <li>
                  <a href="#api-reference" className="text-gray-300 hover:text-white">API Reference</a>
                  <ul className="pl-4 mt-2 space-y-2 text-sm">
                    <li><a href="#api-agents" className="text-gray-400 hover:text-white">Agents</a></li>
                    <li><a href="#api-knowledge-base" className="text-gray-400 hover:text-white">Knowledge Base</a></li>
                    <li><a href="#api-messages" className="text-gray-400 hover:text-white">Messages</a></li>
                  </ul>
                </li>
                <li><a href="#integrations" className="text-gray-300 hover:text-white">Integrations</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 py-12 pl-8">
            <div className="prose prose-invert prose-lg max-w-none">
              <section id="introduction">
                <h1>Introduction to AutoVerse</h1>
                <p>
                  Welcome to the AutoVerse documentation. Here you will find everything you need to know about creating, managing, and deploying your autonomous AI agents. AutoVerse is a platform designed to make advanced AI accessible to developers and businesses of all sizes.
                </p>
              </section>

              <section id="getting-started" className="mt-16">
                <h2>Getting Started</h2>
                <p>
                  Getting started with AutoVerse is simple. Follow these steps to create your first AI agent.
                </p>
                <h3>1. Sign Up for an Account</h3>
                <p>
                  First, you'll need to <a href="/signup">create an account</a>. Our starter plan is free and a great way to explore the platform.
                </p>
                <h3>2. Create a New Agent</h3>
                <p>
                  From your dashboard, click "Create Agent". You will be prompted to give your agent a name and a purpose. The purpose is a high-level description of what the agent should do, which helps guide its behavior.
                </p>
                <h3>3. Build a Knowledge Base</h3>
                <p>
                  An agent's knowledge is its power. You can upload files (PDFs, text files, etc.), connect to a database, or even scrape a website to build the knowledge base for your agent.
                </p>
                <h3>4. Deploy Your Agent</h3>
                <p>
                  Once you're happy with your agent, you can deploy it using our embeddable widget or via our API.
                </p>
              </section>

              <section id="api-reference" className="mt-16">
                <h2>API Reference</h2>
                <p>
                  Our REST API provides programmatic access to the AutoVerse platform.
                </p>
                <div id="api-agents">
                  <h3>Agents</h3>
                  <p>The agent endpoints allow you to create, retrieve, update, and delete your AI agents.</p>
                  <pre><code className="language-bash">POST /v1/agents</code></pre>
                  <pre><code className="language-bash">GET /v1/agents/{'{agentId}'}</code></pre>
                </div>
                <div id="api-knowledge-base" className="mt-8">
                  <h3>Knowledge Base</h3>
                  <p>Manage the knowledge base of your agents.</p>
                  <pre><code className="language-bash">POST /v1/agents/{'{agentId}'}/knowledge</code></pre>
                </div>
                 <div id="api-messages" className="mt-8">
                  <h3>Messages</h3>
                  <p>Interact with your agent by sending and receiving messages.</p>
                  <pre><code className="language-bash">POST /v1/agents/{'{agentId}'}/messages</code></pre>
                </div>
              </section>

              <section id="integrations" className="mt-16">
                <h2>Integrations</h2>
                <p>
                  AutoVerse can be integrated with a variety of third-party services. (Coming soon)
                </p>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
