'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.webp"
              alt="Navigate Pinawa Logo"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
            <span className={`${isHomePage ? 'text-white' : 'text-gray-900'} text-2xl font-semibold tracking-wide`}>Navigate Pinawa</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              href="/" 
              className={`${isHomePage ? 'text-white border-white' : 'text-gray-900 border-gray-900'} uppercase text-base font-semibold tracking-wide ${pathname === '/' ? 'border-b-2 pb-1' : 'hover:border-b-2 pb-1 transition-all'}`}
            >
              HOME
            </Link>
            <Link 
              href="#" 
              className={`${isHomePage ? 'text-white border-white' : 'text-gray-900 border-gray-900'} uppercase text-base font-semibold tracking-wide hover:border-b-2 pb-1 transition-all`}
            >
              HOTELS
            </Link>
            <Link 
              href="#" 
              className={`${isHomePage ? 'text-white border-white' : 'text-gray-900 border-gray-900'} uppercase text-base font-semibold tracking-wide hover:border-b-2 pb-1 transition-all`}
            >
              GETAWAYS
            </Link>
            <Link 
              href="/faq" 
              className={`${isHomePage ? 'text-white border-white' : 'text-gray-900 border-gray-900'} uppercase text-base font-semibold tracking-wide hover:border-b-2 pb-1 transition-all ${pathname === '/faq' ? 'border-b-2' : ''}`}
            >
              FAQ
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/book-now"
              className={`${isHomePage ? 'text-white border-white hover:bg-white hover:text-gray-900' : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'} uppercase text-base font-semibold tracking-wide border-2 px-8 py-2.5 transition-all`}
            >
              BOOK NOW
            </Link>
            <button className={`${isHomePage ? 'text-white' : 'text-gray-900'} uppercase text-base font-semibold tracking-wide flex items-center space-x-2 hover:opacity-80 transition-opacity`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>SIGN IN</span>
            </button>
            <button className={`${isHomePage ? 'text-white border-white hover:bg-white hover:text-gray-900' : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'} uppercase text-base font-semibold tracking-wide border-2 px-8 py-2.5 transition-all`}>
              CALL US
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

