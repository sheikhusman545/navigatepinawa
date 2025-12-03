'use client'

import { useState } from 'react'

// Mock categories data
const mockCategories = [
  { id: 1, name: 'Glamping Pods', description: 'Luxury glamping pods with modern amenities', products: 2, status: 'Active' },
  { id: 2, name: 'Luxury Tents', description: 'Spacious luxury tents for nature lovers', products: 2, status: 'Active' },
  { id: 3, name: 'Bunkies', description: 'Cozy cabin-style accommodations', products: 1, status: 'Active' },
  { id: 4, name: 'Premium Sites', description: 'Premium camping sites with full amenities', products: 0, status: 'Inactive' },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<number | null>(null)

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="mt-2 text-gray-600">Organize your products into categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null)
            setShowAddModal(true)
          }}
          className="inline-flex items-center justify-center px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
        >
          <span className="mr-2">+</span>
          Add New Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {category.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">{category.products} products</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingCategory(category.id)
                    setShowAddModal(true)
                  }}
                  className="text-sm text-navigatepinawa-blue hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No categories found</p>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  defaultValue={editingCategory ? categories.find(c => c.id === editingCategory)?.name : ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue={editingCategory ? categories.find(c => c.id === editingCategory)?.description : ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  defaultValue={editingCategory ? categories.find(c => c.id === editingCategory)?.status : 'Active'}
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
                    setEditingCategory(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

