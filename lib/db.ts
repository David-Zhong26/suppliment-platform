import { PrismaClient } from '@prisma/client'
import { MockDatabase } from './mock-db'
import { PrismaAdapter } from './prisma-adapter'
import { DatabaseInterface } from './database-interface'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use mock database if no DATABASE_URL is provided
const useMockDb = !process.env.DATABASE_URL

let db: DatabaseInterface

if (useMockDb) {
  // Use mock database
  db = new MockDatabase()
  console.log('Using mock database for development')
} else {
  try {
    // Try to use real Prisma database
    const prisma = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    db = new PrismaAdapter(prisma)
    console.log('Using Prisma database')
  } catch (error) {
    console.warn('Failed to connect to database, falling back to mock database:', error)
    db = new MockDatabase()
  }
}

export { db }

// For backward compatibility with existing code
export const prisma = db as any
