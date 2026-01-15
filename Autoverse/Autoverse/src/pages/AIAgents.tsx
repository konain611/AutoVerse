import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Zap, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Brain, title: "Context-Aware AI", description: "Our agents understand context and remember conversation history for natural interactions." },
  { icon: MessageSquare, title: "Multi-Turn Conversations", description: "Handle complex queries across multiple exchanges without losing track." },
  { icon: Zap, title: "Instant Learning", description: "Train on your data in minutes. Updates reflect immediately across all channels." },
  { icon: Target, title: "Goal-Oriented", description: "Configure agents to achieve specific outcomes like bookings, sales, or support resolution." },
];

const AIAgents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                Intelligent <span className="gradient-text">AI Agents</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Go beyond simple chatbots. Our AI agents understand, reason, and take action to solve customer problems autonomously.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {features.map((f, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover-lift">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4"><f.icon className="h-6 w-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/book-demo"><Button size="lg" className="bg-gradient-to-r from-primary to-accent">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIAgents;
