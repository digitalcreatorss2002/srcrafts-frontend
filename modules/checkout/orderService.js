const API_URL = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:5000';

export const OrderService = {
  async fetchProduct(id) {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async createRazorpayOrder(amount) {
    const res = await fetch(`${API_URL}/api/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'INR' }),
    });
    if (!res.ok) throw new Error('Payment gateway error');
    return res.json();
  },

  async finalizeOrder(orderData, paymentResponse = null) {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...orderData, payment_response: paymentResponse }),
    });
    if (!res.ok) throw new Error('Order finalization failed');
    return res.json();
  }
};