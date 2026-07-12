"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000/api";

/**
 * Fetches the current cart. 
 * Supports both logged-in users (via JWT) and guests (via Cookie ID).
 */
export async function getCartDataAction() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("token")?.value;
  const guestId = cookieStore.get("guest_id")?.value;

  try {
    const response = await fetch(`${API_BASE_URL}/carts/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Pass JWT if logged in, or Guest ID if not
        Authorization: authToken ? `Bearer ${authToken}` : "",
        "X-Guest-ID": guestId || "",
      },
      // Ensure we get fresh data every time for the cart
      cache: "no-store",
    });

    if (!response.ok) return { items: [], subtotal: 0, total: 0 };

    return await response.json();
  } catch (error) {
    console.error("Cart Fetch Error:", error);
    return { items: [], subtotal: 0, total: 0, error: "Failed to load cart" };
  }
}

/**
 * Syncs local Redux state changes to the Backend.
 */
export async function updateRemoteCartAction(items) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;
    const guestId = cookieStore.get("guest_id")?.value || null;
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
          "X-Guest-ID": guestId || "",
        },
        body: JSON.stringify({ items }),
        cache: "no-store",
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Next.js: Ensure the Navbar/Cart Page refreshes its Server Components
        revalidatePath("/","layout");
        return { success: true, data: result };
      }
      
      return { success: false, message: result.message };
    } catch (error) {
      return { success: false, message: "Server unreachable" };
    }
  }