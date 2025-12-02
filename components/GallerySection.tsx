'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface GalleryItem {
  id: number
  image: string
  title: string
  location: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, image: '/gallery/image1.webp', title: 'NORTHRIDGE BY NAVIGATE PINAWA', location: 'Batakundi, Naran Valley' },
  { id: 2, image: '/gallery/image2.webp', title: 'NAVIGATE PINAWA SIGNATURE HOTEL', location: 'Islamabad Capital Territory' },
  { id: 3, image: '/gallery/image3.webp', title: 'NAVIGATE PINAWA DAASTAAN HOTEL', location: 'Karimabad, Hunza Valley' },
  { id: 4, image: '/gallery/image4.webp', title: 'THE ROVER BY NAVIGATE PINAWA', location: 'Phander Valley' },
  { id: 5, image: '/gallery/image5.webp', title: 'THE NAVIGATE PINAWA LODGE', location: 'Murree, Punjab' },
  { id: 6, image: '/gallery/image6.webp', title: 'ZHULE BY NAVIGATE PINAWA', location: 'Skardu' },
  { id: 7, image: '/gallery/image7.webp', title: 'NAVIGATE PINAWA MOUNTAIN TOP RESORT', location: 'Batakundi, Naran Valley' },
  { id: 8, image: '/gallery/image8.webp', title: 'NAVIGATE PINAWA YURTS GULMIT', location: 'Gulmit, Hunza Valley' },
  { id: 9, image: '/gallery/image9.webp', title: 'NAVIGATE PINAWA GLAMPING SITE', location: 'Pinawa, Manitoba' },
  { id: 10, image: '/gallery/image10.webp', title: 'NAVIGATE PINAWA WILDERNESS CAMP', location: 'Old Pinawa Provincial Park' },
  { id: 11, image: '/gallery/iamge11.webp', title: 'NAVIGATE PINAWA ADVENTURE LODGE', location: 'Trans Canada Trail' },
  { id: 12, image: '/gallery/image12.webp', title: 'NAVIGATE PINAWA RIVERSIDE RETREAT', location: 'Pinawa River' },
  { id: 13, image: '/gallery/image13.webp', title: 'NAVIGATE PINAWA FOREST CABIN', location: 'Sno-man Trail' },
  { id: 14, image: '/gallery/image14.webp', title: 'NAVIGATE PINAWA SUMMIT VIEW', location: 'Mountain Peak' },
  { id: 15, image: '/gallery/image15.webp', title: 'NAVIGATE PINAWA LAKESIDE CAMP', location: 'Pinawa Lake' },
  { id: 16, image: '/gallery/image16.webp', title: 'NAVIGATE PINAWA VALLEY VIEW', location: 'Valley Overlook' },
  { id: 17, image: '/gallery/image17.webp', title: 'NAVIGATE PINAWA NATURE RETREAT', location: 'Provincial Park' },
  { id: 18, image: '/gallery/image18.webp', title: 'NAVIGATE PINAWA PREMIUM SITE', location: 'Main Campground' },
]

export default function GallerySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('resize', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [])

  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-2">
              NAVIGATE PINAWA LOCATIONS
            </h2>
            <p className="text-gray-600 text-lg">Unlock new memories with us</p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-900 font-medium uppercase text-sm">VIEW MORE</span>
            <div className="flex space-x-2">
              <button
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  showLeftArrow 
                    ? 'bg-blue-200 hover:bg-blue-300 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  showRightArrow 
                    ? 'bg-navigatepinawa-blue hover:bg-blue-900 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto scroll-smooth hide-scrollbar"
        >
          <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-80 md:w-96 group cursor-pointer"
              >
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-gray-900 font-bold text-lg uppercase mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

