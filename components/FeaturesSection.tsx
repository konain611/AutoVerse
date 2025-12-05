export default function FeaturesSection() {
  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Our Smart Shopkeeper Bot?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-8 shadow-lg rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Automated Customer Guidance</h3>
            <p className="text-gray-600">
              The chatbot helps visitors find projects, browse categories, and discover best-sellers instantly.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Personalized Recommendations</h3>
            <p className="text-gray-600">
              Acts like a friendly shopkeeper and suggests projects based on user interest and preferences.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">24/7 Instant Support</h3>
            <p className="text-gray-600">
              Your customers get answers immediately with no waiting — anytime, anywhere.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Easy Integration</h3>
            <p className="text-gray-600">
              Embed the chatbot on your site with a simple widget and start assisting visitors instantly.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Custom Branding</h3>
            <p className="text-gray-600">
              Customize the chatbot’s appearance, tone, and behavior to match your website brand.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Secure & Reliable</h3>
            <p className="text-gray-600">
              All chatbot responses are based on the knowledge you upload, ensuring accuracy and security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
