import { Suspense } from "react";
import StoreDetails from "./component/StoreDetails";
import StoreSkeleton from "./component/StoreSkeleton";

export default function VendorStorePage({ params }) {
  // DO NOT await params here. 
  // Passing the promise to the child component keeps this route "streaming-friendly".
  return (
    <main className=" min-h-screen">
      <Suspense fallback={<StoreSkeleton />}>
        <StoreDetails paramsPromise={params} />
      </Suspense>
    </main>
  );
}