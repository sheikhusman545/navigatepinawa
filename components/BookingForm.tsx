'use client'

import React, { useState } from 'react'

export default function BookingForm() {
  const [location, setLocation] = useState('')
  const [dates, setDates] = useState('')
  const [rooms, setRooms] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ location, dates, rooms })
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Where Are You Going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navigatepinawa-blue text-gray-900"
          />
        </div>

        {/* Check In/Out Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Check In / Out
          </label>
          <input
            type="text"
            placeholder="Add Dates"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navigatepinawa-blue text-gray-900"
          />
        </div>

        {/* No. Of Rooms Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            No. Of Rooms
          </label>
          <input
            type="text"
            placeholder="Add Rooms"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navigatepinawa-blue text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-navigatepinawa-blue text-white uppercase font-semibold py-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2"
        >
          <span>CHECK AVAILABILITY</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

