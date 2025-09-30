'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
  Flower2,
  Droplets,
  Moon
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
      icon: <Fish className="h-12 w-12 text-blue-600" />, 
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      emoji: '🐟'
    },
    'Vitamins': { 
      icon: <Sun className="h-12 w-12 text-orange-500" />, 
      bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200',
      emoji: '☀️'
    },
    'Minerals': { 
      icon: <Banana className="h-12 w-12 text-yellow-600" />, 
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      emoji: '🍌'
    },
    'Probiotics': { 
      icon: <Microscope className="h-12 w-12 text-green-600" />, 
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      emoji: '🦠'
    },
    'Multivitamins': { 
      icon: <Pill className="h-12 w-12 text-purple-600" />, 
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
      emoji: '💊'
    },
    'Herbs': { 
      icon: <Flower2 className="h-12 w-12 text-pink-600" />, 
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
      emoji: '🌿'
    }
  }
  
  return iconMap[category] || { 
    icon: <Pill className="h-12 w-12 text-gray-600" />, 
    bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
    emoji: '💊'
  }
}

// Benefit icons mapping
const getBenefitIcon = (benefit: string) => {
  const benefitMap: Record<string, { icon: React.ReactNode, color: string, bgColor: string }> = {
    'Heart Health': { icon: <Heart className="h-5 w-5" />, color: 'text-red-500', bgColor: 'bg-red-50' },
    'Brain Function': { icon: <Brain className="h-5 w-5" />, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    'Joint Support': { icon: <Activity className="h-5 w-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    'Bone Health': { icon: <Shield className="h-5 w-5" />, color: 'text-green-500', bgColor: 'bg-green-50' },
    'Immune Support': { icon: <Zap className="h-5 w-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    'Calcium Absorption': { icon: <Droplets className="h-5 w-5" />, color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
    'Sleep Quality': { icon: <Moon className="h-5 w-5" />, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
    'Muscle Relaxation': { icon: <Activity className="h-5 w-5" />, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    'Stress Relief': { icon: <Leaf className="h-5 w-5" />, color: 'text-green-500', bgColor: 'bg-green-50' },
    'Digestive Health': { icon: <Microscope className="h-5 w-5" />, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    'Gut Balance': { icon: <CheckCircle className="h-5 w-5" />, color: 'text-teal-500', bgColor: 'bg-teal-50' },
    'Daily Nutrition': { icon: <Pill className="h-5 w-5" />, color: 'text-violet-500', bgColor: 'bg-violet-50' },
    'Energy Support': { icon: <Zap className="h-5 w-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    'Overall Wellness': { icon: <Sparkles className="h-5 w-5" />, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    'Anti-Inflammatory': { icon: <Shield className="h-5 w-5" />, color: 'text-red-500', bgColor: 'bg-red-50' },
    'Joint Health': { icon: <Activity className="h-5 w-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    'Antioxidant Support': { icon: <Sparkles className="h-5 w-5" />, color: 'text-purple-500', bgColor: 'bg-purple-50' }
  }
  
  return benefitMap[benefit] || { icon: <CheckCircle className="h-5 w-5" />, color: 'text-gray-500', bgColor: 'bg-gray-50' }
}

// Get match score color and emoji
const getMatchScoreStyle = (percentage: number) => {
  if (percentage >= 90) return { 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    emoji: '🎉',
    label: 'Perfect Match!'
  }
  if (percentage >= 80) return { 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    emoji: '⭐',
    label: 'Great Match!'
  }
  if (percentage >= 70) return { 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    emoji: '👍',
    label: 'Good Match'
  }
  return { 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-gray-500 to-gray-600',
    emoji: '🤔',
    label: 'Fair Match'
  }
}

// Leaf Buddy mascot reactions
const getLeafBuddyReaction = (percentage: number) => {
  if (percentage >= 90) return '😍'
  if (percentage >= 80) return '😊'
  if (percentage >= 70) return '🙂'
  return '😐'
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Handle swipe navigation
  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSwipeDirection('right')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
      setIsAnimating(false)
      setSwipeDirection(null)
    }, 300)
  }

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSwipeDirection('left')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
      setIsAnimating(false)
      setSwipeDirection(null)
    }, 300)
  }

  // Handle add to cart with confetti
  const handleAddToCart = (product: Product) => {
    onAddToCart(product)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-gray-500">No products available right now</p>
        </div>
      </div>
    )
  }

  const currentProduct = products[currentIndex]
  const supplementIcon = getSupplementIcon(currentProduct.category, currentProduct.icon)
  const matchStyle = getMatchScoreStyle(currentProduct.matchPercentage)

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-4xl animate-bounce">🎉</div>
          </div>
          <div className="absolute top-1/3 left-1/4 text-2xl animate-ping">✨</div>
          <div className="absolute top-2/3 right-1/4 text-2xl animate-ping">⭐</div>
          <div className="absolute top-1/4 right-1/3 text-xl animate-bounce">🎊</div>
          <div className="absolute bottom-1/4 left-1/3 text-xl animate-bounce">🌟</div>
        </div>
      )}

      {/* Main Card Container */}
      <div className="relative h-[600px] perspective-1000 overflow-hidden">
        {/* Previous Card (Left) */}
        {products.length > 1 && (
          <div 
            className={`absolute left-8 top-12 w-80 h-[500px] transform transition-all duration-300 ${
              swipeDirection === 'left' ? 'scale-95 opacity-50' : 'scale-85 opacity-70'
            }`}
            style={{ 
              zIndex: 1,
              transform: `translateX(-60%) ${swipeDirection === 'left' ? 'scale(0.95)' : 'scale(0.85)'}`
            }}
          >
            <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-3xl shadow-lg">
              <CardContent className="p-6 h-full flex flex-col justify-center items-center">
                <div className="text-center opacity-70">
                  <div className="text-4xl mb-2">👈</div>
                  <p className="text-sm text-gray-500">Swipe left</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Current Card (Center) */}
        <div 
          ref={(el) => { cardRefs.current[currentIndex] = el }}
          className={`absolute left-1/2 top-0 w-80 h-[550px] transform -translate-x-1/2 transition-all duration-300 ${
            isAnimating 
              ? swipeDirection === 'right' 
                ? 'translate-x-2 scale-105' 
                : swipeDirection === 'left' 
                  ? '-translate-x-2 scale-105' 
                  : ''
              : 'scale-100'
          }`}
          style={{ zIndex: 3 }}
        >
          <Card className="h-full bg-white border-2 border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-0 h-full relative">
              {/* Match Score Badge */}
              <div className={`absolute top-4 left-4 ${matchStyle.bgColor} px-4 py-2 rounded-full shadow-lg z-10`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{matchStyle.emoji}</span>
                  <span className={`font-bold text-sm ${matchStyle.color}`}>
                    {currentProduct.matchPercentage}% {matchStyle.label}
                  </span>
                </div>
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(currentProduct.id)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full shadow-lg transition-all ${
                  favorites.includes(currentProduct.id) 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-400 hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(currentProduct.id) ? 'fill-current' : ''}`} />
              </Button>

              {/* Product Icon */}
              <div className="pt-16 pb-8">
                <div className={`w-24 h-24 ${supplementIcon.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {supplementIcon.icon}
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 font-medium mb-1">{currentProduct.brand}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{currentProduct.name}</h3>
                </div>
              </div>

              {/* Benefits */}
              <div className="px-6 mb-6">
                <div className="grid grid-cols-1 gap-3">
                  {currentProduct.benefits.slice(0, 3).map((benefit, index) => {
                    const benefitIcon = getBenefitIcon(benefit)
                    return (
                      <div key={index} className={`flex items-center gap-3 p-3 ${benefitIcon.bgColor} rounded-2xl`}>
                        <div className={`p-2 rounded-full ${benefitIcon.bgColor}`}>
                          <div className={benefitIcon.color}>
                            {benefitIcon.icon}
                          </div>
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{benefit}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Credibility Badges */}
              <div className="px-6 mb-6">
                <div className="flex flex-wrap gap-2">
                  {currentProduct.trustNotes.slice(0, 3).map((note, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="px-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">${currentProduct.price}</div>
                  <div className="text-sm text-gray-500">per bottle</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 space-y-3">
                <Button
                  onClick={() => handleAddToCart(currentProduct)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
                  disabled={!currentProduct.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-xl font-medium"
                    onClick={() => onOpenDetails(currentProduct)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-xl font-medium"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask Expert
                  </Button>
                </div>
              </div>

              {/* Leaf Buddy Mascot */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <span className="text-2xl">{getLeafBuddyReaction(currentProduct.matchPercentage)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Card (Right) */}
        {products.length > 1 && (
          <div 
            className={`absolute right-8 top-12 w-80 h-[500px] transform transition-all duration-300 ${
              swipeDirection === 'right' ? 'scale-95 opacity-50' : 'scale-85 opacity-70'
            }`}
            style={{ 
              zIndex: 1,
              transform: `translateX(60%) ${swipeDirection === 'right' ? 'scale(0.95)' : 'scale(0.85)'}`
            }}
          >
            <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-3xl shadow-lg">
              <CardContent className="p-6 h-full flex flex-col justify-center items-center">
                <div className="text-center opacity-70">
                  <div className="text-4xl mb-2">👉</div>
                  <p className="text-sm text-gray-500">Swipe right</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <Button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-50 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </Button>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-green-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={goToNext}
          disabled={isAnimating}
          className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-50 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </Button>
      </div>

      {/* Product Counter */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          {currentIndex + 1} of {products.length} products
        </p>
      </div>
    </div>
  )
}