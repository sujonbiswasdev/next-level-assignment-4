"use client";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

type TopProviderItem = {
  id: string;
  restaurantName: string;
  ownerName: string;
  email: string;
  address: string;
  description: string;
  image: string;
  totalReviews: number;
  avgRating: number;
};

export default function TestimonialSection({
  testomonialdata,
}: {
  testomonialdata: TopProviderItem[];
}) {
  // Star rating renderer
  const renderStars = (avg: number) => {
    const fullStars = Math.floor(Number(avg));
    const hasHalfStar = Number(avg) % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return (
              <Star key={i + "full"} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-label="Full star" />
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf key={i + "half"} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-label="Half star" />
            );
          }
          return (
            <Star key={i + "empty"} className="w-5 h-5 text-gray-300" aria-label="Empty star" />
          );
        })}
      </div>
    );
  };

  return (
    <section className="w-full py-14 md:py-20 px-2 sm:px-4 md:px-10 xl:px-0 bg-gradient-to-br from-white via-[#f8fafc] to-[#FFFAF0]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold mb-4 text-center text-gray-900">
          Meet the <span className="text-yellow-500">Top Providers</span>
        </h2>
        <p className="text-center text-gray-500 mb-10 md:mb-14 text-base md:text-lg max-w-2xl mx-auto">
          Discover the best-rated restaurants, trusted for flavor and excellence.
        </p>
        <Marquee>
          <div className="max-w-[1340px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-10">
            {testomonialdata.map((item) => {
              const avgRating = item.avgRating ?? 0;
              const totalReviews = item.totalReviews ?? 0;
              return (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-200 group flex flex-col min-h-[320px] md:min-h-[320px] xl:min-h-[320px] max-w-[250px] md:max-w-[300px] lg:max-w-[400px] overflow-hidden"
                >
                  {/* Profile & Header */}
                  <div className="flex items-center gap-3 mb-2 px-5 pt-5">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                      <Link href={`/providers/${item.id}`}>
                        <Image
                          src={item.image ?? "/placeholder-user.jpg"}
                          alt={item.restaurantName ?? "Provider"}
                          fill
                          className="rounded-full object-cover border-4 border-yellow-100 shadow-md"
                          sizes="56px"
                        />
                      </Link>
                      <span className="absolute bottom-0 right-0 bg-yellow-400 w-[12px] h-[12px] md:w-3 md:h-3 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-base md:text-lg text-gray-900">{item.restaurantName}</h3>
                      <span className="text-gray-400 text-xs md:text-sm font-medium">{item.address}</span>
                    </div>
                  </div>
                  {/* Description, positioned closely without taking too much vertical space */}
                  <div className="flex-1 flex flex-col justify-start px-5 pb-3">
                    <p className="text-gray-700 text-sm leading-tight font-normal mb-1 line-clamp-2">{item.description}</p>
                    <div className="flex-grow" />
                    {/* Ratings and View Button row, aligned to bottom */}
                    <div className="flex flex-wrap space-x-2 space-y-2 items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        {renderStars(avgRating)}
                        <span className="text-gray-900 font-semibold text-sm pl-1">{Number(avgRating).toFixed(1)}</span>
                        <span className="text-gray-400 text-xs">({totalReviews} reviews)</span>
                      </div>
                      <Link
                        href={`/providers/${item.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-xs px-4 py-1.5 rounded-lg shadow-md transition-transform duration-150 border border-yellow-300 hover:-translate-y-0.5 outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        View
                      </Link>
                    </div>
                  </div>

                  {/* Decorative accent */}
                  <div className="absolute -right-8 -bottom-8 opacity-0 group-hover:opacity-20 pointer-events-none transition-all duration-500">
                    <svg width="90" height="90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="35" fill="#FDE68A" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
