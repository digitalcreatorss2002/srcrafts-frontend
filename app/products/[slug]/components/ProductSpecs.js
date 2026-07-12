"use client";

import { LucideChevronDown } from "lucide-react";
import { useState } from "react";

const ProductSpecs = ({ specifications = [], description = "" }) => {
  // Early exit logic - SOLID: Don't render empty components
  if (!specifications.length && !description) return null;

  // Refined State: Using named indices for readability
  // -1: closed, 0: description, 1: specifications
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (index) => {
    setActiveTab((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full space-y-2">
      {/* SECTION: Description */}
      {description && (
        <section className="border-b border-brand-primary/10">
          <div className="overflow-hidden bg-white py-2">
            <button
              className="flex w-full items-center justify-between py-4 text-left transition-all hover:opacity-80"
              onClick={() => toggleTab(0)}
            >
              <span className="text-xl font-semibold text-brand-primary">
                Description
              </span>
              <LucideChevronDown
                className={`h-5 w-5 text-brand-secondary transition-transform duration-300 ${
                  activeTab === 0 ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Smooth Height Transition Hack */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                activeTab === 0 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className="description py-4 text-sm leading-relaxed text-brand-primary/80 prose prose-slate"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: Specifications */}
      {specifications.length > 0 && (
        <section className="border-b border-brand-primary/10">
          <div className="overflow-hidden bg-white py-2">
            <button
              className="flex w-full items-center justify-between py-4 text-left transition-all hover:opacity-80"
              onClick={() => toggleTab(1)}
            >
              <span className="text-xl font-semibold text-brand-primary">
                Specifications
              </span>
              <LucideChevronDown
                className={`h-5 w-5 text-brand-secondary transition-transform duration-300 ${
                  activeTab === 1 ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                activeTab === 1 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="py-5 pr-0 md:pr-10">
                  <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg border border-brand-primary/10">
                    <thead>
                      <tr className="bg-brand-primary/[0.03]">
                        <th className="w-1/3 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-primary/60">
                          Feature
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-primary/60">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-primary/5">
                      {specifications.map((spec, i) => (
                        <tr
                          key={spec._id || i}
                          className="transition-colors hover:bg-brand-accent/5"
                        >
                          <td className="w-1/3 px-5 py-4 text-sm font-semibold text-brand-primary/70 align-top">
                            {spec.label}
                          </td>
                          <td className="px-5 py-4 text-sm text-brand-primary align-top">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductSpecs;