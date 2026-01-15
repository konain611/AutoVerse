import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Shield, Lock, Eye, Trash2, Scale, Heart,
  AlertTriangle, CheckCircle2, FileText, Users
} from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Data Privacy First",
    description: "We only scrape publicly available website data. No personal data is collected without explicit consent. User interactions are isolated and can be deleted on request."
  },
  {
    icon: Lock,
    title: "Security by Design",
    description: "All data is encrypted at rest and in transit. Access controls ensure only authorized users can view their data. Regular security audits maintain system integrity."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Every recommendation comes with an explanation. Users can see why something was suggested, what data influenced it, and the confidence level of responses."
  },
  {
    icon: Scale,
    title: "Fairness & Non Bias",
    description: "Our ranking algorithms are rule based and transparent. We don't use opaque ML models for ranking that could introduce hidden biases."
  },
  {
    icon: Heart,
    title: "Human Centered AI",
    description: "AutoVerse augments human capability, never replaces human judgment. All automated actions require explicit human approval."
  },
  {
    icon: Users,
    title: "Respect for Source Websites",
    description: "We respect robots.txt, implement rate limiting, and never scrape private or authenticated content. Website owners maintain control."
  }
];

const dataPolicy = [
  {
    title: "What We Collect",
    items: [
      "Publicly available website content (text, structure)",
      "User queries submitted to the assistant",
      "Interaction logs for improving service quality",
      "Account information provided during signup"
    ]
  },
  {
    title: "What We Don't Collect",
    items: [
      "Personal data from scraped websites",
      "Private or authenticated page content",
      "Payment or financial information",
      "Data from websites without permission"
    ]
  },
  {
    title: "How We Use Data",
    items: [
      "To provide relevant answers and recommendations",
      "To improve scraping and retrieval accuracy",
      "To detect and fix system issues",
      "To generate anonymized usage analytics"
    ]
  },
  {
    title: "Your Rights",
    items: [
      "Request access to your data at any time",
      "Delete your account and all associated data",
      "Export your conversation history",
      "Opt out of analytics and improvement programs"
    ]
  }
];

const ethicalGuidelines = [
  {
    icon: CheckCircle2,
    color: "text-success",
    title: "We Do",
    items: [
      "Clearly label AI generated content",
      "Provide source citations for all answers",
      "Require human approval for automated actions",
      "Respect website terms of service",
      "Maintain audit logs for all operations"
    ]
  },
  {
    icon: AlertTriangle,
    color: "text-destructive",
    title: "We Don't",
    items: [
      "Scrape private or protected content",
      "Store sensitive personal information",
      "Make autonomous decisions without consent",
      "Use deceptive practices or dark patterns",
      "Share data with third parties without disclosure"
    ]
  }
];

const Ethics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Our Commitment</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                Ethics & <span className="gradient-text">Data Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Building AI responsibly means being transparent about how we handle data, 
                make decisions, and respect all stakeholders.
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Core Principles
              </h2>
              <p className="text-muted-foreground">
                The ethical foundations that guide every aspect of AutoVerse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <principle.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Policy */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Data Handling</span>
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">
                Data Policy
              </h2>
              <p className="text-muted-foreground">
                Clear, simple explanations of how we handle your data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {dataPolicy.map((section, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethical Guidelines */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Ethical Guidelines
              </h2>
              <p className="text-muted-foreground">
                Clear commitments about what we do and don't do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {ethicalGuidelines.map((section, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                    <h3 className="text-xl font-semibold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <section.icon className={`h-5 w-5 ${section.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Deletion */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto mb-6">
                <Trash2 className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4">
                Your Right to Delete
              </h2>
              <p className="text-muted-foreground mb-6">
                You can request deletion of all your data at any time. Upon request, 
                we will permanently remove all associated data within 30 days, including 
                conversation logs, account information, and any derived analytics.
              </p>
              <p className="text-sm text-muted-foreground">
                To request data deletion, contact us at{" "}
                <span className="text-primary">privacy@autoverse.ai</span>
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Note */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Compliance Note
                  </h3>
                  <p className="text-muted-foreground">
                    This is an academic project developed as part of a Final Year Project (FYP). 
                    While we strive to follow best practices in data protection and ethical AI, 
                    this system is not currently certified for enterprise or production use. 
                    The policies outlined here represent our design intentions and implementation goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ethics;
