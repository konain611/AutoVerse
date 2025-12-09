import Link from 'next/link';
import TypeWriter from './TypeWriter';

export default function HeroSection() {
    return (
        <section className="relative w-full bg-black text-white py-20 md:py-20">
            <div className="absolute inset-0 bg-grid-purple-500/10 bg-size:[20px_20px] mask-[linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
            <div className="relative max-w-6xl mx-auto text-center px-6">
                <h1 className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
                    <TypeWriter text="Build Your Autonomous AI Agent" />
                </h1>


                <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6 mb-10">
                    Create and deploy intelligent chatbots that automate customer support, streamline workflows, and drive engagement.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/signup"
                        className="px-8 py-3 bg-purple-600 rounded-lg text-lg font-medium text-white hover:bg-purple-700 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    >
                        Get Started Free
                    </Link>

                    <Link
                        href="/features"
                        className="px-8 py-3 bg-transparent border border-white/20 rounded-lg text-lg font-medium text-white hover:bg-white/10 transition-colors"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
