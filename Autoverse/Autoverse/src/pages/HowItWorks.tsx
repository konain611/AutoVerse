import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Globe, Search, Database, MessageSquare, Sparkles, 
  ArrowRight, CheckCircle2, Zap
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Scrape",
    subtitle: "Website Attachment",
    description: "Connect AutoVerse to any public website via URL. Our intelligent scraper extracts meaningful content like products, blogs, FAQs, and pricing while removing noise like ads and navigation.",
    features: [
      "Configure crawl depth and page scope",
      "Respects robots.txt and crawl policies",
      "Domain restricted scraping for safety",
      "Noise removal for ads, footers, navigation"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    icon: Search,
    title: "Analyze",
    subtitle: "Intelligent Processing",
    description: "AutoVerse analyzes scraped data to identify high performing content, best sellers, trending topics, and valuable insights from your website structure.",
    features: [
      "Detect best sellers and top content",
      "Frequency and visibility analysis",
      "Structured extraction for tables and lists",
      "Rule based ranking system"
    ],
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    number: "03",
    icon: Database,
    title: "Retrieve",
    subtitle: "RAG Based Knowledge",
    description: "Using Retrieval Augmented Generation, AutoVerse retrieves the most relevant information from your website's knowledge base to answer queries accurately.",
    features: [
      "Context aware retrieval",
      "URL level citations",
      "Similarity confidence scores",
      "Prevents hallucinations by design"
    ],
    gradient: "from-purple-500 to-violet-500"
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Recommend",
    subtitle: "Smart Suggestions",
    description: "Based on user queries and website analysis, AutoVerse provides personalized recommendations for products, content, or answers with full transparency.",
    features: [
      "Intent based recommendations",
      "Explainable suggestions",
      "Historical interaction awareness",
      "Data freshness indicators"
    ],
    gradient: "from-pink-500 to-rose-500"
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Automate",
    subtitle: "Agent Based Actions",
    description: "AI agents break complex requests into steps, monitor changes, and automate tasks with human approval before execution.",
    features: [
      "Intent recognition system",
      "Task planning and execution",
      "Change monitoring alerts",
      "Human in the loop control"
    ],
    gradient: "from-orange-500 to-amber-500"
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="orb orb-blue w-[500px] h-[500px] -top-[200px] -right-[200px]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Simple Yet Powerful</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                How <span className="gradient-text">AutoVerse</span> Works
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From website attachment to intelligent automation, a five step pipeline 
                that transforms your website into an AI powered knowledge system.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-32">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.number}
                  className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-6">
                      <span className="text-7xl lg:text-8xl font-bold bg-gradient-to-b from-muted-foreground/30 to-transparent bg-clip-text text-transparent">
                        {step.number}
                      </span>
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                          {step.title}
                        </h2>
                        <p className={`text-lg font-medium bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-none">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-3xl blur-2xl opacity-30`} />
                      <div className="relative bg-card border border-border/50 rounded-3xl p-12 lg:p-16">
                        <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center glow-blue`}>
                          <step.icon className="h-12 w-12 lg:h-16 lg:w-16 text-white" />
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -bottom-24 left-1/2 transform -translate-x-1/2">
                          <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ArrowRight className={`h-8 w-8 text-muted-foreground/40 ${index % 2 === 1 ? 'rotate-180' : ''}`} />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="py-20 relative">
          <div className="absolute inset-0 section-gradient" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block p-4 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Important: Knowledge Updates, Not Model Retraining
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AutoVerse <strong className="text-foreground">updates its knowledge base</strong>—it does not retrain models. 
                This means faster updates, lower costs, and consistent performance as your website evolves.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
