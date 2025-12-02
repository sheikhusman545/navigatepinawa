'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import FloatingIcons from '@/components/FloatingIcons'
import HeroSlider from '@/components/HeroSlider'
import ExploreSection from '@/components/ExploreSection'

const TOTAL_SLIDES = 6

export default function BookNowPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES)
    }, 5000)

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

      {/* Explore Section */}
      <ExploreSection />
    </>
  )
}

