import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description: "Independently audited security controls"
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Data encrypted in transit and at rest"
  },
  {
    icon: Eye,
    title: "GDPR Compliant",
    description: "Full data privacy compliance"
  },
  {
    icon: Server,
    title: "99.9% Uptime SLA",
    description: "Enterprise-grade reliability"
  },
];

const certifications = [
  "SOC 2", "GDPR", "HIPAA Ready", "ISO 27001", "CCPA"
];

export const SecuritySection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Enterprise-Grade{" "}
              <span className="gradient-text">Security</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your data security is our top priority. We employ industry-leading security 
              measures to protect your conversations and customer information.
            </p>

            {/* Security Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance List */}
            <div className="space-y-2">
              {["Regular security audits and penetration testing", "Role-based access control (RBAC)", "Single Sign-On (SSO) support", "Data residency options"].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="gradient-border p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  Trust Center
                </h3>
                <p className="text-sm text-muted-foreground">
                  Verified security & compliance
                </p>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2 justify-center">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-medium text-foreground"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
