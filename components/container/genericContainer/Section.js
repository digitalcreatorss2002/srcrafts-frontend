import React from 'react'

function Section({ children, className = "" }) {
  return (
    <div className={`px-0 py-3 md:py-5 md:px-2 bg-none w-full ${className}`}>
      <div className="px-4 py-6 md:px-8 md:py-10 bg-white md:rounded-2xl shadow-sm border border-gray-100/50">
        {children}
      </div>
    </div>
  )
}

export default Section
