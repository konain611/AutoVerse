import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <UserCheck className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Start free, upgrade anytime
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Give Your Customers a{" "}
            <span className="gradient-text">Human Touch—24/7</span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop losing sales to unanswered questions. Your AI customer rep 
            is ready to help, recommend, and convert—around the clock.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-demo">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 group">
                Get Your AI Rep Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                See Pricing
              </Button>
            </Link>
          </div>

          {/* Trust note */}
          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • Works on any website • 5-minute setup
          </p>
        </div>
      </div>
    </section>
  );
};
