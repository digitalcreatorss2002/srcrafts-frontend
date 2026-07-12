import React from 'react'

export function ButtonSecondary({children, onClick, disabled, className}) {
  return (
    <button className={`
          w-full 
          /* Gradient: Base (brand-secondary) -> Darker Gold -> Highlight */
          bg-linear-to-tr from-brand-primary via-brand-primary/90 to-brand-primary 
          hover:bg-black
          bg-size[200%_auto] 
          hover:text-brand-secondary
          text-brand-secondary 
          py-2.5 
          md:text-base
          text-[8px]
          font-bold 
          tracking-widest 
          rounded-md 
          
          /* Micro-interactions */
          transition-all duration-1000 ease-out

          active:scale-[0.98]
          
          /* Flex for potential icon */
          flex items-center justify-center gap-2
          ${className}
        `}
        
        onClick={onClick}
        disabled={disabled}
        >
          
            {children}
        </button>
  )
}

