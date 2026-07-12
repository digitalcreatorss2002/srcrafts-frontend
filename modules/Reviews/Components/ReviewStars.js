"use client";

import { useId } from "react";

/**
 * StarIcon: Optimized for E-craft
 * Now supports dynamic stroke, color, and thickness.
 */
function StarIcon({ 
  fill, 
  size, 
  strokeWidth = 0.5, // Defaulting to your previous value
  strokeColor = "#D1D5DB" 
}) {
  const id = useId();
  const gradientId = `star-grad-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform hover:scale-110"
    >
      <defs>
        <linearGradient id={gradientId}>
          {/* Using E-craft secondary (#daac47) for the filled portion */}
          <stop offset={`${fill * 100}%`} stopColor="#daac47" />
          <stop offset={`${fill * 100}%`} stopColor="#E5E7EB" />
        </linearGradient>
      </defs>

      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={`url(#${gradientId})`}
        // Apply the dynamic stroke and color here
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReviewStars({
  rating = 0,
  size = 20,
  count = 0,
  showLabel = true,
}) {
  const safeRating = Math.min(Math.max(rating, 0), 5);

  const stars = Array.from({ length: 5 }, (_, i) =>
    Math.min(Math.max(safeRating - i, 0), 1)
  );

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`Rated ${safeRating} out of 5 stars`}
      >
        {stars.map((fill, index) => (
          <StarIcon 
            key={index} 
            fill={fill} 
            size={size} 
            // 1.5 is the "Sweet Spot" for luxury e-commerce strokes
            strokeWidth={0.5} 
            // 2. Using your E-craft Primary for the outline depth
            strokeColor="#051f20" 
          />
        ))}
      </div>

      {showLabel && (
        <div className="flex items-center text-sm font-medium text-[--color-brand-primary]">
          <span className="font-bold">{safeRating.toFixed(1)}</span>
          {count > 0 && (
            <>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-500 hover:text-[--color-brand-secondary] transition-colors cursor-pointer underline underline-offset-4">
                {count.toLocaleString()} artisan reviews
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}