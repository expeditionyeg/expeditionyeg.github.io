"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-4 group">
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-1.5 rounded-full border-2 border-blue-600 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt={`${siteConfig.name} Logo`}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
              </div>
              <span className="font-heading font-extrabold text-2xl md:text-3xl tracking-tight text-gray-900 dark:text-white">
                {siteConfig.name.split(' ')[0]}
                <span className="text-blue-600"> {siteConfig.name.split(' ')[1]}</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {siteConfig.links.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/book" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Book Now</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {siteConfig.links.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/book" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700">Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}