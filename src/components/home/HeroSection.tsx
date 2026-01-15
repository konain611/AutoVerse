import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, UserCheck, Store, Headphones } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <UserCheck className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI That Feels Human
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in-up">
            Your 24/7{" "}
            <span className="gradient-text">AI Customer Rep</span>{" "}
            That Sells & Supports
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            A human-like AI assistant that answers questions, recommends products, 
            and guides customers—works on any website, ecommerce or service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/book-demo">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 group">
                Get Your AI Rep
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/live-demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-secondary group">
                <Play className="mr-2 h-5 w-5" />
                Live Demo
              </Button>
            </Link>
          </div>

          {/* Feature Cards Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass rounded-xl p-4 hover-lift">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Human-Like Chat</div>
                  <div className="text-sm text-muted-foreground">Natural conversations</div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 hover-lift">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Store className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Any Website</div>
                  <div className="text-sm text-muted-foreground">Ecommerce, SaaS, Services</div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 hover-lift">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-purple/20">
                  <UserCheck className="h-5 w-5 text-gradient-purple" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Sells For You</div>
                  <div className="text-sm text-muted-foreground">Recommends & converts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
