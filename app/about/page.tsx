import Header from '@/components/Header'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Image Section */}
      <section className="relative h-[300px] sm:h-[400px] w-full mt-16 sm:mt-20">
        <Image
          src="/gallery/image18.webp"
          alt="Navigate Pinawa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase text-center">
            About Navigate Pinawa
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Our Story */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Navigate Pinawa is spread at around 65 acres right across from the Old Pinawa Provincial Park, we believe in the power of nature to bring people together. Our campground share's trails with Trans Canada Trails and Sno-man trail. That's why we created this glamping campground, to offer a place where families and friends can disconnect from their busy lives and reconnect with each other and the natural world.
              </p>
              <p>
                Navigate Pinawa is headed by the great adventurer and Outdoor enthusiast Pranav Sahi, an excellent individual, who has been providing unique experimental accommodations to his guests for years. In collaboration with Cabin Life Rentals, we have conceived a vision to bring the concept of glamping accommodation, which goes beyond limits of the ordinary while ensuring sustainability for one-of-a-kind tourism experience to Manitoba.
              </p>
            </div>
          </div>

          {/* Our Facilities */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Facilities</h2>
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                We offer a variety of amenities to make your stay comfortable and enjoyable, including clean restrooms, kitchenette and showers. We also offer a complete spa experience with wood burning hot-tubs, saunas and plunge pools.
              </p>
              <p>
                In total our campground offers, 2 luxury Pods, 1 luxury bunkies and 2 luxury fully furnished A-Frame tents, 5 more sites will be opening by fall.
              </p>
            </div>
          </div>

          {/* Activities */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Activities</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              There's never a dull moment at Navigate Pinawa! Whether you enjoy hiking, fishing, swimming, or just relaxing by the campfire, movie night, there's something for everyone here. Check out our calendar of events to see what's happening during your stay.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

