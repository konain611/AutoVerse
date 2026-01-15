import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BookDemo = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Demo request received!", description: "We'll be in touch within 24 hours." });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                Book a <span className="gradient-text">Demo</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                See BotForge in action. Our team will show you how to transform your customer experience.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-card border border-border">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" placeholder="John" required className="mt-1" /></div>
                <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Doe" required className="mt-1" /></div>
              </div>
              <div><Label htmlFor="email">Work Email</Label><Input id="email" type="email" placeholder="john@company.com" required className="mt-1" /></div>
              <div><Label htmlFor="company">Company</Label><Input id="company" placeholder="Your Company" required className="mt-1" /></div>
              <div><Label htmlFor="message">Message (optional)</Label><Textarea id="message" placeholder="Tell us about your needs..." className="mt-1" /></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent" disabled={loading}>
                {loading ? "Submitting..." : "Request Demo"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;
