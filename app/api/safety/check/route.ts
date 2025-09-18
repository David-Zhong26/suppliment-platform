import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const safetyCheckSchema = z.object({
  supplements: z.array(z.string()).min(1, 'At least one supplement is required'),
  medications: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = safetyCheckSchema.parse(body)

    const { supplements, medications, allergies } = validatedData

    // Use mock database safety checker
    const safetyResult = await db.checkSafety(supplements, medications)

    // Add allergy warnings
    const allergyWarnings = []
    for (const allergy of allergies) {
      for (const supplement of supplements) {
        if (supplement.toLowerCase().includes(allergy.toLowerCase()) ||
            allergy.toLowerCase().includes('shellfish') && supplement.toLowerCase().includes('omega')) {
          allergyWarnings.push(`Warning: ${supplement} may contain ${allergy}`)
        }
      }
    }

    // Combine all warnings
    const allWarnings = [
      ...safetyResult.warnings,
      ...allergyWarnings
    ]

    return NextResponse.json({
      success: true,
      safetyScore: safetyResult.safetyScore,
      interactions: safetyResult.interactions,
      warnings: allWarnings,
      recommendations: generateSafetyRecommendations(safetyResult.safetyScore, safetyResult.interactions),
      checkedItems: {
        supplements,
        medications,
        allergies
      }
    })
  } catch (error) {
    console.error('Safety check error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to perform safety check' },
      { status: 500 }
    )
  }
}

function generateSafetyRecommendations(score: number, interactions: any[]) {
  const recommendations = []
  
  if (score < 50) {
    recommendations.push('Consider consulting with a healthcare professional before taking these supplements')
  }
  
  if (interactions.some(i => i.severity === 'CRITICAL')) {
    recommendations.push('Critical interactions detected - avoid this combination')
  }
  
  if (interactions.some(i => i.severity === 'HIGH')) {
    recommendations.push('High-risk interactions - monitor closely or avoid')
  }
  
  if (score > 80) {
    recommendations.push('Generally safe combination - continue monitoring')
  }
  
  return recommendations
}