import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  Product: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Dashboard Preview", href: "/dashboard-preview" },
  ],
  Academic: [
    { name: "FYP Scope", href: "/fyp-scope" },
    { name: "Limitations", href: "/fyp-scope" },
    { name: "Ethics & Data Policy", href: "/ethics" },
    { name: "Book Demo", href: "/book-demo" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="AutoVerse Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold text-foreground">
                AutoVerse
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Website-attached AI intelligence with RAG-based conversations, 
              smart recommendations, and responsible automation.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300 text-muted-foreground hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AutoVerse. Final Year Project.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-muted-foreground">System Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
