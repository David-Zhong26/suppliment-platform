'use client'

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
  ShoppingBag
} from 'lucide-react'

interface CharacterAvatarProps {
  userXp: number
  userPoints: number
  goalStatus?: 'happy' | 'sad' | 'cool' // Character mood based on goal achievement
  onPurchase?: (itemId: string) => void
  onEquip?: (itemId: string) => void
}

export default function CharacterAvatar({ userXp, userPoints, goalStatus = 'happy', onPurchase, onEquip }: CharacterAvatarProps) {


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
            {/* Plant Character Avatar */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              {/* Plant Character Image */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <img 
                  src={`/images/character-plant-${goalStatus}.png`}
                  alt={`${goalStatus.charAt(0).toUpperCase() + goalStatus.slice(1)} Plant Character`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement
                    if (fallback) {
                      fallback.style.display = 'flex'
                    }
                  }}
                />
                
                {/* Fallback plant character when image fails to load */}
                <div className="hidden w-full h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center relative">
                    {/* Plant leaves */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-6 bg-green-600 rounded-full transform rotate-12"></div>
                      <div className="w-4 h-6 bg-green-600 rounded-full transform -rotate-12 -ml-2"></div>
                    </div>
                    {/* Face */}
                    <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <div className="w-2 h-2 bg-black rounded-full ml-1"></div>
                      <div className="w-4 h-2 bg-black rounded-full absolute bottom-1"></div>
                    </div>
                  </div>
                </div>
              </div>
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

          {/* Character Status */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 shadow-sm">
              <div className="text-2xl">
                {goalStatus === 'happy' && '😊'}
                {goalStatus === 'sad' && '😢'}
                {goalStatus === 'cool' && '😎'}
              </div>
              <div className="flex-1">
                <span className="text-base font-bold text-gray-900">
                  {goalStatus === 'happy' && 'Goals Achieved!'}
                  {goalStatus === 'sad' && 'Keep Trying!'}
                  {goalStatus === 'cool' && 'Looking Good!'}
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  {goalStatus === 'happy' && 'You\'re doing great!'}
                  {goalStatus === 'sad' && 'Don\'t give up!'}
                  {goalStatus === 'cool' && 'You\'re on fire!'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
