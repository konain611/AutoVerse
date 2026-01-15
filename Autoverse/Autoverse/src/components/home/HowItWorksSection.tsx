import { useState } from "react";
import { Upload, MessageSquare, Code2, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Add Your Content",
    description: "Upload your product catalog, FAQs, service details, or connect your website. The AI learns everything about your business.",
    image: "📚",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Set the Personality",
    description: "Define how your AI rep should talk, whether friendly, professional, or casual. Match your brand voice perfectly.",
    image: "💬",
  },
  {
    number: "03",
    icon: Code2,
    title: "Embed on Your Site",
    description: "Copy one line of code and paste it anywhere. Works on Shopify, WordPress, Wix, or any custom website.",
    image: "🔌",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Go Live Instantly",
    description: "Your AI customer rep starts helping visitors immediately. Answer questions, recommend products, close sales.",
    image: "🚀",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Watch It Learn",
    description: "Review conversations, add new info, and watch your AI get smarter with every interaction.",
    image: "✨",
  },
];

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Live in <span className="gradient-text">5 Minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No coding, no developers, no complicated setup. Just plug it in and let it work.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps List */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "group cursor-pointer p-6 rounded-xl border transition-all duration-300",
                  activeStep === index
                    ? "bg-card border-primary/50 shadow-lg shadow-primary/10"
                    : "border-transparent hover:bg-card/50 hover:border-border"
                )}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    activeStep === index
                      ? "bg-gradient-to-br from-primary to-accent"
                      : "bg-secondary"
                  )}>
                    <step.icon className={cn(
                      "h-5 w-5",
                      activeStep === index ? "text-white" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-primary font-medium">{step.number}</span>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className={cn(
                      "text-sm transition-all",
                      activeStep === index ? "text-muted-foreground" : "text-muted-foreground/70"
                    )}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview Area */}
          <div className="relative">
            <div className="gradient-border p-8 rounded-2xl min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-float">
                  {steps[activeStep].image}
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
