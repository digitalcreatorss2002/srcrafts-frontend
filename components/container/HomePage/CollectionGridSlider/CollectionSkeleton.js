import Section from "@/components/container/genericContainer/Section";

export default function ProductCollectionSkeleton({
  items = 4,
  showHeading = true,
}) {
  return (
    <Section className="container mx-auto py-6 animate-pulse">
      
      {/* Heading Skeleton */}
      {showHeading && (
        <div className="flex justify-center mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded-md" />
        </div>
      )}

      {/* Collections Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 space-y-3"
          >
            {/* Image */}
            <div className="w-full h-40 bg-gray-200 rounded-lg" />

            {/* Title */}
            <div className="h-4 w-3/4 bg-gray-200 rounded" />

            {/* Subtitle / price */}
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

    </Section>
  );
}
