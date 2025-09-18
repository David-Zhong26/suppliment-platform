import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const safetyCheckSchema = z.object({
  supplements: z.array(z.string()),
  medications: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional()
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = safetyCheckSchema.parse(body)

    const { supplements, medications = [], allergies = [] } = validatedData

    // Get product interactions from database
    const productInteractions = await prisma.interaction.findMany({
      include: {
        product: true
      }
    })

    // Check for supplement-supplement interactions
    const supplementInteractions = []
    const medicationInteractions = []
    const allergyWarnings = []

    // Check supplement-supplement interactions
    for (const supplement of supplements) {
      const product = await prisma.product.findFirst({
        where: {
          name: {
            contains: supplement,
            mode: 'insensitive'
          }
        },
        include: {
          interactions: true
        }
      })

      if (product) {
        for (const interaction of product.interactions) {
          if (interaction.conflictingProductId) {
            const conflictingProduct = await prisma.product.findUnique({
              where: { id: interaction.conflictingProductId }
            })
            
            if (conflictingProduct && supplements.includes(conflictingProduct.name)) {
              supplementInteractions.push({
                supplement1: product.name,
                supplement2: conflictingProduct.name,
                severity: interaction.severity,
                description: interaction.description,
                recommendation: interaction.recommendation
              })
            }
          }

          // Check medication interactions
          if (interaction.conflictingMedication) {
            if (medications.includes(interaction.conflictingMedication)) {
              medicationInteractions.push({
                supplement: product.name,
                medication: interaction.conflictingMedication,
                severity: interaction.severity,
                description: interaction.description,
                recommendation: interaction.recommendation
              })
            }
          }
        }
      }
    }

    // Check for common allergy warnings
    const allergyKeywords = ['fish', 'shellfish', 'dairy', 'soy', 'gluten', 'nuts', 'eggs']
    for (const supplement of supplements) {
      const product = await prisma.product.findFirst({
        where: {
          name: {
            contains: supplement,
            mode: 'insensitive'
          }
        }
      })

      if (product) {
        const ingredients = product.ingredients.toLowerCase()
        
        for (const allergy of allergies) {
          if (ingredients.includes(allergy.toLowerCase())) {
            allergyWarnings.push({
              supplement: product.name,
              allergen: allergy,
              severity: 'HIGH',
              description: `This product contains ${allergy} which you are allergic to.`,
              recommendation: 'Avoid this product or consult your doctor before use.'
            })
          }
        }

        // Check for common allergens in ingredients
        for (const keyword of allergyKeywords) {
          if (ingredients.includes(keyword) && allergies.some(a => a.toLowerCase().includes(keyword))) {
            allergyWarnings.push({
              supplement: product.name,
              allergen: keyword,
              severity: 'MODERATE',
              description: `This product may contain traces of ${keyword}.`,
              recommendation: 'Check with your doctor if you have a severe allergy.'
            })
          }
        }
      }
    }

    // Calculate overall safety score
    let safetyScore = 100
    const allIssues = [...supplementInteractions, ...medicationInteractions, ...allergyWarnings]
    const criticalIssues = allIssues.filter(issue => issue.severity === 'CRITICAL' || issue.severity === 'HIGH').length
    const moderateIssues = allIssues.filter(issue => issue.severity === 'MODERATE').length

    safetyScore -= criticalIssues * 30
    safetyScore -= moderateIssues * 15
    safetyScore = Math.max(safetyScore, 0)

    // Determine overall safety status
    let safetyStatus = 'SAFE'
    if (criticalIssues > 0) {
      safetyStatus = 'DANGEROUS'
    } else if (moderateIssues > 0) {
      safetyStatus = 'CAUTION'
    } else if (supplementInteractions.length > 0 || medicationInteractions.length > 0) {
      safetyStatus = 'MONITOR'
    }

    return NextResponse.json({
      safetyStatus,
      safetyScore,
      summary: {
        totalInteractions: supplementInteractions.length + medicationInteractions.length,
        allergyWarnings: allergyWarnings.length,
        criticalIssues,
        moderateIssues
      },
      interactions: {
        supplementToSupplement: supplementInteractions,
        supplementToMedication: medicationInteractions,
        allergies: allergyWarnings
      },
      recommendations: generateSafetyRecommendations(
        supplementInteractions,
        medicationInteractions,
        allergyWarnings,
        safetyStatus
      )
    })

  } catch (error) {
    console.error('Safety check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateSafetyRecommendations(
  supplementInteractions: any[],
  medicationInteractions: any[],
  allergyWarnings: any[],
  safetyStatus: string
) {
  const recommendations = []

  if (safetyStatus === 'DANGEROUS') {
    recommendations.push({
      priority: 'HIGH',
      title: 'Immediate Action Required',
      description: 'These combinations pose serious health risks. Consult your doctor immediately.',
      action: 'STOP_USE'
    })
  }

  if (medicationInteractions.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      title: 'Medication Interactions Detected',
      description: 'Some supplements may interact with your medications.',
      action: 'CONSULT_DOCTOR'
    })
  }

  if (allergyWarnings.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      title: 'Allergy Warnings',
      description: 'Some products contain ingredients you may be allergic to.',
      action: 'AVOID_PRODUCTS'
    })
  }

  if (supplementInteractions.length > 0) {
    recommendations.push({
      priority: 'MODERATE',
      title: 'Supplement Interactions',
      description: 'Some supplements may reduce each other\'s effectiveness.',
      action: 'SPACE_DOSING'
    })
  }

  if (safetyStatus === 'SAFE') {
    recommendations.push({
      priority: 'LOW',
      title: 'Safe to Use',
      description: 'No significant interactions detected. Continue monitoring for any side effects.',
      action: 'MONITOR'
    })
  }

  return recommendations
}
