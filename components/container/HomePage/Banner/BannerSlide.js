import { getImageUrl } from "@/utils/helperFunction";
import { isVideo } from "@/utils/mediaHelper";
import Image from "next/image";
import Link from "next/link";

export default function BannerSlide({ slide, isPriority }) {
  const mediaUrl = getImageUrl(slide.image);
  const isVideoAsset = isVideo(slide.image);

  return (
    <Link 
      href={slide.link} 
      /* 'aspect-[16/9]' (or 21/9) ensures the height scales perfectly with width.
         'md:aspect-[21/9]' allows you to make it wider on desktop.
      */
      className="group relative block w-full overflow-hidden h-full  bg-gray-100"
      aria-label={slide.title || "Promotion Banner"}
    >
      {isVideoAsset ? (
        <div >
            <div className="flex md:hidden">
              <video
                src={getImageUrl(slide?.imageMobile)}
                autoPlay
                muted
                loop
                playsInline
                /* object-cover + inset-0 ensures it fills the aspect-ratio box */
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 "
                poster="/images/banner-placeholder.jpg"
              />
          </div>
          <div className="hidden md:flex lg:hidden">
              <video
                src={getImageUrl(slide?.imageTablet)}
                autoPlay
                muted
                loop
                playsInline
                /* object-cover + inset-0 ensures it fills the aspect-ratio box */
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 "
                poster="/images/banner-placeholder.jpg"
              />
          </div>
          <div className="hidden lg:flex">
              <video
                src={getImageUrl(slide?.image)}
                autoPlay
                muted
                loop
                playsInline
                /* object-cover + inset-0 ensures it fills the aspect-ratio box */
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                poster="/images/banner-placeholder.jpg"
              />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex md:hidden">
          <Image
          src={getImageUrl(slide?.imageMobile)}
          alt={slide.title || "Promotion Banner"}
          fill
          priority={isPriority}
          /* object-cover maintains visual consistency without stretching */
          className="object-cover transition-transform duration-700 "
          sizes="100vw"
          quality={90} // 100 is often overkill; 90 saves bandwidth with no visible loss
          unoptimized 
        />
        </div>
        <div className="hidden md:flex lg:hidden">
          <Image
          src={getImageUrl(slide?.imageTablet)}
          alt={slide.title || "Promotion Banner"}
          fill
          priority={isPriority}
          /* object-cover maintains visual consistency without stretching */
          className="object-cover transition-transform duration-700 "
          sizes="100vw"
          quality={90} // 100 is often overkill; 90 saves bandwidth with no visible loss
          unoptimized 
        />
        </div>
        <div className="hidden lg:flex">
          <Image
          src={getImageUrl(slide?.image)}
          alt={slide.title || "Promotion Banner"}
          fill
          priority={isPriority}
          /* object-cover maintains visual consistency without stretching */
          className="object-cover transition-transform duration-700 "
          sizes="100vw"
          quality={90} // 100 is often overkill; 90 saves bandwidth with no visible loss
          unoptimized 
        />
        </div>
        </div>
      )}

      {/* Premium Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 bg-gradient-to-r from-black/60 via-black/25 to-transparent text-white pointer-events-none">
        <div className="max-w-md md:max-w-xl space-y-2 md:space-y-4 animate-in fade-in slide-in-from-left-8 duration-700">
          {slide.title && (
            <h2 className="text-xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight drop-shadow-md leading-none text-brand-secondary">
              {slide.title}
            </h2>
          )}
          {(slide.description || slide.subtitle) && (
            <div 
              className="text-[10px] md:text-sm lg:text-base font-medium text-slate-100 opacity-95 max-w-lg drop-shadow-sm line-clamp-2 md:line-clamp-none"
              dangerouslySetInnerHTML={{ __html: slide.description || slide.subtitle }}
            />
          )}
          <div className="pt-2 md:pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-brand-secondary text-brand-primary text-[10px] md:text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
              Shop Collection
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
    </Link>
  );
}