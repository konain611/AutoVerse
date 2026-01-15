import { Globe, Zap, Shield } from "lucide-react";

const stats = [
  { icon: Globe, value: "Any Website", label: "Shopify, WordPress, Wix & more" },
  { icon: Zap, value: "5 Min Setup", label: "One line of code to embed" },
  { icon: Shield, value: "24/7 Active", label: "Never miss a customer" },
];

export const TrustBadges = () => {
  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
