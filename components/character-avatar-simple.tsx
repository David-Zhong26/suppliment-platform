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
              {/* Character Image */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                {goalStatus === 'happy' && (
                  <img 
                    src="/images/character-happy.png" 
                    alt="Happy Plant Character"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) {
                        fallback.style.display = 'flex'
                      }
                    }}
                  />
                )}
                {goalStatus === 'sad' && (
                  <img 
                    src="/images/character-sad.png" 
                    alt="Sad Plant Character"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) {
                        fallback.style.display = 'flex'
                      }
                    }}
                  />
                )}
                {goalStatus === 'cool' && (
                  <img 
                    src="/images/character-cool.png" 
                    alt="Cool Plant Character"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) {
                        fallback.style.display = 'flex'
                      }
                    }}
                  />
                )}
                
                {/* Fallback character when image fails to load */}
                <div className="hidden w-full h-full flex flex-col items-center justify-center text-6xl">
                  {goalStatus === 'happy' && '😊'}
                  {goalStatus === 'sad' && '😢'}
                  {goalStatus === 'cool' && '😎'}
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
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
              <div className="text-lg">
                {goalStatus === 'happy' && '😊'}
                {goalStatus === 'sad' && '😢'}
                {goalStatus === 'cool' && '😎'}
              </div>
              <div>
                <span className="text-sm font-medium">
                  {goalStatus === 'happy' && 'Goals Achieved!'}
                  {goalStatus === 'sad' && 'Keep Trying!'}
                  {goalStatus === 'cool' && 'Looking Good!'}
                </span>
                <p className="text-xs text-gray-500">
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
