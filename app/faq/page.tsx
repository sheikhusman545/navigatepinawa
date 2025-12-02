'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface FAQ {
  keywords: string[]
  answer: string
}

const faqDatabase: FAQ[] = [
  {
    keywords: ['pet', 'pets', 'dog', 'dogs', 'animal', 'animals', 'furry', 'companion'],
    answer: 'Yes! We are pet-friendly and welcome your furry companions.\n\nPet Fee: $25 per pet, per day\nMaximum: 2 pets per booking\n\nWe kindly ask that pets remain supervised at all times and that you clean up after them to help us keep the space enjoyable for all guests.'
  },
  {
    keywords: ['difference', 'differences', 'pod', 'pods', 'tent', 'tents', 'bunkie', 'bunky', 'accommodation', 'accommodations', 'types', 'what\'s the difference'],
    answer: '🌿 Glamping Pods\n\nWe have 2 fully equipped Glamping Pods. Each pod includes:\n• Air conditioning\n• A small kitchenette\n• Attached private washroom and toilet\n• Coffee machine\n\nThese two pods share a private hot tub and wood-burning sauna.\n\n⛺ Luxury Tents\n\nWe offer 2 spacious Luxury Tents. Each tent features:\n• Electricity\n• Lights and a fan\n• Access to a shared hot tub and wood-burning sauna\n\nGreat for families or couples looking for a nature-immersed yet comfortable experience.\n\n🏕️ The Bunkie\n\nOur Bunkie is a cozy cabin-style unit that includes:\n• Air conditioning\n• Small fridge\n• Microwave\n• Hot plate\n\nLike the luxury tents, the Bunkie shares the main hot tub and sauna.'
  },
  {
    keywords: ['bedding', 'bed linens', 'linens', 'towels', 'pillows', 'sheets', 'blanket', 'duvet', 'bring', 'need to bring', 'what to bring'],
    answer: 'Yes. Guests are required to bring their own bed linens, pillows, and towels.\n\nMattresses are provided in all accommodations, but linens are not supplied. Please pack sheets, pillowcases, blankets/duvets, and bath/beach towels.\n\nThis ensures everyone has what they need for a comfortable and eco-friendly stay.'
  },
  {
    keywords: ['bathroom', 'bathrooms', 'shower', 'showers', 'toilet', 'toilets', 'washroom', 'washrooms', 'restroom', 'restrooms'],
    answer: 'We have 2 modern shower stalls and 2 toilet stalls available for guest use, kept clean and well-maintained.\n\nPlease bring your own toiletries and towels.'
  },
  {
    keywords: ['kitchen', 'cooking', 'cook', 'kitchenette', 'bbq', 'grill', 'microwave', 'fridge', 'refrigerator', 'coffee', 'cooking supplies'],
    answer: 'Glamping Pods: Include a small kitchenette with basic cooking tools and a coffee machine.\n\nLuxury Tents & Bunkie: Guests should bring their own cooking supplies. A BBQ grill is also available on site.\n\nPlease note: We aim to offer a true camping experience — but with the comforts of modern amenities!'
  },
  {
    keywords: ['wifi', 'wi-fi', 'internet', 'wireless', 'connection', 'network'],
    answer: 'Yes, we offer free high speed WiFi throughout the campground.'
  },
  {
    keywords: ['hiking', 'trail', 'trails', 'walk', 'walking', 'hike'],
    answer: 'Yes, there are several hiking trails in the surrounding area, including the popular Navigate Pinawa Trail.'
  },
  {
    keywords: ['cancellation', 'cancel', 'refund', 'policy', 'credit'],
    answer: 'We understand that plans can change, and we strive to be as flexible as possible.\n\nCancellations made at least one week prior to your reservation date are fully refundable.\n\nIf you cancel within one week of your reservation, you will receive a credit on file equal to the amount paid. This credit can be applied toward any future booking within one year from your original reservation date.'
  },
  {
    keywords: ['booking', 'book', 'reserve', 'reservation', 'how to book'],
    answer: 'You can book your stay by clicking the "BOOK NOW" button in the header or visiting our booking page. We offer online reservations for all our glamping accommodations including pods, bunkies, and luxury tents.'
  },
  {
    keywords: ['price', 'pricing', 'cost', 'rate', 'rates', 'how much', 'fee'],
    answer: 'Our pricing varies by accommodation type and season. Luxury glamping pods and bunkies start at $200/night on weekdays and $225/night on weekends. Luxury tents start at $150/night on weekdays and $175/night on weekends. Fall, Winter, and Spring pricing may vary.\n\nPet Fee: $25 per pet, per day (maximum 2 pets per booking).'
  },
  {
    keywords: ['contact', 'phone', 'email', 'reach', 'call', 'help'],
    answer: 'Please reach us through the contact us section if you cannot find an answer to your question. You can reach us at Phone: +92-3-111-444-100 or Email: reservations@navigatepinawa.com. You can also use the contact form on our website or the floating contact buttons for quick assistance.'
  }
]

