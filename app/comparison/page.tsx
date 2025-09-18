'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import SupplementComparison from '@/components/supplement-comparison'
import { Search, Filter, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/db'

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

export default function ComparisonPage() {
  const [allSupplements, setAllSupplements] = useState<Supplement[]>([])
  const [filteredSupplements, setFilteredSupplements] = useState<Supplement[]>([])
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([])
  const [filters, setFilters] = useState({
    category: 'all',
    goal: 'all',
    priceRange: 'all',
    safety: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSupplements()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [allSupplements, filters, searchTerm])

  const loadSupplements = async () => {
    try {
      setIsLoading(true)
      const products = await db.getProducts()
      
      // Transform products to include additional comparison data
      const supplements: Supplement[] = products.map((product, index) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        ingredients: product.ingredients,
        safetyTags: product.safetyTags,
        matchPercentage: product.matchPercentage || (85 + Math.random() * 15), // 85-100%
        dosage: getDosageForCategory(product.category),
        reviews: {
          rating: 4.0 + Math.random() * 1.0, // 4.0-5.0
          count: Math.floor(Math.random() * 500) + 50 // 50-550
        },
        recommendedGoal: getGoalForCategory(product.category),
        interactionWarnings: Math.random() > 0.8 ? ['May interact with blood thinners'] : undefined
      }))
      
      setAllSupplements(supplements)
    } catch (error) {
      console.error('Error loading supplements:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDosageForCategory = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'vitamins':
        return '500mg daily'
      case 'omega-3':
        return '1000mg daily'
      case 'probiotics':
        return '50 billion CFU daily'
      default:
        return 'As directed'
    }
  }

  const getGoalForCategory = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'vitamins':
        return 'General Health'
      case 'omega-3':
        return 'Heart Health'
      case 'probiotics':
        return 'Digestive Health'
      default:
        return 'Wellness'
    }
  }

  const applyFilters = () => {
    let filtered = [...allSupplements]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(supplement =>
        supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplement.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplement.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(supplement =>
        supplement.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Goal filter
    if (filters.goal !== 'all') {
      filtered = filtered.filter(supplement =>
        supplement.recommendedGoal.toLowerCase().includes(filters.goal.toLowerCase())
      )
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(supplement => {
        if (max) {
          return supplement.price >= min && supplement.price <= max
        } else {
          return supplement.price >= min
        }
      })
    }

    // Safety filter
    if (filters.safety !== 'all') {
      filtered = filtered.filter(supplement =>
        supplement.safetyTags.some(tag =>
          tag.toLowerCase().includes(filters.safety.toLowerCase())
        )
      )
    }

    // Sort by match percentage
    filtered.sort((a, b) => b.matchPercentage - a.matchPercentage)
    
    setFilteredSupplements(filtered)
  }

  const handleSupplementToggle = (supplementId: string) => {
    setSelectedSupplements(prev => {
      if (prev.includes(supplementId)) {
        return prev.filter(id => id !== supplementId)
      } else if (prev.length < 4) {
        return [...prev, supplementId]
      }
      return prev
    })
  }

  const getSelectedSupplements = () => {
    return filteredSupplements.filter(supplement =>
      selectedSupplements.includes(supplement.id)
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E7D32] mx-auto mb-4"></div>
          <p className="text-[#4E944F]">Loading supplements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/user">
            <Button variant="ghost" size="sm" className="text-[#4E944F] hover:text-[#2E7D32]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-[#212121]">Supplement Comparison</h1>
            <p className="text-[#4E944F] text-lg mt-2">
              Compare supplements to find your perfect match
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#2E7D32]">Filter & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search supplements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vitamins">Vitamins</SelectItem>
                  <SelectItem value="omega-3">Omega-3</SelectItem>
                  <SelectItem value="probiotics">Probiotics</SelectItem>
                </SelectContent>
              </Select>

              {/* Goal Filter */}
              <Select value={filters.goal} onValueChange={(value) => setFilters({...filters, goal: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Goals</SelectItem>
                  <SelectItem value="health">General Health</SelectItem>
                  <SelectItem value="heart">Heart Health</SelectItem>
                  <SelectItem value="digestive">Digestive Health</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-20">$0 - $20</SelectItem>
                  <SelectItem value="20-50">$20 - $50</SelectItem>
                  <SelectItem value="50-100">$50+</SelectItem>
                </SelectContent>
              </Select>

              {/* Safety Filter */}
              <Select value={filters.safety} onValueChange={(value) => setFilters({...filters, safety: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Safety" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Safety Levels</SelectItem>
                  <SelectItem value="fda">FDA Certified</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="third-party">Third-Party Tested</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Supplement Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#2E7D32]">
              Select Supplements to Compare ({selectedSupplements.length}/4)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSupplements.map((supplement) => (
                <div
                  key={supplement.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSupplements.includes(supplement.id)
                      ? 'border-[#2E7D32] bg-[#F9FAF9]'
                      : 'border-gray-200 hover:border-[#66BB6A]'
                  }`}
                  onClick={() => handleSupplementToggle(supplement.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedSupplements.includes(supplement.id)}
                      onChange={() => handleSupplementToggle(supplement.id)}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-[#212121]">{supplement.name}</h3>
                      <p className="text-sm text-[#4E944F]">{supplement.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-[#2E7D32]">
                          {supplement.matchPercentage}%
                        </span>
                        <span className="text-sm text-gray-600">match</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Component */}
        {selectedSupplements.length > 0 && (
          <SupplementComparison supplements={getSelectedSupplements()} />
        )}

        {/* Empty State */}
        {selectedSupplements.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#212121] mb-2">
                Select supplements to compare
              </h3>
              <p className="text-[#4E944F]">
                Choose up to 4 supplements from the list above to see a detailed comparison
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
