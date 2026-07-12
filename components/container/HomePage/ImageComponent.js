

import { getImageUrl } from "@/utils/helperFunction";
import { isVideo } from "@/utils/mediaHelper";
import Image from "next/image";
import Link from "next/link";
import Section from "../genericContainer/Section";

export default function ImageComponent({ image_component }) {
  const mediaUrl = getImageUrl(image_component?.image);
  const isVideoAsset = isVideo(image_component?.image);

  if (image_component?.image)
  return (
    <Section>
        <div
      className="group relative block  overflow-hidden w-full h-full bg-gray-100"
      aria-label={image_component.title || "Promotion Banner"}
    >
      {isVideoAsset ? (
        <video
          src={mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          /* object-cover + inset-0 ensures it fills the aspect-ratio box */
          className="absolute inset-0 w-full h-full object-fill transition-transform duration-700 "
          poster="/images/banner-placeholder.jpg"
        />
      ) : (
        <Image
          src={mediaUrl}
          alt={ "Promotion Banner"}
          fill
          
          /* object-cover maintains visual consistency without stretching */
          className="object-contain transition-transform duration-700 "
          sizes="100vw"
          quality={90} // 100 is often overkill; 90 saves bandwidth with no visible loss
          unoptimized 
        />
      )}

      {/* Optional: Overlay Gradient for Text Readability if you add titles later */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
    </Section>
  );
  return (<><Section>Nahi hn</Section> </>)

}