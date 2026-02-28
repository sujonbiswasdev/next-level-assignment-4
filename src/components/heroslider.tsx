"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "SUPER DELICIOUS BURGERS",
    subtitle: "Experience the taste of premium handcrafted burgers.",
    image: "https://images.pexels.com/photos/1352274/pexels-photo-1352274.jpeg",
  },
  {
    id: 2,
    title: "FRESH HOT PIZZA",
    subtitle: "Loaded with cheese & baked to perfection.",
    image: "/images/food1.jpg",
  },
  {
    id: 3,
    title: "CRISPY FRIED BERGER",
    subtitle: "Golden crispy bites with signature spices.",
    image: "/images/food2.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const router=useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-30 h-full flex items-center">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
              <div className="max-w-2xl text-white space-y-6">

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg sm:text-xl text-gray-200">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap gap-4">

                  <button onClick={()=>router.push('/cart')} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold shadow-xl hover:scale-105 transition">
                    Order Now
                  </button>

                  <button onClick={()=>router.push('/meals')} className="px-8 py-3 border border-white rounded-full backdrop-blur-md hover:bg-white hover:text-black transition">
                    View Menu
                  </button>

                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}