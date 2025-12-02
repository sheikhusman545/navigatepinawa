'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Accommodation {
  id: number
  name: string
  image: string
  price: string
  description: string
  weekdaysPrice: string
  weekendsPrice: string
  pricingNote: string
}

const accommodations: Accommodation[] = [
  {
    id: 1,
    name: 'The Starlight Haven',
    image: '/gallery/image1.webp',
    price: '$200/night*',
    description: 'Luxury Glamping Pod | Nature Meets Comfort',
    weekdaysPrice: 'Weekdays: $200/night',
    weekendsPrice: 'Weekends: $225/night',
    pricingNote: 'Fall, Winter and Spring pricing'
  },
  {
    id: 2,
    name: 'The Spruce Bliss Pod',
    image: '/gallery/image2.webp',
    price: '$200/night*',
    description: 'Luxury Glamping Pod | Nature Meets Comfort',
    weekdaysPrice: 'Weekdays: $200/night',
    weekendsPrice: 'Weekends: $225/night',
    pricingNote: 'Fall, Winter and Spring Pricing'
  },
  {
    id: 3,
    name: 'The Pine Loft Bunkie',
    image: '/gallery/image3.webp',
    price: '$200/night*',
    description: 'Cozy wood cabin bunkie',
    weekdaysPrice: 'Weekdays: $200/night',
    weekendsPrice: 'Weekends: $225/night',
    pricingNote: 'Fall, Winter and Fall pricing'
  },
  {
    id: 4,
    name: 'The Canopy Cove',
    image: '/gallery/image4.webp',
    price: '$150/night*',
    description: 'Peaceful luxury glamping tent',
    weekdaysPrice: 'Weekdays: $150/night',
    weekendsPrice: 'Weekends: $175/night',
    pricingNote: ''
  },
  {
    id: 5,
    name: 'The Wildwood Retreat',
    image: '/gallery/image5.webp',
    price: '$150/night*',
    description: 'Peaceful luxury glamping tent',
    weekdaysPrice: 'Weekdays: $150/night',
    weekendsPrice: 'Weekends: $175/night',
    pricingNote: ''
  }
]

export default function ExploreSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header Section with Beautiful Typography */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          {/* Top Subtitle */}
          
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-tight leading-tight opacity-0 animate-slide-up animation-delay-200">
            Explore Our Pet and Family Friendly<br />
            <span className="text-navigatepinawa-blue">Glamping Accommodations</span>
          </h1>
          
          {/* Bottom Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl font-light tracking-wide opacity-0 animate-slide-up animation-delay-300">
            From cozy bunkies and modern glamping pods to luxury tents under the stars.
          </p>
        </div>

        {/* Accommodation Cards Grid - 2 columns with full images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="relative h-[600px] rounded-lg overflow-hidden group cursor-pointer"
            >
              {/* Full Background Image */}
              <Image
                src={accommodation.image}
                alt={accommodation.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Price Badge - Top Right */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <p className="text-2xl font-bold text-navigatepinawa-blue">
                    {accommodation.price}
                  </p>
                </div>
              </div>

              {/* Description Badge - Top Left */}
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-navigatepinawa-orange/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <p className="text-white text-sm font-semibold uppercase">
                    {accommodation.description}
                  </p>
                </div>
              </div>

              {/* Content Overlay - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                {/* Name */}
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {accommodation.name}
                </h3>

                {/* Pricing Details - Hidden by default, shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2 mt-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 space-y-1">
                    <p className="text-gray-900 font-semibold">{accommodation.weekdaysPrice}</p>
                    <p className="text-gray-900 font-semibold">{accommodation.weekendsPrice}</p>
                    {accommodation.pricingNote && (
                      <p className="text-gray-600 text-sm italic">{accommodation.pricingNote}</p>
                    )}
                  </div>
                </div>

                {/* Explore Button - Always visible */}
                <Link
                  href={`/accommodation/${accommodation.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block mt-6 bg-white border-2 border-white text-gray-900 uppercase font-semibold px-8 py-3 rounded-lg hover:bg-transparent hover:text-white transition-all duration-300"
                >
                  EXPLORE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

