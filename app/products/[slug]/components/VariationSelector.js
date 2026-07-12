"use client";
import { useDispatch, useSelector } from 'react-redux';
import { updateOption } from '@/modules/products/state/productSlice'
import { cn } from '@/utils/cn';

const VariationSelector = () => {
  const dispatch = useDispatch();
  const { currentProduct, selectedOptions } = useSelector((state) => state.product);

  if (!currentProduct?.variation_attrs?.length) return null;

  return (
    <div className="space-y-2 my-4">
      {currentProduct.variation_attrs.map((attr) => (
        <div key={attr._id}>
          <span className="text-sm font-semibold text-slate-700 block mb-2">
            {attr.label}
          </span>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((opt) => {
              const isSelected = selectedOptions[attr.label] === opt.value;
              return (
                <button
                  key={opt._id}
                  onClick={() => dispatch(updateOption({ label: attr.label, value: opt.value }))}
                  className={cn(
                    "px-4 py-2 text-sm rounded-md border transition-all",
                    isSelected
                      ? "border-brand-primary bg-brand-secondary/20 text-brand-primary font-medium ring-1 ring-brand-primary"
                      : "border-brand-primary/40 text-brand-primary/50 hover:border-brand-primary"
                  )}
                >
                  {opt.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariationSelector;