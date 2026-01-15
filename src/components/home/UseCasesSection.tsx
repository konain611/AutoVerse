import { Store, Briefcase, Building2, GraduationCap } from "lucide-react";

const useCases = [
  {
    icon: Store,
    title: "Ecommerce Stores",
    description: "Guide shoppers to the perfect product, answer sizing questions, compare items, and boost conversions with personalized recommendations.",
    color: "from-primary to-purple-400",
    stats: "35% more sales"
  },
  {
    icon: Briefcase,
    title: "Service Businesses",
    description: "Book appointments, answer pricing questions, explain your services, and qualify leads—all while you focus on delivering results.",
    color: "from-accent to-pink-400",
    stats: "60% faster response"
  },
  {
    icon: Building2,
    title: "SaaS & Tech Companies",
    description: "Handle onboarding questions, troubleshoot common issues, guide users through features, and reduce support ticket volume.",
    color: "from-orange-500 to-yellow-400",
    stats: "70% ticket reduction"
  },
  {
    icon: GraduationCap,
    title: "Education & Courses",
    description: "Answer student inquiries, explain course details, help with enrollment, and provide 24/7 support for learners worldwide.",
    color: "from-blue-500 to-cyan-400",
    stats: "24/7 availability"
  },
];

export const UseCasesSection = () => {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Works on <span className="gradient-text">Any Website</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plug in your AI customer rep wherever you need it. It adapts to your business automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl bg-gradient-to-br ${useCase.color}`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${useCase.color} mb-4`}>
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {useCase.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-sm text-primary font-medium">
                  {useCase.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
