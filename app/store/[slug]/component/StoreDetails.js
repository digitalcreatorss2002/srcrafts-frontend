import Image from "next/image";
import { notFound } from "next/navigation";
import ProductList from "./ProductList";
import { getImageUrl } from "@/utils/helperFunction";
import Section from "@/components/container/genericContainer/Section";
import VendorHtmlRenderer from "./VendorHTMLRender"; // Import the isolated renderer

async function getStoreData(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5058/api";
  try {
    const res = await fetch(`${baseUrl}/vendors/store/${slug}?page=1&limit=8`, {
      next: { revalidate: 1 } 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function StoreDetails({ paramsPromise }) {
  const { slug } = await paramsPromise;
  if (!slug) notFound();

  const data = await getStoreData(slug);
  if (!data || !data.success) notFound();
  console.log(data);
  const { vendor_detail, products, pagination } = data;
  const { vendor } = vendor_detail;

  return (
    <div >

      {/* 2. Description Section: The Isolated Template */}
      <Section>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 ">
            <div className="relative h-32 w-32 md:h-35 md:w-35  overflow-hidden flex items-center justify-center p-2 ">
              <Image
                src={getImageUrl(vendor.store_logo)}
                alt={vendor.store_name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-brand-primary">
                {vendor.store_name}
              </h1>
              <p className="text-gray-500 mt-1 font-medium italic">
                {vendor_detail.email}
              </p>
              <div className="mt-4 flex gap-2 justify-center md:justify-start">

                <span className="px-3 py-1 bg-brand-accent text-brand-primary text-xs font-bold rounded-full">
                  {vendor.vendor_type}
                </span>
              </div>
            </div>
          </div>
        <div className="">
          {/* Custom HTML Renderer with CSS Isolation */}
          <VendorHtmlRenderer htmlContent={vendor.store_description} />
        </div>
      </Section>

      {/* 3. Products Section */}
      <Section>
        <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-400">
          <div>
            <h2 className="text-md md:text-2xl font-bold text-brand-primary">Store Collection</h2>
            <p className="text-gray-500 text-sm">Exclusive products from {vendor.store_name}</p>
          </div>
          <span className="text-sm font-semibold px-3 py-1">
            {pagination.total} Items
          </span>
        </div>
        <ProductList 
          initialProducts={products} 
          initialHasMore={pagination?.hasMore}
          slug={slug}
        />
      </Section>
    </div>
  );
}