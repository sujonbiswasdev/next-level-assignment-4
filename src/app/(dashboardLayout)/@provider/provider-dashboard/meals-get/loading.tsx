"use client";

export default function MealLoading() {
  return (
    <div className="group relative w-[350px] rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
          alt="meal"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">

          {/* Hover Button */}
          <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-4 py-2 rounded-lg font-semibold">
            View Details
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">sdfsfsdf</h3>
        <p className="text-gray-500 text-sm">sdfsdf...</p>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">sdf • HALAL</span>
          <span className="text-orange-500 font-bold">$252.00</span>
        </div>
      </div>
    </div>
  );
}