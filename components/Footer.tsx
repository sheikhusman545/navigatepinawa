'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Review {
  id: number
  name: string
  image: string
  text: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Ghazal',
    image: '/gallery/image1.webp',
    text: "It's a brand new, very clean and very tastefully done hotel. The amenities in the room are great, The breakfast is good and the staff is very helpful."
  },
  {
    id: 2,
    name: 'Zee Abbas',
    image: '/gallery/image2.webp',
    text: 'Excellent value for money that gives you a 5 star atmosphere. It looked like a newly constructed establishment. Very neat and comfortable stay. Rooms were great, so was the service offered.'
  },
  {
    id: 3,
    name: 'Daniell A',
    image: '/gallery/image3.webp',
    text: 'Incredible rooms and professional friendly staff. Location is very good. Staff super helpful. Received a free upgrade and the room was incredibly spacious and modern. Shower was huge. Very professional service.'
  }
]

interface JournalEntry {
  id: number
  title: string
  date: string
  image: string
}

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    title: 'Informative, Upbeat And Aspirational!',
    date: '15 February',
    image: '/gallery/image4.webp'
  },
  {
    id: 2,
    title: 'Navigate Pinawa Has Introduced A 3 Step Fast Check-In Feature',
    date: '1 Month Ago',
    image: '/gallery/image5.webp'
  },
  {
    id: 3,
    title: 'Navigate Pinawa Aims To Help The Local Economy Thrive!',
    date: '3 Months Ago',
    image: '/gallery/image6.webp'
  }
]

export default function Footer() {
  const [currentReview, setCurrentReview] = useState(0)

  const activeReview = reviews[currentReview]

  return (
    <footer className="relative mt-16">
      {/* Background gradient behind the whole footer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, #ffffff 0%, #ffffff 45%, #202b46 45%, #202b46 100%)'
        }}
      />

       {/* MAIN WHITE CARD */}
       <div className="relative max-w-6xl mx-auto bg-white shadow-xl rounded-none md:rounded-md px-6 md:px-12 py-12 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
           {/* CUSTOMER REVIEWS */}
           <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-[0.05em] uppercase text-[#464646] mb-10">
              CUSTOMER REVIEWS
            </h3>

            {/* Single review slider to mimic their layout + dots */}
            <div className="flex items-start space-x-4 md:space-x-5 mb-4">
              <div className="relative w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={activeReview.image}
                  alt={activeReview.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-[#464646] mb-2">
                  {activeReview.name}
                </h4>
                <p className="text-left text-[0.8125rem] leading-relaxed italic text-[#aaaaaa]">
                  {activeReview.text}
                </p>
              </div>
            </div>

            {/* If you want all three visible like screenshot, uncomment below and remove slider block above */}
            {/* 
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-start space-x-4">
                  ...
                </div>
              ))}
            </div>
            */}

            {/* Pagination dots */}
            <div className="flex items-center space-x-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-2 w-2 rounded-full border border-[#464646] transition-all ${
                    currentReview === index ? 'bg-[#464646]' : 'bg-transparent'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* MENU */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-[0.05em] uppercase text-[#464646] mb-10">
              MENU
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'ABOUT US' },
                { href: '/book-now', label: 'OUR LOCATIONS' },
                { href: '#', label: 'DINE IN' },
                { href: '#', label: 'PRIVACY POLICY' },
                { href: '#', label: 'TERMS & CONDITIONS' },
                { href: '#', label: 'CONTACT US' }
              ].map((item) => (
                <li
                  key={item.label}
                  className="text-left text-[0.875rem] leading-tight uppercase text-[#464646]"
                >
                  <Link
                    href={item.href}
                    className="hover:text-blue-700 transition-colors"
                  >
                    • <span className="align-middle">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* JOURNAL */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-[0.05em] uppercase text-[#464646] mb-10">
              JOURNAL
            </h3>
            <div className="space-y-5">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start space-x-3 cursor-pointer group"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-[0.8125rem] font-semibold leading-snug text-[#464646] group-hover:text-blue-700 transition-colors mb-1">
                      {entry.title}
                    </h4>
                    <p className="text-[0.75rem] text-gray-500">{entry.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WE ALSO HOST + SOCIAL */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-[0.05em] uppercase text-[#464646] mb-10">
                WE ALSO HOST
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {/* Replace with real logos when you have them */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-14 bg-gray-100 border border-gray-200 flex items-center justify-center text-[0.75rem] text-gray-400"
                  >
                    Logo
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#464646] mb-4">
                SOCIAL WITH US
              </h3>
              <div className="flex flex-wrap gap-3">
                {/* Twitter */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DARK BLUE STRIP WITH LOGO + PAYMENT ICONS */}
      <div className="bg-[#202b46] text-white mt-0 pt-10 pb-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
           {/* Brand logo */}
           <div className="flex items-center space-x-3">
             <Image
               src="/logo.webp"
               alt="Navigate Pinawa Logo"
               width={50}
               height={50}
               className="object-contain"
             />
             <span className="text-2xl font-semibold tracking-wide">
               Navigate Pinawa
             </span>
           </div>

          {/* Payment methods */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="px-4 py-2 rounded bg-white/10 border border-white/20">
              Mastercard
            </div>
            <div className="px-4 py-2 rounded bg-white/10 border border-white/20">
              VISA
            </div>
            <div className="px-4 py-2 rounded bg-white/10 border border-white/20">
              HBL Pay
            </div>
          </div>
        </div>
      </div>

 
    </footer>
  )
}
