import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Globe, Search, RefreshCw, MessageSquare, FileText, Clock,
  TrendingUp, Target, Lightbulb, Bot, ClipboardList, CheckSquare,
  Bell, UserCheck, BarChart3, Sparkles, PieChart, Activity,
  Settings, Database, Shield, Lock, Layers, Zap
} from "lucide-react";

const featureCategories = [
  {
    id: "core",
    title: "Website Attached Intelligence Core",
    description: "AutoVerse connects directly to your website and builds a continuously updated knowledge layer.",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      {
        icon: Globe,
        title: "Website Attachment & Configuration",
        items: [
          "Attach any public website via URL",
          "Configure crawl depth and page scope",
          "Respect robots.txt and crawl policies",
          "Domain restricted scraping for safety"
        ]
      },
      {
        icon: Search,
        title: "Intelligent Web Scraping",
        items: [
          "Extract product data, blogs, pricing, FAQs",
          "Noise removal for ads, navigation, footers",
          "Structured extraction for tables and lists",
          "Meaningful content only"
        ]
      },
      {
        icon: RefreshCw,
        title: "Continuous Knowledge Adaptation",
        items: [
          "Scheduled re scraping",
          "Change detection using content hashing",
          "Incremental re indexing",
          "Automatic removal of outdated content"
        ]
      }
    ]
  },
  {
    id: "rag",
    title: "RAG Based Conversational Assistant",
    description: "A context aware chatbot grounded strictly in your website data.",
    gradient: "from-purple-500 to-violet-500",
    features: [
      {
        icon: MessageSquare,
        title: "Website Aware Q&A",
        items: [
          "Answers only from attached website content",
          "Refuses to answer when data unavailable",
          "Prevents hallucinations by design"
        ]
      },
      {
        icon: FileText,
        title: "Source Attribution",
        items: [
          "URL level citations",
          "Section level references",
          "Similarity confidence scores"
        ]
      },
      {
        icon: Clock,
        title: "Freshness Indicators",
        items: [
          "Last updated timestamp",
          "Data freshness score per answer",
          "Warning on stale data"
        ]
      }
    ]
  },
  {
    id: "intelligence",
    title: "Website Specific Intelligence",
    description: "This is where AutoVerse stops being 'just another chatbot'.",
    gradient: "from-pink-500 to-rose-500",
    features: [
      {
        icon: TrendingUp,
        title: "Best Seller Detection",
        items: [
          "Frequency of product mentions analysis",
          "User reviews count tracking",
          "Product visibility scoring",
          "Dynamic ranking system"
        ]
      },
      {
        icon: Sparkles,
        title: "Auto Generated Insights",
        items: [
          '"Top Products This Week"',
          '"Most Viewed Items"',
          '"Recommended for You" (rule based)',
          "Trending content summaries"
        ]
      },
      {
        icon: Target,
        title: "Context Aware Recommendations",
        items: [
          "User query intent analysis",
          "Website structure awareness",
          "Historical interaction data",
          "Spec based product matching"
        ]
      }
    ]
  },
  {
    id: "automation",
    title: "Automation & Agent Layer",
    description: "Automation, but responsibly.",
    gradient: "from-orange-500 to-amber-500",
    features: [
      {
        icon: Lightbulb,
        title: "Intent Recognition",
        items: [
          "Informational queries",
          "Analytical requests",
          "Recommendation based",
          "Action triggering"
        ]
      },
      {
        icon: Bot,
        title: "Agent Based Task Planning",
        items: [
          "Break requests into steps",
          "Multi step execution",
          "Context preservation",
          "Complex query handling"
        ]
      },
      {
        icon: Bell,
        title: "Change Monitoring",
        items: [
          "Price change tracking",
          "Policy update alerts",
          "Product availability monitoring",
          "Dashboard & email notifications"
        ]
      },
      {
        icon: UserCheck,
        title: "Human in the Loop",
        items: [
          "Proposals shown before execution",
          "User approval required",
          "Full execution logs stored"
        ]
      }
    ]
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description: "AutoVerse does analysis, not just answers.",
    gradient: "from-teal-500 to-green-500",
    features: [
      {
        icon: BarChart3,
        title: "Intelligence Dashboard",
        items: [
          "Scraped pages count",
          "Data freshness metrics",
          "Knowledge base size",
          "Update frequency tracking"
        ]
      },
      {
        icon: ClipboardList,
        title: "Recommendation Explainability",
        items: [
          "Why a product was suggested",
          "Influencing data points",
          "Confidence score display"
        ]
      },
      {
        icon: PieChart,
        title: "Trend Analysis",
        items: [
          "Emerging products and topics",
          "Declining content detection",
          "Seasonal pattern hints (rule based)"
        ]
      }
    ]
  },
  {
    id: "admin",
    title: "Developer & Admin Controls",
    description: "Because professionals expect knobs.",
    gradient: "from-slate-500 to-zinc-500",
    features: [
      {
        icon: Settings,
        title: "Scraper Control Panel",
        items: [
          "Manual re crawl trigger",
          "Crawl history view",
          "Failed page logs"
        ]
      },
      {
        icon: Layers,
        title: "RAG Configuration",
        items: [
          "Chunk size control",
          "Top k retrieval tuning",
          "Embedding model selection"
        ]
      },
      {
        icon: Shield,
        title: "Security & Privacy",
        items: [
          "User data isolation",
          "Encryption at rest",
          "Data deletion on request"
        ]
      }
    ]
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="orb orb-purple w-[500px] h-[500px] -top-[200px] left-1/4" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Complete Feature Set</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Everything AutoVerse <span className="gradient-text">Offers</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From intelligent scraping to automated insights, organized into six powerful modules.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, categoryIndex) => (
          <section 
            key={category.id} 
            className={`py-20 relative ${categoryIndex % 2 === 1 ? '' : ''}`}
          >
            {categoryIndex % 2 === 0 && <div className="absolute inset-0 section-gradient" />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              {/* Category Header */}
              <motion.div 
                className="max-w-3xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className={`text-sm font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-2 block`}>
                  Module {categoryIndex + 1}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {category.description}
                </p>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="group bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover-lift backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1 text-xs">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Performance Metrics Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block p-4 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Performance & Evaluation Metrics
              </h2>
              <p className="text-muted-foreground">
                System metrics exposed for academic evaluation and professional monitoring.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "System Performance",
                  items: ["Scraping time metrics", "Indexing latency", "Query response time"]
                },
                {
                  title: "Accuracy Evaluation", 
                  items: ["Recommendation relevance scoring", "RAG answer accuracy comparison", "Hallucination rate reduction"]
                }
              ].map((section, i) => (
                <motion.div 
                  key={i} 
                  className="bg-card/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-primary">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
