'use client'

import { useState, useEffect } from 'react'

// Common amenity icons (emojis)
const commonIcons = [
  '🏕️', '🔥', '🚿', '🛏️', '🍳', '☕', '❄️', '🌡️', '📶', '🚗',
  '🐕', '👶', '🏊', '🎣', '🥾', '⭐', '📸', '🎬', '🧘', '🏋️',
  '🚽', '🧴', '🧼', '🧹', '🔌', '💡', '🪑', '🛋️', '📺', '🎵',
  '🌲', '🏔️', '🌊', '🌅', '🌙', '☀️', '🌧️', '❄️', '🍖', '🥗'
]

interface Amenity {
  id: number
  name: string
  icon: string
  status: string
}

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAmenity, setEditingAmenity] = useState<number | null>(null)
  const [newAmenity, setNewAmenity] = useState({
    name: '',
    icon: '🏕️',
    status: 'Active',
  })

  // Fetch amenities from API
  useEffect(() => {
    fetchAmenities()
  }, [])

  const fetchAmenities = async () => {
    try {
      const response = await fetch('/api/amenities')
      if (response.ok) {
        const data = await response.json()
        setAmenities(data)
      } else {
        console.error('Failed to fetch amenities')
      }
    } catch (error) {
      console.error('Error fetching amenities:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAmenities = amenities.filter(amenity =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this amenity?')) {
      try {
        const response = await fetch(`/api/amenities/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setAmenities(amenities.filter(a => a.id !== id))
        } else {
          const error = await response.json()
          alert(error.error || 'Failed to delete amenity')
        }
      } catch (error) {
        console.error('Error deleting amenity:', error)
        alert('Failed to delete amenity')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/amenities', {
        method: editingAmenity ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(editingAmenity && { id: editingAmenity }),
          ...newAmenity,
        }),
      })

      if (response.ok) {
        const amenity = await response.json()
        if (editingAmenity) {
          setAmenities(amenities.map(a => a.id === editingAmenity ? amenity : a))
        } else {
          setAmenities([...amenities, amenity])
        }
        setShowAddModal(false)
        setEditingAmenity(null)
        setNewAmenity({ name: '', icon: '🏕️', status: 'Active' })
      } else {
        const error = await response.json()
        let errorMessage = error.error || 'Failed to save amenity'
        
        // Add helpful hints based on error type
        if (error.code === 'CONNECTION_ERROR' || error.message?.includes('connection')) {
          errorMessage += '\n\n💡 Database connection failed. Please check:'
          errorMessage += '\n1. DATABASE_URL is set in Vercel environment variables'
          errorMessage += '\n2. Database server is accessible'
          errorMessage += '\n3. Network/firewall allows connection'
        } else if (error.code === 'TABLE_NOT_FOUND' || error.message?.includes('table')) {
          errorMessage += '\n\n💡 Database tables not created yet.'
          errorMessage += '\nRun: npx prisma db push'
        } else if (error.message) {
          errorMessage += `\n\nDetails: ${error.message}`
        }
        
        alert(errorMessage)
        console.error('Error response:', error)
      }
    } catch (error) {
      console.error('Error saving amenity:', error)
      alert('Failed to save amenity. Please check your database connection and try again.')
    }
  }

  const handleEdit = (amenity: Amenity) => {
    setEditingAmenity(amenity.id)
    setNewAmenity({
      name: amenity.name,
      icon: amenity.icon,
      status: amenity.status,
    })
    setShowAddModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Amenities Management</h1>
          <p className="mt-2 text-gray-600">Manage amenities that can be assigned to products</p>
        </div>
        <button
          onClick={() => {
            setEditingAmenity(null)
            setNewAmenity({ name: '', icon: '🏕️', status: 'Active' })
            setShowAddModal(true)
          }}
          className="inline-flex items-center justify-center px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
        >
          <span className="mr-2">+</span>
          Add New Amenity
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <input
          type="text"
          placeholder="Search amenities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navigatepinawa-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amenities...</p>
        </div>
      )}

      {/* Amenities Grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAmenities.map((amenity) => (
          <div
            key={amenity.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{amenity.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{amenity.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                    amenity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {amenity.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEdit(amenity)}
                className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(amenity.id)}
                className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
            ))}
          </div>

          {filteredAmenities.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No amenities found</p>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Amenity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingAmenity ? 'Edit Amenity' : 'Add New Amenity'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenity Name</label>
                <input
                  type="text"
                  value={newAmenity.name}
                  onChange={(e) => setNewAmenity(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Air Conditioning"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl border-2 border-gray-300 rounded-lg p-3 bg-gray-50">
                      {newAmenity.icon}
                    </div>
                    <input
                      type="text"
                      value={newAmenity.icon}
                      onChange={(e) => setNewAmenity(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="Enter emoji or icon"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Quick select:</p>
                    <div className="grid grid-cols-10 gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                      {commonIcons.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setNewAmenity(prev => ({ ...prev, icon }))}
                          className={`text-2xl p-2 rounded hover:bg-gray-200 transition-colors ${
                            newAmenity.icon === icon ? 'bg-navigatepinawa-blue/20 ring-2 ring-navigatepinawa-blue' : ''
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newAmenity.status}
                  onChange={(e) => setNewAmenity(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingAmenity(null)
                    setNewAmenity({ name: '', icon: '🏕️', status: 'Active' })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900"
                >
                  {editingAmenity ? 'Update' : 'Add'} Amenity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

