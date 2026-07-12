// conct default revaidate time 3600 i.e 1 hour
import { apiFetcher } from "./fetcher";

export async function getInitialHomePageData(page = 1, limit = 12)
{
    try {
        const homepageData = await apiFetcher(`/api/homepages`,{
            next:{revalidate:6},
        });

        // const productsData = await apiFetcher(`/api/products?pageNumber=${page}`,{
        //     next:{revalidate:60},
        // })
        // console.log(productsData);
        return {
            homepageData,
            initialPage: page,
        };
    } catch (error) {
        // Catch fetcher errors and handle graceful degradation for the Home Page
        console.error("Failed to load initial data for Home Page:", error.message);
        
        // Return a default, empty state to ensure the page doesn't crash (Graceful Degradation)
        return {
          categories: [],
          initialProducts: [],
          initialPage: 1,
          hasMore: false,
        };
      }
}