'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  SortAsc, 
  Star, 
  ShoppingCart, 
  Heart,
  TrendingUp,
  Shield,
  Truck,
  CreditCard,
  TestTube,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'
import ProductComparison from '@/components/product-comparison'
import GamifiedProductCarousel from '@/components/gamified-product-carousel'
import PersistentNav from '@/components/navigation/persistent-nav'

export default function ComparisonPage() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('match')
  const [shoppingCart, setShoppingCart] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Products', icon: '💊' },
    { id: 'omega3', name: 'Omega-3', icon: '🐟' },
    { id: 'vitamins', name: 'Vitamins', icon: '☀️' },
    { id: 'minerals', name: 'Minerals', icon: '🏔️' },
    { id: 'protein', name: 'Protein', icon: '💪' },
    { id: 'probiotics', name: 'Probiotics', icon: '🦠' },
    { id: 'herbs', name: 'Herbs', icon: '🌿' }
  ]

  const sortOptions = [
    { value: 'match', label: 'Best Match' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ]

  // Handler functions for the gamified carousel
  const handleAddToCart = (product: any) => {
    const existingItem = shoppingCart.find(item => item.id === product.id)
    
    if (existingItem) {
      setShoppingCart(cart =>
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
        } else {
      setShoppingCart(cart => [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ])
    }
  }

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleOpenDetails = (product: any) => {
    // This would open a product details modal
    console.log('Opening details for:', product.name)
  }

  const handleToggleComparison = (productId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={1} userName="User" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.history.back()}
            className="wellness-nav-link"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
              </Button>
          </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Marketplace 🛒
            </h1>
            <p className="text-gray-600 text-lg">
              Discover and compare supplements tailored to your wellness goals
            </p>
              </div>
          <div className="flex gap-3">
            <Button 
              className="bg-[#16A34A] hover:bg-[#15803d] text-white"
              onClick={() => setActiveTab('catalog')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
            <Button 
              variant="outline"
              onClick={() => setActiveTab('compare')}
            >
              Compare Selected
            </Button>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="bg-white rounded-lg p-4 mb-8 border border-gray-200">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-[#16A34A]" />
              <span>Third-party tested</span>
              </div>
              <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#16A34A]" />
              <span>30-day return</span>
              </div>
              <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#16A34A]" />
              <span>GMP certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#16A34A]" />
              <span>Free shipping</span>
              </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#16A34A]" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'catalog', label: 'Recommended Products' },
            { id: 'compare', label: 'Compare Products' },
            { id: 'categories', label: 'Full List' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#16A34A] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'catalog' && (
          <>
            {/* Header for Recommended Products */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your <span className="text-[#16A34A]">Perfect Match</span> Supplements
            </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Swipe through personalized supplement recommendations based on your wellness profile. 
                Each product is scored for compatibility with your health goals.
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-4 items-center justify-center">
                <Button
                  onClick={() => setActiveTab('compare')}
                  variant="outline"
                  className="border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Compare Selected
                  {selectedForComparison.length > 0 && (
                    <Badge className="ml-2 bg-[#16A34A] text-white">
                      {selectedForComparison.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  className="bg-[#16A34A] hover:bg-[#15803d] text-white"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Shopping Cart
                  {shoppingCart.length > 0 && (
                    <Badge className="ml-2 bg-[#F97316] text-white">
                      {shoppingCart.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Gamified Product Carousel */}
            <GamifiedProductCarousel
              products={[
                {
                  id: '1',
                  name: 'Premium Omega-3 Complex',
                  brand: 'Wellness Pro',
                  matchPercentage: 92,
                  rating: 4.9,
                  reviews: 1247,
                  price: 29.99,
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
                  }
                },
                {
                  id: '2',
                  name: 'Vitamin D3+K2',
                  brand: 'Sunshine Labs',
                  matchPercentage: 89,
                  rating: 4.8,
                  reviews: 892,
                  price: 24.99,
                  icon: <Sun className="h-8 w-8 text-[#F97316]" />,
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
                  }
                },
                {
                  id: '3',
                  name: 'Magnesium Glycinate',
                  brand: 'Calm Wellness',
                  matchPercentage: 85,
                  rating: 4.9,
                  reviews: 1563,
                  price: 19.99,
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
                  }
                }
              ]}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenDetails={handleOpenDetails}
              favorites={favorites}
              onToggleComparison={handleToggleComparison}
              selectedForComparison={selectedForComparison}
            />
          </>
        )}

        {activeTab === 'compare' && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Compare Products</h3>
            <p className="text-gray-600 mb-6">
              Select products from the catalog to compare their features, prices, and match scores
            </p>
            <Button 
              onClick={() => setActiveTab('catalog')}
              className="bg-[#16A34A] hover:bg-[#15803d] text-white"
            >
              Browse Products
            </Button>
          </div>
        )}

        {activeTab === 'categories' && (
          <>
            {/* Search and Filters for Full List */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search products, brands, or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Full Product Grid */}
            <ProductComparison />
          </>
        )}
          
        {/* How We Calculate Matches */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How We Calculate Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TestTube className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ingredients Quality</h3>
              <p className="text-sm text-gray-600">Purity, potency, and bioavailability of active ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Goals Alignment</h3>
              <p className="text-sm text-gray-600">How well the supplement matches your health objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safety Profile</h3>
              <p className="text-sm text-gray-600">Compatibility with your health conditions and medications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evidence Strength</h3>
              <p className="text-sm text-gray-600">Scientific research backing the supplement's effectiveness</p>
            </div>
                      </div>
          <div className="text-center mt-6">
            <Button variant="outline">
              Learn More About Our Algorithm
            </Button>
                  </div>
                </div>
      </div>
    </div>
  )
}
