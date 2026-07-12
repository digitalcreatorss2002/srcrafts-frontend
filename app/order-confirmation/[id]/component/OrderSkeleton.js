export default function OrderSkeleton() {
    return (
      <div className="min-h-screen bg-slate-50 animate-pulse">
        <div className="h-64 bg-white border-b border-slate-100 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full"></div>
          <div className="h-6 w-48 bg-slate-100 rounded"></div>
        </div>
        <div className="container mx-auto max-w-5xl px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-white rounded-2xl border border-slate-100"></div>
            <div className="h-32 bg-white rounded-2xl border border-slate-100"></div>
          </div>
          <div className="h-80 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }