import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  CheckCircle2, XCircle, AlertTriangle, Lightbulb,
  GraduationCap, Target, Clock, Layers
} from "lucide-react";

const inScope = [
  "Website attachment and URL based configuration",
  "Intelligent web scraping with noise removal",
  "Continuous knowledge updates, not model retraining",
  "RAG based question answering with citations",
  "Source attribution and freshness indicators",
  "Rule based best seller and trending content detection",
  "Context aware product and content recommendations",
  "Intent recognition and classification",
  "Agent based task planning with human approval",
  "Website change monitoring and alerts",
  "Analytics dashboard with key metrics",
  "Recommendation explainability",
  "Basic admin controls for scraping and RAG",
  "User data isolation and security basics"
];

const outOfScope = [
  "Real time model training or fine tuning",
  "Multi language support, English only for FYP",
  "Voice based interactions",
  "Mobile native applications",
  "Integration with external CRM or ERP systems",
  "Payment processing or e commerce transactions",
  "User generated content moderation at scale",
  "Enterprise SSO and advanced access control",
  "Custom embedding model training",
  "Real time collaborative editing"
];

const limitations = [
  {
    title: "Scraping Limitations",
    items: [
      "JavaScript heavy SPAs may require additional handling",
      "Rate limiting applies to prevent server overload",
      "Private or authenticated pages are not scraped",
      "Some anti bot protections may block crawling"
    ]
  },
  {
    title: "RAG Limitations",
    items: [
      "Answer quality depends on source content quality",
      "Very recent changes may take time to reflect",
      "Complex multi hop reasoning has limitations",
      "Chunk size affects retrieval granularity"
    ]
  },
  {
    title: "Automation Limitations",
    items: [
      "All automation requires human approval",
      "No autonomous actions without user consent",
      "External API integrations not included",
      "Alert delivery limited to dashboard with email optional"
    ]
  },
  {
    title: "Scale Limitations",
    items: [
      "Designed for single website attachment per instance",
      "Large websites with 10k+ pages may require optimization",
      "Concurrent user handling limited for demo",
      "Storage limits apply to knowledge base"
    ]
  }
];

const academicNotes = [
  {
    icon: Target,
    title: "Research Objectives",
    content: "This project explores the application of RAG (Retrieval-Augmented Generation) for website-specific knowledge assistants, with emphasis on grounding, attribution, and practical automation."
  },
  {
    icon: Layers,
    title: "Technical Contributions",
    content: "Implementation of a complete pipeline from web scraping to conversational AI, with novel approaches to best-seller detection and explainable recommendations."
  },
  {
    icon: Clock,
    title: "Development Timeline",
    content: "Developed over an academic semester with iterative improvements based on testing and feedback. Core functionality prioritized over edge cases."
  },
  {
    icon: Lightbulb,
    title: "Future Work",
    content: "Extensions could include multi-language support, advanced personalization, real-time collaborative features, and enterprise-grade security."
  }
];

const FYPScope = () => {
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
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Academic Project</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                FYP Scope & <span className="gradient-text">Limitations</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Transparent documentation of what AutoVerse does and doesn't do, 
                presented honestly for academic evaluation.
              </p>
            </div>
          </div>
        </section>

        {/* In Scope / Out of Scope */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* In Scope */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-success/10">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    In Scope
                  </h2>
                </div>
                <ul className="space-y-3">
                  {inScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Out of Scope */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <XCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Out of Scope
                  </h2>
                </div>
                <ul className="space-y-3">
                  {outOfScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Known Limitations */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/30 mb-6">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm text-warning">Honest Disclosure</span>
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">
                Known Limitations
              </h2>
              <p className="text-muted-foreground">
                Every system has constraints. Here are ours, documented explicitly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {limitations.map((section, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Notes */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Academic Context
              </h2>
              <p className="text-muted-foreground">
                Notes for evaluators and reviewers on the academic nature of this project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {academicNotes.map((note, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <note.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{note.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FYPScope;
