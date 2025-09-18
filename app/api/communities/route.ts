import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createCommunitySchema = z.object({
  name: z.string().min(3, 'Community name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string(),
  isPublic: z.boolean().default(true)
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build where clause
    const where: any = {}
    if (category && category !== 'all') {
      where.category = category
    }

    // Get communities with member count
    const communities = await prisma.community.findMany({
      where,
      include: {
        memberships: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        memberCount: 'desc'
      },
      take: limit
    })

    // Check user's membership status
    const userMemberships = await prisma.groupMembership.findMany({
      where: {
        userId: session.user.id
      },
      select: {
        communityId: true,
        role: true
      }
    })

    const membershipMap = new Map(
      userMemberships.map(m => [m.communityId, m.role])
    )

    const communitiesWithMembership = communities.map(community => ({
      id: community.id,
      name: community.name,
      description: community.description,
      category: community.category,
      imageUrl: community.imageUrl,
      memberCount: community.memberCount,
      postCount: community._count.posts,
      isPublic: community.isPublic,
      createdAt: community.createdAt,
      userRole: membershipMap.get(community.id) || null,
      isMember: membershipMap.has(community.id)
    }))

    return NextResponse.json({
      communities: communitiesWithMembership,
      total: communities.length
    })

  } catch (error) {
    console.error('Communities fetch error:', error)
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
    const validatedData = createCommunitySchema.parse(body)

    // Create community
    const community = await prisma.community.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        category: validatedData.category,
        isPublic: validatedData.isPublic,
        memberCount: 1 // Creator is the first member
      }
    })

    // Add creator as admin
    await prisma.groupMembership.create({
      data: {
        userId: session.user.id,
        communityId: community.id,
        role: 'ADMIN'
      }
    })

    return NextResponse.json({
      message: 'Community created successfully',
      community
    }, { status: 201 })

  } catch (error) {
    console.error('Community creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
