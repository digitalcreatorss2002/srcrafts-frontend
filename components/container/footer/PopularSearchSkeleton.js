// components/ui/Skeleton.js
import { cn } from "@/lib/utils"; // Standard Tailwind merge utility

export default function popularSearchSkeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/10", 
        className
      )}
      {...props}
    />
  );
}2