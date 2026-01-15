import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  ShoppingCart, FileText, Building2, CheckCircle2,
  TrendingUp, MessageSquare, Bell, Search, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const useCases = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E Commerce Websites",
    subtitle: "Turn browsers into buyers with intelligent product guidance",
    description: "AutoVerse analyzes your product catalog, identifies best sellers, and provides personalized recommendations based on customer queries and browsing patterns.",
    gradient: "from-blue-500 to-cyan-500",
    emoji: "🛒",
    benefits: [
      {
        icon: TrendingUp,
        title: "Best Seller Detection",
        description: "Automatically identify top performing products based on visibility, mentions, and review counts."
      },
      {
        icon: MessageSquare,
        title: "Product Q&A",
        description: "Answer customer questions about specifications, availability, and comparisons using only your website data."
      },
      {
        icon: Bell,
        title: "Price Monitoring",
        description: "Track price changes and notify customers or admins when products drop in price or go out of stock."
      },
      {
        icon: Search,
        title: "Smart Search",
        description: "Help customers find products with natural language queries like 'laptop for video editing under $1000'."
      }
    ],
    example: {
      query: "Which laptop should I buy for gaming?",
      response: "Based on your gaming needs, I recommend the XYZ Gaming Laptop ($999). It has the highest review score at 4.8 out of 5 and is our top seller in gaming laptops this month. It features RTX 4060, 16GB RAM, and 144Hz display."
    }
  },
  {
    id: "documentation",
    icon: FileText,
    title: "Documentation Portals",
    subtitle: "Make technical docs conversational and accessible",
    description: "Transform static documentation into an interactive knowledge assistant that guides users to the exact information they need with proper citations.",
    gradient: "from-purple-500 to-violet-500",
    emoji: "📚",
    benefits: [
      {
        icon: Search,
        title: "Semantic Search",
        description: "Go beyond keyword matching and understand user intent to find relevant documentation sections."
      },
      {
        icon: MessageSquare,
        title: "Contextual Answers",
        description: "Provide answers with direct links to source documentation, section references, and confidence scores."
      },
      {
        icon: TrendingUp,
        title: "Trending Topics",
        description: "Identify most referenced articles and frequently asked questions to improve documentation."
      },
      {
        icon: Bell,
        title: "Update Alerts",
        description: "Track documentation changes and notify users when relevant sections are updated."
      }
    ],
    example: {
      query: "How do I configure authentication?",
      response: "To configure authentication, follow these steps from our Security Guide (last updated: 2 days ago). First, navigate to Settings then Auth. Next, enable your preferred provider. Finally, configure callback URLs.\n\nSource: /docs/security/authentication#setup"
    }
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Websites",
    subtitle: "Instant answers about your company, services, and policies",
    description: "Provide visitors with accurate information about your company, services, pricing, and policies around the clock with zero wait time.",
    gradient: "from-orange-500 to-amber-500",
    emoji: "🏢",
    benefits: [
      {
        icon: MessageSquare,
        title: "Service Inquiries",
        description: "Answer questions about services, pricing, and availability directly from your website content."
      },
      {
        icon: Search,
        title: "Policy Lookup",
        description: "Help customers find refund policies, terms of service, and FAQs without manual searching."
      },
      {
        icon: Bell,
        title: "Content Updates",
        description: "Monitor and alert when important pages like pricing or policies are updated."
      },
      {
        icon: TrendingUp,
        title: "Lead Qualification",
        description: "Understand visitor intent and provide relevant service recommendations."
      }
    ],
    example: {
      query: "What's your refund policy?",
      response: "Our refund policy as per our Terms page, updated Jan 2024: Full refunds within 30 days of purchase, 50% credit after 30 days. Contact support@company.com to initiate.\n\nSource: /terms#refunds"
    }
  }
];

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="orb orb-cyan w-[500px] h-[500px] -top-[200px] right-0" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Built for <span className="gradient-text">Every Website</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whether you run an e commerce store, documentation portal, or corporate website, 
                AutoVerse adapts to your content and delivers intelligent assistance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-40">
              {useCases.map((useCase, index) => (
                <motion.div 
                  key={useCase.id} 
                  className="space-y-16"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Header */}
                  <div className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${useCase.gradient} mb-6`}>
                        <useCase.icon className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                        {useCase.title}
                      </h2>
                      <p className={`text-xl font-medium bg-gradient-to-r ${useCase.gradient} bg-clip-text text-transparent mb-4`}>
                        {useCase.subtitle}
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                    
                    {/* Example Chat */}
                    <div className="flex-1 w-full max-w-md">
                      <motion.div 
                        className="bg-card border border-border/50 rounded-2xl overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-secondary/50 px-4 py-3 border-b border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            <span className="ml-2 text-sm text-muted-foreground">AutoVerse Chat</span>
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          {/* User Message */}
                          <div className="flex justify-end">
                            <div className={`bg-gradient-to-r ${useCase.gradient} text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]`}>
                              <p className="text-sm">{useCase.example.query}</p>
                            </div>
                          </div>
                          {/* Bot Response */}
                          <div className="flex justify-start">
                            <div className="bg-secondary/50 border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
                              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                                {useCase.example.response}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {useCase.benefits.map((benefit, i) => (
                      <motion.div 
                        key={i}
                        className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover-lift backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${useCase.gradient} w-fit mb-4`}>
                          <benefit.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Website?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Connect AutoVerse to your website and see intelligent assistance in action.
              </p>
              <Link to="/book-demo">
                <Button size="lg" className="gradient-bg text-white rounded-xl group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;
