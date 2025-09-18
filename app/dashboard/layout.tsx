'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user) {
      // Redirect to appropriate dashboard based on user type
      const userType = session.user.userType
      const currentPath = window.location.pathname
      
      if (!currentPath.includes(`/dashboard/${userType.toLowerCase().replace('_', '')}`)) {
        switch (userType) {
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
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return <>{children}</>
}
