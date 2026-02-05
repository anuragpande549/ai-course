"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";

function Header() {
  const { userId } = useAuth();   // ✅ no await
  const { user } = useUser();     // ✅ no await

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md">
      
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <Image src="/logo.svg" alt="logo-img" width={32} height={32} />
        <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
          NextCourse
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link href="#features">Features</Link>
        <Link href="#how-it-works">How it Works</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#about">About</Link>
      </nav>

      {/* CTA */}
      <div>
        <Link
          href={userId ? "/dashboard" : "/sign-in"}
          className="bg-indigo-600 px-4 py-2 rounded-xl text-white hover:bg-indigo-700 transition"
        >
          {userId ? "Dashboard" : "Login"}
        </Link>
      </div>

    </header>
  );
}

export default Header;
