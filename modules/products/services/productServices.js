export async function getProductBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/website-products/slug/${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { 
        revalidate: 3600, // ISG: Revalidate every hour
        tags: [`product-${slug}`] // Tag-based revalidation
      } 
    });

    if (!res.ok) return null;
    const data = await res.json();
    console.log(data);
    return data; // Adjust based on actual API response structure
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

