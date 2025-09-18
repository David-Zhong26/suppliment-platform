import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const recommendationSchema = z.object({
  goals: z.array(z.string()).optional(),
  diet: z.string().optional(),
  lifestyle: z.array(z.string()).optional(),
  currentSupplements: z.array(z.string()).optional(),
  age: z.number().optional(),
  gender: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's wellness goals and profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        wellnessGoals: true,
        supplementLogs: {
          include: {
            product: true
          },
          orderBy: {
            takenAt: 'desc'
          },
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get all products with safety tags
    const products = await prisma.product.findMany({
      include: {
        safetyTags: true,
        seller: true,
        interactions: true
      },
      orderBy: {
        matchScore: 'desc'
      }
    })

    // Calculate personalized recommendations
    const recommendations = await calculateRecommendations(user, products)

    return NextResponse.json({
      recommendations: recommendations.slice(0, 10), // Return top 10
      userProfile: {
        goals: user.wellnessGoals.map(goal => goal.name),
        currentSupplements: user.supplementLogs.map(log => log.product.name),
        age: user.age,
        gender: user.gender
      }
    })

  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = recommendationSchema.parse(body)

    // Get products with safety tags
    const products = await prisma.product.findMany({
      include: {
        safetyTags: true,
        seller: true,
        interactions: true
      }
    })

    // Create temporary user profile for recommendations
    const tempUser = {
      wellnessGoals: validatedData.goals?.map(goal => ({ name: goal })) || [],
      supplementLogs: [],
      age: validatedData.age,
      gender: validatedData.gender
    }

    // Calculate recommendations based on provided data
    const recommendations = await calculateRecommendations(tempUser, products)

    return NextResponse.json({
      recommendations: recommendations.slice(0, 10)
    })

  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function calculateRecommendations(user: any, products: any[]) {
  const recommendations = []

  for (const product of products) {
    let matchScore = 0
    let reasons = []

    // Goal-based matching (40% weight)
    const userGoals = user.wellnessGoals.map((goal: any) => goal.name.toLowerCase())
    const productTags = product.tags.map((tag: string) => tag.toLowerCase())
    
    const goalMatches = userGoals.filter((goal: string) => 
      productTags.some((tag: string) => tag.includes(goal) || goal.includes(tag))
    )
    
    if (goalMatches.length > 0) {
      matchScore += 40
      reasons.push(`Perfect for your ${goalMatches.join(', ')} goals`)
    }

    // Age and gender considerations (20% weight)
    if (user.age && user.gender) {
      // Example logic for age/gender matching
      if (product.category === 'protein' && user.age >= 18 && user.age <= 40) {
        matchScore += 15
        reasons.push('Great for your age group')
      }
      
      if (product.category === 'multivitamin') {
        matchScore += 20
        reasons.push('Essential for daily nutrition')
      }
    }

    // Safety and credibility (25% weight)
    const safetyScore = product.safetyTags.length * 5
    matchScore += Math.min(safetyScore, 25)
    
    if (product.safetyTags.some((tag: any) => tag.name === 'FDA Certified')) {
      reasons.push('FDA certified for safety')
    }
    
    if (product.safetyTags.some((tag: any) => tag.name === 'Third-Party Tested')) {
      reasons.push('Independently tested for quality')
    }

    // User's current supplements (15% weight)
    const currentSupplementNames = user.supplementLogs.map((log: any) => 
      log.product.name.toLowerCase()
    )
    
    // Avoid recommending similar products
    const isSimilar = currentSupplementNames.some((name: string) => 
      product.name.toLowerCase().includes(name.split(' ')[0])
    )
    
    if (!isSimilar && product.category !== 'multivitamin') {
      matchScore += 10
      reasons.push('Complements your current supplements')
    } else if (product.category === 'multivitamin') {
      matchScore += 15
      reasons.push('Essential daily nutrition')
    }

    // Seller credibility bonus
    if (product.seller?.verificationStatus === 'APPROVED') {
      matchScore += 5
      reasons.push('From verified seller')
    }

    // Ensure match score is between 0-100
    matchScore = Math.min(Math.max(matchScore, 0), 100)

    // Only include products with meaningful match scores
    if (matchScore >= 30) {
      recommendations.push({
        ...product,
        matchScore,
        reasons: reasons.slice(0, 3), // Limit to top 3 reasons
        safetyTags: product.safetyTags.map((tag: any) => ({
          name: tag.name,
          description: tag.description,
          color: tag.color
        })),
        seller: product.seller ? {
          businessName: product.seller.businessName,
          verificationStatus: product.seller.verificationStatus
        } : null
      })
    }
  }

  // Sort by match score and return
  return recommendations.sort((a, b) => b.matchScore - a.matchScore)
}
