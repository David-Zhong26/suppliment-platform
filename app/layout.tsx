import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'
import { SupplementProvider } from '@/components/providers/supplement-context'
import { ShoppingCartProvider } from '@/components/providers/shopping-cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wellness Platform - Personalized Supplement & Health Community',
  description: 'The go-to personalized supplement and wellness platform that simplifies product choices, ensures safety, and fosters a community around health goals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SupplementProvider>
            <ShoppingCartProvider>
              {children}
            </ShoppingCartProvider>
          </SupplementProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
