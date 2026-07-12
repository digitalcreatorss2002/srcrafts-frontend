"use client";
import React, { useEffect, useRef } from 'react';

/**
 * SOLID: Single Responsibility
 * Fix: Added Base CSS injection to ensure images and layouts are responsive 
 * within the isolated Shadow DOM.
 */
const VendorHtmlRenderer = ({ htmlContent }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && htmlContent) {
      const shadowRoot = containerRef.current.shadowRoot || 
                         containerRef.current.attachShadow({ mode: 'open' });
      
      // 1. Define Base Styles for the isolated content
      const baseStyles = `
        <style>
           img { 
            width: 100%; 
            height: 100% !important; 
            display: block; 
            margin: 10px 0;
            border-radius: 8px;
          }
          p { margin-bottom: 1rem; }
          ul, ol { margin-left: 1.5rem; margin-bottom: 1rem; }
          li { margin-bottom: 0.5rem; }
          * { box-sizing: border-box; }
        </style>
      `;

      // 2. Combine styles with content
      shadowRoot.innerHTML = `${baseStyles}${htmlContent}`;
    }
  }, [htmlContent]);

  // Ensure the host container is also full width
  return <div ref={containerRef} className="w-full overflow-hidden" />;
};

export default VendorHtmlRenderer;