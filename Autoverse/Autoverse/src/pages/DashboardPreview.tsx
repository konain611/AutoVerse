import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, User, Mail, Calendar, BarChart3, Globe, Activity, FileText, LogIn } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPreview = () => {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show error if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto mt-20">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription className="mt-2">
                  You must be logged in to access the dashboard. Please log in to continue.
                </AlertDescription>
              </Alert>
              <div className="mt-6 text-center">
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login to Access Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8 mt-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.fullName || user.email.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground">Here's your dashboard overview</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Account
                </CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Name</div>
                  <div className="font-medium">{user.fullName || "Not set"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </div>
                  <div className="font-medium">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Member Since
                  </div>
                  <div className="font-medium">{formatDate(user.createdAt)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Website Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Website Stats
                </CardTitle>
                <CardDescription>Overview of your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Total Pages</div>
                  <div className="text-2xl font-bold">247</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Active Integrations</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Data Size</div>
                  <div className="text-2xl font-bold">1.2 GB</div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>What's happening</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Last update: 2 hours ago</div>
                  <div className="text-muted-foreground mt-1">Website data refreshed</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Status: Active</div>
                  <div className="text-muted-foreground mt-1">All systems running</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website Content Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Website Content
                </CardTitle>
                <CardDescription>Your website information and content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4" />
                      Content Pages
                    </div>
                    <div className="text-muted-foreground text-sm">
                      You have 247 pages indexed in your knowledge base. Content is automatically updated every 6 hours.
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Activity className="h-4 w-4" />
                      Automation Status
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Your automation is active and running smoothly. Next scheduled update is in 4 hours.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Link to="/live-demo">
                    <Button variant="outline">View Live Demo</Button>
                  </Link>
                  <Link to="/features">
                    <Button variant="outline">Browse Features</Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button variant="outline">How It Works</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPreview;
