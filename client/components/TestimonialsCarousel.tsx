import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "The best gift I've ever given my friend! Elegant packaging and the products are fresh and super tasty.",
    name: "Sarah M.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "I bought the box for my office and everyone loved the wide variety of snacks.",
    name: "Mike R.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Fast delivery, excellent quality, and I recommend it to everyone.",
    name: "Jessica L.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Perfect for our family movie nights! The kids absolutely love the variety of treats in each box.",
    name: "Amanda K.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Outstanding quality and presentation. This snack box exceeded all my expectations!",
    name: "David P.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Great customer service and amazing products. Will definitely order again for upcoming holidays.",
    name: "Lisa T.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-snack-gold text-snack-gold" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-sliding testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Increased to 6 seconds for better readability

    return () => clearInterval(interval);
  }, []);

  // Navigation functions
  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <>
      {/* JSON-LD Schema Markup for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Gift A Snack Premium Snack Boxes",
            brand: {
              "@type": "Brand",
              name: "Gift A Snack",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: testimonials.length,
            },
            review: testimonials.map((testimonial) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: testimonial.rating,
                bestRating: "5",
              },
              reviewBody: testimonial.text,
            })),
          }),
        }}
      />

      <section
        id="testimonials-section"
        className="py-16 sm:py-24 px-4 relative overflow-hidden"
      >
        {/* Enhanced gradient background with decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-green-300/20 to-blue-300/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-xl"></div>
        </div>

        {/* Decorative snack icons */}
        <div className="absolute top-32 right-20 text-4xl opacity-10 animate-pulse">
          🍪
        </div>
        <div className="absolute bottom-40 left-16 text-3xl opacity-10 animate-pulse delay-1000">
          🍫
        </div>
        <div className="absolute top-48 left-32 text-2xl opacity-10 animate-pulse delay-500">
          🥨
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading-red mb-4 sm:mb-6 tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-lg sm:text-xl text-snack-dark-blue/80 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied
              customers who love our snack boxes
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center mt-6">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-logo-green to-transparent rounded-full"></div>
              <div className="mx-4 text-logo-green">✨</div>
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-logo-green to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Desktop: Show 3 testimonials with enhanced design */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((offset) => {
              const testimonialIndex =
                (currentTestimonial + offset) % testimonials.length;
              const testimonial = testimonials[testimonialIndex];
              return (
                <div
                  key={testimonialIndex}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl border-2 border-gray-800 group relative overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${offset * 0.2}s both`,
                  }}
                >
                  {/* Card background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-logo-green/5 to-purple-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Enhanced circular image with larger size */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name} avatar`}
                          className="w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white/50 group-hover:border-logo-green/30 transition-all duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Glow effect around image */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-logo-green/20 to-purple-300/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                      </div>

                      <div className="text-center mt-4">
                        <h4 className="font-bold text-heading-red text-xl mb-2">
                          {testimonial.name}
                        </h4>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>

                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed relative text-center">
                      <span className="text-logo-green text-6xl absolute -top-4 -left-4 opacity-20 font-serif">
                        "
                      </span>
                      <span className="text-logo-green text-6xl absolute -bottom-8 -right-4 opacity-20 font-serif">
                        "
                      </span>
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Enhanced single testimonial with swipe navigation */}
          <div className="md:hidden relative">
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 relative shadow-xl border-2 border-gray-800">
                {/* Swipe indicator */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-logo-green/15 to-green-400/15 text-logo-green px-4 py-2 rounded-full text-sm font-medium">
                    <span>← Swipe for more reviews →</span>
                  </div>
                </div>

                {/* Enhanced circular image layout */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={`${testimonials[currentTestimonial].name} avatar`}
                      className="w-20 h-20 rounded-full object-cover shadow-2xl border-4 border-white/50"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-logo-green/20 to-purple-300/20 blur-lg -z-10"></div>
                  </div>

                  <div className="text-center mt-4">
                    <h4 className="font-bold text-heading-red text-xl mb-2">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <StarRating
                      rating={testimonials[currentTestimonial].rating}
                    />
                  </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed relative text-center">
                  <span className="text-logo-green text-5xl absolute -top-3 -left-3 opacity-20 font-serif">
                    "
                  </span>
                  <span className="text-logo-green text-5xl absolute -bottom-6 -right-3 opacity-20 font-serif">
                    "
                  </span>
                  {testimonials[currentTestimonial].text}
                </p>
              </div>
            </div>

            {/* Enhanced navigation arrows for mobile */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-logo-green p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-white/50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-logo-green p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-white/50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Enhanced indicators */}
          <div className="flex justify-center mt-8 sm:mt-12 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`transition-all duration-300 hover:scale-125 ${
                  index === currentTestimonial
                    ? "w-8 h-3 bg-gradient-to-r from-logo-green to-green-400 rounded-full shadow-lg"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Enhanced mobile testimonial counter */}
          <div className="md:hidden text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
              <span className="text-sm font-medium text-gray-700">
                {currentTestimonial + 1} of {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
