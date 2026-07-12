import { getProductBySlug } from "@/modules/products/services/productServices";
import ProductDetailsWrapper from "../ProductDetailsWrapper";
import RelatedProducts from "./RelatedProducts";
import { reviewService } from "@/modules/Reviews/reviewServices";

export default async function ProductContent({ params }) {
    const { slug } = await params; // Standard resolution
    const data = await getProductBySlug(slug);
    const reviews = await reviewService.getReviewsBySlug(slug);
    console.log(reviews);
    if (!data || !data.product) {
      notFound();
    }
  
    const { product, relatedProducts = [] } = data;
  
    return (
      <main className="min-h-screen">
        {/* Product Details Section */}
        <ProductDetailsWrapper product={product} reviewsData={reviews}/> 
        
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className=" mx-auto">
            <RelatedProducts products={relatedProducts} />
          </section>
        )}
      </main>
    );
  }