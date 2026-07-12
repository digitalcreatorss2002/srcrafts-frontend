import { Suspense } from 'react';
import OrderConfirmationClient from './component/OrderConfirmationClient';
import OrderSkeleton from './component/OrderSkeleton';


export default async function Page({ params }) {
  // We pass the promise directly to the client component. 
  // The 'use' hook in the client will handle the resolution.
  return (
    <Suspense fallback={<OrderSkeleton />}>
      <OrderConfirmationClient params={params} />
    </Suspense>
  );
}