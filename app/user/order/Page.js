// app/user/order/page.tsx
import { Suspense } from "react";
import OrderListWrapper from "@/modules/orders/component/OrderListWrapper";
import OrderListSkeleton from "@/modules/orders/component/OrderListSkeleton";

export default function OrderManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl font-black text-brand-primary tracking-tighter uppercase">
          Order <span className="text-brand-secondary italic underline decoration-brand-accent">Vault</span>
        </h1>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* STRATEGY: Wrap the data-fetching component in Suspense.
            This prevents the 'Blocking Route' error.
        */}
        <Suspense fallback={<OrderListSkeleton />}>
          <OrderListWrapper />
        </Suspense>
      </main>
    </div>
  );
}