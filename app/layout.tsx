import type { Metadata } from 'next'
import './globals.css'
import ConditionalFooter from '@/components/ConditionalFooter'

export const metadata: Metadata = {
  title: 'Navigate Pinawa - Check In To The Time Of Your Life',
  description: 'Book your perfect getaway with Navigate Pinawa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ConditionalFooter />
      </body>
    </html>
  )
}

