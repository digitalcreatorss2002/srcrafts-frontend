export default function ProductSummary({ product }) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900">
          {product.name}
        </h1>
  
        <div className="flex items-center gap-4">
          <span className="text-rose-600 text-xl font-bold">
            ₹{product.sale_price}
          </span>
          <span className="line-through text-slate-400">
            ₹{product.regular_price}
          </span>
        </div>
  
        <p
          className="text-slate-600 text-sm"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    );
  }
  