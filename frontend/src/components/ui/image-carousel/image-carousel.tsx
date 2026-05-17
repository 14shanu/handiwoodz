"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { StrapiMedia } from "@/lib/types";

interface ImageCarouselProps {
  images: StrapiMedia[];
  alt: string;
  sizes?: string;
  className?: string;
  interval?: number;
}

export default function ImageCarousel({
  images,
  alt,
  sizes = "100vw",
  className = "",
  interval = 4000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const validImages = images.filter((img) => img?.url).slice(0, 4);

  const next = useCallback(() => {
    if (validImages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  useEffect(() => {
    if (isPaused || validImages.length <= 1) return;

    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [isPaused, next, interval, validImages.length]);

  if (validImages.length === 0) {
    return <div className={`w-full h-full bg-surface-container-high ${className}`} />;
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {validImages.map((image, index) => (
        <Image
          key={image.id}
          src={image.url}
          alt={`${alt} ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes={sizes}
          priority={index === 0}
        />
      ))}

      {/* Dots indicator */}
      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {validImages.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-3" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
