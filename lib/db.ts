import { PrismaClient } from '@prisma/client'
import { mockDb } from './mock-db'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use mock database if no DATABASE_URL is provided
const useMockDb = !process.env.DATABASE_URL

let prisma: PrismaClient | null = null

if (!useMockDb) {
  try {
    prisma = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
  } catch (error) {
    console.warn('Failed to connect to database, falling back to mock database:', error)
  }
}

// Export either real Prisma client or mock database
export const db = prisma || mockDb

// For backward compatibility
export { db as prisma }
