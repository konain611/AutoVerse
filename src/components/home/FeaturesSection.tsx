import { 
  MessageCircleHeart, Globe, ShoppingBag, Brain, 
  Palette, Plug, UserCheck, TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: MessageCircleHeart,
    title: "Human Like Conversations",
    description: "Responds naturally like a real person, not robotic scripts. Customers won't know it's AI."
  },
  {
    icon: ShoppingBag,
    title: "Smart Product Guidance",
    description: "Recommends best sellers, compares options, and guides customers to the perfect purchase."
  },
  {
    icon: Brain,
    title: "Learns Your Business",
    description: "Train it on your products, services, FAQs, and policies. It becomes your expert instantly."
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Embed on any website like Shopify, WordPress, Wix, custom sites, or any platform you use."
  },
  {
    icon: Palette,
    title: "Match Your Brand",
    description: "Customize colors, tone, personality, and avatar to perfectly represent your business."
  },
  {
    icon: Plug,
    title: "Easy Integration",
    description: "One line of code to install. No developers needed. Live in under 5 minutes."
  },
  {
    icon: UserCheck,
    title: "Seamless Handoff",
    description: "Escalates complex issues to your team with full context. Never leaves customers hanging."
  },
  {
    icon: TrendingUp,
    title: "Conversion Focused",
    description: "Trained to help customers buy, not just answer questions. Increases your revenue."
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            More Than a Chatbot,{" "}
            <span className="gradient-text">A Team Member</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI rep understands context, remembers preferences, and actually helps customers convert.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
