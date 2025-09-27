// Match Score Calculation System
// Sophisticated algorithm for calculating supplement match scores (0-100)

export interface UserProfile {
  goals: string[]                    // e.g., ['heart health', 'energy', 'sleep quality']
  dietPreferences: string[]          // e.g., ['vegetarian', 'dairy-free', 'gluten-free']
  currentSupplements: string[]       // e.g., ['multivitamin', 'vitamin-d']
  medications: string[]              // e.g., ['warfarin', 'blood-pressure-med']
  allergies: string[]                // e.g., ['fish', 'shellfish']
  age: number
  gender: 'male' | 'female' | 'other'
  healthConditions: string[]         // e.g., ['diabetes', 'heart-disease']
  nutrientGaps: string[]             // e.g., ['vitamin-d', 'omega-3', 'magnesium']
}

export interface ProductData {
  id: string
  name: string
  category: string
  ingredients: {
    name: string
    dosage: string
    dailyValue?: string
    form?: string
  }[]
  benefits: string[]                 // e.g., ['heart health', 'brain function', 'joint support']
  certifications: string[]           // e.g., ['third-party-tested', 'fda-registered', 'gmp-certified']
  contraindications: string[]        // e.g., ['pregnancy', 'warfarin', 'diabetes']
  allergenWarnings: string[]         // e.g., ['fish', 'shellfish', 'soy']
  evidenceStrength: 'high' | 'moderate' | 'low'
  brandReputation: 'excellent' | 'good' | 'fair' | 'poor'
  priceRange: 'budget' | 'mid' | 'premium'
}

export interface MatchScoreBreakdown {
  goalFit: number           // 40% weight
  ingredientAlignment: number  // 25% weight
  safetyProfile: number     // 20% weight
  credibility: number       // 10% weight
  personalization: number   // 5% weight
  totalScore: number
  warnings: string[]
  recommendations: string[]
}

// Goal mapping for better matching
const GOAL_BENEFIT_MAPPING: Record<string, string[]> = {
  'heart health': ['cardiovascular', 'heart', 'circulation', 'cholesterol', 'blood pressure'],
  'energy': ['energy', 'fatigue', 'vitality', 'metabolism', 'mitochondria'],
  'sleep quality': ['sleep', 'melatonin', 'relaxation', 'stress', 'anxiety'],
  'brain function': ['cognitive', 'memory', 'focus', 'brain', 'neurological'],
  'immune support': ['immune', 'immunity', 'antioxidant', 'inflammation'],
  'bone health': ['bone', 'calcium', 'vitamin d', 'osteoporosis'],
  'muscle growth': ['muscle', 'protein', 'strength', 'recovery'],
  'skin health': ['skin', 'collagen', 'antioxidant', 'beauty'],
  'digestive health': ['digestive', 'gut', 'probiotic', 'digestion'],
  'weight management': ['weight', 'metabolism', 'fat burning', 'appetite']
}

// Safety interaction database
const SAFETY_INTERACTIONS: Record<string, string[]> = {
  'warfarin': ['omega-3', 'vitamin-k', 'garlic', 'ginkgo'],
  'blood-pressure-med': ['potassium', 'magnesium', 'garlic'],
  'diabetes-med': ['chromium', 'berberine', 'cinnamon'],
  'aspirin': ['omega-3', 'garlic', 'ginkgo', 'vitamin-e'],
  'statins': ['coenzyme-q10', 'red-yeast-rice']
}

export class MatchScoreCalculator {
  
  /**
   * Calculate comprehensive match score for a product based on user profile
   */
  static calculateMatchScore(user: UserProfile, product: ProductData): MatchScoreBreakdown {
    const goalFit = this.calculateGoalFit(user.goals, product.benefits)
    const ingredientAlignment = this.calculateIngredientAlignment(user, product)
    const safetyProfile = this.calculateSafetyProfile(user, product)
    const credibility = this.calculateCredibility(product)
    const personalization = this.calculatePersonalization(user, product)
    
    const totalScore = Math.round(
      goalFit * 0.40 +
      ingredientAlignment * 0.25 +
      safetyProfile * 0.20 +
      credibility * 0.10 +
      personalization * 0.05
    )
    
    const warnings = this.generateWarnings(user, product)
    const recommendations = this.generateRecommendations(user, product, totalScore)
    
    return {
      goalFit,
      ingredientAlignment,
      safetyProfile,
      credibility,
      personalization,
      totalScore,
      warnings,
      recommendations
    }
  }
  
