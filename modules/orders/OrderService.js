import { cookies } from 'next/headers';

export const OrderService = {
  async getAllOrders() {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('token')?.value; 
      
      if (!token || token === 'undefined') {
        console.error("OrderService: Token missing or undefined. User might not be logged in.");
        return [];
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/orders`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("OrderService Error:", error.message);
      return [];
    }
  }
};