'use client'

import React from 'react'

export default function PromotionalBanner() {
  return (
    <div className="fixed bottom-20 right-8 z-40 flex items-center space-x-4">
      <div className="bg-navigatepinawa-orange px-6 py-3 rounded-lg border-2 border-dashed border-orange-600">
        <p className="text-gray-900 font-bold text-sm uppercase">NAVIGATE PINAWA NOVEMBER RUSH</p>
      </div>
      <div className="bg-white px-4 py-3 rounded-lg border-2 border-dashed border-gray-400">
        <p className="text-gray-900 font-semibold text-xs">50% OFF or Free Night</p>
      </div>
    </div>
  )
}

