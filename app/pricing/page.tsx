import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      frequency: "/month",
      description: "For individuals and hobby projects.",
      features: [
        "1 AI Agent",
        "500 messages/month",
        "Basic knowledge base",
        "Community support",
      ],
      cta: "Start for Free",
      href: "/signup",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$99",
      frequency: "/month",
      description: "For small businesses and startups.",
      features: [
        "5 AI Agents",
        "10,000 messages/month",
        "Advanced knowledge base (APIs, DBs)",
        "Custom branding",
        "Priority email support",
      ],
      cta: "Get Started",
      href: "/signup",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      frequency: "",
      description: "For large organizations with custom needs.",
      features: [
        "Unlimited AI Agents",
        "Unlimited messages",
        "Dedicated infrastructure",
        "Advanced security & compliance",
        "24/7 dedicated support",
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlight: false,
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from your account dashboard. Prorated charges or credits will be applied automatically."
    },
    {
      question: "What counts as a 'message'?",
      answer: "A message is a single interaction (a query from a user and a response from the AI agent). The count resets at the beginning of each monthly billing cycle."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer community support for the Starter plan, priority email support for the Pro plan, and 24/7 dedicated support for our Enterprise customers."
    },
    {
      question: "Can I try AutoVerse before I commit?",
      answer: "Absolutely! Our Starter plan is free to use and gives you a great opportunity to explore the core features of AutoVerse."
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Page Header */}
      <section className="relative w-full bg-[#05050D] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-purple-500/10 bg-size-[20px_20px] mask-[linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
        <div className="relative max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Find the Perfect Plan
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6">
            Start for free and scale as you grow. No hidden fees, no credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="w-full py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`
                  p-8 rounded-2xl flex flex-col
                  ${plan.highlight ? 'bg-purple-600/10 border-2 border-purple-500 shadow-2xl shadow-purple-600/20' : 'bg-[#0d0d1a] border border-purple-900/30'}
                `}
              >
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-400">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-lg text-gray-400">{plan.frequency}</span>
                </div>
                <ul className="mt-8 space-y-4 grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
✅
                  <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={plan.href}
                    className={`
                      block w-full text-center px-6 py-3 rounded-lg text-lg font-medium
                      ${plan.highlight ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-white/10 text-white hover:bg-white/20'}
                      transition-colors
                    `}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-[#05050D] text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 bg-[#0d0d1a] border border-purple-900/30 rounded-lg">
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
