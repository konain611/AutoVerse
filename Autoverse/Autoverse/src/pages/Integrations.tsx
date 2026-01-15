import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  { name: "Messaging", items: [{ name: "WhatsApp", icon: "📱" }, { name: "Messenger", icon: "💬" }, { name: "Slack", icon: "💼" }, { name: "Telegram", icon: "✈️" }] },
  { name: "CRM", items: [{ name: "Salesforce", icon: "☁️" }, { name: "HubSpot", icon: "🧡" }, { name: "Zoho", icon: "📊" }, { name: "Pipedrive", icon: "📈" }] },
  { name: "E-commerce", items: [{ name: "Shopify", icon: "🛍️" }, { name: "WooCommerce", icon: "🛒" }, { name: "Magento", icon: "🏪" }, { name: "BigCommerce", icon: "📦" }] },
  { name: "Productivity", items: [{ name: "Notion", icon: "📓" }, { name: "Google Drive", icon: "📁" }, { name: "Zapier", icon: "⚡" }, { name: "Make", icon: "🔧" }] },
];

const Integrations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Powerful <span className="gradient-text">Integrations</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect BotForge with your favorite tools. 50+ integrations and counting.
            </p>
          </div>
          {categories.map((cat) => (
            <div key={cat.name} className="mb-12">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">{cat.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover-lift flex flex-col items-center gap-3">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Integrations;
