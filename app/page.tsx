import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import LandingPage from '@/components/landing-page'

export default async function Home() {
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

  return <LandingPage />
}
