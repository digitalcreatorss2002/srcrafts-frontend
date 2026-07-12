"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData} from '@/modules/products/state/productSlice'
import ProductImage from './components/ProductImageClient'; // Your provided component
import ProductInfo from './components/ProductInfo';
import Section from '@/components/container/genericContainer/Section';
import ReviewSection from '../../../modules/Reviews/Components/ReviewSection';
import ProductViewModal from './components/ProductViewModal';

export default function ProductDetailsWrapper({ product ,reviewsData }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { currentProduct} = useSelector(
    (state) => state.product
  );
  // Hydrate Redux Store on Mount
  useEffect(() => {
    if (product) {
      dispatch(setProductData(product));
    }
  }, [product, dispatch]);
  
  useEffect(() => {
    if (isModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => { document.body.style.overflow = 'unset'; };
}, [isModalOpen]);

  if (!product) return null;

  const displayImages = product.media || [];

  return (
    <div>
    { isModalOpen && <ProductViewModal isModalOpen={isModalOpen} images={currentProduct.media} setIsModalOpen={setIsModalOpen}/>}

    <Section >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2  lg:gap-12">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 ">
           <ProductImage  setIsModalOpen={setIsModalOpen}/>
        </div>

        {/* Right: Info & Cart */}
        <div className="lg:col-span-6">
           <ProductInfo />
        </div>
      </div>
      <section >
        {/* Reviews Integration */}
        <ReviewSection reviewsData={reviewsData}/>
      </section>
      <div>
      </div>
      {/* Bottom: Specifications */}
    </Section>
    </div>
  );
}