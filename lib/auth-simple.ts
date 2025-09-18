// Simplified auth configuration that works without environment variables
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.findUserByEmail(credentials.email)

        if (!user) {
          return null
        }

        // Check password (for mock database, we'll use a simple check)
        const isPasswordValid = user.password ? 
          await bcrypt.compare(credentials.password, user.password) : 
          credentials.password === 'demo123' // Simple demo password

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          userType: user.userType,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'wellness-platform-demo-secret-key-2024',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.username = token.username as string
        session.user.userType = token.userType as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