  /**
   * Calculate Goal Fit Score (40% weight)
   * How well the product's benefits align with user's health goals
   */
  private static calculateGoalFit(userGoals: string[], productBenefits: string[]): number {
    if (userGoals.length === 0) return 50 // Neutral if no goals specified
    
    let totalScore = 0
    let matchedGoals = 0
    
    for (const goal of userGoals) {
      const goalKeywords = GOAL_BENEFIT_MAPPING[goal.toLowerCase()] || [goal.toLowerCase()]
      
      for (const benefit of productBenefits) {
        const benefitLower = benefit.toLowerCase()
        
        // Exact match gets highest score
        if (goalKeywords.some(keyword => benefitLower.includes(keyword))) {
          totalScore += 100
          matchedGoals++
          break
        }
        
        // Partial match gets medium score
        if (goalKeywords.some(keyword => 
          benefitLower.includes(keyword.substring(0, Math.max(4, keyword.length - 2)))
        )) {
          totalScore += 75
          matchedGoals++
          break
        }
      }
    }
    
    // Bonus for products that match multiple goals
    const goalMatchRatio = matchedGoals / userGoals.length
    const multiGoalBonus = goalMatchRatio > 0.5 ? 10 : 0
    
    return Math.min(100, Math.round(totalScore / userGoals.length + multiGoalBonus))
  }
  
  /**
   * Calculate Ingredient Alignment Score (25% weight)
   * How well ingredients address user's nutrient gaps and are properly dosed
   */
  private static calculateIngredientAlignment(user: UserProfile, product: ProductData): number {
    let score = 0
    let ingredientCount = 0
    
    for (const ingredient of product.ingredients) {
      ingredientCount++
      
      // Check if ingredient addresses nutrient gaps
      const addressesGap = user.nutrientGaps.some(gap => 
        ingredient.name.toLowerCase().includes(gap.toLowerCase()) ||
        gap.toLowerCase().includes(ingredient.name.toLowerCase())
      )
      
      if (addressesGap) {
        score += 90 // High score for addressing gaps
      } else {
        score += 60 // Medium score for general benefit
      }
      
      // Check dosage appropriateness
      if (this.isOptimalDosage(ingredient)) {
        score += 10 // Bonus for optimal dosage
      }
    }
    
    return ingredientCount > 0 ? Math.round(score / ingredientCount) : 50
  }
  
  /**
   * Calculate Safety Profile Score (20% weight)
   * Safety based on interactions, contraindications, and allergens
   */
  private static calculateSafetyProfile(user: UserProfile, product: ProductData): number {
    let score = 100 // Start with perfect score
    
    // Check medication interactions
    for (const medication of user.medications) {
      const interactions = SAFETY_INTERACTIONS[medication.toLowerCase()] || []
      const hasInteraction = product.ingredients.some(ingredient =>
        interactions.some(interaction =>
          ingredient.name.toLowerCase().includes(interaction)
        )
      )
      
      if (hasInteraction) {
        score -= 30 // Significant deduction for interactions
      }
    }
    
    // Check contraindications
    for (const condition of user.healthConditions) {
      if (product.contraindications.some(contra =>
        contra.toLowerCase().includes(condition.toLowerCase())
      )) {
        score -= 40 // Major deduction for contraindications
      }
    }
    
    // Check allergies
    for (const allergy of user.allergies) {
      if (product.allergenWarnings.some(allergen =>
        allergen.toLowerCase().includes(allergy.toLowerCase())
      )) {
        score -= 50 // Major deduction for allergens
      }
    }
    
    // Age and gender considerations
    if (product.contraindications.some(contra => 
      (contra.includes('pregnancy') && user.gender === 'female' && user.age < 50) ||
      (contra.includes('children') && user.age < 18)
    )) {
      score -= 20
    }
    
    return Math.max(0, score)
  }
  
  /**
   * Calculate Credibility Score (10% weight)
   * Based on certifications, evidence strength, and brand reputation
   */
  private static calculateCredibility(product: ProductData): number {
    let score = 50 // Base score
    
    // Certification bonuses
    const certificationScores: Record<string, number> = {
      'third-party-tested': 15,
      'fda-registered': 20,
      'gmp-certified': 15,
      'usp-verified': 10,
      'nsf-certified': 15,
      'organic': 5,
      'non-gmo': 5
    }
    
    for (const cert of product.certifications) {
      const certScore = certificationScores[cert.toLowerCase()] || 5
      score += certScore
    }
    
    // Evidence strength
    const evidenceScores: Record<string, number> = {
      'high': 20,
      'moderate': 10,
      'low': 0
    }
    score += evidenceScores[product.evidenceStrength] || 0
    
    // Brand reputation
    const brandScores: Record<string, number> = {
      'excellent': 15,
      'good': 10,
      'fair': 5,
      'poor': -10
    }
    score += brandScores[product.brandReputation] || 0
    
    return Math.min(100, Math.max(0, score))
  }
  
  /**
   * Calculate Personalization Score (5% weight)
   * How well the product fits user's dietary preferences and lifestyle
   */
  private static calculatePersonalization(user: UserProfile, product: ProductData): number {
    let score = 100 // Start with perfect score
    
    // Check dietary preferences
    for (const preference of user.dietPreferences) {
      if (preference === 'vegetarian' && product.allergenWarnings.some(w => 
        w.includes('gelatin') || w.includes('fish')
      )) {
        score -= 30
      }
      
      if (preference === 'dairy-free' && product.allergenWarnings.some(w => 
        w.includes('dairy') || w.includes('lactose')
      )) {
        score -= 30
      }
      
      if (preference === 'gluten-free' && product.allergenWarnings.some(w => 
        w.includes('gluten') || w.includes('wheat')
      )) {
        score -= 30
      }
    }
    
    // Check for duplicate supplements
    const duplicateSupplements = user.currentSupplements.filter(supp =>
      product.ingredients.some(ing => 
        ing.name.toLowerCase().includes(supp.toLowerCase())
      )
    )
    
    if (duplicateSupplements.length > 0) {
      score -= 20 * duplicateSupplements.length // Deduct for duplicates
    }
    
    return Math.max(0, score)
  }
  
