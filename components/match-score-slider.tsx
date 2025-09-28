'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface MatchScoreSliderProps {
  percentage: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  interactive?: boolean
  onValueChange?: (value: number) => void
}

export default function MatchScoreSlider({ 
  percentage, 
  size = 'md', 
  showValue = true, 
  interactive = false,
  onValueChange 
}: MatchScoreSliderProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          track: 'h-2',
          thumb: 'h-4 w-4',
          tooltip: 'text-xs px-2 py-1 -top-8',
          icon: 'h-3 w-3'
        }
      case 'lg':
        return {
          track: 'h-4',
          thumb: 'h-6 w-6',
          tooltip: 'text-base px-3 py-2 -top-10',
          icon: 'h-5 w-5'
        }
      default: // md
        return {
          track: 'h-3',
          thumb: 'h-5 w-5',
          tooltip: 'text-sm px-2 py-1 -top-9',
          icon: 'h-4 w-4'
        }
    }
  }

  const getColorClasses = (percentage: number) => {
    if (percentage >= 90) {
      return {
        track: 'bg-gradient-to-r from-green-500 to-green-600',
        thumb: 'bg-green-600 border-green-700',
        tooltip: 'bg-green-600 text-white'
      }
    } else if (percentage >= 80) {
      return {
        track: 'bg-gradient-to-r from-green-400 to-green-500',
        thumb: 'bg-green-500 border-green-600',
        tooltip: 'bg-green-500 text-white'
      }
    } else if (percentage >= 70) {
      return {
        track: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
        thumb: 'bg-yellow-500 border-yellow-600',
        tooltip: 'bg-yellow-500 text-white'
      }
    } else if (percentage >= 60) {
      return {
        track: 'bg-gradient-to-r from-orange-400 to-orange-500',
        thumb: 'bg-orange-500 border-orange-600',
        tooltip: 'bg-orange-500 text-white'
      }
    } else {
      return {
        track: 'bg-gradient-to-r from-red-400 to-red-500',
        thumb: 'bg-red-500 border-red-600',
        tooltip: 'bg-red-500 text-white'
      }
    }
  }

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 90) return 'Perfect Match'
    if (percentage >= 80) return 'Excellent Match'
    if (percentage >= 70) return 'Good Match'
    if (percentage >= 60) return 'Fair Match'
    return 'Poor Match'
  }

  const sizeClasses = getSizeClasses()
  const colorClasses = getColorClasses(percentage)

  return (
    <div className="relative flex items-center gap-3">
      {/* Match Score Slider */}
      <div className="flex-1 relative">
        <div 
          className={`relative ${sizeClasses.track} bg-gray-200 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Filled portion */}
          <div 
            className={`absolute top-0 left-0 h-full ${colorClasses.track} transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
          
          {/* Slider thumb */}
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 ${sizeClasses.thumb} ${colorClasses.thumb} rounded-full border-2 shadow-lg transition-all duration-300 hover:scale-110`}
            style={{ left: `calc(${percentage}% - ${size === 'sm' ? '8px' : size === 'lg' ? '12px' : '10px'})` }}
          />
        </div>
        
        {/* Value tooltip */}
        {showValue && (
          <div 
            className={`absolute ${sizeClasses.tooltip} left-1/2 transform -translate-x-1/2 ${colorClasses.tooltip} rounded-lg shadow-lg transition-all duration-200 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ left: `${percentage}%` }}
          >
            <div className="flex items-center gap-1">
              <span className="font-bold">{percentage}%</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent" 
                 style={{ borderTopColor: colorClasses.tooltip.includes('green') ? '#16a34a' : 
                                      colorClasses.tooltip.includes('yellow') ? '#eab308' :
                                      colorClasses.tooltip.includes('orange') ? '#f97316' : '#dc2626' }} />
          </div>
        )}
      </div>

      {/* Match label badge */}
      <Badge 
        variant="secondary" 
        className={`${colorClasses.thumb} text-white border-0 px-2 py-1 text-xs font-medium`}
      >
        {getMatchLabel(percentage)}
      </Badge>
    </div>
  )
}

// Compact version for product cards
export function CompactMatchSlider({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
              percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' :
              percentage >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
              percentage >= 60 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
              'bg-gradient-to-r from-red-400 to-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 bg-white rounded-full border-2 shadow-sm"
          style={{ 
            left: `calc(${percentage}% - 6px)`,
            borderColor: percentage >= 90 ? '#16a34a' :
                        percentage >= 80 ? '#22c55e' :
                        percentage >= 70 ? '#eab308' :
                        percentage >= 60 ? '#f97316' : '#dc2626'
          }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600 min-w-[2.5rem] text-right">
        {percentage}%
      </span>
    </div>
  )
}
