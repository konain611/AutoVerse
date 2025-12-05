export default function HeroSection() {
  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Create Your Smart Smart Chatbot
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Build an AI-powered assistant that guides customers, recommends best-seller projects,
          and answers their questions instantly — all without any coding.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="#get-started"
            className="px-8 py-3 bg-purple-600 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
          >
            Get Started
          </a>

          <a
            href="#demo"
            className="px-8 py-3 bg-white text-black rounded-lg text-lg font-medium hover:bg-gray-200 transition"
          >
            View Demo
          </a>
        </div>
      </div>
    </section>
  );
}
