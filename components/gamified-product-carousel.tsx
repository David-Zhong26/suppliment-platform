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
  Zap,
  Sparkles,
  Leaf,
  Brain,
  Shield,
  Activity,
  Fish,
  Sun,
  Banana,
  Microscope,
  Pill,
  Flower2
} from 'lucide-react'

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

interface GamifiedProductCarouselProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: string) => void
  onOpenDetails: (product: Product) => void
  favorites: string[]
  onToggleComparison: (productId: string) => void
  selectedForComparison: string[]
}

// Fun illustrated icons for each supplement type
const getSupplementIcon = (category: string, iconName?: string) => {
  const iconMap: Record<string, { icon: React.ReactNode, bgColor: string, emoji: string }> = {
    'Omega-3': { 
      icon: <Fish className="h-8 w-8 text-blue-600" />, 
      bgColor: 'bg-blue-100',
      emoji: '🐟'
    },
    'Vitamins': { 
      icon: <Sun className="h-8 w-8 text-orange-500" />, 
      bgColor: 'bg-orange-100',
      emoji: '☀️'
    },
    'Minerals': { 
      icon: <Banana className="h-8 w-8 text-yellow-600" />, 
      bgColor: 'bg-yellow-100',
      emoji: '🍌'
    },
    'Probiotics': { 
      icon: <Microscope className="h-8 w-8 text-green-600" />, 
      bgColor: 'bg-green-100',
      emoji: '🦠'
    },
    'Multivitamins': { 
      icon: <Pill className="h-8 w-8 text-purple-600" />, 
      bgColor: 'bg-purple-100',
      emoji: '💊'
    },
    'Herbs': { 
      icon: <Flower2 className="h-8 w-8 text-pink-600" />, 
      bgColor: 'bg-pink-100',
      emoji: '🌿'
    }
  }
  
  return iconMap[category] || { 
    icon: <Pill className="h-8 w-8 text-gray-600" />, 
    bgColor: 'bg-gray-100',
    emoji: '💊'
  }
}

// Benefit icons mapping
const getBenefitIcon = (benefit: string) => {
  const benefitMap: Record<string, { icon: React.ReactNode, color: string }> = {
    'Heart Health': { icon: <Heart className="h-5 w-5" />, color: 'text-red-500' },
    'Brain Function': { icon: <Brain className="h-5 w-5" />, color: 'text-blue-500' },
    'Joint Support': { icon: <Activity className="h-5 w-5" />, color: 'text-green-500' },
    'Immune Support': { icon: <Shield className="h-5 w-5" />, color: 'text-purple-500' },
    'Sleep Quality': { icon: <Zap className="h-5 w-5" />, color: 'text-indigo-500' },
    'Energy Support': { icon: <Zap className="h-5 w-5" />, color: 'text-yellow-500' },
    'Bone Health': { icon: <Shield className="h-5 w-5" />, color: 'text-orange-500' },
    'Digestive Health': { icon: <Microscope className="h-5 w-5" />, color: 'text-green-500' },
    'Anti-Inflammatory': { icon: <Flower2 className="h-5 w-5" />, color: 'text-pink-500' }
  }
  
  return benefitMap[benefit] || { icon: <CheckCircle className="h-5 w-5" />, color: 'text-gray-500' }
}

