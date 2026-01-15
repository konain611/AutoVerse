import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, LogIn, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Live Demo", href: "/live-demo" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Features", href: "/features" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "Dashboard", href: "/dashboard-preview" },
];

const secondaryLinks = [
  { name: "FYP Scope", href: "/fyp-scope" },
  { name: "Ethics", href: "/ethics" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border/50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="AutoVerse Logo" 
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-foreground tracking-tight">
              AutoVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  location.pathname === link.href
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            {secondaryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {user.fullName || user.email}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="font-medium">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button className="gradient-bg text-white font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                    Sign Up
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="py-4 border-t border-border/50">
                <div className="flex flex-col gap-1">
                  {[...navLinks, ...secondaryLinks].map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={cn(
                        "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        location.pathname === link.href
                          ? "text-foreground bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4 mt-2 border-t border-border/50 flex flex-col gap-2">
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {user.fullName || user.email}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full font-medium"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full font-medium">
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/auth?signup=true" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full gradient-bg text-white">
                            Sign Up
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
