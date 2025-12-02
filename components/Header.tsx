'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? 'bg-transparent' : 'bg-white shadow-md'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-50 relative">
              <Image
                src="/logo.webp"
                alt="Navigate Pinawa Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
              <span className={`${isHomePage ? 'text-white' : 'text-gray-900'} text-xl sm:text-2xl font-semibold tracking-wide hidden sm:inline`}>Navigate Pinawa</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
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

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/book-now"
                className={`${isHomePage ? 'text-white border-white hover:bg-white hover:text-gray-900' : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'} uppercase text-base font-semibold tracking-wide border-2 px-6 xl:px-8 py-2.5 transition-all`}
              >
                BOOK NOW
              </Link>
              <button className={`${isHomePage ? 'text-white' : 'text-gray-900'} uppercase text-base font-semibold tracking-wide flex items-center space-x-2 hover:opacity-80 transition-opacity`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden xl:inline">SIGN IN</span>
              </button>
              <button className={`${isHomePage ? 'text-white border-white hover:bg-white hover:text-gray-900' : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'} uppercase text-base font-semibold tracking-wide border-2 px-6 xl:px-8 py-2.5 transition-all`}>
                CALL US
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden z-50 relative p-2 ${isHomePage ? 'text-white' : 'text-gray-900'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMobileMenu}
        />

        {/* Sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
          {/* Logo in Sidebar */}
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <Image
              src="/logo.webp"
              alt="Navigate Pinawa Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-semibold text-gray-900 tracking-wide">Navigate Pinawa</span>
          </div>

          {/* Navigation Links */}
          <nav className="py-6">
            <Link
              href="/"
              onClick={toggleMobileMenu}
              className={`block px-6 py-4 text-gray-900 uppercase text-base font-semibold tracking-wide transition-colors ${
                pathname === '/' ? 'bg-gray-100 border-l-4 border-navigatepinawa-blue' : 'hover:bg-gray-50'
              }`}
            >
              HOME
            </Link>
            <Link
              href="#"
              onClick={toggleMobileMenu}
              className="block px-6 py-4 text-gray-900 uppercase text-base font-semibold tracking-wide hover:bg-gray-50 transition-colors"
            >
              HOTELS
            </Link>
            <Link
              href="#"
              onClick={toggleMobileMenu}
              className="block px-6 py-4 text-gray-900 uppercase text-base font-semibold tracking-wide hover:bg-gray-50 transition-colors"
            >
              GETAWAYS
            </Link>
            <Link
              href="/faq"
              onClick={toggleMobileMenu}
              className={`block px-6 py-4 text-gray-900 uppercase text-base font-semibold tracking-wide transition-colors ${
                pathname === '/faq' ? 'bg-gray-100 border-l-4 border-navigatepinawa-blue' : 'hover:bg-gray-50'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/book-now"
              onClick={toggleMobileMenu}
              className={`block px-6 py-4 text-gray-900 uppercase text-base font-semibold tracking-wide transition-colors ${
                pathname === '/book-now' ? 'bg-gray-100 border-l-4 border-navigatepinawa-blue' : 'hover:bg-gray-50'
              }`}
            >
              BOOK NOW
            </Link>
            <Link
              href="/about"
              onClick={toggleMobileMenu}
              className={`block px-6 py-4 text-gray-900 uppercase text-base font-semibold tracking-wide transition-colors ${
                pathname === '/about' ? 'bg-gray-100 border-l-4 border-navigatepinawa-blue' : 'hover:bg-gray-50'
              }`}
            >
              ABOUT
            </Link>
          </nav>

          {/* Additional Info */}
          <div className="px-6 py-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-5 h-5 text-navigatepinawa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium">SIGN IN</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-5 h-5 text-navigatepinawa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">CALL US</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

