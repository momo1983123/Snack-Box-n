import React from "react";

const AutoScrollCarousel = () => {
  const bannerImages = [
    {
      id: 1,
      src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F2c3b085707884c2f88ed094decfffa88?format=webp&width=600&quality=90",
      alt: "Gift A Snack Premium Snack Box Collection Featuring Chips Crackers Cookies and Candy Variety Packs",
    },
    {
      id: 2,
      src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Ffb86c1a2698e4415a1b414f0ae8c1f33?format=webp&width=600&quality=90",
      alt: "Gift A Snack Variety Pack Assortment Perfect for Gifts and Care Packages with Quality Snacks",
    },
    {
      id: 3,
      src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F0fc267a65d674083b4be3bd27a90b563?format=webp&width=600&quality=90",
      alt: "Gift A Snack Premium Care Package Collection with Diverse Snack Options for Every Occasion",
    },
    {
      id: 4,
      src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F5277a0906b534f7d80d910806e3426de?format=webp&width=600&quality=90",
      alt: "Gift A Snack Quality Snack Box Collection with Chips Crackers and Sweet Treats for Gifting",
    },
    {
      id: 5,
      src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F97422d3d39ee42519a91e3fbb0835571?format=webp&width=600&quality=90",
      alt: "Gift A Snack Premium Variety Pack with Assorted Snacks Perfect for Office Treats and Gifts",
    },
  ];

  // Duplicate the images for seamless loop
  const duplicatedImages = [...bannerImages, ...bannerImages];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-20 text-4xl rotate-12">🍪</div>
        <div className="absolute top-32 right-24 text-3xl -rotate-12">🍫</div>
        <div className="absolute bottom-20 left-32 text-3xl rotate-45">🥨</div>
        <div className="absolute bottom-16 right-20 text-4xl -rotate-45">
          🎁
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading-red mb-4 tracking-tight">
            Our Snack Box Variety Collection
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect snack experience for every occasion and
            celebration
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-logo-green to-transparent rounded-full"></div>
            <div className="mx-4 text-logo-green text-2xl">🎁</div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-logo-green to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 p-8">
          <div className="flex animate-scroll-carousel">
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 lg:w-96 mx-3 sm:mx-4 group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-contain rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-logo-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional trust elements */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
            <span className="text-logo-green text-lg">✨</span>
            <span className="text-sm font-semibold text-gray-700">
              Beautifully packaged for gifting
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoScrollCarousel;
