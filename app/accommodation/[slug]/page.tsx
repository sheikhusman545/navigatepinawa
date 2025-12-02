'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import SliderIndicator from '@/components/SliderIndicator'
import Image from 'next/image'

const accommodations = {
  'the-starlight-haven': {
    name: 'The Starlight Haven',
    title: 'A SCENIC MOUNTAIN RETREAT IN THANDIANI',
    description: 'Surrounded by lush forests, misty peaks, and fresh air, The Starlight Haven offers a secluded retreat to experience the untouched beauty of the hills with modern comforts. Whether you\'re seeking a quiet escape in Thandiani or a scenic stay near Abbottabad, this glamping pod blends serenity with convenience. Designed to complement its stunning surroundings, The Starlight Haven is more than just accommodation—it\'s a true mountain retreat.',
    features: [
      'Breathtaking Hilltop Views',
      'Cozy, Warm Interiors',
      'Secluded Yet Accessible',
      'Perfect for Adventure & Relaxation'
    ],
    images: [
      '/gallery/image1.webp',
      '/gallery/image2.webp',
      '/gallery/image3.webp',
      '/gallery/image4.webp'
    ],
    price: '$200/night*',
    weekdaysPrice: 'Weekdays: $200/night',
    weekendsPrice: 'Weekends: $225/night',
    pricingNote: 'Fall, Winter and Spring pricing'
  },
  'the-spruce-bliss-pod': {
    name: 'The Spruce Bliss Pod',
    title: 'A SCENIC MOUNTAIN RETREAT IN THANDIANI',
    description: 'Surrounded by lush forests, misty peaks, and fresh air, The Spruce Bliss Pod offers a secluded retreat to experience the untouched beauty of the hills with modern comforts. Whether you\'re seeking a quiet escape in Thandiani or a scenic stay near Abbottabad, this glamping pod blends serenity with convenience. Designed to complement its stunning surroundings, The Spruce Bliss Pod is more than just accommodation—it\'s a true mountain retreat.',
    features: [
      'Breathtaking Hilltop Views',
      'Cozy, Warm Interiors',
      'Secluded Yet Accessible',
      'Perfect for Adventure & Relaxation'
    ],
    images: [
      '/gallery/image2.webp',
      '/gallery/image3.webp',
      '/gallery/image4.webp',
      '/gallery/image5.webp'
    ],
    price: '$200/night*',
    weekdaysPrice: 'Weekdays: $200/night',
    weekendsPrice: 'Weekends: $225/night',
    pricingNote: 'Fall, Winter and Spring Pricing'
  },
  'the-pine-loft-bunkie': {
    name: 'The Pine Loft Bunkie',
    title: 'A SCENIC MOUNTAIN RETREAT IN THANDIANI',
    description: 'Surrounded by lush forests, misty peaks, and fresh air, The Pine Loft Bunkie offers a secluded retreat to experience the untouched beauty of the hills with modern comforts. Whether you\'re seeking a quiet escape in Thandiani or a scenic stay near Abbottabad, this cozy cabin blends serenity with convenience. Designed to complement its stunning surroundings, The Pine Loft Bunkie is more than just accommodation—it\'s a true mountain retreat.',
    features: [
      'Breathtaking Hilltop Views',
      'Cozy, Warm Interiors',
      'Secluded Yet Accessible',
      'Perfect for Adventure & Relaxation'
    ],
    images: [
      '/gallery/image3.webp',
      '/gallery/image4.webp',
      '/gallery/image5.webp',
      '/gallery/image6.webp'
    ],
    price: '$200/night*',
    weekdaysPrice: 'Weekdays: $200/night',
    weekendsPrice: 'Weekends: $225/night',
    pricingNote: 'Fall, Winter and Fall pricing'
  },
  'the-canopy-cove': {
    name: 'The Canopy Cove',
    title: 'A SCENIC MOUNTAIN RETREAT IN THANDIANI',
    description: 'Surrounded by lush forests, misty peaks, and fresh air, The Canopy Cove offers a secluded retreat to experience the untouched beauty of the hills with modern comforts. Whether you\'re seeking a quiet escape in Thandiani or a scenic stay near Abbottabad, this luxury tent blends serenity with convenience. Designed to complement its stunning surroundings, The Canopy Cove is more than just accommodation—it\'s a true mountain retreat.',
    features: [
      'Breathtaking Hilltop Views',
      'Cozy, Warm Interiors',
      'Secluded Yet Accessible',
      'Perfect for Adventure & Relaxation'
    ],
    images: [
      '/gallery/image4.webp',
      '/gallery/image5.webp',
      '/gallery/image6.webp',
      '/gallery/image7.webp'
    ],
    price: '$150/night*',
    weekdaysPrice: 'Weekdays: $150/night',
    weekendsPrice: 'Weekends: $175/night',
    pricingNote: ''
  },
  'the-wildwood-retreat': {
    name: 'The Wildwood Retreat',
    title: 'A SCENIC MOUNTAIN RETREAT IN THANDIANI',
    description: 'Surrounded by lush forests, misty peaks, and fresh air, The Wildwood Retreat offers a secluded retreat to experience the untouched beauty of the hills with modern comforts. Whether you\'re seeking a quiet escape in Thandiani or a scenic stay near Abbottabad, this luxury tent blends serenity with convenience. Designed to complement its stunning surroundings, The Wildwood Retreat is more than just accommodation—it\'s a true mountain retreat.',
    features: [
      'Breathtaking Hilltop Views',
      'Cozy, Warm Interiors',
      'Secluded Yet Accessible',
      'Perfect for Adventure & Relaxation'
    ],
    images: [
      '/gallery/image5.webp',
      '/gallery/image6.webp',
      '/gallery/image7.webp',
      '/gallery/image8.webp'
    ],
    price: '$150/night*',
    weekdaysPrice: 'Weekdays: $150/night',
    weekendsPrice: 'Weekends: $175/night',
    pricingNote: ''
  }
}

