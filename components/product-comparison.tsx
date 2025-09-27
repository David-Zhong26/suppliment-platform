'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShoppingCart, 
  Heart,
  Shield,
  Zap,
  CheckCircle,
  Plus,
  Minus,
  X
} from 'lucide-react'

interface Product {
  id: string
  name: string
  brand: string
  matchPercentage: number
  rating: number
  reviews: number
  price: number
  image: string
  icon: React.ReactNode
  benefits: string[]
  description: string
  category: string
  inStock: boolean
}

interface ShoppingCartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Omega-3 Complex',
    brand: 'Wellness Pro',
    matchPercentage: 92,
    rating: 4.9,
    reviews: 1247,
    price: 29.99,
    image: '🐟',
    icon: '🐟',
    benefits: ['Heart Health', 'Brain Function', 'Joint Support'],
    description: 'High-potency omega-3 fatty acids from wild-caught fish',
    category: 'Omega-3',
    inStock: true
  },
  {
    id: '2',
    name: 'Vitamin D3+K2',
    brand: 'Sunshine Labs',
    matchPercentage: 89,
    rating: 4.8,
    reviews: 892,
    price: 24.99,
    image: '☀️',
    icon: '☀️',
    benefits: ['Bone Health', 'Immune Support', 'Calcium Absorption'],
    description: 'Essential vitamins for bone and immune health',
    category: 'Vitamins',
    inStock: true
  },
  {
    id: '3',
    name: 'Magnesium Glycinate',
    brand: 'Calm Wellness',
    matchPercentage: 85,
    rating: 4.9,
    reviews: 1563,
    price: 19.99,
    image: '🍌',
    icon: '🍌',
    benefits: ['Sleep Quality', 'Muscle Relaxation', 'Stress Relief'],
    description: 'Highly absorbable magnesium for better sleep and relaxation',
    category: 'Minerals',
    inStock: true
  },
  {
    id: '4',
    name: 'Probiotic Complex',
    brand: 'Gut Health Co',
    matchPercentage: 78,
    rating: 4.7,
    reviews: 734,
    price: 34.99,
    image: '🦠',
    icon: '🦠',
    benefits: ['Digestive Health', 'Immune Support', 'Gut Balance'],
    description: '50 billion CFU probiotic blend for optimal gut health',
    category: 'Probiotics',
    inStock: true
  },
  {
    id: '5',
    name: 'Multivitamin Complete',
    brand: 'Daily Essentials',
    matchPercentage: 81,
    rating: 4.6,
    reviews: 2156,
    price: 22.99,
    image: '💊',
    icon: '💊',
    benefits: ['Daily Nutrition', 'Energy Support', 'Overall Wellness'],
    description: 'Comprehensive daily multivitamin with 25 essential nutrients',
    category: 'Multivitamins',
    inStock: true
  },
  {
    id: '6',
    name: 'Turmeric Curcumin',
    brand: 'Golden Health',
    matchPercentage: 73,
    rating: 4.8,
    reviews: 987,
    price: 26.99,
    image: '🟡',
    icon: '🟡',
    benefits: ['Anti-Inflammatory', 'Joint Health', 'Antioxidant Support'],
    description: 'High-potency turmeric with enhanced absorption',
    category: 'Herbs',
    inStock: true
  }
]

export default function ProductComparison() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      })
    }
  }

  const addToCart = (product: Product) => {
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
          quantity: 1,
          image: product.image
        }
      ])
    }

    // Show cart briefly
    setShowCart(true)
    setTimeout(() => setShowCart(false), 2000)
  }

  const removeFromCart = (productId: string) => {
    setShoppingCart(cart => cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setShoppingCart(cart =>
      cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getTotalPrice = () => {
    return shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-[#22C55E] bg-[#DCFCE7]'
    if (percentage >= 80) return 'text-[#16A34A] bg-[#BBF7D0]'
    if (percentage >= 70) return 'text-[#F97316] bg-[#FED7AA]'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 wellness-slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your <span className="wellness-gradient-text">Perfect Match</span> Supplements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Compare personalized supplement recommendations based on your wellness profile. 
            Each product is scored for compatibility with your health goals.
          </p>
          
          {/* Shopping Cart Button */}
          <div className="relative inline-block">
            <Button
              onClick={() => setShowCart(!showCart)}
              className="btn-primary-wellness relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Shopping Cart
              {shoppingCart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs">
                  {shoppingCart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Product Comparison Scroll */}
        <div className="relative">
          {/* Scroll Buttons */}
          <Button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="icon"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="icon"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="flex-shrink-0 w-80 wellness-card wellness-card-hover wellness-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  {/* Match Percentage Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`text-lg font-bold px-3 py-1 ${getMatchColor(product.matchPercentage)}`}>
                      {product.matchPercentage}% Match
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(product.id)}
                      className={`transition-colors ${
                        favorites.includes(product.id) ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${
                        favorites.includes(product.id) ? 'fill-current' : ''
                      }`} />
                    </Button>
                  </div>

                  {/* Product Image/Icon */}
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{product.icon}</div>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </div>

                  <CardTitle className="text-lg text-center mb-2">
                    {product.name}
                  </CardTitle>

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
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.map((benefit, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-[#22C55E]">
                        ${product.price}
                      </div>
                      <div className="text-sm text-gray-500">per bottle</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Category</div>
                      <div className="text-sm font-medium text-[#22C55E]">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full btn-primary-wellness"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>

                  {!product.inStock && (
                    <div className="text-center text-sm text-red-500 mt-2">
                      Currently out of stock
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
            <div className="bg-white w-96 h-full shadow-2xl overflow-y-auto wellness-slide-up">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Shopping Cart</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCart(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {shoppingCart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {shoppingCart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-[#22C55E]">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                      
                      <Button className="w-full btn-primary-wellness mb-2">
                        Proceed to Checkout
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 wellness-slide-up">
          <p className="text-gray-600 mb-4">
            Ready to discover your perfect supplements?
          </p>
          <Button className="btn-primary-wellness">
            Start Your Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
