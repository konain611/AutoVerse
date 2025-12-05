"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AIWebsiteLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!userRef.current) return;
      if (!userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="bg-black text-white antialiased sticky top-0 w-full z-50">
     
      <header className="border-b border-white/6">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-5">
             
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="AutoVerse Logo"
                  width={60}  
                  height={60} 
                  className="w-18 h-18 md:w-20 md:h-20 object-contain" 
                  priority
                />
                <span className="sr-only">AutoVerse</span>
                <span className="font-bold text-xl tracking-tight">AutoVerse</span>
               
              </Link>

       
              <div className="hidden md:flex md:items-center md:space-x-2 ml-4">
                <NavLink href="/features">Features</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/docs">Docs</NavLink>
                <NavLink href="/about">About</NavLink>
              </div>
            </div>


            <div className="flex items-center gap-3">
          
              <Link href="/dashboard" className="hidden md:inline-flex items-center rounded-md bg-purple-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700 transition">
                Dashboard
              </Link>

              <button
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-md hover:bg-white/6"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button className="hidden md:inline-flex p-2 rounded-md hover:bg-white/6" aria-label="Notifications">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

  
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserOpen((s) => !s)}
                  aria-expanded={userOpen}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/6"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-gray-700 to-gray-800 text-white">U</span>
                  <span className="hidden sm:inline-block text-sm">Account</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {userOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#0b0b0d] border border-white/6 shadow-lg ring-1 ring-white/6 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-white/6">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-white/6">Settings</Link>
                    <div className="border-t border-white/6" />
                    <Link href="/logout" className="block px-4 py-2 text-sm hover:bg-white/6">Sign out</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

    
        {mobileOpen && (
          <div className="md:hidden border-t border-white/6">
            <div className="px-3 pt-2 pb-3 space-y-1">
              <MobileLink href="/features">Features</MobileLink>
              <MobileLink href="/pricing">Pricing</MobileLink>
              <MobileLink href="/docs">Docs</MobileLink>
              <MobileLink href="/about">About</MobileLink>
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-white bg-purple-600 text-center font-medium">Dashboard</Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        group relative px-3 py-2 text-sm text-white 
        transition-all duration-300 ease-out

        hover:text-purple-600
        hover:-translate-y-0.5 
        hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]

        after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full 
        after:origin-left after:scale-x-0 after:bg-purple-700 
        after:transition-transform after:duration-300 after:ease-out
        group-hover:after:scale-x-100
      "
    >
      {children}
    </Link>
  );
}



function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base text-white hover:bg-white/6">
      {children}
    </Link>
  );
}