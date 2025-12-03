'use client'

import { useState } from 'react'

// Mock discounts data
const mockDiscounts = [
  { id: 1, code: 'WELCOME20', type: 'Percentage', value: '20%', minPurchase: '$100', usage: 45, limit: 100, status: 'Active', expiry: '2024-12-31' },
  { id: 2, code: 'SUMMER50', type: 'Fixed', value: '$50', minPurchase: '$200', usage: 12, limit: 50, status: 'Active', expiry: '2024-08-31' },
  { id: 3, code: 'NOVEMBER', type: 'Percentage', value: '50%', minPurchase: '$150', usage: 100, limit: 100, status: 'Expired', expiry: '2023-11-30' },
  { id: 4, code: 'FIRST50', type: 'Fixed', value: '$25', minPurchase: '$100', usage: 8, limit: 200, status: 'Active', expiry: '2024-06-30' },
]

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState(mockDiscounts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || discount.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this discount code?')) {
      setDiscounts(discounts.filter(d => d.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discounts Management</h1>
          <p className="mt-2 text-gray-600">Create and manage discount codes and promotions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
        >
          <span className="mr-2">+</span>
          Create Discount
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search discount codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent"
            />
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
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Purchase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDiscounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono font-bold text-gray-900">{discount.code}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{discount.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.minPurchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {discount.usage} / {discount.limit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.expiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      discount.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {discount.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-navigatepinawa-blue hover:underline">Edit</button>
                    <button onClick={() => handleDelete(discount.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDiscounts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No discounts found</p>
          </div>
        )}
      </div>

      {/* Add Discount Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Discount Code</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Code</label>
                <input
                  type="text"
                  placeholder="WELCOME20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue">
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input
                    type="text"
                    placeholder="20% or $50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Purchase</label>
                  <input
                    type="text"
                    placeholder="$100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navigatepinawa-blue"
                />
              </div>
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
                  Create Discount
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

