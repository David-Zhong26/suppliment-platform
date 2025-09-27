'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Clock,
  Droplets,
  Utensils,
  Pill,
  Coffee,
  Zap,
  Gift,
  Trophy,
  Calendar,
  Target
} from 'lucide-react'

interface AdvancedQuestion {
  id: string
  category: string
  question: string
  type: 'frequency' | 'amount' | 'time' | 'multiple'
  options?: {
    id: string
    text: string
    icon: React.ReactNode
    points: number
  }[]
  unit?: string
  maxAmount?: number
  points?: number
}

interface QuestionnaireProps {
  onComplete: (answers: any, points: number) => void
  onClose: () => void
}

const advancedQuestions: AdvancedQuestion[] = [
  {
    id: 'water_intake',
    category: 'Hydration',
    question: 'How much water do you drink daily?',
    type: 'amount',
    unit: 'glasses (8oz)',
    maxAmount: 15,
    points: 10
  },
  {
    id: 'sleep_duration',
    category: 'Sleep',
    question: 'How many hours do you sleep per night?',
    type: 'amount',
    unit: 'hours',
    maxAmount: 12,
    points: 10
  },
  {
    id: 'meal_frequency',
    category: 'Nutrition',
    question: 'How many meals do you eat per day?',
    type: 'frequency',
    options: [
      { id: '1', text: '1 meal', icon: <Utensils className="h-5 w-5" />, points: 2 },
      { id: '2', text: '2 meals', icon: <Utensils className="h-5 w-5" />, points: 4 },
      { id: '3', text: '3 meals', icon: <Utensils className="h-5 w-5" />, points: 8 },
      { id: '4', text: '4+ meals', icon: <Utensils className="h-5 w-5" />, points: 6 },
      { id: 'snacks', text: 'Frequent snacking', icon: <Utensils className="h-5 w-5" />, points: 3 }
    ]
  },
  {
    id: 'caffeine_intake',
    category: 'Stimulants',
    question: 'How much caffeine do you consume daily?',
    type: 'frequency',
    options: [
      { id: 'none', text: 'None', icon: <Coffee className="h-5 w-5" />, points: 8 },
      { id: 'low', text: '1-2 cups', icon: <Coffee className="h-5 w-5" />, points: 10 },
      { id: 'moderate', text: '3-4 cups', icon: <Coffee className="h-5 w-5" />, points: 6 },
      { id: 'high', text: '5+ cups', icon: <Coffee className="h-5 w-5" />, points: 3 }
    ]
  },
  {
    id: 'supplement_current',
    category: 'Current Supplements',
    question: 'What supplements are you currently taking?',
    type: 'multiple',
    options: [
      { id: 'multivitamin', text: 'Multivitamin', icon: <Pill className="h-5 w-5" />, points: 5 },
      { id: 'vitamin_d', text: 'Vitamin D', icon: <Pill className="h-5 w-5" />, points: 5 },
      { id: 'omega3', text: 'Omega-3', icon: <Pill className="h-5 w-5" />, points: 5 },
      { id: 'magnesium', text: 'Magnesium', icon: <Pill className="h-5 w-5" />, points: 5 },
      { id: 'probiotics', text: 'Probiotics', icon: <Pill className="h-5 w-5" />, points: 5 },
      { id: 'none', text: 'None', icon: <Pill className="h-5 w-5" />, points: 8 }
    ]
  },
  {
    id: 'exercise_frequency',
    category: 'Physical Activity',
    question: 'How often do you exercise?',
    type: 'frequency',
    options: [
      { id: 'daily', text: 'Daily', icon: <Zap className="h-5 w-5" />, points: 12 },
      { id: '5-6', text: '5-6 times/week', icon: <Zap className="h-5 w-5" />, points: 10 },
      { id: '3-4', text: '3-4 times/week', icon: <Zap className="h-5 w-5" />, points: 8 },
      { id: '1-2', text: '1-2 times/week', icon: <Zap className="h-5 w-5" />, points: 6 },
      { id: 'rarely', text: 'Rarely', icon: <Zap className="h-5 w-5" />, points: 3 }
    ]
  },
  {
    id: 'stress_level',
    category: 'Mental Wellness',
    question: 'How would you rate your stress level?',
    type: 'frequency',
    options: [
      { id: 'low', text: 'Low', icon: <Target className="h-5 w-5" />, points: 10 },
      { id: 'moderate', text: 'Moderate', icon: <Target className="h-5 w-5" />, points: 7 },
      { id: 'high', text: 'High', icon: <Target className="h-5 w-5" />, points: 4 },
      { id: 'very_high', text: 'Very High', icon: <Target className="h-5 w-5" />, points: 2 }
    ]
  }
]

