'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shirt, 
  Shoe, 
  Palette, 
  Mountain, 
  Star,
  Zap,
  Crown,
  ShoppingBag
} from 'lucide-react'

interface CharacterAvatarProps {
  userXp: number
  userPoints: number
  onPurchase?: (itemId: string) => void
  onEquip?: (itemId: string) => void
}

export default function CharacterAvatar({ userXp, userPoints, onPurchase, onEquip }: CharacterAvatarProps) {
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
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
              </div>
              
              {/* Character Body */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Head */}
                <div className="w-8 h-8 bg-yellow-200 rounded-full mb-1 border-2 border-yellow-300"></div>
                
                {/* Shirt */}
                <div className="w-12 h-8 rounded-md mb-1 bg-gray-400 border-2 border-white"></div>
                
                {/* Pants */}
                <div className="w-10 h-6 rounded-sm bg-gray-600 border border-white"></div>
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
                className="bg-[#16A34A] hover:bg-[#15803d] text-white"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>

          {/* Equipped Items */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border">
              <Shirt className="h-4 w-4" />
              <span className="text-sm font-medium">Basic T-Shirt</span>
              <Badge className="text-xs bg-gray-100 text-gray-700">⚪</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border">
              <Shoe className="h-4 w-4" />
              <span className="text-sm font-medium">Basic Sneakers</span>
              <Badge className="text-xs bg-gray-100 text-gray-700">⚪</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
