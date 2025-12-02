'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function TravelSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Image */}
          <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/gallery/image18.webp"
              alt="Travel Experience"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Section - Text and CTA */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase leading-tight">
              TRAVEL LIKE NEVER BEFORE
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Short trip to Islamabad or an adventure up north - book Navigate Pinawa at your favorite locations. We understand that travel is personal so we make it an easy, feel-good hotel experience for everyone.
            </p>
            <Link
              href="/about"
              className="inline-block bg-navigatepinawa-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Try Us Out!
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

