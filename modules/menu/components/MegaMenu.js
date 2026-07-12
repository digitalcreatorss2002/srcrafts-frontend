// components/Menu/layouts/MegaMenu.jsx
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { NavLink } from './MenuUtils';

const MegaMenu = ({ items }) => {
  return (
    <nav className="hidden md:flex items-center space-x-10 w-full justify-center">
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        
        // Smart Check: Is this a multi-column Mega Menu or a simple Vertical Dropdown?
        const isMega = hasChildren && item.children.some(
          (child) => child.children && child.children.length > 0
        );

        return (
          <div key={index} className="relative group">
            {/* Main Level Link */}
            <NavLink 
              item={item} 
              className="flex items-center gap-1.5 text-[14px] font-semibold tracking-wider hover:text-brand-secondary transition cursor-pointer group py-2"
            >
              {item.title}
              {hasChildren && (
                <ChevronDownIcon 
                  className="transition-transform duration-300 group-hover:rotate-180 text-gray-400 group-hover:text-brand-secondary" 
                  size={14} 
                />
              )}
            </NavLink>

            {/* Dropdowns */}
            {hasChildren && (
              isMega ? (
                /* --- CASCADING VERTICAL DROPDOWN --- */
                <div 
                  className="absolute left-0 top-full pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  style={{ zIndex: 50 }}
                >
                  <div className="w-72 bg-white border border-gray-100 shadow-xl rounded-xl p-2 flex flex-col space-y-0.5">
                    {item.children.map((category, idx) => {
                      const hasSubChildren = category.children && category.children.length > 0;
                      
                      return (
                        <div key={idx} className="relative group/sub">
                          <NavLink 
                            item={category} 
                            className="flex items-center justify-between text-gray-700 hover:text-brand-secondary text-[13.5px] py-2.5 px-3.5 hover:bg-gray-50 rounded-lg transition-all duration-150 w-full font-medium"
                          >
                            <span className="flex items-center">
                              {/* Subtle hover indent indicator */}
                              <span className="w-0 group-hover/sub:w-2 h-[1.5px] bg-brand-secondary mr-0 group-hover/sub:mr-2 transition-all duration-150"></span>
                              <span>{category.title}</span>
                            </span>
                            {hasSubChildren && (
                              <ChevronRightIcon size={14} className="text-gray-400 group-hover/sub:text-brand-secondary transition-colors" />
                            )}
                          </NavLink>

                          {/* Secondary Sub-Dropdown (Cascading right) */}
                          {hasSubChildren && (
                            <div 
                              className="absolute left-full top-0 pl-2 invisible group-hover/sub:visible opacity-0 group-hover/sub:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/sub:translate-x-0"
                              style={{ zIndex: 60 }}
                            >
                              <div className="w-72 bg-white border border-gray-100 shadow-xl rounded-xl p-2 flex flex-col space-y-0.5">
                                {category.children.map((subItem, sIdx) => (
                                  <NavLink 
                                    key={sIdx}
                                    item={subItem} 
                                    className="group/item flex items-center text-gray-600 hover:text-brand-secondary text-[13px] py-2 px-3.5 hover:bg-gray-50 rounded-lg transition-all duration-150 w-full"
                                  >
                                    <span className="w-0 group-hover/item:w-2 h-[1.5px] bg-brand-secondary mr-0 group-hover/item:mr-2 transition-all duration-150"></span>
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* --- SLEEK COMPACT VERTICAL DROPDOWN --- */
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-11 w-64 bg-white invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100 shadow-xl rounded-lg p-3 flex flex-col space-y-1"
                  style={{ zIndex: 50 }}
                >
                  {item.children.map((category, idx) => (
                    <NavLink 
                      key={idx}
                      item={category} 
                      className="group/item flex items-center text-gray-600 hover:text-brand-secondary text-[13.5px] py-2 px-3 hover:bg-gray-50 rounded-md transition-all duration-150 w-full"
                    >
                      {/* Subtle hover indent indicator */}
                      <span className="w-0 group-hover/item:w-2.5 h-[1.5px] bg-brand-secondary mr-0 group-hover/item:mr-2.5 transition-all duration-150"></span>
                      <span className="font-normal tracking-wide">{category.title}</span>
                    </NavLink>
                  ))}
                </div>
              )
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default MegaMenu;