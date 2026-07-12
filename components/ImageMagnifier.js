"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function ImageMagnifier({
  src,
  zoomLevel = 2.5,
  isEnabled = true,
}) {
  const containerRef = useRef(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isEnabled || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate percentage position (0% to 100%)
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    // Boundary check
    setCursorPosition({ x: e.pageX - left - window.scrollX, y: e.pageY - top - window.scrollY });
    setPosition({ x, y });
  };

  return (
    <div className="relative flex flex-col md:flex-row gap-4 w-full h-full">
      {/* 1. Main Image Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-[400px] md:h-[590px] bg-white cursor-crosshair overflow-hidden",
          !isEnabled && "cursor-default"
        )}
        onMouseEnter={() => isEnabled && setShowMagnifier(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        <Image
          src={src}
          alt="Product base"
          fill
          unoptimized
          className="object-contain" // Keeps original aspect ratio
        />

        {/* --- Highlight Box (The Lens) --- */}
        {isEnabled && showMagnifier && (
          <div
            className="absolute border border-brand-secondary bg-brand-secondary/5 pointer-events-none hidden md:content"
            style={{
              width: `${100 / zoomLevel}%`,
              height: `${100 / zoomLevel}%`,
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%)`,
            }}
          />
        )}
      </div>

      {/* 2. Side Zoom Panel: Shows Original High-Res Image */}
      {isEnabled && showMagnifier && (
        <div 
          className="hidden lg:block absolute left-[102%] top-0 w-full h-full z-50 overflow-hidden  border shadow-2xl rounded-xl"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${src}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoomLevel * 100}%`, // Zoom relative to container
              backgroundPosition: `${position.x}% ${position.y}%`, // Precise mapping
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}
    </div>
  );
}