export default function GamifiedProductCarousel({
  products,
  onAddToCart,
  onToggleFavorite,
  onOpenDetails,
  favorites,
  onToggleComparison,
  selectedForComparison
}: GamifiedProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Manual navigation only - no auto-slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleAddToCart = (product: Product) => {
    onAddToCart(product)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-gradient-to-r from-green-400 to-green-500'
    if (percentage >= 80) return 'bg-gradient-to-r from-blue-400 to-blue-500'
    if (percentage >= 70) return 'bg-gradient-to-r from-orange-400 to-orange-500'
    return 'bg-gradient-to-r from-gray-400 to-gray-500'
  }

  const getMascotMood = (percentage: number) => {
    if (percentage >= 90) return '😍'
    if (percentage >= 80) return '😊'
    if (percentage >= 70) return '🙂'
    return '😐'
  }

  const currentProduct = products[currentIndex]
  const supplementIcon = getSupplementIcon(currentProduct.category, currentProduct.icon)

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">
            <Sparkles className="h-16 w-16 text-yellow-400" />
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Main Product Card */}
        <div className="flex items-center justify-center h-full">
          <Card 
            className={`relative w-80 bg-gradient-to-br from-white to-gray-50 border-2 rounded-3xl shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 ${
              selectedProduct?.id === currentProduct.id ? 'scale-110' : 'scale-100'
            }`}
            style={{
              background: `linear-gradient(135deg, ${supplementIcon.bgColor}20 0%, white 50%, ${supplementIcon.bgColor}10 100%)`
            }}
          >
            {/* Leaf Buddy Mascot */}
            <div className="absolute -top-4 -right-4 z-10">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200 shadow-lg">
                <span className="text-2xl">{getMascotMood(currentProduct.matchPercentage)}</span>
              </div>
            </div>

            {/* Match Score Badge */}
            <div className="absolute -top-3 -left-3 z-10">
              <div className={`px-4 py-2 rounded-full shadow-lg ${getMatchColor(currentProduct.matchPercentage)} text-white font-bold text-sm flex items-center gap-2`}>
                <Sparkles className="h-4 w-4" />
                {currentProduct.matchPercentage}% Match
              </div>
            </div>

            <CardHeader className="pb-4 pt-8">
              {/* Product Icon */}
              <div className="text-center mb-6">
                <div className={`w-24 h-24 ${supplementIcon.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white`}>
                  {supplementIcon.icon}
                </div>
                <div className="text-sm text-gray-500 font-medium">{currentProduct.brand}</div>
              </div>

              <CardTitle className="text-2xl font-bold text-center mb-4 text-gray-900">
                {currentProduct.name}
              </CardTitle>

              {/* Key Benefits with Icons */}
              <div className="space-y-3 mb-6">
                {currentProduct.benefits.slice(0, 3).map((benefit, index) => {
                  const benefitIcon = getBenefitIcon(benefit)
                  return (
                    <div key={index} className="flex items-center gap-3 bg-white/70 rounded-xl p-3 shadow-sm">
                      <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm ${benefitIcon.color}`}>
                        {benefitIcon.icon}
                      </div>
                      <span className="font-medium text-gray-800">{benefit}</span>
                    </div>
                  )
                })}
              </div>

              {/* Why This Matches */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentProduct.whyMatch}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(currentProduct.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {currentProduct.rating} ({currentProduct.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Trust Notes */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {currentProduct.trustNotes.slice(0, 3).map((note, i) => (
                    <Badge key={i} variant="secondary" className="text-xs bg-white/80 text-gray-700 border border-gray-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#16A34A] mb-2">
                  ${currentProduct.price}
                </div>
                <div className="text-sm text-gray-500">per bottle</div>
              </div>

              {/* Compare Selection */}
              <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl mb-4 shadow-sm">
                <span className="text-sm font-medium text-gray-700">Compare</span>
                <input
                  type="checkbox"
                  checked={selectedForComparison.includes(currentProduct.id)}
                  onChange={() => onToggleComparison(currentProduct.id)}
                  className="w-4 h-4 text-[#16A34A] bg-gray-100 border-gray-300 rounded focus:ring-[#16A34A] focus:ring-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => handleAddToCart(currentProduct)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-3 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
                  disabled={!currentProduct.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full text-sm border-2 border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white rounded-xl py-2"
                  onClick={() => onOpenDetails(currentProduct)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Tap for More Info
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full text-sm border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-xl py-2"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Leaf Buddy
                </Button>
              </div>

              {!currentProduct.inStock && (
                <div className="text-center text-sm text-red-500 mt-3">
                  Currently out of stock
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-12 h-12"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-12 h-12"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#16A34A] scale-125 shadow-lg' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Product Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
          {currentIndex + 1} of {products.length} products
        </span>
      </div>
    </div>
  )
}