export default function AccommodationDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [activeTab, setActiveTab] = useState('information')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const accommodation = accommodations[slug as keyof typeof accommodations]

  // Auto-advance slides
  useEffect(() => {
    if (!accommodation) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % accommodation.images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [accommodation])

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 500)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
  }

  if (!accommodation) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accommodation Not Found</h1>
          <p className="text-gray-600">The accommodation you're looking for doesn't exist.</p>
        </div>
      </main>
    )
  }

  // Create slides from accommodation images
  const slides = accommodation.images.map((image, index) => ({
    id: index + 1,
    image,
    title: accommodation.title
  }))

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Slider */}
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
                alt={`${accommodation.name} ${slide.id}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Main Content - Title on Top */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 py-32">
            <div className="max-w-4xl">
              {/* Hero Title */}
              <div className={`text-white transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight text-shadow mb-8 whitespace-pre-line">
                  {accommodation.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
                  {accommodation.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Indicator - Absolute within slider */}
        <div className="absolute bottom-8 left-8 z-50">
          <SliderIndicator 
            currentSlide={currentSlide} 
            totalSlides={slides.length}
            onSlideChange={handleSlideChange}
          />
        </div>
      </div>
      
      <div className="pt-0 pb-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Navigation Tabs */}
          <div id="accommodation-tabs" className="flex items-center space-x-6 md:space-x-8 border-b-2 border-gray-200 mb-12 mt-12 pt-4">
            <button
              onClick={() => setActiveTab('information')}
              className={`flex items-center space-x-2 pb-4 px-3 md:px-4 transition-all duration-300 ${
                activeTab === 'information'
                  ? 'text-navigatepinawa-blue border-b-4 border-navigatepinawa-blue font-bold text-base md:text-lg'
                  : 'text-gray-500 hover:text-gray-700 font-medium text-base md:text-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Information</span>
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center space-x-2 pb-4 px-3 md:px-4 transition-all duration-300 ${
                activeTab === 'rooms'
                  ? 'text-navigatepinawa-blue border-b-4 border-navigatepinawa-blue font-bold text-base md:text-lg'
                  : 'text-gray-500 hover:text-gray-700 font-medium text-base md:text-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Rooms</span>
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center space-x-2 pb-4 px-3 md:px-4 transition-all duration-300 ${
                activeTab === 'activities'
                  ? 'text-navigatepinawa-blue border-b-4 border-navigatepinawa-blue font-bold text-base md:text-lg'
                  : 'text-gray-500 hover:text-gray-700 font-medium text-base md:text-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Activities</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center space-x-2 pb-4 px-3 md:px-4 transition-all duration-300 ${
                activeTab === 'gallery'
                  ? 'text-navigatepinawa-blue border-b-4 border-navigatepinawa-blue font-bold text-base md:text-lg'
                  : 'text-gray-500 hover:text-gray-700 font-medium text-base md:text-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Gallery & Images</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'information' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Section - Text Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6 leading-tight">
                  {accommodation.title}
                </h1>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {accommodation.description}
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {accommodation.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <p className="text-3xl font-bold text-navigatepinawa-blue mb-4">{accommodation.price}</p>
                  <div className="space-y-2 text-gray-700">
                    <p>{accommodation.weekdaysPrice}</p>
                    <p>{accommodation.weekendsPrice}</p>
                    {accommodation.pricingNote && (
                      <p className="text-sm text-gray-600 italic">{accommodation.pricingNote}</p>
                    )}
                  </div>
                </div>

                {/* Book Now Button - Enhanced Design */}
                <a
                  href="/book-now"
                  className="group inline-flex items-center justify-center bg-navigatepinawa-blue text-white uppercase font-bold px-10 py-4 rounded-lg hover:bg-blue-900 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-2">BOOK NOW</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Right Section - Image Collage */}
              <div className="grid grid-cols-2 gap-4">
                {/* Large vertical image */}
                <div className="row-span-2 relative h-full min-h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={accommodation.images[0]}
                    alt={accommodation.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Three smaller square images */}
                {accommodation.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                    <Image
                      src={image}
                      alt={`${accommodation.name} ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Room Details</h2>
                <a
                  href="/book-now"
                  className="group inline-flex items-center justify-center bg-navigatepinawa-blue text-white uppercase font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-2">BOOK NOW</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 text-navigatepinawa-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Accommodation Features
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Fully furnished with queen bed</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Private washroom & shower</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Air conditioning & heat pump</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Small kitchenette with coffee machine</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Free high-speed WiFi</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 text-navigatepinawa-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Shared Facilities
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Wood-burning sauna & hot tub access</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Private fire pit & picnic area</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Breathtaking views of Manitoba wilderness</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">Access to hiking trails</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">BBQ grill available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Activities & Experiences</h2>
                <a
                  href="/book-now"
                  className="group inline-flex items-center justify-center bg-navigatepinawa-blue text-white uppercase font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-2">BOOK NOW</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Hiking', icon: '🥾', desc: 'Explore scenic trails including Navigate Pinawa Trail and Trans Canada Trails' },
                  { name: 'Fishing', icon: '🎣', desc: 'Cast your line in nearby waters and enjoy peaceful fishing spots' },
                  { name: 'Swimming', icon: '🏊', desc: 'Cool off in natural swimming spots and nearby lakes' },
                  { name: 'Campfire', icon: '🔥', desc: 'Evening gatherings around the fire pit with friends and family' },
                  { name: 'Movie Night', icon: '🎬', desc: 'Outdoor cinema experience under the stars' },
                  { name: 'Wildlife Watching', icon: '🦌', desc: 'Observe local fauna and birds in their natural habitat' },
                  { name: 'Photography', icon: '📸', desc: 'Capture stunning landscapes and nature moments' },
                  { name: 'Stargazing', icon: '⭐', desc: 'Enjoy clear night skies perfect for stargazing' },
                  { name: 'Relaxation', icon: '🧘', desc: 'Unwind in the sauna or hot tub after a day of adventure' }
                ].map((activity, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-5xl mb-4">{activity.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{activity.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Gallery & Images</h2>
                <a
                  href="/book-now"
                  className="group inline-flex items-center justify-center bg-navigatepinawa-blue text-white uppercase font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-2">BOOK NOW</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
              {/* Improved Gallery Layout - Masonry Style */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {accommodation.images.map((image, index) => (
                  <div key={index} className="relative break-inside-avoid mb-4 rounded-lg overflow-hidden group cursor-pointer shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`${accommodation.name} ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white text-sm font-medium">View Image {index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Add more gallery images from the gallery folder */}
                {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((num) => (
                  <div key={num} className="relative break-inside-avoid mb-4 rounded-lg overflow-hidden group cursor-pointer shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={`/gallery/image${num}.webp`}
                        alt={`${accommodation.name} gallery ${num}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white text-sm font-medium">View Image {num}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

