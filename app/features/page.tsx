import FeaturesSection from "@/components/FeaturesSection";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="bg-black text-white">
      {/* Page Header */}
      <section className="relative w-full bg-[#05050D] text-white py-24 md:py-32 ">
        <div className="absolute inset-0 bg-grid-purple-500/10 bg-size-[20px_20px] mask-[linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
        <div className="relative max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Powerful Features, Seamless Integration
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6">
            Explore the capabilities of AutoVerse and see how our AI agents can transform your business.
          </p>
        </div>
      </section>

      {/* Re-using the FeaturesSection component */}
      <FeaturesSection />

      {/* How It Works Section */}
      <section className="w-full py-24 bg-[#05050D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Get Started in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Deploying your AI agent is a simple, three-step process.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-600/20 border border-purple-800 rounded-full mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Create Your Agent</h3>
              <p className="text-gray-400">
                Define the agent's purpose, personality, and knowledge base using our intuitive dashboard.
              </p>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-600/20 border border-purple-800 rounded-full mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Train & Customize</h3>
              <p className="text-gray-400">
                Upload your documents, connect your APIs, and customize the agent's appearance to match your brand.
              </p>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-600/20 border border-purple-800 rounded-full mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Deploy Anywhere</h3>
              <p className="text-gray-400">
                Embed the agent on your website with a single line of code or integrate it into your favorite platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to Automate Your Business?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Join hundreds of businesses building the next generation of AI-powered experiences.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="px-8 py-3 bg-purple-600 rounded-lg text-lg font-medium text-white hover:bg-purple-700 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            >
              Sign Up for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