export default function AdvancedQuestionnaire({ onComplete, onClose }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [amountValue, setAmountValue] = useState<number>(0)
  const [showPopup, setShowPopup] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const progress = ((currentQuestion + 1) / advancedQuestions.length) * 100

  const handleOptionSelect = (optionId: string) => {
    const question = advancedQuestions[currentQuestion]
    
    if (question.type === 'multiple') {
      const newSelection = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId]
      
      setSelectedOptions(newSelection)
      setAnswers(prev => ({
        ...prev,
        [question.id]: newSelection
      }))
    } else {
      setSelectedOptions([optionId])
      setAnswers(prev => ({
        ...prev,
        [question.id]: optionId
      }))
    }
  }

  const handleAmountChange = (value: number) => {
    setAmountValue(value)
    const question = advancedQuestions[currentQuestion]
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }))
  }

  const calculatePoints = (question: AdvancedQuestion, answer: any): number => {
    if (question.type === 'amount') {
      // Points based on optimal ranges
      if (question.id === 'water_intake') {
        if (answer >= 8 && answer <= 12) return 10
        if (answer >= 6 && answer <= 14) return 7
        return 4
      }
      if (question.id === 'sleep_duration') {
        if (answer >= 7 && answer <= 9) return 10
        if (answer >= 6 && answer <= 10) return 7
        return 4
      }
      return 5
    }
    
    if (question.type === 'multiple') {
      return question.options?.reduce((sum, option) => {
        return answer.includes(option.id) ? sum + option.points : sum
      }, 0) || 0
    }
    
    const option = question.options?.find(opt => opt.id === answer)
    return option?.points || 0
  }

  const handleNext = () => {
    const question = advancedQuestions[currentQuestion]
    const currentAnswer = answers[question.id]
    
    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      return
    }

    const questionPoints = calculatePoints(question, currentAnswer)
    setEarnedPoints(prev => prev + questionPoints)
    setAnimationKey(prev => prev + 1)

    if (currentQuestion < advancedQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOptions([])
        setAmountValue(0)
      }, 300)
    } else {
      // Complete questionnaire
      setTimeout(() => {
        setShowPopup(true)
      }, 300)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      const prevQuestion = advancedQuestions[currentQuestion - 1]
      const prevAnswer = answers[prevQuestion.id]
      
      if (prevQuestion.type === 'amount') {
        setAmountValue(prevAnswer || 0)
        setSelectedOptions([])
      } else if (Array.isArray(prevAnswer)) {
        setSelectedOptions(prevAnswer)
        setAmountValue(0)
      } else {
        setSelectedOptions([prevAnswer] || [])
        setAmountValue(0)
      }
    }
  }

  const handleComplete = () => {
    const totalPoints = advancedQuestions.reduce((sum, question) => {
      return sum + calculatePoints(question, answers[question.id])
    }, 0)

    onComplete(answers, totalPoints)
  }

  const currentQ = advancedQuestions[currentQuestion]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden wellness-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={currentQuestion === 0 ? onClose : handlePrevious}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentQuestion === 0 ? 'Close' : 'Back'}
            </Button>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#F97316]" />
              <span className="text-sm font-medium text-gray-600">
                +{earnedPoints} points earned
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-2 wellness-gradient-bg">
              Advanced Daily Consumption Survey
            </Badge>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-[#22C55E]" />
              <span className="text-sm font-medium text-[#22C55E]">
                {currentQ.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentQ.question}
            </h2>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div key={animationKey}>
            {currentQ.type === 'amount' ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#22C55E] mb-2">
                    {amountValue} {currentQ.unit}
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentQ.unit === 'glasses (8oz)' && 'Optimal: 8-12 glasses'}
                    {currentQ.unit === 'hours' && 'Optimal: 7-9 hours'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="amount-slider" className="text-sm font-medium">
                    Adjust the amount:
                  </Label>
                  <input
                    id="amount-slider"
                    type="range"
                    min="0"
                    max={currentQ.maxAmount}
                    value={amountValue}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer wellness-progress"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>{currentQ.maxAmount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 8].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAmountChange(value)}
                      className={`transition-all ${
                        amountValue === value ? 'border-[#22C55E] bg-[#DCFCE7]' : ''
                      }`}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                {currentQ.options?.map((option, index) => {
                  const isSelected = selectedOptions.includes(option.id)
                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                        isSelected 
                          ? 'border-[#22C55E] bg-gradient-to-r from-[#DCFCE7] to-[#FED7AA] shadow-lg' 
                          : 'border-gray-200 hover:border-[#22C55E]/50 hover:shadow-md'
                      }`}
                      onClick={() => handleOptionSelect(option.id)}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`text-[#22C55E] transition-transform duration-200 ${
                            isSelected ? 'scale-110' : 'scale-100'
                          }`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold transition-colors ${
                              isSelected ? 'text-[#22C55E]' : 'text-gray-900'
                            }`}>
                              {option.text}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-4 w-4 text-[#F97316]" />
                              <span className="text-sm text-gray-500">
                                +{option.points} points
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle className="h-6 w-6 text-[#22C55E] wellness-scale-in" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {advancedQuestions.length}
            </span>
            <Button
              onClick={handleNext}
              disabled={
                currentQ.type === 'amount' 
                  ? amountValue === 0 
                  : selectedOptions.length === 0
              }
              className="btn-primary-wellness"
            >
              {currentQuestion === advancedQuestions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Completion Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center wellness-scale-in">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#22C55E] to-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Advanced Survey Complete!
                </h3>
                <p className="text-gray-600 mb-4">
                  Excellent! You've completed the detailed consumption survey and earned bonus points.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#DCFCE7] to-[#FED7AA] rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="h-6 w-6 text-[#22C55E]" />
                  <span className="text-lg font-bold text-[#22C55E]">
                    +{earnedPoints} Bonus Points
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  These advanced points unlock premium discounts and personalized recommendations!
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleComplete}
                  className="w-full btn-primary-wellness"
                >
                  Get Advanced Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
