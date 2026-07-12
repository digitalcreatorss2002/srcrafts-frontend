// modules/menu/menuService.js
export const getMenuData = async (slug) => {
  const uri = process.env.NEXT_PUBLIC_API_URI;
  
  // 1. Safety Check: If URI is missing, don't even try to fetch
  if (!uri) {
    console.warn(" NEXT_PUBLIC_API_URI is not defined. Using fallback menu.");
    return { items: [] };
  }

  try {
    const res = await fetch(`${uri}/api/menus/slug/${slug}`, {
      next: { revalidate: 100 },
      // 2. Add a signal timeout to prevent the build from hanging forever
      signal: AbortSignal.timeout(5000), 
    });

    if (!res.ok) {
      console.error(` Menu Fetch Failed: ${res.status} ${res.statusText}`);
      return { items: [] }; // Return empty structure instead of throwing
    }

    return await res.json();
  } catch (error) {
    // 3. Centralized Error Logging (SOLID: Single Responsibility)
    console.error(` Network Error fetching menu (${slug}):`, error.message);
    
    // Crucial for Build: Return a default object so the component can still render
    return { items: [] }; 
  }
};