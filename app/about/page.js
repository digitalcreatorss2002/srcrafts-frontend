import Image from 'next/image';

export default function AboutPage() {
    const SRCC_INTERVENTIONS = [
        { title: "Market Facilitation", desc: "Direct access to national and international markets, bypassing traditional barriers." },
        { title: "Eliminating Middlemen", desc: "Direct connections ensure artisans retain maximum profit and fair wages." },
        { title: "Design Innovation", desc: "Blending contemporary trends with traditional Indian craftsmanship." },
        { title: "Capacity Building", desc: "Professional training in business and production management." },
        { title: "Resource Support", desc: "Access to quality raw materials and modern infrastructure." },
        { title: "Financial Inclusion", desc: "Facilitating credit access to help artisans scale their operations." },
        { title: "Policy Advocacy", desc: "Engaging with regulatory bodies to create a supportive craft ecosystem." }
      ];
  return (
    <div className="bg-white text-[var(--color-brand-primary)]">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[var(--color-brand-primary)]">
        <Image 
          src="/image/banner.png" 
          alt="Indian Handicrafts" 
          fill 
          priority
          className="object-cover opacity-40" 
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tighter">
            SR Crafts Creations
          </h1>
          <div className="h-1 w-24 bg-[var(--color-brand-secondary)] mx-auto"></div>
          <p className="mt-6 text-xl text-stone-200 max-w-2xl mx-auto italic">
            "Empowering artisans, preserving heritage, and building sustainable livelihoods."
          </p>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold text-[var(--color-brand-secondary)] uppercase tracking-[0.3em] mb-4">Established 2024</h2>
          <p className="text-lg leading-relaxed text-stone-700">
            SR Crafts Creations Pvt. Ltd. (SRCC) is a pioneering entity in the Indian handicrafts sector. 
            Supported by the <span className="font-semibold text-[var(--color-brand-primary)]">Sustainable Development Foundation</span>, 
            we explore commercially sustainable models for livelihood generation through policy advocacy, 
            innovative design, and direct market access.
          </p>
        </div>
      </section>

      {/* 3. INDUSTRY SITUATION & INTERVENTIONS */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-[var(--color-brand-accent)] inline-block">
                The Indian Handicraft Sector
              </h2>
              <p className="text-stone-600 mb-6">
                Despite being a vital part of the Indian economy, millions of artisans face middlemen exploitation, 
                lack of modern design, and financial constraints. SRCC is uniquely positioned to bridge these gaps.
              </p>
              <div className="bg-[var(--color-brand-primary)] p-8 rounded-tr-[50px] text-white">
                <h3 className="text-[var(--color-brand-secondary)] font-bold mb-4 uppercase">Key Challenges We Address:</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Market Access & Middlemen Exploitation</li>
                  <li>• Lack of Modern Design & Infrastructure</li>
                  <li>• Inadequate Training & Financial Constraints</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {SRCC_INTERVENTIONS.map((item, index) => (
                <div key={index} className="p-6 bg-white border-t-4 border-[var(--color-brand-secondary)] shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold mb-2 text-[var(--color-brand-primary)]">{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOARD OF DIRECTORS */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-16">Our Board of Director</h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 aspect-[3/4] relative rounded-lg overflow-hidden border-8 border-stone-100 shadow-xl">
            <Image 
              src="/image/Director.png" 
              alt="Mr. Sabyasachi Routray" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-3xl font-bold text-[var(--color-brand-primary)]">Mr. Sabyasachi Routray</h3>
            <p className="text-[var(--color-brand-secondary)] font-semibold uppercase tracking-widest text-sm mb-6">Managing Director</p>
            <p className="text-stone-600 leading-relaxed mb-4">
              A visionary leader with a profound commitment to India's handicraft development. Mr. Routray brings 
              wealth of experience in social work and rural development, steering SRCC towards its mission 
              of artisan empowerment.
            </p>
            <p className="text-stone-600 leading-relaxed italic">
              "Under his guidance, SRCC has successfully implemented initiatives in policy advocacy, 
              crafts-based entrepreneurship, and capacity building, ensuring impactful and sustainable interventions."
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}