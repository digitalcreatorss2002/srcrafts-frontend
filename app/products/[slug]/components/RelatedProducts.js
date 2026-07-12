import ProductCard from "@/components/ProductCard";
import Section from "@/components/container/genericContainer/Section";

export default function RelatedProducts({ products }) {
  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">Related Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product,index) => (
          <ProductCard product={product} key={product.product_id || index}/>
        ))}
      </div>
    </Section>
  );
}
