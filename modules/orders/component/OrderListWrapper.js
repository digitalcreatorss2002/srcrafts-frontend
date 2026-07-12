// modules/orders/component/OrderListWrapper.tsx
import { OrderService } from "@/modules/orders/OrderService";
import { OrderCard } from "@/modules/orders/component/OrderCard";

export default async function OrderListWrapper() {
  // Logic resides in Service, fetched here in the Server Component
  const orderData = await OrderService.getAllOrders();
  const orders = orderData?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">📦</div>
        <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">No orders in queue</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
         <span className="bg-brand-primary text-white px-3 py-1 rounded text-sm font-bold">
           Active: {orders.length}
         </span>
      </div>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </>
  );
}