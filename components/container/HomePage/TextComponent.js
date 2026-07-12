import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils/helperFunction";

export default function TextComponent({ text_component, description }) {
  const hasContent = (text_component && text_component.length > 0) || description;
  if (!hasContent) return null;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Top Level Description */}
      {description && (
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }} 
          />
        </div>
      )}

      {/* List of Image/Text Blocks */}
      <div className="space-y-16">
        {(text_component || []).map((component, index) => (
          <TextContentBlock 
            key={index} 
            data={component} 
          />
        ))}
      </div>
    </section>
  );
}

const TextContentBlock = ({ data }) => {
  const renderContent = () => (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full items-center">
      {/* Editorial Image Wrapper */}
      {data.image && (
        <div className="md:w-[48%] w-full overflow-hidden rounded-2xl shadow-md border border-gray-100/50 aspect-[4/3] relative group">
          <Image
            src={getImageUrl(data.image)}
            alt="Artisanal Heritage"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            unoptimized
          />
        </div>
      )}
      
      {/* Centered Editorial Text Block */}
      {data.content && (
        <div className="md:w-[52%] w-full flex flex-col justify-center py-4">
          <div 
            className="store-description-container prose prose-lg max-w-none text-gray-700 leading-relaxed text-[16px] md:text-[17px] space-y-5" 
            dangerouslySetInnerHTML={{ __html: data.content }} 
          />
        </div>
      )}
    </div>
  );

  if (data.link) {
    return (
      <Link href={data.link} className="group no-underline block w-full">
        {renderContent()}
      </Link>
    );
  }

  return <div className="w-full">{renderContent()}</div>;
};