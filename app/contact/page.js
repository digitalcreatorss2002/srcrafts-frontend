"use client";

import React from "react";
import { Mail, Phone, MessageCircle, ArrowRight, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Section from "@/components/container/genericContainer/Section";
import Link from "next/link";
import {contactSchema} from "./contactSchema"



export default function AestheticContact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <Section>
    <div className="min-h-screen bg-[#fcfcfc] text-brand-primary font-sans selection:bg-brand-secondary selection:text-white">
      {/* Background Mesh Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-accent/10 to-transparent -z-10" />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Editorial Style Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-brand-secondary font-bold tracking-[0.2em] uppercase text-sm">Contact Us</span>
              <h1 className="text-5xl md:text-6xl font-light leading-tight mt-4">
                Let’s start a <br /> 
                <span className="font-serif italic text-brand-secondary">conversation.</span>
              </h1>
              <p className="text-gray-500 mt-6 text-lg max-w-md">
                Have a question about an order or a bespoke inquiry? Our concierge team is here to assist.
              </p>
            </div>

            <div className="space-y-8">
              <ContactDetail 
                icon={<Phone size={20} />} 
                label="Client Services" 
                value="+91 (800) 123-4567" 
              />
              <ContactDetail 
                icon={<Mail size={20} />} 
                label="General Inquiries" 
                value="hello@luxurybrand.com" 
              />
              <ContactDetail 
                icon={<MessageCircle size={20} />} 
                label="WhatsApp Support" 
                value="Chat with an expert" 
                isLink
                link="https://wa.me/919829012345"
              />
            </div>

            {/* Social Proof / Trust */}
            <div className="pt-12 border-t border-gray-200">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">Follow our journey</p>
              <div className="flex items-center gap-3">
                <SocialIcon icon={<Facebook size={20}/>} href="#" />
                <SocialIcon icon={<Instagram size={20}/>} href="#" />
                <SocialIcon icon={<Youtube size={20}/>} href="#" />
                <SocialIcon icon={<Linkedin size={20}/>} href="#" />
              </div>
            </div>
          </div>

          {/* Right Side: The Aesthetic Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
              {/* Subtle accent corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -mr-16 -mt-16" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <FloatingInput 
                    label="Name" 
                    register={register("fullName")} 
                    error={errors.fullName} 
                    placeholder="Enter your name" 
                  />
                  <FloatingInput 
                    label="Email" 
                    register={register("email")} 
                    error={errors.email} 
                    placeholder="Enter your email" 
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-secondary transition-colors">
                    Subject
                  </label>
                  <select 
                    {...register("subject")}
                    className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-brand-secondary outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Choose a category</option>
                    <option value="orders">Existing Order</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="business">Business Inquiry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-secondary transition-colors">
                    Your Message
                  </label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us how we can help..."
                    className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-brand-secondary outline-none transition-all resize-none placeholder:text-gray-300"
                  />
                  {errors.message && <span className="text-[10px] text-red-400 uppercase font-bold">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-center w-full py-5 bg-brand-primary text-white rounded-xl overflow-hidden transition-all hover:shadow-2xl active:scale-[0.99] disabled:bg-gray-300"
                >
                  <span className="relative z-10 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </span>
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-brand-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
    </Section>
  );
}

/** * Modular Components for Clean Code (SRP)
 */
function ContactDetail({ icon, label, value, isLink=false, link="#" }) {
  return (
    <div className="flex items-center gap-5 group cursor-default">
      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-secondary group-hover:text-brand-secondary transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{label}</p>
        {
          isLink?
          <Link
          href={link || "#"}
          className={`text-lg font-medium text-brand-accent cursor-pointer border-b border-transparent hover:border-brand-accent`}>
          {value}
        </Link>
          :
          <p className={`text-lg font-medium text-brand-accent cursor-pointer border-b border-transparent hover:border-brand-accent text-brand-primary`}>
          {value}
        </p>
        }
        
      </div>
    </div>
  );
}

function FloatingInput({ label, register, error, placeholder }) {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-secondary transition-colors">
        {label}
      </label>
      <input 
        {...register}
        placeholder={placeholder}
        className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-brand-secondary outline-none transition-all placeholder:text-gray-200"
      />
      {error && <span className="text-[10px] text-red-400 uppercase font-bold">{error.message}</span>}
    </div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-brand-primary hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-secondary transition-all duration-500 hover:scale-90">
      {icon}
    </a>
  );
}