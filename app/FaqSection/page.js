"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/container/footer/footer";
import Header from "@/components/container/header/Header";


export default function FAQPage() {
  const tabs = [
    "Buyer Registration",
    "Orders",
    "Payment Methods",
    "Product Category",
    "Delivery",
    "Return/Refund",
  ];
  const [activeTab, setActiveTab] = useState("Buyer Registration");
  // ---------------------------Buyer Registration-------------

  const Buyer = {
    "Buyer Registration": [
      {
        q: "1. How do I register as a buyer on the India Handmade website?",
        a: "To register, visit the India Handmade website and click on the 'Sign Up' or 'Register' option. Fill in your name, email address, contact number, and create a password to complete the registration.",
      },
      {
        q: "2. Is registration on the India Handmade website free of cost?",
        a: "Yes, registration is absolutely free. You can create an account and start browsing or purchasing products without any charges.",
      },
      {
        q: "3. Can I use my email ID to register multiple buyer accounts?",
        a: "No, each email ID can only be used for a single buyer account. This ensures the security and authenticity of your purchases and order tracking.",
      },
      {
        q: "4. What are the benefits of registering as a buyer?",
        a: "By registering, you gain access to order tracking, purchase history, personalized product recommendations, faster checkout, and exclusive offers available only to registered users.",
      },
      {
        q: "5. What should I do if I forget my login password?",
        a: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Enter your registered email address, and you will receive an email with instructions to reset your password.",
      },
      {
        q: "6. Can I change my registered email or mobile number later?",
        a: "Yes, you can update your email or mobile number anytime by visiting the 'My Account' section after logging in.",
      },
      {
        q: "7. Is my personal information safe after registration?",
        a: "Absolutely. India Handmade uses secure encryption and privacy protection measures to ensure that your personal and payment details remain completely confidential.",
      },
    ],

    // ------------Orders--------------
    Orders: [
      {
        q: "1. How can I place an order on the India Handmade website?",
        a: "Browse through the product categories and select the items you wish to purchase. Click on 'Add to Cart,' then proceed to checkout where you can enter your delivery details and payment information to place the order.",
      },
      {
        q: "2. How will I know if my order has been successfully placed?",
        a: "Once your order is confirmed, you will receive an order confirmation email and SMS containing your order number, product details, and estimated delivery date.",
      },
      {
        q: "3. Can I modify or cancel my order after placing it?",
        a: "If your order has not yet been shipped, you can modify or cancel it by visiting the 'My Orders' section or contacting our customer support team. Once shipped, modifications or cancellations will not be possible.",
      },
      {
        q: "4. How can I track the status of my order?",
        a: "You can track your order in real-time by logging into your account and navigating to 'My Orders.' Each order includes tracking details and the current status of your shipment.",
      },
      {
        q: "5. What should I do if I receive a wrong or damaged product?",
        a: "If you receive an incorrect or damaged product, please report it within 48 hours of delivery through the 'My Orders' section or contact customer support. We will arrange for a return and replacement or refund.",
      },
      {
        q: "6. Can I place bulk or custom orders through the website?",
        a: "Yes, for bulk or customized orders, please reach out to our support team via the 'Contact Us' page or email. Our team will assist you with pricing, customization, and shipping details.",
      },
      {
        q: "7. What happens if my order is delayed?",
        a: "If there is an unexpected delay, our team will notify you via email or SMS. You can also check the latest status on the 'My Orders' page. We ensure timely updates for every order.",
      },
    ],

    // ------------Payment Methods--------------
    "Payment Methods": [
      {
        q: "1. What payment options are available on the India Handmade website?",
        a: "We accept multiple payment methods including Credit Cards, Debit Cards, Net Banking, UPI, and popular Wallets. We also support Cash on Delivery (COD) for select locations.",
      },
      {
        q: "2. Is it safe to use my debit or credit card on the website?",
        a: "Yes, it is completely safe. The India Handmade website uses secure encryption technology and trusted payment gateways to ensure that all your transactions remain confidential and protected.",
      },
      {
        q: "3. Can I use international credit or debit cards for payment?",
        a: "Currently, we accept major international cards such as Visa, MasterCard, and American Express. However, international transaction acceptance depends on your bank’s policies.",
      },
      {
        q: "4. What should I do if my payment fails but the amount is deducted?",
        a: "In case your payment fails but the amount is deducted, the deducted amount will automatically be refunded to your bank account within 3–5 working days. If not, please contact our support team with your transaction details.",
      },
      {
        q: "5. Do you offer EMI or installment options for large purchases?",
        a: "Yes, EMI options are available for certain orders depending on the product value and your bank’s EMI eligibility. You can view available EMI plans on the payment page during checkout.",
      },
      {
        q: "6. Can I change my payment method after placing an order?",
        a: "No, once an order has been successfully placed, the payment method cannot be changed. You may cancel the order (if not shipped) and reorder using your preferred payment option.",
      },
      {
        q: "7. Is there a transaction fee for online payments?",
        a: "No, we do not charge any additional transaction fee for online payments. The amount displayed during checkout is the final amount you pay.",
      },
    ],

    // -----------------------------Product Category-----------------
    "Product Category": [
      {
        q: "1. What types of products are available on the India Handmade website?",
        a: "India Handmade offers a wide range of authentic handmade products, including handicrafts, handlooms, traditional artworks, jewelry, home décor, clothing, and other artisan-made goods from across India.",
      },
      {
        q: "2. Are all products on the website genuinely handmade?",
        a: "Yes, all products listed on the India Handmade website are genuinely handcrafted by skilled artisans and verified by our quality assurance team to ensure authenticity and craftsmanship.",
      },
      {
        q: "3. Do the product images shown on the website represent the actual items?",
        a: "Yes, product images are taken to represent the actual items as closely as possible. However, due to the handmade nature of products, slight variations in color, texture, or pattern may occur, which adds to their uniqueness.",
      },
      {
        q: "4. How can I find specific products or artisans?",
        a: "You can use the search bar at the top of the page or filter products by category, price, region, or artisan name to find specific items or creators easily.",
      },
      {
        q: "5. Are there any limited edition or exclusive collections available?",
        a: "Yes, from time to time, India Handmade features exclusive and limited-edition collections that highlight unique craftsmanship and regional art forms. Keep an eye on our homepage or newsletters for such updates.",
      },
      {
        q: "6. Can I request a custom or personalized product?",
        a: "Some artisans offer customization options depending on the product type. You can check the product page for customization availability or contact our support team for assistance.",
      },
      {
        q: "7. How often are new products added to the website?",
        a: "New handmade products and collections are added regularly as we continue to onboard more artisans and explore traditional crafts. Visit often to discover the latest arrivals.",
      },
    ],

    // ------------------------Delivery-----------------
    Delivery: [
      {
        q: "1. How long does it take to deliver an order after it is placed?",
        a: "Orders are usually delivered within 5–7 business days, depending on your location and the availability of the product. Rural or remote areas may take slightly longer.",
      },
      {
        q: "2. Do you deliver products across India?",
        a: "Yes, we deliver across all major cities and towns in India. Delivery coverage may vary for remote regions depending on courier service availability.",
      },
      {
        q: "3. How can I check the estimated delivery date for my order?",
        a: "You can find the estimated delivery date on the product page before checkout and also in your order confirmation email and the 'My Orders' section of your account.",
      },
      {
        q: "4. What delivery partners do you use?",
        a: "We partner with reliable and trusted courier companies to ensure safe and timely delivery of your orders. The courier partner may vary depending on your delivery location.",
      },
      {
        q: "5. Can I change my delivery address after placing the order?",
        a: "You can change your delivery address only if the order has not yet been shipped. Once dispatched, address modifications are not possible.",
      },
      {
        q: "6. Is there a delivery charge for online orders?",
        a: "Delivery is free for most products on the India Handmade website. However, minimal shipping charges may apply for certain locations or low-value orders, which will be shown during checkout.",
      },
      {
        q: "7. What should I do if my package is delayed or not delivered?",
        a: "If your package is delayed or not delivered by the expected date, please check your tracking information first. If the issue persists, contact our customer support team for immediate assistance.",
      },
    ],

    // -------------------------Return/Refund--------------------
    "Return/Refund": [
      {
        q: "1. How many days do I have to initiate a return for a product bought on the India Handmade website?",
        a: "Once you initiate the return, our team will arrange for a pickup of the product from your specified location. After pickup, our standard processing time for returns is 1–2 days.",
      },
      {
        q: "2. Are there any specific conditions or criteria for returning a product?",
        a: `"We only ask our valuable customers not to use the product and preserve its original condition, tags, packaging, and a copy of the bill received with the consignment. During pick-up, our delivery agent may check the return quality. After a successful quality inspection, a refund for the returned item will be processed."`,
      },
      {
        q: "3. Will I be eligible for a full refund if I return a product?",
        a: "Yes, you will be eligible for a full refund when returning a product in proper condition. Therefore, if you decide to return a product, we will gladly provide a full refund.",
      },
      {
        q: "4. Are there any products on the India Handmade website that are non-returnable?",
        a: "There are no products on the India Handmade website that are non-returnable. We have a customer-friendly return policy that allows returns if you are not completely satisfied.",
      },
      {
        q: "5. How long does it take to process a return and receive a refund?",
        a: "After the pickup of your product, please allow 1–2 business days to process your return and initiate the refund. Timeframes may vary depending on product type and payment method.",
      },
      {
        q: "6. Will I receive a refund in the same payment method I used for the purchase?",
        a: "Yes, your refund will be processed in the same payment method used for the initial purchase. After initiation, please allow 1–2 days for crediting to your account.",
      },
      {
        q: "7. Is the return policy the same for all categories of products on the India Handmade website?",
        a: "Yes, the return policy applies to all product categories to ensure customer satisfaction and a hassle-free return process.",
      },
    ],
  };

  // ------------------------------Return / Refund-----------------

  return (
    <div>
        <Header/>
      <div className="px-6 md:px-12 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          <Link href="/">Home</Link> &gt;{" "}
          <span className="text-black font-medium">Buyers&apos; FAQs</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Buyers&apos; FAQs
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap border border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-r border-gray-300 ${
                activeTab === tab
                  ? "bg-gray-100 text-black border-b-2 border-gray-800"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="border border-gray-300 border-t-0 p-6 mt-0 bg-white">
          {Buyer[activeTab] ? (
            <ul className="space-y-5">
              {Buyer[activeTab].map((item, i) => (
                <li key={i}>
                  <p className="font-semibold text-gray-800">{item.q}</p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              FAQs for <span className="font-medium">{activeTab}</span> will be
              added soon.
            </p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
