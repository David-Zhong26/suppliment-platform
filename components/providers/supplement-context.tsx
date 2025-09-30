'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Supplement {
  id: string
  name: string
  icon: string
  target: number
  taken: number
  time: string
  completed: boolean
  dailyLimit: number // Maximum allowed per day
}

interface WaterTracking {
  current: number
  goal: number
}

interface SupplementContextType {
  supplementGoals: Supplement[]
  waterTracking: WaterTracking
  setSupplementGoals: React.Dispatch<React.SetStateAction<Supplement[]>>
  logSupplement: (supplementId: string) => void
  logWater: () => void
  getSupplementProgress: () => number
  getWaterProgress: () => number
}

const SupplementContext = createContext<SupplementContextType | undefined>(undefined)

export function SupplementProvider({ children }: { children: ReactNode }) {
  const [supplementGoals, setSupplementGoals] = useState<Supplement[]>([
    { id: 'omega3', name: 'Omega-3', icon: '🐟', target: 1, taken: 1, time: '08:00', completed: true, dailyLimit: 2 },
    { id: 'vitaminD', name: 'Vitamin D3', icon: '☀️', target: 1, taken: 0, time: '12:00', completed: false, dailyLimit: 1 },
    { id: 'magnesium', name: 'Magnesium', icon: '🍌', target: 1, taken: 0, time: '18:00', completed: false, dailyLimit: 1 }
  ])

  const [waterTracking, setWaterTracking] = useState<WaterTracking>({
    current: 6,
    goal: 8
  })

  const logSupplement = (supplementId: string) => {
    setSupplementGoals(prev => 
      prev.map(supplement => {
        if (supplement.id === supplementId) {
          // Check if we can add more (within daily limit)
          if (supplement.taken < supplement.dailyLimit) {
            return { 
              ...supplement, 
              taken: supplement.taken + 1,
              completed: supplement.taken + 1 >= supplement.target
            }
          }
          // If at daily limit, show warning but don't increase
          return supplement
        }
        return supplement
      })
    )
  }

  const logWater = () => {
    setWaterTracking(prev => ({
      ...prev,
      current: prev.current + 1
    }))
  }

  const getSupplementProgress = () => {
    return supplementGoals.filter(s => s.completed).length
  }

  const getWaterProgress = () => {
    return waterTracking.current
  }

  return (
    <SupplementContext.Provider value={{
      supplementGoals,
      waterTracking,
      setSupplementGoals,
      logSupplement,
      logWater,
      getSupplementProgress,
      getWaterProgress
    }}>
      {children}
    </SupplementContext.Provider>
  )
}

export function useSupplements() {
  const context = useContext(SupplementContext)
  if (context === undefined) {
    throw new Error('useSupplements must be used within a SupplementProvider')
  }
  return context
}
