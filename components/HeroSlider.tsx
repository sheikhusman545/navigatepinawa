'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import BookingForm from './BookingForm'
import SliderIndicator from './SliderIndicator'

interface Slide {
  id: number
  image: string
  title: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/gallery/image1.webp',
    title: 'CHECK IN TO THE\nTIME OF YOUR LIFE'
  },
  {
    id: 2,
    image: '/gallery/image2.webp',
    title: 'DISCOVER YOUR\nPERFECT GETAWAY'
  },
  {
    id: 3,
    image: '/gallery/image3.webp',
    title: 'EXPERIENCE NATURE\nLIKE NEVER BEFORE'
  },
  {
    id: 4,
    image: '/gallery/image4.webp',
    title: 'LUXURY MEETS\nADVENTURE'
  },
  {
    id: 5,
    image: '/gallery/image5.webp',
    title: 'CREATE MEMORIES\nTHAT LAST FOREVER'
  },
  {
    id: 6,
    image: '/gallery/image6.webp',
    title: 'YOUR JOURNEY\nSTARTS HERE'
  }
]

interface HeroSliderProps {
  currentSlide: number
  onSlideChange: (index: number) => void
}

export default function HeroSlider({ currentSlide, onSlideChange }: HeroSliderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 500)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className={`text-white transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold uppercase leading-tight text-shadow mb-8 whitespace-pre-line">
                {currentSlideData.title}
              </h1>
            </div>

            {/* Booking Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner - Fixed within slider */}
      <div className="absolute bottom-20 right-8 z-50 flex items-center space-x-4">
        <div className="bg-navigatepinawa-orange px-6 py-3 rounded-lg border-2 border-dashed border-orange-600">
          <p className="text-gray-900 font-bold text-sm uppercase">NAVIGATE PINAWA NOVEMBER RUSH</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-lg border-2 border-dashed border-gray-400">
          <p className="text-gray-900 font-semibold text-xs">50% OFF or Free Night</p>
        </div>
      </div>

      {/* Slider Indicator - Absolute within slider */}
      <div className="absolute bottom-8 left-8 z-50">
        <SliderIndicator 
          currentSlide={currentSlide} 
          totalSlides={6}
          onSlideChange={onSlideChange}
        />
      </div>
    </div>
  )
}

