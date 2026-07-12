'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, User, Phone, Mail } from 'lucide-react';

const addressSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  address_1: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pin: z.string().regex(/^\d{6}$/, 'PIN must be 6 digits'),
  landmark: z.string().optional(),
});

export default function AddressForm({ onSubmit, initialData = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <User className='w-5 h-5' />
          Contact Information
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Name */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Full Name *
            </label>
            <input
              {...register('name')}
              type='text'
              id='name'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your full name'
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Email Address *
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                {...register('email')}
                type='email'
                id='email'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='your@email.com'
              />
            </div>
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Phone Number *
            </label>
            <div className='relative'>
              <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                {...register('phone')}
                type='tel'
                id='phone'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='10-digit mobile number'
              />
            </div>
            {errors.phone && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <MapPin className='w-5 h-5' />
          Delivery Address
        </h2>

        <div className='space-y-6'>
          {/* Address */}
          <div>
            <label
              htmlFor='address_1'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Address Line 1 *
            </label>
            <input
              {...register('address_1')}
              type='text'
              id='address_1'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='House/Flat No, Building Name, Street'
            />
            {errors.address_1 && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.address_1.message}
              </p>
            )}
          </div>

          {/* Landmark */}
          <div>
            <label
              htmlFor='landmark'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Landmark (Optional)
            </label>
            <input
              {...register('landmark')}
              type='text'
              id='landmark'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Nearby landmark'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* City */}
            <div>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                City *
              </label>
              <input
                {...register('city')}
                type='text'
                id='city'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='City'
              />
              {errors.city && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label
                htmlFor='state'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                State *
              </label>
              <input
                {...register('state')}
                type='text'
                id='state'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='State'
              />
              {errors.state && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* PIN */}
            <div>
              <label
                htmlFor='pin'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                PIN Code *
              </label>
              <input
                {...register('pin')}
                type='text'
                id='pin'
                maxLength={6}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='6-digit PIN'
              />
              {errors.pin && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.pin.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
      >
        {isSubmitting ? 'Processing...' : 'Continue to Payment'}
      </button>
    </form>
  );
}
