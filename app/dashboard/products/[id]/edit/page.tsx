'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string
  const [loading, setLoading] = useState(true)
  const [amenities, setAmenities] = useState<Array<{ id: number; name: string; icon: string; status: string }>>([])
  
  const [product, setProduct] = useState({
    name: '',
    category: 'Glamping Pods',
    status: 'Active',
    description: '',
    mainImage: '',
    galleryImages: [] as string[],
    maxGuests: '',
    selectedAmenities: [] as number[],
    baseWeekdayPrice: '',
    baseWeekendPrice: '',
    hasSale: false,
    saleWeekdayPrice: '',
    saleWeekendPrice: '',
    saleMonths: [] as string[],
    saleExcludeWeekdays: [] as string[],
    saleExcludeDates: [] as Date[],
  })

  useEffect(() => {
    // Fetch product data and amenities
    Promise.all([
      fetch(`/api/products/${productId}`).then(res => res.json()),
      fetch('/api/amenities').then(res => res.json())
    ]).then(([productData, amenitiesData]) => {
      if (productData) {
        setProduct({
          name: productData.name || '',
          category: productData.category?.name || 'Glamping Pods',
          status: productData.status || 'Active',
          description: productData.description || '',
          mainImage: productData.mainImage || '',
          galleryImages: productData.gallery?.map((img: any) => img.url) || [],
          maxGuests: productData.maxGuests?.toString() || '',
          selectedAmenities: productData.amenities?.map((pa: any) => pa.amenityId) || [],
          baseWeekdayPrice: productData.baseWeekdayPrice || '',
          baseWeekendPrice: productData.baseWeekendPrice || '',
          hasSale: !!productData.salePrice,
          saleWeekdayPrice: productData.saleWeekdayPrice || '',
          saleWeekendPrice: productData.saleWeekendPrice || '',
          saleMonths: productData.saleMonths || [],
          saleExcludeWeekdays: productData.saleExcludeWeekdays || [],
          saleExcludeDates: productData.saleExcludeDates?.map((date: string) => new Date(date)) || [],
        })
      }
      setAmenities(amenitiesData || [])
      setLoading(false)
    }).catch(() => {
      // Use mock data for now
      setProduct({
        name: 'The Starlight Haven',
        category: 'Glamping Pods',
        status: 'Active',
        description: 'Surrounded by lush forests, misty peaks, and fresh air...',
        mainImage: '/gallery/image1.webp',
        galleryImages: ['/gallery/image2.webp', '/gallery/image3.webp'],
        maxGuests: '4',
        selectedAmenities: [1, 2, 3],
        baseWeekdayPrice: '200',
        baseWeekendPrice: '225',
        hasSale: false,
        saleWeekdayPrice: '',
        saleWeekendPrice: '',
        saleMonths: [],
        saleExcludeWeekdays: [],
        saleExcludeDates: [],
      })
      setAmenities([
        { id: 1, name: 'Air Conditioning', icon: '❄️', status: 'Active' },
        { id: 2, name: 'Kitchenette', icon: '🍳', status: 'Active' },
        { id: 3, name: 'Private Bathroom', icon: '🚿', status: 'Active' },
      ])
      setLoading(false)
    })
  }, [productId])

  const handleImageUpload = async (files: File[]): Promise<string[]> => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload images')
    }

    const data = await response.json()
    return data.urls
  }

  const handleMainImageUpload = async (files: File[]): Promise<string[]> => {
    const urls = await handleImageUpload(files)
    if (urls.length > 0) {
      setProduct(prev => ({ ...prev, mainImage: urls[0] }))
    }
    return urls
  }

  const handleGalleryUpload = async (files: File[]): Promise<string[]> => {
    const urls = await handleImageUpload(files)
    setProduct(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...urls] }))
    return urls
  }

  const handleToggleMonth = (month: string) => {
    setProduct(prev => ({
      ...prev,
      saleMonths: prev.saleMonths.includes(month)
        ? prev.saleMonths.filter(m => m !== month)
        : [...prev.saleMonths, month],
    }))
  }

  const handleToggleWeekday = (day: string) => {
    setProduct(prev => ({
      ...prev,
      saleExcludeWeekdays: prev.saleExcludeWeekdays.includes(day)
        ? prev.saleExcludeWeekdays.filter(d => d !== day)
        : [...prev.saleExcludeWeekdays, day],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.baseWeekdayPrice || product.baseWeekendPrice || '0',
          categoryId: 1,
          status: product.status,
          mainImage: product.mainImage,
          gallery: product.galleryImages,
          maxGuests: product.maxGuests ? parseInt(product.maxGuests) : null,
          amenities: product.selectedAmenities,
          pricing: {
            baseWeekdayPrice: product.baseWeekdayPrice,
            baseWeekendPrice: product.baseWeekendPrice,
            sale: product.hasSale ? {
              weekdayPrice: product.saleWeekdayPrice,
              weekendPrice: product.saleWeekendPrice,
              months: product.saleMonths,
              excludeWeekdays: product.saleExcludeWeekdays,
              excludeDates: product.saleExcludeDates.map(date => date.toISOString().split('T')[0]),
            } : null,
          },
        }),
      })

      if (response.ok) {
        router.push(`/dashboard/products/${productId}`)
      } else {
        throw new Error('Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navigatepinawa-blue"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href={`/dashboard/products/${productId}`} className="text-navigatepinawa-blue hover:underline mb-2 inline-block">
            ← Back to View
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-2 text-gray-600">Update product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={product.category}
                      onChange={(e) => setProduct(p => ({ ...p, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                    >
                      <option>Glamping Pods</option>
                      <option>Luxury Tents</option>
                      <option>Bunkies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={product.status}
                      onChange={(e) => setProduct(p => ({ ...p, status: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={product.description}
                    onChange={(e) => setProduct(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 4"
                    value={product.maxGuests}
                    onChange={(e) => setProduct(p => ({ ...p, maxGuests: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Base Pricing</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Weekday Price (Mon–Thu)</label>
                      <input
                        type="number"
                        placeholder="e.g. 200"
                        value={product.baseWeekdayPrice}
                        onChange={(e) => setProduct(p => ({ ...p, baseWeekdayPrice: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Weekend Price (Fri–Sun)</label>
                      <input
                        type="number"
                        placeholder="e.g. 250"
                        value={product.baseWeekendPrice}
                        onChange={(e) => setProduct(p => ({ ...p, baseWeekendPrice: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Sale Pricing */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Sale / Seasonal Pricing</h3>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={product.hasSale}
                        onChange={(e) => setProduct(p => ({ ...p, hasSale: e.target.checked }))}
                        className="rounded border-gray-300 text-navigatepinawa-blue focus:ring-navigatepinawa-blue"
                      />
                      <span>Enable sale pricing</span>
                    </label>
                  </div>

                  {product.hasSale && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Sale Weekday Price</label>
                          <input
                            type="number"
                            placeholder="e.g. 180"
                            value={product.saleWeekdayPrice}
                            onChange={(e) => setProduct(p => ({ ...p, saleWeekdayPrice: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Sale Weekend Price</label>
                          <input
                            type="number"
                            placeholder="e.g. 200"
                            value={product.saleWeekendPrice}
                            onChange={(e) => setProduct(p => ({ ...p, saleWeekendPrice: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Exclude Specific Dates</label>
                        <DatePicker
                          selected={null}
                          onChange={(date: Date | null) => {
                            if (date) {
                              setProduct(prev => ({
                                ...prev,
                                saleExcludeDates: [...prev.saleExcludeDates, date]
                              }))
                            }
                          }}
                          minDate={new Date()}
                          placeholderText="Click to select dates to exclude"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue text-sm"
                          dateFormat="yyyy-MM-dd"
                        />
                        {product.saleExcludeDates.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {product.saleExcludeDates.map((date, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200"
                              >
                                {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setProduct(prev => ({
                                      ...prev,
                                      saleExcludeDates: prev.saleExcludeDates.filter((_, i) => i !== index)
                                    }))
                                  }}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">Applicable Months</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {months.map(m => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => handleToggleMonth(m)}
                              className={`text-xs px-2 py-1 rounded-full border ${
                                product.saleMonths.includes(m)
                                  ? 'bg-navigatepinawa-blue text-white border-navigatepinawa-blue'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }`}
                            >
                              {m.slice(0,3)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">Exclude Days of Week</p>
                        <div className="flex flex-wrap gap-2">
                          {weekdays.map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => handleToggleWeekday(d)}
                              className={`text-xs px-2 py-1 rounded-full border ${
                                product.saleExcludeWeekdays.includes(d)
                                  ? 'bg-gray-900 text-white border-gray-900'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Images</h2>
              <div className="space-y-6">
                <ImageUpload
                  label="Main Product Image"
                  onUpload={handleMainImageUpload}
                  existingImages={product.mainImage ? [product.mainImage] : []}
                  multiple={false}
                />
                <ImageUpload
                  label="Gallery Images"
                  onUpload={handleGalleryUpload}
                  existingImages={product.galleryImages}
                  multiple={true}
                />
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
                {amenities.filter(a => a.status === 'Active').map((amenity) => (
                  <label
                    key={amenity.id}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      product.selectedAmenities.includes(amenity.id)
                        ? 'bg-navigatepinawa-blue/10 border-navigatepinawa-blue'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={product.selectedAmenities.includes(amenity.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProduct(prev => ({
                            ...prev,
                            selectedAmenities: [...prev.selectedAmenities, amenity.id]
                          }))
                        } else {
                          setProduct(prev => ({
                            ...prev,
                            selectedAmenities: prev.selectedAmenities.filter(id => id !== amenity.id)
                          }))
                        }
                      }}
                      className="rounded border-gray-300 text-navigatepinawa-blue focus:ring-navigatepinawa-blue"
                    />
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <Link
                  href={`/dashboard/products/${productId}`}
                  className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

