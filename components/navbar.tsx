// components/navbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);


  return (
    <div className="bg-black text-white antialiased sticky top-0 w-full z-50 px-0 md:px-3 lg:px-6 shadow-sm shadow-black/10">
      <header className="border-b border-white/10">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-5">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="AutoVerse Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
                <span className="font-bold text-xl tracking-tight">AutoVerse</span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex md:items-center md:space-x-2 ml-4">
                <NavLink href="/features">Features</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <NavLink href="/rag-bot">RAG Chatbot</NavLink>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-4">

              <Link href="/login" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-purple-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-500 transition-colors"
              >
                Sign Up
              </Link>

            </div>

            {/* Mobile Toggle */}
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md hover:bg-white/10"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>


          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/10">
              <div className="px-3 pt-2 pb-3 space-y-1">
                <MobileLink href="/features">Features</MobileLink>
                <MobileLink href="/pricing">Pricing</MobileLink>
                <MobileLink href="/about">About</MobileLink>
                <MobileLink href="/contact">Contact</MobileLink>
                <MobileLink href="/rag-bot">RAG Chatbot</MobileLink>

                <div className="border-t border-white/10 my-2" />


                <>
                  <MobileLink href="/login">Login</MobileLink>

                  <Link href="/signup" className="block px-3 py-2 rounded-md text-white bg-purple-600 text-center font-medium">
                    Sign Up
                  </Link>
                </>

              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

/* Desktop NavLink */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative px-3 py-2 text-sm text-white/80 transition-all duration-300 ease-out hover:text-white"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-purple-600 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

/* Mobile NavLink */
function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base text-white/80 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
