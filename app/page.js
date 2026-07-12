// import AddtoCart from "./ProductPage/AddtoCartPage/AddToCart/page";
import CategoriesSlider from "@/components/CategoriesSlider"
import ProductsContainer from "@/components/container/product/ProductsContainer";
import CollectionContainer from "@/components/container/collection/CollectionContainer";
import { getInitialHomePageData } from "@/lib/data";
import CategorySliderWrapper from "@/components/container/categories/CategorySliderWrapper";
import Section from "@/components/container/genericContainer/Section";
import InfinityLoader from "@/components/InfinityLoader";
import ProductCollectionComponent from "@/components/container/HomePage/productCollection/ProductCollectionComponent";
import CollectionGridComponent from "@/components/container/HomePage/CollectionGridSlider/CollectionGridComponent";
import TextComponent from "@/components/container/HomePage/TextComponent";
import GalleryComponent from "@/components/container/HomePage/GalleryComponent";
import ImageComponent from "@/components/container/HomePage/ImageComponent";
import Banner from "@/components/container/HomePage/Banner";
import { CollectionSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
export default async function Home() {

  const data = await getInitialHomePageData();
  const components = await data.homepageData.homepageNew || []
  const renderComponent = (component) => {
    switch (component.display_type) {
      case 'COLLECTION PRODUCTS':
        return (
          <ProductCollectionComponent key={component._id} {...component} />
        );
      case 'COLLECTION':
        return <Suspense fallback={<CollectionSkeleton/>}><CollectionGridComponent key={component?._id} {...component} /></Suspense>
      case 'SLIDER':
        return <div className="md:p-2"><Banner key={component._id} data={component.slider_component} title={component.title} description={component.description} /></div>;
      case 'GALLERY':
        return <GalleryComponent key={component._id} {...component} />;
      case 'IMAGE':
        return <ImageComponent key={component._id} {...component} />;
      case 'TEXT':
        return <TextComponent key={component._id} {...component} />;
      default:
        return null;
    }
  };
  if (components == null || components.length === 0) {
    return (
      <div className=''>
        <Section className="flex items-end justify-center">
          <InfinityLoader className=""/>
        </Section>
      </div>
    );
  }
  return (
    <div className=''> 
      {
        components?.map((component)=>(
          <section key={component._id}
            className={`homepage-component`}>
              {renderComponent(component)}
          </section>
        ))
      }
    </div>
  );
}

