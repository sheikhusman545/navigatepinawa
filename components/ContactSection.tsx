'use client'

import React from 'react'

export default function ContactSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      {/* CONTAINER THAT DEFINES THE WIDTH OF BAR + CONTENT */}
      <div className="relative mx-auto w-[92%] max-w-6xl">
        {/* BLUE BAR – only under the content, a bit shorter than container */}
        <div className="pointer-events-none absolute left-0 right-[10%] top-1/2 h-24 -translate-y-1/2 bg-[#202b46]" />

        {/* CONTENT ON TOP OF BAR */}
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-start">
          {/* LEFT: CONTACT INFO */}
          <div className="flex-1 md:max-w-sm">
            <h2 className="mb-4 font-sans text-4xl md:text-5xl font-semibold tracking-[0.15em] uppercase text-[#202b46]">
              CONTACT US
            </h2>

            <div className="space-y-1 text-sm leading-relaxed text-gray-500">
              <p>
                <span className="font-semibold text-[#202b46]">Phone: </span>
                +92-3-111-444-100
              </p>
              <p>
                <span className="font-semibold text-[#202b46]">Email: </span>
                reservations@navigatepinawa.pk
              </p>
            </div>
          </div>

          {/* RIGHT: FORM CARD */}
          <div className="flex-1">
            <div className="rounded-md bg-white px-6 py-8 shadow-[0_30px_70px_rgba(0,0,0,0.08)] md:px-10 md:py-10">
              <h3 className="mb-8 font-sans text-2xl md:text-3xl font-semibold tracking-[0.12em] uppercase text-[#202b46]">
                WE&apos;RE HERE TO HELP YOU
              </h3>

              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                    Name <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-200 bg-transparent pb-2 text-sm outline-none focus:border-[#202b46]"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                      Email <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full border-b border-gray-200 bg-transparent pb-2 text-sm outline-none focus:border-[#202b46]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                      Phone <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 3xx-xxxxxxx"
                      className="w-full border-b border-gray-200 bg-transparent pb-2 text-sm text-gray-400 outline-none placeholder:text-gray-300 focus:text-gray-700 focus:border-[#202b46]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                    Subject <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-200 bg-transparent pb-2 text-sm outline-none focus:border-[#202b46]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                    Message <span className="ml-1 text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="w-full resize-none border-b border-gray-200 bg-transparent pb-2 text-sm outline-none focus:border-[#202b46]"
                  />
                </div>

                {/* Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-sm bg-[#202b46] py-3 text-sm font-semibold tracking-wide text-white hover:bg-[#1a2238] transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
