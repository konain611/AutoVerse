export default function FeaturesSection() {
  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Why Choose AutoVerse?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Discover the advantages of integrating our AI-powered agents into your applications.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Automated Customer Guidance"
            description="The chatbot helps visitors find products, browse categories, and discover best-sellers instantly."
          />
          <FeatureCard
            title="Personalized Recommendations"
            description="Acts like a friendly shopkeeper and suggests products based on user interest and preferences."
          />
          <FeatureCard
            title="24/7 Instant Support"
            description="Your customers get answers immediately with no waiting — anytime, anywhere."
          />
          <FeatureCard
            title="Easy Integration"
            description="Embed the chatbot on your site with a simple widget and start assisting visitors instantly."
          />
          <FeatureCard
            title="Custom Branding"
            description="Customize the chatbot’s appearance, tone, and behavior to match your website brand."
          />
          <FeatureCard
            title="Secure & Reliable"
            description="All chatbot responses are based on the knowledge you upload, ensuring accuracy and security."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="
      p-8 rounded-2xl 
      bg-[#0d0d1a] border border-purple-900/30 
      transform hover:-translate-y-2 transition-transform duration-300
      hover:shadow-2xl hover:shadow-purple-600/20
    ">
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
