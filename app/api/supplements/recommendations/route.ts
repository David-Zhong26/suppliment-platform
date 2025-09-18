import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || '1' // Default user for demo

    // Get recommended products from mock database
    const recommendations = await db.getRecommendedProducts(userId)

    return NextResponse.json({
      success: true,
      recommendations: recommendations.slice(0, 10), // Return top 10
      total: recommendations.length
    })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { goals = [], diet = '', lifestyle = [], currentSupplements = [] } = body

    // Get all products and filter based on criteria
    const allProducts = await db.getProducts()
    
    // Simple recommendation logic based on goals
    let recommendations = allProducts
    
    if (goals.includes('weight-loss')) {
      recommendations = recommendations.filter(p => 
        p.category.toLowerCase().includes('fat') || 
        p.name.toLowerCase().includes('green tea') ||
        p.name.toLowerCase().includes('protein')
      )
    }
    
    if (goals.includes('muscle-gain')) {
      recommendations = recommendations.filter(p => 
        p.category.toLowerCase().includes('protein') ||
        p.name.toLowerCase().includes('creatine') ||
        p.name.toLowerCase().includes('amino')
      )
    }
    
    if (goals.includes('energy')) {
      recommendations = recommendations.filter(p => 
        p.name.toLowerCase().includes('b12') ||
        p.name.toLowerCase().includes('iron') ||
        p.name.toLowerCase().includes('magnesium')
      )
    }

    // Add mock match percentages
    const recommendationsWithMatch = recommendations.map(product => ({
      ...product,
      matchPercentage: Math.floor(Math.random() * 30) + 70 // 70-100%
    }))

    // Sort by match percentage
    recommendationsWithMatch.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0))

    return NextResponse.json({
      success: true,
      recommendations: recommendationsWithMatch.slice(0, 10),
      total: recommendationsWithMatch.length,
      criteria: {
        goals,
        diet,
        lifestyle,
        currentSupplements
      }
    })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}