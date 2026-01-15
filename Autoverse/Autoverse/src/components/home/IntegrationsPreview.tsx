import { Code, MousePointer, MessageCircle } from "lucide-react";

const platforms = [
  { name: "Shopify", icon: "🛍️" },
  { name: "WordPress", icon: "📝" },
  { name: "Wix", icon: "🌐" },
  { name: "Squarespace", icon: "◼️" },
  { name: "Webflow", icon: "🔷" },
  { name: "Custom Sites", icon: "💻" },
];

const steps = [
  {
    icon: Code,
    title: "Copy the code",
    description: "Get your unique embed snippet from the dashboard",
  },
  {
    icon: MousePointer,
    title: "Paste anywhere",
    description: "Add it to your website's HTML—any platform works",
  },
  {
    icon: MessageCircle,
    title: "Start chatting",
    description: "Your AI rep goes live instantly and starts helping customers",
  },
];

export const IntegrationsPreview = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            One Code,{" "}
            <span className="gradient-text">Any Website</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Embed Autoverse on any platform with a single line of code. No plugins, no hassle.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center gap-2 hover-lift"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {platform.icon}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {platform.name}
              </span>
            </div>
          ))}
        </div>

        {/* How to embed steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Step {index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
