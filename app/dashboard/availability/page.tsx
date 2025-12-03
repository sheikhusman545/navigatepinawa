'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  mainImage: string
  status: string
  bookings?: Booking[]
}

interface Booking {
  id: number
  startDate: string
  endDate: string
  status: string
}

// Mock data - replace with API call
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'The Starlight Haven',
    mainImage: '/gallery/image1.webp',
    status: 'Active',
    bookings: [
      { id: 1, startDate: '2024-12-05', endDate: '2024-12-07', status: 'Confirmed' },
      { id: 2, startDate: '2024-12-15', endDate: '2024-12-18', status: 'Confirmed' },
    ]
  },
  {
    id: 2,
    name: 'The Spruce Bliss Pod',
    mainImage: '/gallery/image2.webp',
    status: 'Active',
    bookings: [
      { id: 3, startDate: '2024-12-10', endDate: '2024-12-12', status: 'Confirmed' },
    ]
  },
  {
    id: 3,
    name: 'The Pine Loft Bunkie',
    mainImage: '/gallery/image3.webp',
    status: 'Active',
    bookings: []
  },
  {
    id: 4,
    name: 'The Canopy Cove',
    mainImage: '/gallery/image4.webp',
    status: 'Active',
    bookings: [
      { id: 4, startDate: '2024-12-08', endDate: '2024-12-10', status: 'Confirmed' },
      { id: 5, startDate: '2024-12-20', endDate: '2024-12-22', status: 'Confirmed' },
    ]
  },
  {
    id: 5,
    name: 'The Wildwood Retreat',
    mainImage: '/gallery/image5.webp',
    status: 'Active',
    bookings: []
  },
]

export default function AvailabilityPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  // Fetch products with bookings from API
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetch('/api/products?includeBookings=true')
    //   .then(res => res.json())
    //   .then(data => setProducts(data))
    //   .catch(err => console.error('Error fetching products:', err))
  }, [])

  const isOccupied = (product: Product, date: string) => {
    if (!product.bookings || product.bookings.length === 0) return false
    const checkDate = new Date(date)
    return product.bookings.some(booking => {
      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)
      return checkDate >= start && checkDate <= end && booking.status === 'Confirmed'
    })
  }

  const getUpcomingBookings = (product: Product) => {
    if (!product.bookings || product.bookings.length === 0) return []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return product.bookings
      .filter(booking => {
        const endDate = new Date(booking.endDate)
        return endDate >= today && booking.status === 'Confirmed'
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 3) // Show next 3 bookings
  }

  const getStatus = (product: Product) => {
    const today = new Date().toISOString().split('T')[0]
    const occupied = isOccupied(product, today)
    return occupied ? 'Occupied' : 'Available'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusColor = (status: string) => {
    return status === 'Occupied' 
      ? 'bg-red-500' 
      : 'bg-green-500'
  }

  const getStatusIcon = (status: string) => {
    return status === 'Occupied' ? '🏕️' : '🏕️'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accommodation Availability</h1>
          <p className="mt-2 text-gray-600">View real-time occupancy status of all glamping accommodations</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
          />
          <Link
            href="/dashboard/products"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {/* Status Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-700">Inactive</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const status = getStatus(product)
          const upcomingBookings = getUpcomingBookings(product)
          const isCurrentlyOccupied = isOccupied(product, selectedDate)
          const statusColor = isCurrentlyOccupied ? 'bg-red-500' : 'bg-green-500'
          const statusText = isCurrentlyOccupied ? 'Occupied' : 'Available'

          return (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all hover:shadow-xl ${
                isCurrentlyOccupied ? 'border-red-200' : 'border-green-200'
              }`}
            >
              {/* Image with Status Overlay */}
              <div className="relative h-64 w-full">
                <Image
                  src={product.mainImage || '/gallery/image1.webp'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <div
                    className={`${statusColor} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center space-x-2`}
                  >
                    <span>{isCurrentlyOccupied ? '🏕️' : '🏕️'}</span>
                    <span>{statusText}</span>
                  </div>
                </div>

                {/* Occupied Overlay */}
                {isCurrentlyOccupied && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🏕️</div>
                      <div className="text-white font-bold text-xl">OCCUPIED</div>
                    </div>
                  </div>
                )}

                {/* Available Overlay */}
                {!isCurrentlyOccupied && product.status === 'Active' && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🏕️</div>
                      <div className="text-white font-bold text-xl drop-shadow-lg">AVAILABLE</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h3>

                {/* Current Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Status for {formatDate(selectedDate)}:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isCurrentlyOccupied
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {statusText}
                    </span>
                  </div>
                </div>

                {/* Upcoming Bookings */}
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Upcoming Bookings:</h4>
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-red-50 border border-red-200 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-medium text-red-800">
                              {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                            </div>
                            <div className="text-xs text-red-600 mt-1">
                              {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))} nights
                            </div>
                          </div>
                          <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-semibold">
                            Booked
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm text-green-800 font-medium">
                      ✓ No upcoming bookings - Available for reservation
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="flex-1 text-center px-3 py-2 text-sm bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Accommodations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
            </div>
            <div className="text-4xl">🏕️</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Currently Occupied</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {products.filter(p => isOccupied(p, selectedDate)).length}
              </p>
            </div>
            <div className="text-4xl">🔴</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Now</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {products.filter(p => !isOccupied(p, selectedDate) && p.status === 'Active').length}
              </p>
            </div>
            <div className="text-4xl">🟢</div>
          </div>
        </div>
      </div>
    </div>
  )
}

