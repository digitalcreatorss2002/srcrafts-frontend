// app/collections/[slug]/CollectionContent.js
import { getProductsCached } from '@/modules/collections/services/productService';
import DynamicCollection from './component/DynamicCollection';
import StaticCollection from './component/StaticCollection';


export default async function CollectionContent({ promiseParams, promiseFilters }) {
  // 1. Await dynamic data INSIDE the suspense boundary
  const { slug } = await promiseParams;
  const filters = await promiseFilters;

  // 2. Initial Fetch using the Service (Not Action)
  const initialData = await getProductsCached(slug, filters, 1);
  // console.log(initialData); // Keep the log for debugging if needed
  
    console.log(initialData);
    if(initialData.product_collection?.is_Dynamic_collection)
    {
      return <DynamicCollection initialData={initialData} filters={filters} slug={slug}/>
    }
    return <StaticCollection initialData={initialData} filters={filters}/>
  
}