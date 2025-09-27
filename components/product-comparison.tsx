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
  X,
  Fish,
  Sun,
  Banana,
  Microscope,
  Pill,
  Flower2,
  Info,
  MessageCircle,
  Award,
  Clock,
  Truck,
  CreditCard,
  TestTube,
  Target
} from 'lucide-react'

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
    icon: <Fish className="h-8 w-8 text-[#16A34A]" />,
    benefits: ['Heart Health', 'Brain Function', 'Joint Support'],
    description: 'High-potency EPA/DHA from wild-caught fish for heart and brain support',
    category: 'Omega-3',
    inStock: true,
    whyMatch: 'Selected because your profile highlights cardiovascular health and no fish allergy; dosage aligns with clinical guidelines',
    trustNotes: ['4.9 (1,247 reviews)', 'Third-party tested', 'No added vitamin A', 'Gluten-free'],
    matchBreakdown: {
      ingredients: 60,
      goalsFit: 20,
      safety: 10,
      evidence: 10
    },
    certifications: ['Third-party tested', 'GMP certified', 'Non-GMO']
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
    certifications: ['Lab verified', 'Vegetarian', 'Non-GMO']
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
    certifications: ['Chelated', 'No fillers', 'Sleep tested']
  },
  {
    id: '4',
    name: 'Probiotic Complex',
    brand: 'Gut Health Co',
    matchPercentage: 78,
    rating: 4.7,
    reviews: 734,
    price: 34.99,
    icon: <Microscope className="h-8 w-8 text-[#16A34A]" />,
    benefits: ['Digestive Health', 'Immune Support', 'Gut Balance'],
    description: '50 billion CFU probiotic blend for optimal gut health',
    category: 'Probiotics',
    inStock: true,
    whyMatch: 'Supports your digestive wellness goals with clinically studied strains',
    trustNotes: ['4.7 (734 reviews)', '50B CFU', 'Refrigerated', 'Clinically studied'],
    matchBreakdown: {
      ingredients: 45,
      goalsFit: 20,
      safety: 25,
      evidence: 10
    },
    certifications: ['Clinically studied', 'Refrigerated', 'CFU guaranteed']
  },
  {
    id: '5',
    name: 'Multivitamin Complete',
    brand: 'Daily Essentials',
    matchPercentage: 81,
    rating: 4.6,
    reviews: 2156,
    price: 22.99,
    icon: <Pill className="h-8 w-8 text-[#16A34A]" />,
    benefits: ['Daily Nutrition', 'Energy Support', 'Overall Wellness'],
    description: 'Comprehensive daily multivitamin with 25 essential nutrients',
    category: 'Multivitamins',
    inStock: true,
    whyMatch: 'Fills nutritional gaps in your diet with bioavailable forms of vitamins',
    trustNotes: ['4.6 (2,156 reviews)', '25 nutrients', 'Bioavailable forms', 'One-a-day'],
    matchBreakdown: {
      ingredients: 40,
      goalsFit: 35,
      safety: 15,
      evidence: 10
    },
    certifications: ['Bioavailable', 'One-a-day', 'Nutrient tested']
  },
  {
    id: '6',
    name: 'Turmeric Curcumin',
    brand: 'Golden Health',
    matchPercentage: 73,
    rating: 4.8,
    reviews: 987,
    price: 26.99,
    icon: <Flower2 className="h-8 w-8 text-[#F97316]" />,
    benefits: ['Anti-Inflammatory', 'Joint Health', 'Antioxidant Support'],
    description: 'High-potency turmeric with enhanced absorption',
    category: 'Herbs',
    inStock: true,
    whyMatch: 'Supports your inflammation management goals with 95% curcuminoids',
    trustNotes: ['4.8 (987 reviews)', '95% curcuminoids', 'Enhanced absorption', 'Non-GMO'],
    matchBreakdown: {
      ingredients: 35,
      goalsFit: 25,
      safety: 20,
      evidence: 20
    },
    certifications: ['95% curcuminoids', 'Enhanced absorption', 'Non-GMO']
  }
]

// Match Breakdown Tooltip Component
interface MatchBreakdownProps {
  breakdown: {
    ingredients: number
    goalsFit: number
    safety: number
    evidence: number
  }
  isVisible: boolean
  onClose: () => void
}

function MatchBreakdown({ breakdown, isVisible, onClose }: MatchBreakdownProps) {
  if (!isVisible) return null

  return (
    <div className="absolute top-12 left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900">Match Breakdown</h4>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Ingredients Quality</span>
          <span className="text-sm font-medium">{breakdown.ingredients}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Goals Alignment</span>
          <span className="text-sm font-medium">{breakdown.goalsFit}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Safety Profile</span>
          <span className="text-sm font-medium">{breakdown.safety}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Evidence Strength</span>
          <span className="text-sm font-medium">{breakdown.evidence}%</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <Button variant="ghost" size="sm" className="text-xs text-[#16A34A] hover:text-[#15803d]">
          <Info className="h-3 w-3 mr-1" />
          How we calculate matches
        </Button>
      </div>
    </div>
  )
}

