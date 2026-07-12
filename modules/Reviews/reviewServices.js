import { apiClient } from "@/utils/api";

// module/review/reviewService.js
export const reviewService = {
    submitNewReview: async (payload) => {
      const formattedData = {
        name: payload.name,
        email: payload.email,
        product: payload.product,
        ratings: String(payload.ratings),
        message: payload.message,
        // We merge images and video into a single media array for the [String] backend field
        media: [
          ...(payload.images || []), // Spread the array of image strings
        ],
        video:[
          ...(payload.video ? [payload.video] : []) // Add video if it exists
        ]

      };
      
      return await apiClient.post('/api/reviews', formattedData);
    },
    getReviewsBySlug: async (slug) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/reviews/product-slug/${slug}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
    

};

