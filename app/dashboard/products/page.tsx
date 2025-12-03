'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mock products data
const mockProducts = [
  { id: 1, name: 'The Starlight Haven', category: 'Glamping Pods', price: '$200', status: 'Active', image: '/gallery/image1.webp', bookings: 45 },
  { id: 2, name: 'The Spruce Bliss Pod', category: 'Glamping Pods', price: '$200', status: 'Active', image: '/gallery/image2.webp', bookings: 38 },
  { id: 3, name: 'The Pine Loft Bunkie', category: 'Bunkies', price: '$200', status: 'Active', image: '/gallery/image3.webp', bookings: 32 },
  { id: 4, name: 'The Canopy Cove', category: 'Luxury Tents', price: '$150', status: 'Active', image: '/gallery/image4.webp', bookings: 28 },
  { id: 5, name: 'The Wildwood Retreat', category: 'Luxury Tents', price: '$150', status: 'Inactive', image: '/gallery/image5.webp', bookings: 25 },
]

const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [amenities, setAmenities] = useState<Array<{ id: number; name: string; icon: string; status: string }>>([])
  const [dbCategories, setDbCategories] = useState<Array<{ id: number; name: string }>>([])

  // new product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Glamping Pods',
    status: 'Active',
    description: '',
    mainImage: '',
    galleryImages: [] as string[],
    maxGuests: '',
    selectedAmenities: [] as number[], // Array of amenity IDs
    baseWeekdayPrice: '',
    baseWeekendPrice: '',
    hasSale: false,
    saleWeekdayPrice: '',
    saleWeekendPrice: '',
    saleMonths: [] as string[],
    saleExcludeWeekdays: [] as string[],
    saleExcludeDates: [] as Date[], // Array of Date objects
  })

  // Fetch amenities and categories on component mount
  useEffect(() => {
    Promise.all([
      fetch('/api/amenities').then(res => res.json()).catch(() => []),
      fetch('/api/categories').then(res => res.json()).catch(() => [])
    ]).then(([amenitiesData, categoriesData]) => {
      setAmenities(amenitiesData || [])
      setDbCategories(categoriesData || [])
    })
  }, [])

  // Handle image upload
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

  // Handle main image upload
  const handleMainImageUpload = async (files: File[]): Promise<string[]> => {
    const urls = await handleImageUpload(files)
    if (urls.length > 0) {
      setNewProduct(prev => ({ ...prev, mainImage: urls[0] }))
    }
    return urls
  }

  // Handle gallery images upload
  const handleGalleryUpload = async (files: File[]): Promise<string[]> => {
    const urls = await handleImageUpload(files)
    setNewProduct(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...urls] }))
    return urls
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory
    const matchesStatus = filterStatus === 'All' || product.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const handleToggleMonth = (month: string) => {
    setNewProduct(prev => ({
      ...prev,
      saleMonths: prev.saleMonths.includes(month)
        ? prev.saleMonths.filter(m => m !== month)
        : [...prev.saleMonths, month],
    }))
  }

  const handleToggleWeekday = (day: string) => {
    setNewProduct(prev => ({
      ...prev,
      saleExcludeWeekdays: prev.saleExcludeWeekdays.includes(day)
        ? prev.saleExcludeWeekdays.filter(d => d !== day)
        : [...prev.saleExcludeWeekdays, day],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Submit to API
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.baseWeekdayPrice || newProduct.baseWeekendPrice || '0',
          categoryId: 1, // You'll need to get this from categories
          status: newProduct.status,
          mainImage: newProduct.mainImage,
          gallery: newProduct.galleryImages,
          maxGuests: newProduct.maxGuests ? parseInt(newProduct.maxGuests) : null,
          amenities: newProduct.selectedAmenities,
          pricing: {
            baseWeekdayPrice: newProduct.baseWeekdayPrice,
            baseWeekendPrice: newProduct.baseWeekendPrice,
            sale: newProduct.hasSale ? {
              weekdayPrice: newProduct.saleWeekdayPrice,
              weekendPrice: newProduct.saleWeekendPrice,
              months: newProduct.saleMonths,
              excludeWeekdays: newProduct.saleExcludeWeekdays,
              excludeDates: newProduct.saleExcludeDates.map(date => date.toISOString().split('T')[0]),
            } : null,
          },
        }),
      })

      if (response.ok) {
        const created = await response.json()
        setProducts(prev => [...prev, {
          id: created.id,
          name: created.name,
          category: created.category?.name || newProduct.category,
          price: `$${created.price}`,
          status: created.status,
          image: created.mainImage || '/gallery/image1.webp',
          bookings: 0,
        }])
        setShowAddModal(false)
        // Reset form
        setNewProduct({
          name: '',
          category: 'Glamping Pods',
          status: 'Active',
          description: '',
          mainImage: '',
          galleryImages: [],
          maxGuests: '',
          selectedAmenities: [],
          baseWeekdayPrice: '',
          baseWeekendPrice: '',
          hasSale: false,
          saleWeekdayPrice: '',
          saleWeekendPrice: '',
          saleMonths: [],
          saleExcludeWeekdays: [],
          saleExcludeDates: [],
        })
      } else {
        throw new Error('Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="mt-2 text-gray-600">Manage all glamping accommodations and products</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
        >
          <span className="mr-2">+</span>
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-navigatepinawa-blue">{product.price}</span>
                <span className="text-sm text-gray-500">{product.bookings} bookings</span>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/dashboard/products/${product.id}/edit`}
                  className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Edit
                </Link>
                <Link
                  href={`/dashboard/products/${product.id}`}
                  className="flex-1 text-center px-3 py-2 text-sm bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Product</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Basic info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  >
                    {dbCategories.length > 0 ? (
                      dbCategories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))
                    ) : (
                      <>
                        <option>Glamping Pods</option>
                        <option>Luxury Tents</option>
                        <option>Bunkies</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newProduct.status}
                    onChange={(e) => setNewProduct(p => ({ ...p, status: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Base Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Weekday Price (Mon–Thu)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 200"
                      value={newProduct.baseWeekdayPrice}
                      onChange={(e) => setNewProduct(p => ({ ...p, baseWeekdayPrice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Weekend / Normal Price (Fri–Sun)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 250"
                      value={newProduct.baseWeekendPrice}
                      onChange={(e) => setNewProduct(p => ({ ...p, baseWeekendPrice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Sale / Seasonal pricing */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Sale / Seasonal Pricing</h3>
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={newProduct.hasSale}
                      onChange={(e) => setNewProduct(p => ({ ...p, hasSale: e.target.checked }))}
                      className="rounded border-gray-300 text-navigatepinawa-blue focus:ring-navigatepinawa-blue"
                    />
                    <span>Enable sale pricing</span>
                  </label>
                </div>

                {newProduct.hasSale && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Sale Weekday Price (Mon–Thu)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 180"
                          value={newProduct.saleWeekdayPrice}
                          onChange={(e) => setNewProduct(p => ({ ...p, saleWeekdayPrice: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Sale Weekend Price (Fri–Sun)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 200"
                          value={newProduct.saleWeekendPrice}
                          onChange={(e) => setNewProduct(p => ({ ...p, saleWeekendPrice: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                        />
                      </div>
                    </div>

                    {/* Excluded Dates Calendar */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        Exclude Specific Dates
                      </label>
                      <div className="space-y-2">
                        <DatePicker
                          selected={null}
                          onChange={(date: Date | null) => {
                            if (date) {
                              setNewProduct(prev => ({
                                ...prev,
                                saleExcludeDates: [...prev.saleExcludeDates, date]
                              }))
                            }
                          }}
                          minDate={new Date()}
                          placeholderText="Click to select dates to exclude"
                          isClearable
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue text-sm"
                          dateFormat="yyyy-MM-dd"
                        />
                        {newProduct.saleExcludeDates.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newProduct.saleExcludeDates.map((date, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200"
                              >
                                {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewProduct(prev => ({
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
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-2">
                        Applicable Months
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {months.map(m => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => handleToggleMonth(m)}
                            className={`text-xs px-2 py-1 rounded-full border ${
                              newProduct.saleMonths.includes(m)
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
                      <p className="text-xs font-medium text-gray-600 mb-2">
                        Exclude Days of Week (inside those months)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {weekdays.map(d => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => handleToggleWeekday(d)}
                            className={`text-xs px-2 py-1 rounded-full border ${
                              newProduct.saleExcludeWeekdays.includes(d)
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-700 border-gray-300'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <p className="mt-1 text-[11px] text-gray-500">
                        Example: exclude Fri/Sat if you don&apos;t want sale price on weekends.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                ></textarea>
              </div>

              {/* Maximum Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 4"
                  value={newProduct.maxGuests}
                  onChange={(e) => setNewProduct(p => ({ ...p, maxGuests: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                />
              </div>

              {/* Amenities Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <p className="text-xs text-gray-500 mb-3">Select amenities available for this product</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {amenities.filter(a => a.status === 'Active').map((amenity) => (
                    <label
                      key={amenity.id}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        newProduct.selectedAmenities.includes(amenity.id)
                          ? 'bg-navigatepinawa-blue/10 border-navigatepinawa-blue'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newProduct.selectedAmenities.includes(amenity.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewProduct(prev => ({
                              ...prev,
                              selectedAmenities: [...prev.selectedAmenities, amenity.id]
                            }))
                          } else {
                            setNewProduct(prev => ({
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
                {amenities.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No amenities available. Add amenities first.</p>
                )}
              </div>

              {/* Main Image Upload */}
              <ImageUpload
                label="Main Product Image"
                onUpload={handleMainImageUpload}
                existingImages={newProduct.mainImage ? [newProduct.mainImage] : []}
                multiple={false}
              />

              {/* Gallery Images Upload */}
              <ImageUpload
                label="Gallery Images"
                onUpload={handleGalleryUpload}
                existingImages={newProduct.galleryImages}
                multiple={true}
              />

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
