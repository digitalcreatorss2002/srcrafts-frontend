'use client';

import { useState } from 'react';
import { CreditCard, Wallet } from 'lucide-react';

export default function PaymentMethod({
  isCodAvailable = true,
  onSelect,
  selectedMethod = null,
}) {
  const [selected, setSelected] = useState(selectedMethod);

  const handleSelect = (method) => {
    setSelected(method);
    if (onSelect) {
      onSelect(method);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
        <Wallet className='w-5 h-5' />
        Payment Method
      </h2>

      <div className='space-y-4'>
        {/* COD Option */}
        <div
          onClick={() => isCodAvailable && handleSelect('COD')}
          className={`
            border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
            ${!isCodAvailable && 'opacity-50 cursor-not-allowed'}
            ${
              selected === 'COD'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className='flex items-start gap-4'>
            <div
              className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1
              ${selected === 'COD' ? 'border-blue-600' : 'border-gray-300'}
            `}
            >
              {selected === 'COD' && (
                <div className='w-3 h-3 rounded-full bg-blue-600'></div>
              )}
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                <Wallet className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-900'>
                  Cash on Delivery (COD)
                </h3>
              </div>
              <p className='text-sm text-gray-600'>
                Pay with cash when your order is delivered
              </p>
              {!isCodAvailable && (
                <p className='text-sm text-orange-600 mt-2 font-medium'>
                  ⚠️ COD not available for some items in your cart
                </p>
              )}
              <p className='text-sm text-gray-500 mt-2'>
                Additional ₹60 COD charges will apply per vendor
              </p>
            </div>
          </div>
        </div>

        {/* Online Payment Option */}
        <div
          onClick={() => handleSelect('ONLINE')}
          className={`
            border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
            ${
              selected === 'ONLINE'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className='flex items-start gap-4'>
            <div
              className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1
              ${selected === 'ONLINE' ? 'border-blue-600' : 'border-gray-300'}
            `}
            >
              {selected === 'ONLINE' && (
                <div className='w-3 h-3 rounded-full bg-blue-600'></div>
              )}
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                <CreditCard className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-900'>Pay Online</h3>
              </div>
              <p className='text-sm text-gray-600 mb-2'>
                Pay securely using Credit/Debit Card, Net Banking, UPI, or
                Wallets
              </p>
              <div className='flex gap-2 mt-2'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
                  alt='Visa'
                  className='h-6'
                />
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
                  alt='Mastercard'
                  className='h-6'
                />
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg'
                  alt='UPI'
                  className='h-6'
                />
              </div>
              <p className='text-sm text-green-600 mt-2 font-medium'>
                ✓ Save ₹60 COD charges per vendor
              </p>
            </div>
          </div>
        </div>
      </div>

      {!selected && (
        <p className='text-sm text-orange-600 mt-4'>
          Please select a payment method to continue
        </p>
      )}
    </div>
  );
}
