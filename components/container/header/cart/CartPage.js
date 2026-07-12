// // app/cart/page.js
// import CartItem from '@/components/cart/CartItem';
// import { getCartDataAction } from '@/lib/actions'; // Fetch from Express

// export default async function CartPage() {
//   const cartData = await getCartDataAction(); // Server-side fetch

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
//         <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
//         {cartData.items.map(item => (
//           <CartItem key={item.variantId} item={item} />
//         ))}
//       </div>
      
//       {/* Sidebar Summary - Static HTML initially */}
//       <div className="bg-gray-50 rounded-xl p-6 h-fit sticky top-24">
//         <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//         <div className="space-y-3 border-b pb-4">
//           <div className="flex justify-between text-gray-600">
//             <span>Subtotal</span>
//             <span>${cartData.subtotal}</span>
//           </div>
//           <div className="flex justify-between text-gray-600">
//             <span>Shipping</span>
//             <span>{cartData.shipping === 0 ? 'FREE' : `$${cartData.shipping}`}</span>
//           </div>
//         </div>
//         <div className="flex justify-between font-bold text-lg mt-4">
//           <span>Total</span>
//           <span className="text-indigo-600">${cartData.total}</span>
//         </div>
//         <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }