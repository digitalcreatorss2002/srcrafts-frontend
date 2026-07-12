import React from 'react'

function ButtonPrimary({children, onClick=null, disabled=false, className=''}) {
  return (
    <button className={`
          w-full 
          /* Gradient: Base (brand-secondary) -> Darker Gold -> Highlight */
          bg-linear-to-tr from-brand-secondary via-brand-secondary/80 to-brand-secondary
          hover:bg-brand-secondary 
          
          bg-size[200%_auto] 
          hover:text-black
          text-brand-primary 
          py-2.5 
          md:text-base
          text-xs
          font-bold 
          tracking-widest 
          rounded-md 
          shadow-[0_4px_15px_rgba(217,170,66,0.3)]
          
          /* Micro-interactions */
          transition-all duration-500 ease-out

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

export default ButtonPrimary
