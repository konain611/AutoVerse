import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      avatar: "/avatars/alex.png", 
    },
    {
      name: "Samantha Lee",
      role: "Head of Engineering",
      avatar: "/avatars/samantha.png",
    },
    {
      name: "David Chen",
      role: "Lead AI Researcher",
      avatar: "/avatars/david.png",
    },
    {
      name: "Maria Garcia",
      role: "Head of Design",
      avatar: "/avatars/maria.png",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We are driven by a passion for innovation and a desire to push the boundaries of what's possible in artificial intelligence."
    },
    {
      title: "Customer Centricity",
      description: "Our customers are at the heart of everything we do. We are committed to their success and work tirelessly to exceed their expectations."
    },
    {
      title: "Integrity",
      description: "We operate with transparency and integrity, building trust with our customers, partners, and community."
    },
     {
      title: "Collaboration",
      description: "We believe that the best ideas come from collaboration. We foster a culture of teamwork and open communication."
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Page Header */}
      <section className="relative w-full bg-black text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-purple-500/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
        <div className="relative max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            We're on a Mission to Democratize AI
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6">
            AutoVerse was founded with the belief that powerful AI tools should be accessible to everyone, not just the tech giants.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full py-24 bg-[#05050D]">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-400">
                Our mission is to empower businesses and creators with autonomous AI agents that are easy to build, deploy, and manage. We want to enable a future where intelligent automation is a seamless part of every digital experience, fostering innovation and growth for all.
            </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Meet the Team</h2>
            <p className="mt-4 text-lg text-gray-400">
              The passionate minds behind AutoVerse.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4">
                  {/* Placeholder for avatar image */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                     <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-purple-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-24 bg-[#05050D]">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white sm:text-5xl">Our Core Values</h2>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map(value => (
                    <div key={value.title} className="p-8 bg-[#0d0d1a] border border-purple-900/30 rounded-lg">
                        <h3 className="text-2xl font-semibold text-white mb-3">{value.title}</h3>
                        <p className="text-gray-400">{value.description}</p>
                    </div>
                ))}
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Join Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            We're always looking for talented people to join our team. If you're passionate about AI, we'd love to hear from you.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="px-8 py-3 bg-purple-600 rounded-lg text-lg font-medium text-white hover:bg-purple-700 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
