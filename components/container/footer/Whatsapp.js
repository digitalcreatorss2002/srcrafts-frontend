"use client"; // Required for useState and interactions

import { useState } from "react";
import Image from "next/image";
import { Send, X } from "lucide-react";

export default function WhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("Hi SR Craft, I'm interested in your handcrafted products!");
  
  const phoneNumber = "919953710775"; // International format (India: 91)

  const handleSend = () => {
    const encodedMsg = encodeURIComponent(userMsg);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, "_blank");
    setIsOpen(false); // Close popup after sending
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* 1. Editable Popup Box */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-72 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#075e54] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">SR</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">SR Craft Support</p>
                <p className="text-[10px] opacity-80 font-bold uppercase">Online Now</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
              <X size={18} />
            </button>
          </div>

          {/* Body/Input Area */}
          <div className="p-4 bg-[#f0f2f5]">
            <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-tighter">Your Message</p>
              <textarea 
                rows={3}
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                className="w-full text-sm font-semibold text-slate-700 bg-transparent border-none focus:ring-0 resize-none outline-none"
                placeholder="Type your query here..."
              />
            </div>
            
            <button 
              onClick={handleSend}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-green-200"
            >
              Send on WhatsApp <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 active:scale-95"
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></div>
        )}
        
        <Image 
          src="/icons/whatsapp.webp" 
          alt="Chat on WhatsApp"
          width={40}
          height={40}
          className="object-contain z-10"
        />
        
        <span className="absolute top-1 right-1 w-4 h-4 bg-white border-2 border-[#25D366] rounded-full"></span>
      </button>
    </div>
  );
}