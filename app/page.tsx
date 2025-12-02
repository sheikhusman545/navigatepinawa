'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import FloatingIcons from '@/components/FloatingIcons'
import TravelSection from '@/components/TravelSection'
import HeroSlider from '@/components/HeroSlider'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'

const TOTAL_SLIDES = 6

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides (optional - can be removed if not needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <>
      <main className="relative min-h-screen">
        {/* Header */}
        <Header />

        {/* Hero Slider */}
        <HeroSlider currentSlide={currentSlide} onSlideChange={handleSlideChange} />

        {/* Floating Icons */}
        <FloatingIcons />
      </main>

      {/* Travel Section - After Hero */}
      <div id="travel-section">
        <TravelSection />
      </div>

      {/* Gallery Section */}
      <GallerySection />

      {/* Contact Section */}
      <ContactSection />
    </>
  )
}

