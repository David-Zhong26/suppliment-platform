'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Redirect to appropriate dashboard based on user type
      switch (session.user.userType) {
        case 'SELLER':
          router.push('/dashboard/seller')
          break
        case 'VERIFIED_CREATOR':
          router.push('/dashboard/creator')
          break
        default:
          router.push('/dashboard/user')
      }
    }
  }, [status, session, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
