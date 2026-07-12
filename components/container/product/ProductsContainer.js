"use client";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "@/redux/products/productSlice";
import ProductCard from "../../ProductCard";

export default function ProductsContainer() {
  const dispatch = useDispatch()
  const {products , loading, error } = useSelector((state)=>(state.products))
  
  useEffect(()=>{
    dispatch(fetchProductsRequest());
  },[dispatch]);

  console.log(products);

  if(loading) return <p className="text-center py-10 text-xl font-medium">Loading products...</p>;
  if (error) return <p className="text-center py-10 text-xl text-red-600">Error: {error}</p>;
  
  // Ensure we are accessing the correct array structure (products.products)
  const productList = products?.products || [];

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-6 
        sm:gap-8
      ">
        {
          productList.length === 0 ? (
            <div className="col-span-full text-center py-10 text-lg text-gray-500">
              <p>No products found!!</p>
            </div>
          ) : (
            productList.map((product,index)=>(
              <ProductCard 
                // Use the correct product ID for the key if available, otherwise use index
                key={product?._id || index} 
                product={product}
              />
            ))
          )
        } 
      </div>
    </div>
  );
}