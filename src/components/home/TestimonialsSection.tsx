import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "BotForge transformed our customer support. We reduced response time by 80% and our customers love the instant help they get.",
    author: "Sarah Chen",
    role: "Head of Customer Success",
    company: "TechFlow Inc.",
    rating: 5,
  },
  {
    quote: "The no-code builder made it incredibly easy to get started. We had our first AI chatbot live in under an hour!",
    author: "Marcus Johnson",
    role: "Product Manager",
    company: "StartupXYZ",
    rating: 5,
  },
  {
    quote: "Best investment we made this year. The ROI was visible within the first month with a 40% reduction in support tickets.",
    author: "Emily Rodriguez",
    role: "VP of Operations",
    company: "GrowthCo",
    rating: 5,
  },
  {
    quote: "The integrations work seamlessly with our existing tools. Setup was a breeze and the support team is fantastic.",
    author: "David Kim",
    role: "CTO",
    company: "InnovateTech",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers are saying about their experience with BotForge.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 text-primary/20">
              <Quote className="h-16 w-16" />
            </div>

            {/* Main Card */}
            <div className="gradient-border p-8 md:p-12 rounded-2xl">
              <div className="relative">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-foreground font-medium mb-8 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {testimonials[currentIndex].author[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prev}
                      className="rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={next}
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
