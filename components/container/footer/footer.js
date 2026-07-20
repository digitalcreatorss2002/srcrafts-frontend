import Link from "next/link";
import PopularSearches from "./PopularSearches";
import { getMenuData } from "@/modules/menu/menuService";
import { 
  Facebook, Twitter, Linkedin, Instagram, Youtube, 
  Mail, Phone, MapPin, Truck, ShieldCheck, 
  HandHeart, BadgePercent, CreditCard, Lock, ArrowRight
} from "lucide-react";
import Image from "next/image";
import WhatsApp from "./Whatsapp";
import { Suspense } from "react";

const SmartLink = ({ item, className }) => {
  if (item.url && item.url !== "") {
    return (
      <Link href={item.url} className={className}>
        {item.label}
      </Link>
    );
  }
  return <span className={className}>{item.label}</span>;
};

export default async function Footer() {
  const menuData = await getMenuData("footer_menu");
  if (!menuData || !menuData.items) return null;

  const popularSearchesItem = menuData.items.find(item => item.label === "Popular Searches");
  const gridItems = menuData.items.filter(item => item.label !== "Popular Searches");

  return (
    <div className="mt-2">
      {/* 1. TRUST BAR: Clean & Professional */}
      <section className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustBadge icon={<Truck size={28}/>} title="Express Delivery" desc="Free on ₹999+" />
          <TrustBadge icon={<ShieldCheck size={28}/>} title="Secure Checkout" desc="Safe & Encrypted" />
          <TrustBadge icon={<HandHeart size={28}/>} title="Artisan Craft" desc="100% Authentic" />
          <TrustBadge icon={<BadgePercent size={28}/>} title="Direct Pricing" desc="No Middlemen" />
        </div>
      </section>

      {/* 2. TRENDING TAGS: Floating Style */}
      {popularSearchesItem && (
        <div className="bg-white">
          <Suspense fallback={<popularSearcheSkeleton />}>
            <PopularSearches items={popularSearchesItem.children || []}/>
          </Suspense>
        </div>
      )}

      <footer className="bg-brand-primary text-white pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* 3. STATIC ROW: Brand, Socials & Contact (Seperate Section) */}
          <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-4xl font-black text-brand-secondary tracking-tighter">SR CRAFT.</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                Mastering the art of handcrafted elegance. We bridge the gap between traditional Indian artisans and your modern lifestyle.
              </p>
              <div className="flex items-center gap-3">
                <SocialIcon icon={<Facebook size={20}/>} href="#" />
                <SocialIcon icon={<Instagram size={20}/>} href="#" />
                <SocialIcon icon={<Youtube size={20}/>} href="#" />
                <SocialIcon icon={<Linkedin size={20}/>} href="#" />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-brand-secondary/50 transition-colors">
                <h4 className="text-brand-secondary text-xs font-black uppercase tracking-widest mb-6">Corporate Office</h4>
                <div className="space-y-4">
                  <ContactItem icon={<MapPin size={18}/>} content="B-9 Dwarka More, Sector-15, Dwarka, Delhi - 110059" />
                  <ContactItem icon={<Phone size={18}/>} content="+91 8882845062" />
                </div>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-brand-secondary/50 transition-colors">
                <h4 className="text-brand-secondary text-xs font-black uppercase tracking-widest mb-6">Business Inquiry</h4>
                <div className="space-y-4">
                  <ContactItem icon={<Mail size={18}/>} content="info@srcraftscreation.com" />
                  <div className="pt-2">
                    <button className="flex items-center gap-2 text-brand-secondary text-xs font-bold group">
                      VISIT HELP CENTER <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. DYNAMIC ROW: Dynamic Links from CMS */}
          <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {/* Dynamic API Menus */}
            {gridItems.map((column) => (
              <div key={column.id} className="lg:col-span-1">
                <h4 className="text-xs font-black text-brand-secondary uppercase tracking-[0.2em] mb-8 relative inline-block">
                  {column.label}
                  <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-brand-secondary"></span>
                </h4>
                {column.children && (
                  <ul className="space-y-4">
                    {column.children.map((child) => (
                      <li key={child.id}>
                        <SmartLink 
                          item={child} 
                          className="text-slate-400 hover:text-brand-secondary text-sm font-medium transition-all duration-300 hover:translate-x-1 inline-block" 
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* 5. PAYMENT & SECURITY: Ultra Clean */}
          <div className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-4 text-center md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Logistics Partnered with Safe Banking</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center opacity-80 group">
                <PaymentWrapper src="/image/upi.png" alt="UPI" />
                <PaymentWrapper src="/image/mastercard.png" alt="Mastercard" />
                <PaymentWrapper src="/image/viza.png" alt="Visa" />
                <PaymentWrapper src="/image/netbanking.png" alt="Net Banking" />
              </div>
            </div>
            <div className="flex items-center gap-3 bg-brand-accent/10 px-6 py-3 rounded-full border border-brand-accent/20">
               <Lock size={14} className="text-brand-accent" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Secure SSL Guaranteed</span>
            </div>
          </div>
        </div>

        {/* 6. BOTTOM BAR: Gold Highlight */}
        <section className="bg-brand-secondary text-brand-primary py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <p>© 2026 SR CRAFT CREATIONS. ALL RIGHTS RESERVED.</p>
            <p>Design and developed by <span className="underline decoration-2 underline-offset-4">Digital Creatorss</span></p>
          </div>
        </section>
      </footer>
      <WhatsApp/>
    </div>
  );
}

/** * UI Sub-components */

function TrustBadge({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-white rounded-2xl text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all duration-500">
        {icon}
      </div>
      <div>
        <h5 className="text-[11px] font-black text-brand-primary uppercase tracking-tight">{title}</h5>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{desc}</p>
      </div>
    </div>
  );
}

function ContactItem({ icon, content }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="text-brand-secondary/50 group-hover:text-brand-secondary transition-colors">{icon}</div>
      <p className="text-sm font-medium text-slate-300">{content}</p>
    </div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-secondary transition-all duration-500 hover:-translate-y-1">
      {icon}
    </a>
  );
}


function PaymentWrapper({ src, alt }) {
  return (
    <div className="relative w-12 h-8 md:w-14 md:h-10 transition-all duration-300 hover:scale-110">
      <Image src={src} fill alt={alt} className="object-contain" />
    </div>
  );
}


