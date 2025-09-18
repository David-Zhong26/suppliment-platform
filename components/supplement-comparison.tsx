'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Star, Shield, Leaf, AlertTriangle, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface Supplement {
  id: string
  name: string
  brand: string
  description: string
  price: number
  imageUrl: string
  category: string
  ingredients: string[]
  safetyTags: string[]
  matchPercentage: number
  dosage: string
  reviews: {
    rating: number
    count: number
  }
  recommendedGoal: string
  interactionWarnings?: string[]
}

interface SupplementComparisonProps {
  supplements: Supplement[]
  maxSupplements?: number
}

export default function SupplementComparison({ 
  supplements, 
  maxSupplements = 4 
}: SupplementComparisonProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<Supplement[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Auto-select top supplements by match percentage
    const sortedSupplements = [...supplements]
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, maxSupplements)
    setSelectedSupplements(sortedSupplements)
  }, [supplements, maxSupplements])

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-[#2E7D32]'
    if (percentage >= 80) return 'text-[#66BB6A]'
    if (percentage >= 70) return 'text-[#A5D6A7]'
    return 'text-gray-500'
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-[#2E7D32]'
    if (percentage >= 80) return 'bg-[#66BB6A]'
    if (percentage >= 70) return 'bg-[#A5D6A7]'
    return 'bg-gray-300'
  }

  const getSafetyIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'fda-certified':
        return <Shield className="h-4 w-4 text-[#2E7D32]" />
      case 'organic':
        return <Leaf className="h-4 w-4 text-[#66BB6A]" />
      case 'third-party tested':
        return <CheckCircle className="h-4 w-4 text-[#2E7D32]" />
      default:
        return <CheckCircle className="h-4 w-4 text-[#66BB6A]" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const comparisonAttributes = [
    { key: 'dosage', label: 'Dosage' },
    { key: 'price', label: 'Price per Serving' },
    { key: 'safetyTags', label: 'Safety & Quality' },
    { key: 'reviews', label: 'User Reviews' },
    { key: 'recommendedGoal', label: 'Best For' },
    { key: 'interactionWarnings', label: 'Warnings' }
  ]

  if (selectedSupplements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No supplements selected for comparison</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="wellness-header p-6 mb-8 rounded-lg">
        <h2 className="text-3xl font-bold text-[#212121] mb-2">
          Supplement Comparison
        </h2>
        <p className="text-[#4E944F] text-lg">
          Compare supplements side-by-side to find your perfect match
        </p>
      </div>

      {/* Comparison Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : `grid-cols-${Math.min(selectedSupplements.length, 4)}`}`}>
        {selectedSupplements.map((supplement, index) => {
          const isHighestMatch = supplement.matchPercentage === Math.max(...selectedSupplements.map(s => s.matchPercentage))
          
          return (
            <Card 
              key={supplement.id} 
              className={`relative ${isHighestMatch ? 'comparison-highlight' : 'border-gray-200'}`}
            >
              {/* Best Match Badge */}
              {isHighestMatch && (
                <div className="absolute -top-3 left-4 bg-[#2E7D32] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Match
                </div>
              )}

              <CardHeader className="text-center pb-4">
                {/* Match Percentage - Main Focus */}
                <div className="mb-4">
                  <div className={`text-5xl font-bold ${getMatchColor(supplement.matchPercentage)} mb-2`}>
                    {supplement.matchPercentage}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(supplement.matchPercentage)}`}
                      style={{ width: `${supplement.matchPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Match Score</p>
                </div>

                {/* Product Image */}
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <Image
                    src={supplement.imageUrl}
                    alt={supplement.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <h3 className="font-semibold text-lg text-[#212121] mb-1">
                  {supplement.name}
                </h3>
                <p className="text-[#4E944F] text-sm mb-2">{supplement.brand}</p>
                <p className="text-2xl font-bold text-[#2E7D32]">
                  ${supplement.price.toFixed(2)}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Attributes */}
                {comparisonAttributes.map((attr) => (
                  <div key={attr.key} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{attr.label}</h4>
                    
                    {attr.key === 'dosage' && (
                      <p className="text-sm text-[#212121]">{supplement.dosage}</p>
                    )}
                    
                    {attr.key === 'price' && (
                      <p className="text-sm text-[#212121]">${(supplement.price / 30).toFixed(2)}/serving</p>
                    )}
                    
                    {attr.key === 'safetyTags' && (
                      <div className="flex flex-wrap gap-1">
                        {supplement.safetyTags.map((tag, i) => (
                          <div key={i} className="flex items-center gap-1 bg-[#F9FAF9] px-2 py-1 rounded text-xs">
                            {getSafetyIcon(tag)}
                            <span className="text-[#4E944F]">{tag}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {attr.key === 'reviews' && (
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(supplement.reviews.rating)}</div>
                        <span className="text-sm text-gray-600">
                          {supplement.reviews.rating} ({supplement.reviews.count} reviews)
                        </span>
                      </div>
                    )}
                    
                    {attr.key === 'recommendedGoal' && (
                      <Badge variant="secondary" className="bg-[#A5D6A7] text-[#2E7D32]">
                        {supplement.recommendedGoal}
                      </Badge>
                    )}
                    
                    {attr.key === 'interactionWarnings' && (
                      <div>
                        {supplement.interactionWarnings && supplement.interactionWarnings.length > 0 ? (
                          <div className="flex items-center gap-1 text-orange-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">{supplement.interactionWarnings[0]}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[#2E7D32]">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">No known interactions</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Action Button */}
                <Button className="w-full btn-primary-green mt-6">
                  View Details
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mobile: Show fewer supplements in a more compact layout */}
      {isMobile && selectedSupplements.length > 2 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Showing top {selectedSupplements.length} matches. 
            <br />Scroll horizontally to see all comparisons.
          </p>
        </div>
      )}
    </div>
  )
}
