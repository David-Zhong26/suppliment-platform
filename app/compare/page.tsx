'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  CheckCircle, 
  X, 
  Info,
  Fish,
  Sun,
  Banana,
  Microscope,
  Pill,
  Flower2,
  Shield,
  Award,
  TestTube,
  Target,
  Heart,
  Zap,
  TrendingUp
} from 'lucide-react'
import PersistentNav from '@/components/navigation/persistent-nav'

// Product data (same as in product-comparison.tsx)
const products = [
  {
    id: '1',
    name: 'Premium Omega-3 Complex',
    brand: 'Wellness Pro',
    matchPercentage: 92,
    rating: 4.9,
    reviews: 1247,
    price: 29.99,
    pricePerServing: 1.00,
    servings: 30,
    icon: <Fish className="h-8 w-8 text-[#16A34A]" />,
    benefits: ['Heart Health', 'Brain Function', 'Joint Support'],
    description: 'High-potency EPA/DHA from wild-caught fish for comprehensive cardiovascular and cognitive support.',
    category: 'Omega-3',
    inStock: true,
    whyMatch: 'Selected because your profile highlights cardiovascular health and no fish allergy; dosage aligns with clinical guidelines.',
    trustNotes: ['4.9 (1,247 reviews)', 'Third-party tested', 'No added vitamin A', 'Gluten-free'],
    matchBreakdown: {
      ingredients: 60,
      goalsFit: 20,
      safety: 10,
      evidence: 10
    },
    certifications: ['Third-party tested', 'GMP certified', 'Non-GMO'],
    scientificInfo: {
      keyIngredients: [
        {
          name: 'EPA (Eicosapentaenoic Acid)',
          dosage: '400mg',
          description: 'Supports cardiovascular health and reduces inflammation',
          dailyValue: 'Recommended: 250-500mg EPA'
        },
        {
          name: 'DHA (Docosahexaenoic Acid)',
          dosage: '600mg',
          description: 'Essential for brain function and cognitive health',
          dailyValue: 'Recommended: 250-500mg DHA'
        }
      ],
      evidence: {
        summary: 'Multiple clinical trials demonstrate cardiovascular benefits and cognitive support. EPA/DHA combination shown to reduce inflammation markers.',
        credibility: 'Backed by 12 RCTs',
        studyCount: 12
      },
      safety: {
        interactions: ['May interact with blood thinners', 'Consult doctor if taking anticoagulants'],
        warnings: ['Fish allergy warning', 'May cause mild digestive upset'],
        riskLevel: 'low'
      },
      qualityAssurance: {
        testing: ['Third-party purity testing', 'Heavy metal screening', 'Potency verification'],
        facility: ['FDA registered facility', 'GMP certified', 'ISO 9001 compliant'],
        standards: ['USP standards', 'Pharmaceutical grade', 'Wild-caught sourcing']
      }
    },
    reviewHighlights: [
      'Great for joint pain relief!',
      'No fishy aftertaste, highly recommend'
    ]
  },
  {
    id: '2',
    name: 'Vitamin D3+K2',
    brand: 'Sunshine Labs',
    matchPercentage: 88,
    rating: 4.8,
    reviews: 892,
    price: 24.99,
    pricePerServing: 0.83,
    servings: 30,
    icon: <Sun className="h-8 w-8 text-[#16A34A]" />,
    benefits: ['Bone Health', 'Immune Support', 'Calcium Absorption'],
    description: 'Essential vitamins for bone and immune health with enhanced absorption',
    category: 'Vitamins',
    inStock: true,
    whyMatch: 'Recommended based on your indoor lifestyle and bone health goals; optimal D3+K2 ratio',
    trustNotes: ['4.8 (892 reviews)', 'Lab verified', 'Vegetarian capsules', 'No artificial colors'],
    matchBreakdown: {
      ingredients: 55,
      goalsFit: 25,
      safety: 15,
      evidence: 5
    },
    certifications: ['Lab verified', 'Vegetarian', 'Non-GMO'],
    scientificInfo: {
      keyIngredients: [
        {
          name: 'Vitamin D3 (Cholecalciferol)',
          dosage: '2000 IU',
          description: 'Essential for bone health and immune function',
          dailyValue: 'Recommended: 1000-4000 IU daily'
        },
        {
          name: 'Vitamin K2 (MK-7)',
          dosage: '100mcg',
          description: 'Directs calcium to bones and away from arteries',
          dailyValue: 'Recommended: 90-120mcg daily'
        }
      ],
      evidence: {
        summary: 'Clinical studies show D3+K2 combination improves bone density and reduces arterial calcification. Supported by NIH guidelines.',
        credibility: 'NIH guidelines supported',
        studyCount: 8
      },
      safety: {
        interactions: ['May interact with calcium channel blockers', 'Monitor if taking warfarin'],
        warnings: ['Avoid high-dose calcium without K2', 'Monitor vitamin D levels with doctor'],
        riskLevel: 'low'
      },
      qualityAssurance: {
        testing: ['Lab verified potency', 'Heavy metal screening', 'Vitamin K2 stability testing'],
        facility: ['cGMP facility', 'FDA inspected', 'Third-party audited'],
        standards: ['USP monographs', 'Pharmaceutical grade', 'Vegetarian capsules']
      }
    },
    reviewHighlights: [
      'Perfect for winter months',
      'Bone density improved significantly'
    ]
  },
  {
    id: '3',
    name: 'Magnesium Glycinate',
    brand: 'Calm Wellness',
    matchPercentage: 85,
    rating: 4.9,
    reviews: 1563,
    price: 19.99,
    pricePerServing: 0.67,
    servings: 30,
    icon: <Banana className="h-8 w-8 text-[#16A34A]" />,
    benefits: ['Sleep Quality', 'Muscle Relaxation', 'Stress Relief'],
    description: 'Highly absorbable magnesium for better sleep and relaxation',
    category: 'Minerals',
    inStock: true,
    whyMatch: 'Perfect for your sleep goals and stress management; glycinate form for better absorption',
    trustNotes: ['4.9 (1,563 reviews)', 'Chelated form', 'No fillers', 'Sleep support'],
    matchBreakdown: {
      ingredients: 50,
      goalsFit: 30,
      safety: 10,
      evidence: 10
    },
    certifications: ['Chelated', 'No fillers', 'Sleep tested'],
    scientificInfo: {
      keyIngredients: [
        {
          name: 'Magnesium Glycinate',
          dosage: '200mg',
          description: 'Highly bioavailable form that supports sleep and muscle relaxation',
          dailyValue: 'Recommended: 200-400mg elemental magnesium'
        }
      ],
      evidence: {
        summary: 'Randomized controlled trials show magnesium glycinate improves sleep quality and reduces stress markers. Chelated form has superior absorption.',
        credibility: 'Backed by 6 RCTs',
        studyCount: 6
      },
      safety: {
        interactions: ['May enhance effects of muscle relaxants', 'Monitor with kidney disease'],
        warnings: ['High doses may cause diarrhea', 'Consult doctor with kidney problems'],
        riskLevel: 'low'
      },
      qualityAssurance: {
        testing: ['Chelated form verification', 'Elemental magnesium testing', 'Heavy metal screening'],
        facility: ['cGMP facility', 'Third-party certified', 'ISO 22000'],
        standards: ['Pharmaceutical grade', 'Chelated for absorption', 'No artificial additives']
      }
    },
    reviewHighlights: [
      'Best sleep I\'ve had in years',
      'No digestive issues like other forms'
    ]
  }
]

function ComparePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])

  useEffect(() => {
    // Get selected product IDs from URL params or localStorage
    const ids = searchParams.get('ids')?.split(',') || []
    setSelectedProductIds(ids)
  }, [searchParams])

  const selectedProducts = products.filter(product => selectedProductIds.includes(product.id))

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-[#22C55E] bg-[#DCFCE7]'
    if (percentage >= 80) return 'text-[#16A34A] bg-[#BBF7D0]'
    if (percentage >= 70) return 'text-[#F97316] bg-[#FED7AA]'
    return 'text-gray-600 bg-gray-100'
  }

  const getSafetyColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (selectedProducts.length < 2) {
    return (
      <div className="min-h-screen bg-[#F9FAF9]">
        <PersistentNav userLevel={1} userName="User" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Products Selected</h1>
            <p className="text-gray-600 mb-6">Please select at least 2 products to compare</p>
            <Button onClick={() => router.push('/comparison')} className="bg-[#16A34A] hover:bg-[#15803d]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={1} userName="User" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/comparison')}
              className="wellness-nav-link"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Product Comparison</h1>
              <p className="text-gray-600 text-lg">Compare {selectedProducts.length} selected products</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Sticky Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              </div>
              {selectedProducts.map((product, index) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-4">
                      {product.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-2xl font-bold text-[#16A34A]">${product.price}</div>
                      <div className="text-sm text-gray-600">${product.pricePerServing}/serving</div>
                      <Badge className={`${getMatchColor(product.matchPercentage)} px-3 py-1`}>
                        {product.matchPercentage}% Match
                      </Badge>
                    </div>

                    <Button 
                      className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white mb-3"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>

                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-gray-200">
            {/* Why It Matches You */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#16A34A]" />
                    Why It Matches You
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <p className="text-sm text-gray-700">{product.whyMatch}</p>
                </div>
              ))}
            </div>

            {/* Ingredients & Dosage */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-[#16A34A]" />
                    Key Ingredients
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="space-y-2">
                    {product.scientificInfo.keyIngredients.map((ingredient, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-gray-900">{ingredient.name}</div>
                        <div className="text-gray-600">{ingredient.dosage}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#16A34A]" />
                    Benefits
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#16A34A]" />
                    Scientific Evidence
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      {product.scientificInfo.evidence.credibility}
                    </Badge>
                    <p className="text-sm text-gray-600">{product.scientificInfo.evidence.summary}</p>
                    <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                      View Studies ({product.scientificInfo.evidence.studyCount})
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety & Interactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#16A34A]" />
                    Safety Profile
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="space-y-3">
                    <Badge className={`${getSafetyColor(product.scientificInfo.safety.riskLevel)} px-3 py-1`}>
                      {product.scientificInfo.safety.riskLevel === 'low' ? '✅ Generally Safe' : 
                       product.scientificInfo.safety.riskLevel === 'medium' ? '⚠️ Monitor Interactions' : 
                       '❌ High Risk'}
                    </Badge>
                    {product.scientificInfo.safety.warnings.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium mb-1">Warnings:</div>
                        {product.scientificInfo.safety.warnings.map((warning, index) => (
                          <div key={index} className="flex items-start gap-1">
                            <span className="text-orange-500 mt-1">⚠</span>
                            <span>{warning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Assurance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#16A34A]" />
                    Quality Assurance
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="flex flex-wrap gap-1">
                    {product.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* User Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#16A34A]" />
                    User Reviews
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-600">({product.reviews} reviews)</span>
                    </div>
                    <div className="space-y-1">
                      {product.reviewHighlights.map((review, index) => (
                        <div key={index} className="text-sm text-gray-600 italic">
                          "{review}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Value Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 bg-green-50">
              <div className="p-6 bg-gray-50 border-r border-gray-200 flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#16A34A]" />
                    Value Summary
                  </h4>
                </div>
              </div>
              {selectedProducts.map((product, index) => (
                <div key={product.id} className="p-6 border-r border-gray-200 last:border-r-0">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">30-day supply: ${product.price}</div>
                      <div className="text-gray-600">Cost per serving: ${product.pricePerServing}</div>
                    </div>
                    {index === 0 && (
                      <Badge className="bg-green-100 text-green-700">
                        🏆 Best Match
                      </Badge>
                    )}
                    {index === 1 && (
                      <Badge className="bg-blue-100 text-blue-700">
                        💰 Best Value
                      </Badge>
                    )}
                    {index === 2 && (
                      <Badge className="bg-purple-100 text-purple-700">
                        🔬 Best Evidence
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A34A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comparison...</p>
        </div>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  )
}
