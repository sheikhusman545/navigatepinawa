'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data for stats
const stats = [
  { name: 'Total Users', value: '1,234', change: '+12%', changeType: 'positive', icon: '👥' },
  { name: 'Total Orders', value: '856', change: '+8%', changeType: 'positive', icon: '📦' },
  { name: 'Revenue', value: '$45,678', change: '+23%', changeType: 'positive', icon: '💰' },
  { name: 'Active Products', value: '24', change: '+2', changeType: 'positive', icon: '🏕️' },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'The Starlight Haven', amount: '$200', status: 'Completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'The Spruce Bliss Pod', amount: '$200', status: 'Pending', date: '2024-01-14' },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'The Pine Loft Bunkie', amount: '$200', status: 'Processing', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Sarah Williams', product: 'The Canopy Cove', amount: '$150', status: 'Completed', date: '2024-01-13' },
  { id: '#ORD-005', customer: 'David Brown', product: 'The Wildwood Retreat', amount: '$150', status: 'Cancelled', date: '2024-01-12' },
]

const topProducts = [
  { name: 'The Starlight Haven', bookings: 45, revenue: '$9,000' },
  { name: 'The Spruce Bliss Pod', bookings: 38, revenue: '$7,600' },
  { name: 'The Pine Loft Bunkie', bookings: 32, revenue: '$6,400' },
  { name: 'The Canopy Cove', bookings: 28, revenue: '$4,200' },
  { name: 'The Wildwood Retreat', bookings: 25, revenue: '$3,750' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`mt-2 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Chart will be displayed here</p>
              <p className="text-gray-400 text-xs mt-1">Integration with chart library needed</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
            <Link href="/dashboard/products" className="text-sm text-navigatepinawa-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navigatepinawa-blue text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.bookings} bookings</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm text-navigatepinawa-blue hover:underline">
              View all orders
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/dashboard/orders/${order.id}`} className="text-navigatepinawa-blue hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

