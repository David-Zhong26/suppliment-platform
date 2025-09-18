import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      username: string
      userType: string
    }
  }

  interface User {
    username: string
    userType: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string
    userType: string
  }
}
