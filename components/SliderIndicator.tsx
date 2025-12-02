'use client'

import React from 'react'

interface SliderIndicatorProps {
  currentSlide: number
  totalSlides: number
  onSlideChange: (index: number) => void
}

export default function SliderIndicator({ currentSlide, totalSlides, onSlideChange }: SliderIndicatorProps) {
  const slides = Array.from({ length: totalSlides }, (_, i) => i)

  const scrollToNext = () => {
    const travelSection = document.getElementById('travel-section')
    const accommodationTabs = document.getElementById('accommodation-tabs')
    const target = travelSection || accommodationTabs
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="pointer-events-none">
      <div className="flex items-center space-x-2 mb-4 pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`transition-all duration-300 ${
              index === currentSlide ? 'w-12 h-1 bg-white' : 'w-8 h-1 bg-white/40 hover:bg-white/60'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex items-center space-x-3 text-white text-sm pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`font-medium transition-all duration-300 ${
              index === currentSlide ? 'opacity-100' : 'opacity-50 hover:opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center pointer-events-auto">
        <button
          onClick={scrollToNext}
          className="text-white hover:opacity-80 transition-opacity"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
