import { PrismaClient } from '@prisma/client'
import { DatabaseInterface } from './database-interface'

export class PrismaAdapter implements DatabaseInterface {
  constructor(private prisma: PrismaClient) {}

  // User operations
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } })
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async createUser(userData: any) {
    return this.prisma.user.create({ data: userData })
  }

  // Product operations
  async getProducts() {
    return this.prisma.product.findMany()
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({ where: { id } })
  }

  async getRecommendedProducts(userId: string) {
    // Simple recommendation logic - in real app, this would be more sophisticated
    return this.prisma.product.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    })
  }

  // Community operations
  async getCommunities() {
    return this.prisma.community.findMany()
  }

  async getCommunityById(id: string) {
    return this.prisma.community.findUnique({ where: { id } })
  }

  async joinCommunity(userId: string, communityId: string) {
    try {
      await this.prisma.communityMembership.create({
        data: {
          userId,
          communityId
        }
      })
      return true
    } catch {
      return false
    }
  }

  // Safety operations
  async checkSafety(supplements: string[], medications: string[] = []) {
    // Simple safety check - in real app, this would use a comprehensive database
    const interactions: Array<{
      supplement: string;
      medication?: string;
      severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
      description: string;
    }> = []
    const warnings: string[] = []
    let safetyScore = 100

    // Mock safety checks
    if (supplements.includes('Vitamin K') && medications.includes('Warfarin')) {
      interactions.push({
        supplement: 'Vitamin K',
        medication: 'Warfarin',
        severity: 'CRITICAL' as const,
        description: 'Vitamin K can reduce the effectiveness of Warfarin',
      })
      safetyScore -= 30
    }

    if (supplements.includes('Iron') && supplements.includes('Calcium')) {
      interactions.push({
        supplement: 'Iron',
        severity: 'MODERATE' as const,
        description: 'Calcium can interfere with iron absorption',
      })
      safetyScore -= 15
    }

    if (supplements.length > 10) {
      warnings.push('Taking more than 10 supplements may cause interactions')
      safetyScore -= 10
    }

    return {
      safetyScore: Math.max(safetyScore, 0),
      interactions,
      warnings,
    }
  }
}