  /**
   * Check if ingredient dosage is optimal
   */
  private static isOptimalDosage(ingredient: any): boolean {
    // This would be expanded with a comprehensive dosage database
    const optimalDosages: Record<string, string[]> = {
      'vitamin d': ['1000', '2000', '4000'], // IU
      'omega-3': ['1000', '1200', '1500'], // mg
      'magnesium': ['200', '400', '600'], // mg
      'vitamin c': ['500', '1000', '2000'] // mg
    }
    
    const ingredientLower = ingredient.name.toLowerCase()
    for (const [nutrient, dosages] of Object.entries(optimalDosages)) {
      if (ingredientLower.includes(nutrient)) {
        return dosages.some(dose => ingredient.dosage.includes(dose))
      }
    }
    
    return true // Default to optimal if not in database
  }
  
  /**
   * Generate warnings based on safety analysis
   */
  private static generateWarnings(user: UserProfile, product: ProductData): string[] {
    const warnings: string[] = []
    
    // Medication interactions
    for (const medication of user.medications) {
      const interactions = SAFETY_INTERACTIONS[medication.toLowerCase()] || []
      const hasInteraction = product.ingredients.some(ingredient =>
        interactions.some(interaction =>
          ingredient.name.toLowerCase().includes(interaction)
        )
      )
      
      if (hasInteraction) {
        warnings.push(`May interact with ${medication}. Consult your doctor.`)
      }
    }
    
    // Allergen warnings
    for (const allergy of user.allergies) {
      if (product.allergenWarnings.some(allergen =>
        allergen.toLowerCase().includes(allergy.toLowerCase())
      )) {
        warnings.push(`Contains ${allergy}. Not suitable for your allergies.`)
      }
    }
    
    // Contraindication warnings
    for (const condition of user.healthConditions) {
      if (product.contraindications.some(contra =>
        contra.toLowerCase().includes(condition.toLowerCase())
      )) {
        warnings.push(`Not recommended for ${condition}.`)
      }
    }
    
    return warnings
  }
  
  /**
   * Generate recommendations for the user
   */
  private static generateRecommendations(
    user: UserProfile, 
    product: ProductData, 
    totalScore: number
  ): string[] {
    const recommendations: string[] = []
    
    if (totalScore >= 90) {
      recommendations.push('Excellent match for your health goals!')
    } else if (totalScore >= 80) {
      recommendations.push('Great match with minor considerations.')
    } else if (totalScore >= 70) {
      recommendations.push('Good match, but review warnings carefully.')
    } else if (totalScore >= 60) {
      recommendations.push('Moderate match, consider alternatives.')
    } else {
      recommendations.push('Not recommended for your profile.')
    }
    
    // Specific recommendations based on analysis
    if (product.certifications.includes('third-party-tested')) {
      recommendations.push('Third-party tested for quality assurance.')
    }
    
    if (user.nutrientGaps.length > 0) {
      const addressesGaps = product.ingredients.some(ingredient =>
        user.nutrientGaps.some(gap =>
          ingredient.name.toLowerCase().includes(gap.toLowerCase())
        )
      )
      
      if (addressesGaps) {
        recommendations.push('Addresses your identified nutrient gaps.')
      }
    }
    
    return recommendations
  }
}

// Example usage and testing
export const EXAMPLE_USER_PROFILE: UserProfile = {
  goals: ['heart health', 'energy', 'sleep quality'],
  dietPreferences: ['vegetarian'],
  currentSupplements: ['multivitamin'],
  medications: [],
  allergies: ['fish'],
  age: 35,
  gender: 'female',
  healthConditions: [],
  nutrientGaps: ['omega-3', 'magnesium', 'vitamin-d']
}

export const EXAMPLE_PRODUCT: ProductData = {
  id: 'omega-3-complex',
  name: 'Premium Omega-3 Complex',
  category: 'omega-3',
  ingredients: [
    { name: 'EPA', dosage: '400mg', dailyValue: '250-500mg', form: 'triglyceride' },
    { name: 'DHA', dosage: '600mg', dailyValue: '250-500mg', form: 'triglyceride' }
  ],
  benefits: ['heart health', 'brain function', 'joint support'],
  certifications: ['third-party-tested', 'gmp-certified'],
  contraindications: ['pregnancy'],
  allergenWarnings: ['fish'],
  evidenceStrength: 'high',
  brandReputation: 'excellent',
  priceRange: 'premium'
}

// Example calculation
export function getExampleMatchScore() {
  return MatchScoreCalculator.calculateMatchScore(EXAMPLE_USER_PROFILE, EXAMPLE_PRODUCT)
}
