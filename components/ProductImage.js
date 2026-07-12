"use client"
import React, { useState, useEffect } from 'react'
import { ChevronsRight, Crosshair, Heart, XCircle, ZoomInIcon } from 'lucide-react';
import Image from 'next/image'
import { min, getImageUrl } from '../utils/helperFunction'
import ImageMagnifier from './ImageMagnifier';

function ProductImage({ images }) {
    const [selectedIndex, setSelectedIndex, isModalOpen, setIsModalOpen] = useState(0)

    // Body Scroll Lock logic
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    const visibleThumbs = 4
    const showViewMore = images.length > visibleThumbs

    return (
        <div className="h-fit lg:h-[80vh] col-span lg:col-span-6 flex flex-col sm:flex-row gap-6 bg-amber-700">
            {/* 1. Vertical Thumbnails (Desktop) */}
            <div className="hidden sm:flex flex-col gap-4 w-20 shrink-0">
                {images.slice(0, 5).map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedIndex(i)}
                        className={`w-full h-20 relative rounded-lg overflow-hidden transition-all ${
                            selectedIndex === i ? 'ring-2 ring-brand-secondary shadow-lg' : 'opacity-70 hover:opacity-100'
                        }`}
                    >
                        <Image
                            src={getImageUrl(src)}
                            alt={`thumb-${i}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                        />
                    </button>
                ))}

                {showViewMore && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-2  rounded-lg flex items-center justify-center text-[10px] text-brand-primary font-bold hover:bg-brand-secondary hover:text-white transition-all"
                    >
                        + {images.length - 5} MORE
                    </button>
                )}
            </div>

            {/* 2. Main Large Image Box */}
            <div className="relative grow rounded-xl bg-white border ">
                <ImageMagnifier src={getImageUrl(images[selectedIndex])} />
                
                {/* Floating Action Buttons */}
                <div className='absolute bottom-4 right-4 flex flex-col gap-2 z-10 '>
                    <button className=" bg-brand-primary/80 hover:bg-brand-primary text-brand-primary p-3 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-xl">
                        <Heart className='w-5 h-5'/>
                    </button>
                    <button 
                        className='bg-brand-primary/80 hover:bg-brand-primary text-white p-3 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-xl'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <ZoomInIcon className='w-5 h-5' />
                    </button>
                    <button 
                        className='bg-brand-primary/80 hover:bg-brand-primary text-white p-3 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-xl'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Crosshair className='w-5 h-5' />
                    </button>
                </div>
            </div>

            {/* 3. Horizontal Thumbs (Mobile Only) */}
            {images?.length > 1 && (
                <div className="sm:hidden flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {images.map((src, i) => (
                        <button 
                            key={i} 
                            onClick={() => setSelectedIndex(i)} 
                            className={`min-w-[70px] h-16 relative rounded-lg shrink-0 ${selectedIndex === i ? 'ring-2 ring-brand-secondary' : ''}`}
                        >
                            <Image 
                                src={getImageUrl(src)} 
                                alt={`mobile-thumb-${i}`} 
                                fill 
                                sizes="70px" 
                                className="object-cover rounded-lg"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}


        </div>
    )
}

export default ProductImage