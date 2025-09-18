import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-simple'
import LandingPage from '@/components/landing-page'

export default async function Home() {
  try {
    const session = await getServerSession(authOptions)

    if (session) {
      // Redirect to appropriate dashboard based on user type
      switch (session.user.userType) {
        case 'SELLER':
          redirect('/dashboard/seller')
        case 'VERIFIED_CREATOR':
          redirect('/dashboard/creator')
        default:
          redirect('/dashboard/user')
      }
    }
  } catch (error) {
    // If auth fails, just show landing page
    console.log('Auth not available, showing landing page')
  }

  return <LandingPage />
}
