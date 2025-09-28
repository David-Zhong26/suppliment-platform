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
              {/* Background Sparkles */}
              {goalStatus === 'happy' && (
                <>
                  <div className="absolute top-2 left-2 w-3 h-3 text-yellow-400">⭐</div>
                  <div className="absolute top-4 left-6 w-2 h-2 text-yellow-400">⭐</div>
                  <div className="absolute top-6 right-4 w-2 h-2 text-gray-400">⭐</div>
                  <div className="absolute top-8 right-6 w-2 h-2 text-gray-400">⭐</div>
                  <div className="absolute bottom-4 right-2 w-2 h-2 text-yellow-400">⭐</div>
                </>
              )}
              
              {/* Plant Character */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Leaves/Hair */}
                <div className="relative mb-1">
                  <div className="w-8 h-6 bg-gradient-to-b from-green-400 to-green-500 rounded-full absolute -left-1 top-0 transform -rotate-12"></div>
                  <div className="w-8 h-6 bg-gradient-to-b from-green-400 to-green-500 rounded-full absolute -right-1 top-0 transform rotate-12"></div>
                </div>
                
                {/* Head */}
                <div className="w-10 h-10 bg-gradient-to-b from-green-200 to-green-300 rounded-full mb-1 border-2 border-green-400 relative">
                  {/* Eyes */}
                  <div className="absolute top-2 left-1.5 w-2 h-2 bg-black rounded-full">
                    <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-2 right-1.5 w-2 h-2 bg-black rounded-full">
                    <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Mouth */}
                  {goalStatus === 'happy' && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black rounded-full"></div>
                  )}
                  {goalStatus === 'sad' && (
                    <>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-black rounded-t-full"></div>
                      <div className="absolute top-3 left-0.5 w-1 h-1 bg-blue-400 rounded-full"></div>
                      <div className="absolute top-3 right-0.5 w-1 h-1 bg-blue-400 rounded-full"></div>
                    </>
                  )}
                  {goalStatus === 'cool' && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-black rounded-full"></div>
                  )}
                </div>
                
                {/* Body */}
                <div className="w-8 h-8 bg-gradient-to-b from-green-200 to-green-300 rounded-full mb-1 border border-green-400"></div>
                
                {/* Arms */}
                <div className="absolute top-8 left-2 w-2 h-3 bg-gradient-to-b from-green-200 to-green-300 rounded-full transform -rotate-12"></div>
                <div className="absolute top-8 right-2 w-2 h-3 bg-gradient-to-b from-green-200 to-green-300 rounded-full transform rotate-12"></div>
                
                {/* Trunk/Legs */}
                <div className="w-6 h-6 bg-gradient-to-b from-amber-600 to-amber-700 rounded-full border border-amber-800"></div>
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
