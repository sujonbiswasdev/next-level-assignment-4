"use client";

import Image from "next/image";
import { useState } from "react";

export default function AdvancedImageSkeleton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group">
      {/* Skeleton Loader */}
      {loading && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm">
          Image not available
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        className={`object-cover transition-all duration-700 ease-in-out ${
          loading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        } group-hover:scale-110`}
      />

      {/* Gradient Overlay (Premium Look) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
    </div>
  );
}
