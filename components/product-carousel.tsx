'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShoppingCart, 
  Heart,
  CheckCircle,
  Info,
  MessageCircle,
  TestTube,
  Target,
  Award,
  Shield,
  Zap
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
  icon: React.ReactNode
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

interface ProductCarouselProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: string) => void
  onOpenDetails: (product: Product) => void
  favorites: string[]
  onToggleComparison: (productId: string) => void
  selectedForComparison: string[]
}

export default function ProductCarousel({
  products,
  onAddToCart,
  onToggleFavorite,
  onOpenDetails,
  favorites,
  onToggleComparison,
  selectedForComparison
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatchBreakdown, setShowMatchBreakdown] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [products.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

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

  // Get the three visible products (previous, current, next)
  const getVisibleProducts = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length
    const nextIndex = (currentIndex + 1) % products.length
    
    return [
      { product: products[prevIndex], index: prevIndex, position: 'prev' },
      { product: products[currentIndex], index: currentIndex, position: 'current' },
      { product: products[nextIndex], index: nextIndex, position: 'next' }
    ]
  }

  const visibleProducts = getVisibleProducts()

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Carousel Container */}
      <div className="relative h-[450px] overflow-hidden">
        {/* Products */}
        <div className="flex items-center justify-center h-full gap-4">
          {visibleProducts.map(({ product, index, position }) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ease-in-out ${
                position === 'current'
                  ? 'transform scale-105 z-20 opacity-100'
                  : position === 'prev'
                  ? 'transform scale-85 -translate-x-4 z-10 opacity-75'
                  : 'transform scale-85 translate-x-4 z-10 opacity-75'
              }`}
            >
              <Card className={`bg-white border-2 rounded-2xl shadow-lg transition-all duration-500 ${
                position === 'current' 
                  ? 'border-[#16A34A] shadow-2xl' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <CardHeader className={`pb-3 ${position === 'current' ? 'p-4' : 'p-3'}`}>
                  {/* Match Score Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="relative">
                      <div 
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setShowMatchBreakdown(
                          showMatchBreakdown === product.id ? null : product.id
                        )}
                      >
                        <MatchScoreSlider 
                          percentage={product.matchPercentage} 
                          size={position === 'current' ? 'lg' : 'md'}
                          showValue={true}
                        />
                      </div>
                      {showMatchBreakdown === product.id && (
                        <div className="absolute top-12 left-0 right-0 z-30 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
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
                  <div className="text-center mb-3">
                    <div className={`bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      position === 'current' ? 'w-14 h-14' : 'w-12 h-12'
                    }`}>
                      {product.icon}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{product.brand}</div>
                  </div>

                  <CardTitle className={`text-center mb-2 text-gray-900 ${
                    position === 'current' ? 'text-lg' : 'text-base'
                  }`}>
                    {product.name}
                  </CardTitle>

                  {/* Why This Matches */}
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-2 mb-3">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {position === 'current' ? product.whyMatch : `${product.whyMatch.substring(0, 80)}...`}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-3">
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

                <CardContent className={`pt-0 ${position === 'current' ? 'p-4 pt-0' : 'p-3 pt-0'}`}>
                  {/* Trust Notes */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {product.trustNotes.slice(0, position === 'current' ? 3 : 2).map((note, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {position === 'current' ? product.description : `${product.description.substring(0, 80)}...`}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-3">
                    <div className={`font-bold text-[#16A34A] ${position === 'current' ? 'text-2xl' : 'text-xl'}`}>
                      ${product.price}
                    </div>
                    <div className="text-xs text-gray-500">per bottle</div>
                  </div>

                  {/* Compare Selection */}
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-2">
                    <span className="text-xs font-medium text-gray-700">Compare</span>
                    <input
                      type="checkbox"
                      checked={selectedForComparison.includes(product.id)}
                      onChange={() => onToggleComparison(product.id)}
                      className="w-3 h-3 text-[#16A34A] bg-gray-100 border-gray-300 rounded focus:ring-[#16A34A] focus:ring-1"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => onAddToCart(product)}
                      className={`w-full btn-primary-wellness hover:bg-[#15803d] text-xs ${
                        position === 'current' ? 'py-2' : 'py-1'
                      }`}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`w-full border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white text-xs ${
                        position === 'current' ? 'py-2' : 'py-1'
                      }`}
                      onClick={() => onOpenDetails(product)}
                    >
                      <Info className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    
                    {position === 'current' && (
                      <Button
                        variant="outline"
                        className="w-full text-xs border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white py-1"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Ask Nutritionist
                      </Button>
                    )}
                  </div>

                  {!product.inStock && (
                    <div className="text-center text-xs text-red-500 mt-2">
                      Out of stock
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#16A34A] scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Product Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          {currentIndex + 1} of {products.length} products
        </span>
      </div>
    </div>
  )
}
