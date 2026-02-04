"use client";

import { SignIn } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/app/_components/Header"
export default function SignInPage() {
  // --- Mouse Position Logic for Spotlight Effect ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
    <Header/>
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
      
      {/* --- 1. Background Mouse Spotlight --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent 40%)`,
        }}
        />
      
      {/* --- 2. Background Grid Pattern --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4]" 
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        ></div>

      {/* --- 3. The Login Card Container --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px]"
        >
        {/* Optional: Logo or Brand Text above the form */}
        <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
                <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 cursor-pointer">
                NextCourse
                </h1>
            </Link>
            <p className="mt-2 text-sm text-slate-600">
                Welcome back! Please enter your details.
            </p>
        </div>

        {/* --- 4. The Clerk Component --- */}
        <div className="flex justify-center">
            <SignIn 
                appearance={{
                  layout: {
                    socialButtonsPlacement: "bottom",
                    socialButtonsVariant: "iconButton",
                  },
                  elements: {
                    // Customize the main card
                    card: "shadow-xl border border-slate-200 bg-white/80 backdrop-blur-md rounded-2xl",
                    
                    // Customize the primary button (Sign In)
                    formButtonPrimary: 
                    "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
                    
                    // Customize text fields
                    formFieldInput: 
                    "focus:ring-indigo-600 focus:border-indigo-600 border-slate-300",
                    
                    // Customize the 'Sign up' link at the bottom
                    footerActionLink: 
                    "text-indigo-600 hover:text-indigo-700 font-semibold",
                    
                    // Customize the header title
                    headerTitle: "text-slate-800",
                    headerSubtitle: "text-slate-500",
                  }
                }}
                />
        </div>

      </motion.div>
    </div>
    </>
  );
}