import Image from "next/image";

const features = [
  { icon: "/icons/delivery-icon.png", title: "Free Shipping" },
  { icon: "/icons/protection-icon.png", title: "100% Purchase Protection" },
  { icon: "/icons/payment.png", title: "Secure Payment" },
  { icon: "/icons/quality.png", title: "Assured Quality" },
  { icon: "/icons/handcrafted.png", title: "Handcrafted Products" },
  { icon: "/icons/price.png", title: "Best Price Promise" },
];

export default function FeaturesSection() {
  return (
    // Background changed to light slate-100, and border-t added for definition
    <section className="bg-slate-100 py-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center text-slate-700">
          {features.map((item, index) => (
            // Feature card with hover effect for visual feedback
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-3 rounded-lg transition duration-300 hover:bg-white hover:shadow-lg"
            >
              <div className="w-12 h-12 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  // Removed brightness-200 to use original icon colors, or you can use an overlay class if needed
                  className="object-contain"
                />
              </div>
              {/* Text color changed to rose-600 for high visibility/accent */}
              <p className="text-sm sm:text-base font-medium text-rose-600">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}