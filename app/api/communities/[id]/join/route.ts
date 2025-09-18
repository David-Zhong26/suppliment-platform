import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const communityId = params.id

    // Check if community exists
    const community = await prisma.community.findUnique({
      where: { id: communityId }
    })

    if (!community) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 })
    }

    // Check if user is already a member
    const existingMembership = await prisma.groupMembership.findUnique({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId: communityId
        }
      }
    })

    if (existingMembership) {
      return NextResponse.json({ error: 'Already a member' }, { status: 400 })
    }

    // Add user to community
    await prisma.groupMembership.create({
      data: {
        userId: session.user.id,
        communityId: communityId,
        role: 'MEMBER'
      }
    })

    // Update member count
    await prisma.community.update({
      where: { id: communityId },
      data: {
        memberCount: {
          increment: 1
        }
      }
    })

    return NextResponse.json({
      message: 'Successfully joined community',
      community: {
        id: community.id,
        name: community.name,
        memberCount: community.memberCount + 1
      }
    })

  } catch (error) {
    console.error('Join community error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const communityId = params.id

    // Check if membership exists
    const membership = await prisma.groupMembership.findUnique({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId: communityId
        }
      }
    })

    if (!membership) {
      return NextResponse.json({ error: 'Not a member' }, { status: 400 })
    }

    // Remove user from community
    await prisma.groupMembership.delete({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId: communityId
        }
      }
    })

    // Update member count
    await prisma.community.update({
      where: { id: communityId },
      data: {
        memberCount: {
          decrement: 1
        }
      }
    })

    return NextResponse.json({
      message: 'Successfully left community'
    })

  } catch (error) {
    console.error('Leave community error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
