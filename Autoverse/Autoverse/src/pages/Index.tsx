import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Globe, Search, Database, MessageSquare, 
  Sparkles, Bot, Shield, TrendingUp, CheckCircle2, Play,
  Zap, Brain, Eye, RefreshCw
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const coreCapabilities = [
  {
    icon: Globe,
    title: "Website Attachment",
    description: "Connect to any public website via URL and build a continuously updated knowledge layer.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Search,
    title: "Intelligent Scraping",
    description: "Extract meaningful content—products, blogs, FAQs, pricing—while removing noise.",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    icon: Database,
    title: "RAG-Based Q&A",
    description: "Answers grounded strictly in your website data with URL-level source citations.",
    gradient: "from-teal-500 to-green-500"
  },
  {
    icon: Brain,
    title: "Smart Analysis",
    description: "Auto-detect best sellers, trending content, and generate actionable insights.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Context-Aware Chat",
    description: "Natural conversations that understand intent and provide personalized recommendations.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Bot,
    title: "Agent Automation",
    description: "Task planning, change monitoring, and automation with human-in-the-loop approval.",
    gradient: "from-orange-500 to-amber-500"
  }
];

const pipelineSteps = [
  { name: "Scrape", icon: Globe, color: "text-blue-400" },
  { name: "Analyze", icon: Search, color: "text-cyan-400" },
  { name: "Retrieve", icon: Database, color: "text-purple-400" },
  { name: "Recommend", icon: Sparkles, color: "text-pink-400" },
  { name: "Automate", icon: Bot, color: "text-orange-400" }
];

const differentiators = [
  { title: "Website-Grounded", desc: "Answers only from your website data—zero hallucinations" },
  { title: "Source Citations", desc: "Every answer includes URL and section references" },
  { title: "Explainable AI", desc: "See why recommendations are made with confidence scores" },
  { title: "Human-in-the-Loop", desc: "All automation requires your explicit approval" },
  { title: "Knowledge Updates", desc: "Updates knowledge base, doesn't retrain models" },
  { title: "Full Transparency", desc: "Honest documentation of scope and limitations" }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 lg:pt-0">
          {/* Background Effects */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 pattern-grid opacity-30" />
          
          {/* Animated Orbs */}
          <div className="orb orb-blue w-[600px] h-[600px] -top-[200px] -left-[200px] animate-float" />
          <div className="orb orb-purple w-[500px] h-[500px] top-1/2 -right-[150px] animate-float-slow" />
          <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 left-1/3 animate-float" style={{ animationDelay: "-3s" }} />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-5xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm mb-8"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Website-Attached AI Intelligence
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
              >
                Turn Your Website Into an{" "}
                <span className="gradient-text">
                  Intelligent Knowledge System
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                variants={fadeInUp}
                className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                AutoVerse connects to your website, builds a continuously updated knowledge base, 
                and delivers RAG-powered conversations, smart recommendations, and responsible automation.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Link to="/how-it-works">
                  <Button size="lg" className="gradient-bg text-white text-lg px-8 py-6 rounded-xl hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group">
                    See How It Works
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group">
                    <Play className="mr-2 h-5 w-5" />
                    Explore Features
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                {[
                  { value: "5-Step", label: "Pipeline" },
                  { value: "RAG", label: "Powered" },
                  { value: "100%", label: "Transparent" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold gradient-text-blue">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Pipeline Overview */}
        <section className="py-24 relative">
          <div className="absolute inset-0 section-gradient" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                The AutoVerse <span className="gradient-text">Pipeline</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Five intelligent steps from website to AI-powered assistant.
              </p>
            </motion.div>

            {/* Pipeline Steps */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 max-w-7xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {pipelineSteps.map((step, i) => (
                <div key={step.name} className="flex items-center gap-4 lg:gap-6">
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 gradient-bg rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                    <div className="relative px-6 py-4 rounded-2xl bg-card border border-border/50 group-hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                        <span className="font-semibold text-foreground">{step.name}</span>
                      </div>
                    </div>
                  </motion.div>
                  {i < pipelineSteps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-muted-foreground hidden lg:block" />
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="rounded-xl group">
                  Learn the Full Process
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Core Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Everything You Need to{" "}
                <span className="gradient-text">Transform Your Website</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From intelligent scraping to automated insights—a complete toolkit 
                for website-attached AI intelligence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group h-full p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover-lift glass-card">
                    <div className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${capability.gradient} w-fit`}>
                      <capability.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/features">
                <Button size="lg" className="gradient-bg text-white rounded-xl group">
                  View All Features
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-24 relative">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">What Makes Us Different</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Not Just Another <span className="gradient-text-purple">Chatbot</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  AutoVerse is built on principles of transparency, grounding, and responsible AI.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {differentiators.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-4 p-5 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Preview */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built for <span className="gradient-text">Every Website</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                E-commerce, documentation portals, corporate websites, and more.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { title: "E-Commerce", desc: "Best-seller detection & product recommendations", icon: "🛒" },
                { title: "Documentation", desc: "Semantic search & contextual answers", icon: "📚" },
                { title: "Corporate Sites", desc: "Policy lookup & service inquiries", icon: "🏢" }
              ].map((useCase, i) => (
                <motion.div 
                  key={i}
                  className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 text-center hover-glow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm">{useCase.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/use-cases">
                <Button size="lg" variant="outline" className="rounded-xl group">
                  Explore Use Cases
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg-subtle" />
          <div className="orb orb-purple w-[500px] h-[500px] -bottom-[200px] -left-[200px] opacity-20" />
          <div className="orb orb-blue w-[400px] h-[400px] -top-[100px] -right-[100px] opacity-20" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Built Responsibly,{" "}
                <span className="gradient-text">Documented Honestly</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                AutoVerse is an academic project with transparent limitations and ethical guidelines. 
                We believe in honest AI that augments human capability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fyp-scope">
                  <Button size="lg" variant="outline" className="rounded-xl px-8">
                    View FYP Scope
                  </Button>
                </Link>
                <Link to="/ethics">
                  <Button size="lg" variant="outline" className="rounded-xl px-8">
                    Ethics & Data Policy
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
