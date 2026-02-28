'use client'
import { Category } from "@/types/category";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FoodCategories({categories}:{categories:Category[]}) {
    const router=useRouter()
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Explore Our Categories
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover the best restaurants and dishes carefully selected to satisfy your cravings.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((category,index:number) => (
            <div
            onClick={()=>router.push(`/category/${category.id}`)}
              key={index}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-40">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-orange-600 transition">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}