export default function ProductComparison() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showMatchBreakdown, setShowMatchBreakdown] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
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
          image: 'pill-icon' // Using a placeholder since we removed the image property
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

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const proceedToCheckout = () => {
    setShowCheckout(true)
    setShowCart(false)
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
        {/* Trust Strip */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12 wellness-slide-up">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-[#16A34A]" />
              <span>Third-party tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#16A34A]" />
              <span>30-day return</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#16A34A]" />
              <span>GMP certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#16A34A]" />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#16A34A]" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 wellness-slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your <span className="text-[#16A34A]">Perfect Match</span> Supplements
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
                className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 wellness-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  {/* Match Percentage Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className={`text-lg font-bold px-4 py-2 rounded-full ${getMatchColor(product.matchPercentage)} hover:opacity-80 transition-all`}
                        onClick={() => setShowMatchBreakdown(
                          showMatchBreakdown === product.id ? null : product.id
                        )}
                      >
                        {product.matchPercentage}% Match
                        <Info className="h-4 w-4 ml-2" />
                      </Button>
                      {showMatchBreakdown === product.id && (
                        <MatchBreakdown
                          breakdown={product.matchBreakdown}
                          isVisible={true}
                          onClose={() => setShowMatchBreakdown(null)}
                        />
                      )}
                    </div>
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

                  {/* Product Icon */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      {product.icon}
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

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d]"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full text-sm border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
                      onClick={() => openProductModal(product)}
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
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Pill className="h-6 w-6 text-[#16A34A]" />
                        </div>
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
                      
                      <Button 
                        className="w-full btn-primary-wellness mb-2"
                        onClick={proceedToCheckout}
                      >
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

        {/* Transparency Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mt-12 wellness-slide-up">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How We Calculate Matches
            </h3>
            <p className="text-gray-600 mb-6">
              Our algorithm considers multiple factors to ensure the best supplement recommendations for your unique profile.
            </p>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <TestTube className="h-6 w-6 text-[#16A34A]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Ingredients Quality</h4>
                <p className="text-sm text-gray-600">Purity, potency, and bioavailability</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-[#16A34A]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Goals Alignment</h4>
                <p className="text-sm text-gray-600">Matches your health objectives</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-[#16A34A]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Safety Profile</h4>
                <p className="text-sm text-gray-600">Allergy and interaction checks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-[#16A34A]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Evidence Strength</h4>
                <p className="text-sm text-gray-600">Scientific research backing</p>
              </div>
            </div>
            <Button variant="outline" className="border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white">
              Learn More About Our Process
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 wellness-slide-up">
          <p className="text-gray-600 mb-4">
            Ready to discover your perfect supplements?
          </p>
          <Button className="btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d]">
            Start Your Assessment
          </Button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center">
                    {selectedProduct.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <p className="text-lg text-gray-600">{selectedProduct.brand}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowProductModal(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Product Info */}
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="bg-[#F0FDF4] border border-[#16A34A] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">Your Match Score</h3>
                      <Badge className={`${getMatchColor(selectedProduct.matchPercentage)} px-3 py-1`}>
                        {selectedProduct.matchPercentage}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{selectedProduct.whyMatch}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Benefits</h3>
                    <ul className="space-y-2">
                      {selectedProduct.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#16A34A] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust Notes */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.trustNotes.map((note, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Reviews & Purchase */}
                <div className="space-y-6">
                  {/* Reviews */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-gray-900">{selectedProduct.rating}</span>
                      <span className="text-gray-600">({selectedProduct.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">5★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">4★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '12%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">12%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">3★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '2%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">2%</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Purchase */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-[#16A34A] mb-2">
                        ${selectedProduct.price}
                      </div>
                      <p className="text-gray-600">One-time purchase</p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => {
                          addToCart(selectedProduct)
                          setShowProductModal(false)
                        }}
                        className="w-full btn-primary-wellness text-lg py-3"
                        disabled={!selectedProduct.inStock}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart - ${selectedProduct.price}
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        Add to Wishlist
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          <span>Free shipping</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          <span>30-day return</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowCheckout(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {shoppingCart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Pill className="h-5 w-5 text-[#16A34A]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-[#16A34A]">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Payment Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input 
                        type="text" 
                        placeholder="12345"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input 
                        type="text" 
                        placeholder="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        placeholder="Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input 
                        type="text" 
                        placeholder="123 Wellness St"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input 
                        type="text" 
                        placeholder="Health City"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input 
                        type="text" 
                        placeholder="CA"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Complete Button */}
                <Button 
                  className="w-full btn-primary-wellness text-lg py-3"
                  onClick={() => {
                    setShowCheckout(false)
                    setShoppingCart([])
                    alert('Order placed successfully! Thank you for your purchase.')
                  }}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Complete Order - ${getTotalPrice().toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
