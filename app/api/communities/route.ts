import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Get communities from mock database
    let communities = await db.getCommunities()

    // Filter by category if provided
    if (category) {
      communities = communities.filter(community => 
        community.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Limit results
    communities = communities.slice(0, limit)

    return NextResponse.json({
      success: true,
      communities,
      total: communities.length,
      category: category || 'all'
    })
  } catch (error) {
    console.error('Communities fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
      { status: 500 }
    )
  }
}