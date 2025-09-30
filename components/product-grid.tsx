'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  ShoppingCart, 
  Heart,
  CheckCircle,
  Info,
  MessageCircle,
  Fish,
  Sun,
  Banana,
  Microscope,
  Pill,
  Flower2
} from 'lucide-react'
import MatchScoreSlider from '@/components/match-score-slider'

interface Product {
  id: string
  name: string
  brand: string
  matchPercentage: number
  rating: number
  reviews: number
  price: number
  icon: string
  benefits: string[]
  description: string
  category: string
  inStock: boolean
  whyMatch: string
  trustNotes: string[]
  matchBreakdown: {
    ingredients: number
    goalsFit: number
    safety: number
    evidence: number
  }
  certifications: string[]
  scientificInfo: {
    keyIngredients: {
      name: string
      dosage: string
      description: string
      dailyValue: string
    }[]
    evidence: {
      summary: string
      credibility: string
      studyCount: number
    }
    safety: {
      interactions: string[]
      warnings: string[]
      riskLevel: 'low' | 'medium' | 'high'
    }
    qualityAssurance: {
      testing: string[]
      facility: string[]
      standards: string[]
    }
  }
  matchScoreBreakdown?: {
    goalFit: number
    ingredientAlignment: number
    safetyProfile: number
    credibility: number
    personalization: number
    totalScore: number
    warnings: string[]
    recommendations: string[]
  }
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: string) => void
  onOpenDetails: (product: Product) => void
  favorites: string[]
  onToggleComparison: (productId: string) => void
  selectedForComparison: string[]
}

// Icon mapping for supplement types
const getSupplementIcon = (category: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Omega-3': <Fish className="h-8 w-8 text-blue-600" />,
    'Vitamins': <Sun className="h-8 w-8 text-orange-500" />,
    'Minerals': <Banana className="h-8 w-8 text-yellow-600" />,
    'Probiotics': <Microscope className="h-8 w-8 text-green-600" />,
    'Multivitamins': <Pill className="h-8 w-8 text-purple-600" />,
    'Herbs': <Flower2 className="h-8 w-8 text-pink-600" />
  }
  
  return iconMap[category] || <Pill className="h-8 w-8 text-gray-600" />
}

export default function ProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  onOpenDetails,
  favorites,
  onToggleComparison,
  selectedForComparison
}: ProductGridProps) {
  const [showMatchBreakdown, setShowMatchBreakdown] = useState<string | null>(null)

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-[#22C55E] bg-[#DCFCE7]'
    if (percentage >= 80) return 'text-[#16A34A] bg-[#BBF7D0]'
    if (percentage >= 70) return 'text-[#F97316] bg-[#FED7AA]'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Card
          key={product.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 wellness-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="pb-4">
            {/* Match Percentage Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <div 
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setShowMatchBreakdown(
                    showMatchBreakdown === product.id ? null : product.id
                  )}
                >
                  <MatchScoreSlider 
                    percentage={product.matchPercentage} 
                    size="md"
                    showValue={true}
                  />
                </div>
                {showMatchBreakdown === product.id && (
                  <div className="absolute top-12 left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">Match Breakdown</h4>
                      <Button variant="ghost" size="icon" onClick={() => setShowMatchBreakdown(null)} className="h-6 w-6">
                        ×
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Goal Fit (40%)</span>
                        <span className="text-sm font-medium">{product.matchScoreBreakdown?.goalFit || product.matchBreakdown.goalsFit}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Ingredient Alignment (25%)</span>
                        <span className="text-sm font-medium">{product.matchScoreBreakdown?.ingredientAlignment || product.matchBreakdown.ingredients}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Safety Profile (20%)</span>
                        <span className="text-sm font-medium">{product.matchScoreBreakdown?.safetyProfile || product.matchBreakdown.safety}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Credibility (10%)</span>
                        <span className="text-sm font-medium">{product.matchScoreBreakdown?.credibility || product.matchBreakdown.evidence}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Personalization (5%)</span>
                        <span className="text-sm font-medium">{product.matchScoreBreakdown?.personalization || 100}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(product.id)}
                className={`transition-colors ${
                  favorites.includes(product.id) ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart className={`h-5 w-5 ${
                  favorites.includes(product.id) ? 'fill-current' : ''
                }`} />
              </Button>
            </div>

            {/* Product Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                {getSupplementIcon(product.category)}
              </div>
              <div className="text-sm text-gray-500 font-medium">{product.brand}</div>
            </div>

            <CardTitle className="text-xl font-bold text-center mb-3 text-gray-900">
              {product.name}
            </CardTitle>

            {/* Why This Matches */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.whyMatch}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-[#F97316] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Trust Notes */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {product.trustNotes.map((note, i) => (
                  <Badge key={i} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-2xl font-bold text-[#16A34A]">
                  ${product.price}
                </div>
                <div className="text-sm text-gray-500">per bottle</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Category</div>
                <div className="text-sm font-medium text-[#16A34A]">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Compare Selection */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
              <span className="text-sm font-medium text-gray-700">Compare</span>
              <input
                type="checkbox"
                checked={selectedForComparison.includes(product.id)}
                onChange={() => onToggleComparison(product.id)}
                className="w-4 h-4 text-[#16A34A] bg-gray-100 border-gray-300 rounded focus:ring-[#16A34A] focus:ring-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => onAddToCart(product)}
                className="w-full btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d]"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                className="w-full text-sm border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
                onClick={() => onOpenDetails(product)}
              >
                <Info className="h-4 w-4 mr-2" />
                View Details
              </Button>
              
              <Button
                variant="outline"
                className="w-full text-sm border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask a Nutritionist
              </Button>
            </div>

            {!product.inStock && (
              <div className="text-center text-sm text-red-500 mt-3">
                Currently out of stock
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
