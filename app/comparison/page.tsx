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
import PersistentNav from '@/components/navigation/persistent-nav'

export default function ComparisonPage() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('match')

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
            { id: 'catalog', label: 'Product Catalog' },
            { id: 'compare', label: 'Compare Products' },
            { id: 'categories', label: 'Categories' }
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
            {/* Search and Filters */}
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

            {/* Product Grid */}
            <ProductComparison />
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
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category) => (
                <Card key={category.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">Explore {category.name.toLowerCase()} supplements</p>
                    <Button 
                      size="sm" 
                      className="mt-4 bg-[#16A34A] hover:bg-[#15803d] text-white"
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setActiveTab('catalog')
                      }}
                    >
                      View Products
                    </Button>
          </CardContent>
        </Card>
              ))}
            </div>
          </div>
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