export default function FAQPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your AI assistant. How can I help you today? Ask me anything about Navigate Pinawa!',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Only scroll when new messages are added
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    return () => clearTimeout(timer)
  }, [messages.length])

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    for (const faq of faqDatabase) {
      if (faq.keywords.some(keyword => lowerQuestion.includes(keyword))) {
        return faq.answer
      }
    }
    
    return 'I\'m sorry, I don\'t have information about that. Please try asking about:\n\n• Pets and pet policies\n• Differences between accommodations (Pods, Tents, Bunkie)\n• What to bring (bedding, towels)\n• Bathrooms and showers\n• Kitchen facilities\n• WiFi availability\n• Hiking trails\n• Cancellation policy\n• Booking and pricing\n\nYou can also contact us directly at reservations@navigatepinawa.com or call +92-3-111-444-100.'
  }

  const typeMessage = (text: string, callback: () => void) => {
    setIsTyping(true)
    
    // Create a new bot message first
    const botMessageId = Date.now()
    setMessages(prev => [...prev, {
      id: botMessageId,
      text: '',
      isUser: false,
      timestamp: new Date()
    }])
    
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage.id === botMessageId) {
            lastMessage.text = text.substring(0, index + 1)
          }
          return [...newMessages]
        })
        index++
        // Scroll smoothly during typing, but not on every character
        if (index % 3 === 0) {
          scrollToBottom()
        }
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        // Final scroll when typing is complete
        setTimeout(() => {
          scrollToBottom()
        }, 100)
        callback()
      }
    }, 30) // Typing speed - adjust for faster/slower
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Find answer and type it out
    const answer = findAnswer(input.trim())
    
    setTimeout(() => {
      typeMessage(answer, () => {
        // Callback after typing is complete
      })
    }, 500)
  }

  const handleQuickQuestion = (question: string) => {
    if (isTyping) return
    
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    // Find answer and type it out
    const answer = findAnswer(question)
    
    setTimeout(() => {
      typeMessage(answer, () => {
        // Callback after typing is complete
      })
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mt-6 sm:mt-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-tight leading-tight opacity-0 animate-slide-up animation-delay-200">
              Frequently Asked<br />
              <span className="text-navigatepinawa-blue">Questions</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg opacity-0 animate-slide-up animation-delay-300 px-4">
              Please reach us through contact us section if you cannot find an answer to your question.
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: '500px', maxHeight: '700px' }}>
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 sm:px-4 py-2 sm:py-3 ${
                      message.isUser
                        ? 'bg-navigatepinawa-blue text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                      {!message.isUser && isTyping && message.id === messages[messages.length - 1]?.id && (
                        <span className="inline-block w-2 h-4 bg-gray-900 ml-1 animate-pulse">|</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {['Are pets allowed?', 'What are the differences?', 'What should I bring?', 'Is there WiFi?', 'Cancellation policy?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    disabled={isTyping}
                    className="text-xs px-2 sm:px-3 py-1 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2 sm:space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navigatepinawa-blue focus:border-transparent text-sm sm:text-base"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-navigatepinawa-blue text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

