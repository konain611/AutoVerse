import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: ["1 AI Chatbot", "1,000 messages per month", "Basic analytics", "Email support", "Website widget"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing teams with advanced needs",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: ["5 AI Chatbots", "10,000 messages per month", "Advanced analytics", "Priority support", "All integrations", "Human handoff", "Custom branding"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    description: "For large organizations",
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: ["Unlimited Chatbots", "100,000 messages per month", "Full analytics suite", "24/7 phone support", "API access", "SSO and SAML", "Dedicated success manager"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for enterprises",
    monthlyPrice: null,
    yearlyPrice: null,
    features: ["Everything in Business", "Unlimited messages", "Custom integrations", "On premise option", "SLA guarantee", "Custom training", "White label option"],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your business. All plans include a 14 day free trial.
            </p>
            <div className="inline-flex items-center p-1 rounded-full bg-secondary">
              <button onClick={() => setAnnual(false)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all", !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all", annual ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>Annual <span className="text-xs opacity-75">Save 20%</span></button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={cn("relative p-6 rounded-2xl border transition-all hover-lift", plan.popular ? "border-primary bg-card shadow-lg shadow-primary/10" : "border-border bg-card")}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-medium text-white">Most Popular</div>}
                <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{plan.description}</p>
                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <><span className="text-4xl font-bold text-foreground">${annual ? plan.yearlyPrice : plan.monthlyPrice}</span><span className="text-muted-foreground">/mo</span></>
                  ) : (
                    <span className="text-2xl font-bold text-foreground">Custom</span>
                  )}
                </div>
                <Button className={cn("w-full mb-6", plan.popular ? "bg-gradient-to-r from-primary to-accent" : "")} variant={plan.popular ? "default" : "outline"}>{plan.cta}</Button>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />{feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
