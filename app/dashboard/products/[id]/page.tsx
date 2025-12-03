'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  description: string
  price: string
  category: string
  status: string
  image: string
  maxGuests?: number
  amenities?: Array<{ id: number; name: string; icon: string }>
}

export default function ProductViewPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch product data from API
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setProduct({
            id: data.id,
            name: data.name,
            description: data.description || '',
            price: `$${data.price}`,
            category: data.category?.name || 'Unknown',
            status: data.status,
            image: data.mainImage || '/gallery/image1.webp',
            maxGuests: data.maxGuests,
            amenities: data.amenities?.map((pa: any) => ({
              id: pa.amenity.id,
              name: pa.amenity.name,
              icon: pa.amenity.icon,
            })) || [],
          })
        } else {
          // Fallback to mock data if API fails
          setProduct({
            id: parseInt(productId),
            name: 'The Starlight Haven',
            description: 'Surrounded by lush forests, misty peaks, and fresh air, The Starlight Haven offers a secluded retreat to experience the untouched beauty of the hills with modern comforts.',
            price: '$200',
            category: 'Glamping Pods',
            status: 'Active',
            image: '/gallery/image1.webp',
            maxGuests: 4,
            amenities: [
              { id: 1, name: 'Air Conditioning', icon: '❄️' },
              { id: 2, name: 'Kitchenette', icon: '🍳' },
              { id: 3, name: 'Private Bathroom', icon: '🚿' },
              { id: 4, name: 'WiFi', icon: '📶' },
            ]
          })
        }
        setLoading(false)
      })
      .catch(() => {
        // Fallback to mock data on error
        setProduct({
          id: parseInt(productId),
          name: 'The Starlight Haven',
          description: 'Surrounded by lush forests, misty peaks, and fresh air, The Starlight Haven offers a secluded retreat to experience the untouched beauty of the hills with modern comforts.',
          price: '$200',
          category: 'Glamping Pods',
          status: 'Active',
          image: '/gallery/image1.webp',
          maxGuests: 4,
          amenities: [
            { id: 1, name: 'Air Conditioning', icon: '❄️' },
            { id: 2, name: 'Kitchenette', icon: '🍳' },
            { id: 3, name: 'Private Bathroom', icon: '🚿' },
            { id: 4, name: 'WiFi', icon: '📶' },
          ]
        })
        setLoading(false)
      })
  }, [productId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navigatepinawa-blue"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/dashboard/products" className="text-navigatepinawa-blue hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/dashboard/products" className="text-navigatepinawa-blue hover:underline mb-2 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-600">View product details</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/dashboard/products/${productId}/edit`}
            className="inline-flex items-center justify-center px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
          >
            Edit Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-96">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Amenities */}
          {product.amenities && product.amenities.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{amenity.icon}</span>
                    <span className="text-gray-700 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Price</label>
                <p className="text-2xl font-bold text-navigatepinawa-blue mt-1">{product.price}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-gray-900 mt-1">{product.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                </p>
              </div>
              {product.maxGuests && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Maximum Guests</label>
                  <p className="text-gray-900 mt-1">{product.maxGuests} guests</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <Link
                href={`/dashboard/products/${productId}/edit`}
                className="block w-full text-center px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
              >
                Edit Product
              </Link>
              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this product?')) {
                    try {
                      const response = await fetch(`/api/products/${productId}`, {
                        method: 'DELETE',
                      })
                      if (response.ok) {
                        router.push('/dashboard/products')
                      } else {
                        alert('Failed to delete product')
                      }
                    } catch (error) {
                      console.error('Error deleting product:', error)
                      alert('Failed to delete product')
                    }
                  }
                }}
                className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

