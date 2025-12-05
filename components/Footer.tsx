export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Smart Shopkeeper Bot</h3>
            <p className="text-gray-400">
              AI-powered chatbot that guides customers, recommends best-selling projects,
              and provides instant support 24/7.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#use-cases" className="hover:text-white transition">Use Cases</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest updates and improvements.</p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
              />
              <button className="px-6 bg-purple-600 rounded-r-lg text-white hover:bg-purple-700 transition">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} Smart Shopkeeper Bot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
