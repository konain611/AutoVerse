import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowRight, Bot, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required").max(100),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("signup") === "true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const validation = signUpSchema.safeParse({ fullName, email, password });
        if (!validation.success) {
          toast({
            title: "Validation Error",
            description: validation.error.errors[0].message,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName);
        if (error) {
          let message = error.message;
          if (error.message.includes("already registered")) {
            message = "An account with this email already exists. Please sign in.";
          }
          toast({
            title: "Sign Up Failed",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to Autoverse! You're now signed in.",
          });
        }
      } else {
        const validation = signInSchema.safeParse({ email, password });
        if (!validation.success) {
          toast({
            title: "Validation Error",
            description: validation.error.errors[0].message,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          let message = error.message;
          if (error.message.includes("Invalid login")) {
            message = "Invalid email or password. Please try again.";
          }
          toast({
            title: "Sign In Failed",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome Back!",
            description: "You've successfully signed in.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        <div className="absolute inset-0 pattern-grid opacity-5" />
        
        {/* Animated orbs for visual interest */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <img src="src\assets\logo.png" alt="Autoverse" className="w-15 h-15" />
            </div>
            <span className="font-display text-2xl font-bold">Autoverse</span>
          </a>

          <div className="max-w-md">
            <h1 className="font-display text-4xl font-bold mb-6 leading-tight">
              Your AI Customer Rep That Feels Human
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Answer questions, recommend products, and guide customers 24/7. Works on any website.
            </p>

            <div className="space-y-4">
              {["Human-like conversations", "Works on any website", "Live in 5 minutes"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-white/60">Autoverse.</p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Bot className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">Autoverse</span>
            </a>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground">
              {isSignUp ? "Get your AI customer rep today" : "Sign in to continue to your dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-12 h-12 bg-secondary/50 border-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-secondary/50 border-border focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-secondary/50 border-border focus:border-primary focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 gradient-bg text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline font-semibold"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
