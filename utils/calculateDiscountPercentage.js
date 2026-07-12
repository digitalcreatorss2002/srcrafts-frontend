export default function calculateDiscountPercentage(regularPrice, salePrice)  {
    if (regularPrice > 0 && salePrice < regularPrice) {
      const discount = regularPrice - salePrice;
      return Math.round((discount / regularPrice) * 100);
    }
    return 0;
  };