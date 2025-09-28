'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shirt, 
  Footprints, 
  Palette, 
  Mountain, 
  Star,
  Zap,
  Crown,
  Gift,
  ShoppingBag
} from 'lucide-react'

interface CharacterItem {
  id: string
  name: string
  category: 'shirt' | 'pants' | 'shoes' | 'background'
  price: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  equipped: boolean
  icon: React.ReactNode
}

interface CharacterAvatarProps {
  userXp: number
  userPoints: number
  onPurchase?: (itemId: string) => void
  onEquip?: (itemId: string) => void
}

export default function CharacterAvatar({ userXp, userPoints, onPurchase, onEquip }: CharacterAvatarProps) {
  const [selectedCategory, setSelectedCategory] = useState<'shirt' | 'pants' | 'shoes' | 'background'>('shirt')
  const [showShop, setShowShop] = useState(false)

  // Demo character items
  const characterItems: CharacterItem[] = [
    // Shirts
    { id: 'shirt-basic', name: 'Basic T-Shirt', category: 'shirt', price: 0, rarity: 'common', unlocked: true, equipped: true, icon: <Shirt className="h-6 w-6" /> },
    { id: 'shirt-wellness', name: 'Wellness Pro', category: 'shirt', price: 100, rarity: 'common', unlocked: true, equipped: false, icon: <Shirt className="h-6 w-6" /> },
    { id: 'shirt-gym', name: 'Gym Warrior', category: 'shirt', price: 250, rarity: 'rare', unlocked: false, equipped: false, icon: <Shirt className="h-6 w-6" /> },
    { id: 'shirt-zen', name: 'Zen Master', category: 'shirt', price: 500, rarity: 'epic', unlocked: false, equipped: false, icon: <Shirt className="h-6 w-6" /> },
    { id: 'shirt-legend', name: 'Legendary Hero', category: 'shirt', price: 1000, rarity: 'legendary', unlocked: false, equipped: false, icon: <Crown className="h-6 w-6" /> },

    // Pants
    { id: 'pants-basic', name: 'Basic Jeans', category: 'pants', price: 0, rarity: 'common', unlocked: true, equipped: true, icon: <Shirt className="h-6 w-6" /> },
    { id: 'pants-sport', name: 'Sport Pants', category: 'pants', price: 150, rarity: 'common', unlocked: true, equipped: false, icon: <Shirt className="h-6 w-6" /> },
    { id: 'pants-yoga', name: 'Yoga Pants', category: 'pants', price: 300, rarity: 'rare', unlocked: false, equipped: false, icon: <Shirt className="h-6 w-6" /> },
    { id: 'pants-mystic', name: 'Mystic Pants', category: 'pants', price: 750, rarity: 'epic', unlocked: false, equipped: false, icon: <Star className="h-6 w-6" /> },

    // Shoes
    { id: 'shoes-basic', name: 'Basic Sneakers', category: 'shoes', price: 0, rarity: 'common', unlocked: true, equipped: true, icon: <Footprints className="h-6 w-6" /> },
    { id: 'shoes-running', name: 'Running Shoes', category: 'shoes', price: 200, rarity: 'common', unlocked: true, equipped: false, icon: <Footprints className="h-6 w-6" /> },
    { id: 'shoes-hiking', name: 'Hiking Boots', category: 'shoes', price: 400, rarity: 'rare', unlocked: false, equipped: false, icon: <Footprints className="h-6 w-6" /> },
    { id: 'shoes-legend', name: 'Legendary Boots', category: 'shoes', price: 1200, rarity: 'legendary', unlocked: false, equipped: false, icon: <Crown className="h-6 w-6" /> },

    // Backgrounds
    { id: 'bg-basic', name: 'Basic Background', category: 'background', price: 0, rarity: 'common', unlocked: true, equipped: true, icon: <Mountain className="h-6 w-6" /> },
    { id: 'bg-garden', name: 'Zen Garden', category: 'background', price: 300, rarity: 'rare', unlocked: false, equipped: false, icon: <Mountain className="h-6 w-6" /> },
    { id: 'bg-mountain', name: 'Mountain Peak', category: 'background', price: 600, rarity: 'epic', unlocked: false, equipped: false, icon: <Mountain className="h-6 w-6" /> },
    { id: 'bg-cosmic', name: 'Cosmic Realm', category: 'background', price: 1500, rarity: 'legendary', unlocked: false, equipped: false, icon: <Star className="h-6 w-6" /> },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700'
      case 'rare': return 'bg-blue-100 text-blue-700'
      case 'epic': return 'bg-purple-100 text-purple-700'
      case 'legendary': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪'
      case 'rare': return '🔵'
      case 'epic': return '🟣'
      case 'legendary': return '🟡'
      default: return '⚪'
    }
  }

  const equippedItems = characterItems.filter(item => item.equipped)
  const currentShirt = equippedItems.find(item => item.category === 'shirt')
  const currentPants = equippedItems.find(item => item.category === 'pants')
  const currentShoes = equippedItems.find(item => item.category === 'shoes')
  const currentBackground = equippedItems.find(item => item.category === 'background')

  return (
    <div className="space-y-6">
      {/* Character Display */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-[#16A34A]" />
            Your Character
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {/* Character Avatar */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              {/* Background */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className={`w-full h-full ${
                  currentBackground?.id === 'bg-garden' ? 'bg-gradient-to-br from-green-200 to-green-300' :
                  currentBackground?.id === 'bg-mountain' ? 'bg-gradient-to-br from-gray-200 to-blue-300' :
                  currentBackground?.id === 'bg-cosmic' ? 'bg-gradient-to-br from-purple-400 to-pink-400' :
                  'bg-gradient-to-br from-blue-100 to-purple-100'
                }`} />
              </div>
              
              {/* Character Body */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Head */}
                <div className="w-8 h-8 bg-yellow-200 rounded-full mb-1 border-2 border-yellow-300"></div>
                
                {/* Shirt */}
                <div className={`w-12 h-8 rounded-md mb-1 ${
                  currentShirt?.id === 'shirt-wellness' ? 'bg-green-500' :
                  currentShirt?.id === 'shirt-gym' ? 'bg-red-500' :
                  currentShirt?.id === 'shirt-zen' ? 'bg-blue-500' :
                  currentShirt?.id === 'shirt-legend' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gray-400'
                } border-2 border-white`}></div>
                
                {/* Pants */}
                <div className={`w-10 h-6 rounded-sm ${
                  currentPants?.id === 'pants-sport' ? 'bg-blue-600' :
                  currentPants?.id === 'pants-yoga' ? 'bg-purple-600' :
                  currentPants?.id === 'pants-mystic' ? 'bg-indigo-600' :
                  'bg-gray-600'
                } border border-white`}></div>
              </div>
              
              {/* Shoes */}
              <div className="absolute bottom-2 left-4 w-6 h-3 bg-gray-800 rounded-sm"></div>
              <div className="absolute bottom-2 right-4 w-6 h-3 bg-gray-800 rounded-sm"></div>
            </div>

            {/* Character Stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{userXp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">{userPoints} Points</span>
              </div>
              <Button 
                onClick={() => setShowShop(true)}
                className="bg-[#16A34A] hover:bg-[#15803d] text-white"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>

          {/* Equipped Items */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {equippedItems.map(item => (
              <div key={item.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border">
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
                <Badge className={`text-xs ${getRarityColor(item.rarity)}`}>
                  {getRarityIcon(item.rarity)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shop Modal */}
      {showShop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Character Shop</h2>
              <Button variant="ghost" onClick={() => setShowShop(false)}>
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              {/* Category Tabs */}
              <div className="flex gap-2 mb-6">
                {(['shirt', 'pants', 'shoes', 'background'] as const).map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}s
                  </Button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {characterItems
                  .filter(item => item.category === selectedCategory)
                  .map(item => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        item.equipped 
                          ? 'border-green-500 bg-green-50' 
                          : item.unlocked 
                            ? 'border-gray-200 bg-white hover:border-gray-300' 
                            : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                        <Badge className={`text-xs ${getRarityColor(item.rarity)}`}>
                          {getRarityIcon(item.rarity)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#16A34A]">
                          {item.price === 0 ? 'Free' : `${item.price} pts`}
                        </span>
                        
                        <div className="flex gap-1">
                          {item.equipped ? (
                            <Badge className="bg-green-100 text-green-700">Equipped</Badge>
                          ) : item.unlocked ? (
                            <Button 
                              size="sm" 
                              onClick={() => onEquip?.(item.id)}
                              className="bg-[#16A34A] hover:bg-[#15803d] text-white"
                            >
                              Equip
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => onPurchase?.(item.id)}
                              disabled={userPoints < item.price}
                              className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300"
                            >
                              Buy
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
