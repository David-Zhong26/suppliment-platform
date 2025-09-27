'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Heart,
  Target,
  Zap,
  Gift,
  Trophy
} from 'lucide-react'

interface Question {
  id: string
  question: string
  type: 'single' | 'multiple'
  options: {
    id: string
    text: string
    icon: React.ReactNode
    points: number
  }[]
}

interface QuestionnaireProps {
  onComplete: (answers: any, points: number) => void
  onClose: () => void
}

const questions: Question[] = [
  {
    id: 'essentials',
    question: 'What are your day-to-day essentials?',
    type: 'multiple',
    options: [
      { id: 'browsing', text: 'Browsing online', icon: '🔍', points: 5 },
      { id: 'social', text: 'Social media', icon: '❤️', points: 3 },
      { id: 'email', text: 'Emails', icon: '✉️', points: 4 },
      { id: 'video', text: 'Video chatting', icon: '📹', points: 6 }
    ]
  },
  {
    id: 'wellness_goals',
    question: 'What are your main wellness goals?',
    type: 'single',
    options: [
      { id: 'energy', text: 'Boost Energy', icon: '⚡', points: 8 },
      { id: 'immunity', text: 'Strengthen Immunity', icon: '🛡️', points: 8 },
      { id: 'sleep', text: 'Better Sleep', icon: '😴', points: 8 },
      { id: 'focus', text: 'Mental Focus', icon: '🎯', points: 8 }
    ]
  },
  {
    id: 'lifestyle',
    question: 'How would you describe your lifestyle?',
    type: 'single',
    options: [
      { id: 'active', text: 'Highly Active', icon: '🏃', points: 10 },
      { id: 'moderate', text: 'Moderately Active', icon: '🚶', points: 7 },
      { id: 'sedentary', text: 'Mostly Sedentary', icon: '🪑', points: 5 },
      { id: 'mixed', text: 'Mixed Activities', icon: '🎭', points: 8 }
    ]
  },
  {
    id: 'diet',
    question: 'What best describes your diet?',
    type: 'single',
    options: [
      { id: 'balanced', text: 'Balanced Diet', icon: '🥗', points: 6 },
      { id: 'vegetarian', text: 'Vegetarian', icon: '🥬', points: 7 },
      { id: 'vegan', text: 'Vegan', icon: '🌱', points: 8 },
      { id: 'keto', text: 'Keto/Low Carb', icon: '🥑', points: 7 },
      { id: 'flexible', text: 'Flexible Eating', icon: '🍽️', points: 5 }
    ]
  }
]

export default function BasicQuestionnaire({ onComplete, onClose }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleOptionSelect = (optionId: string) => {
    const question = questions[currentQuestion]
    
    if (question.type === 'single') {
      setSelectedOptions([optionId])
      setAnswers(prev => ({
        ...prev,
        [question.id]: [optionId]
      }))
    } else {
      const newSelection = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId]
      
      setSelectedOptions(newSelection)
      setAnswers(prev => ({
        ...prev,
        [question.id]: newSelection
      }))
    }
  }

  const handleNext = () => {
    if (selectedOptions.length === 0) return
    
    const question = questions[currentQuestion]
    const questionPoints = question.options
      .filter(option => selectedOptions.includes(option.id))
      .reduce((sum, option) => sum + option.points, 0)
    
    setEarnedPoints(prev => prev + questionPoints)
    setAnimationKey(prev => prev + 1)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOptions([])
      }, 300)
    } else {
      // Complete questionnaire
      const totalPoints = Object.values(answers).flat().reduce((sum, answerId) => {
        const question = questions.find(q => 
          q.options.some(opt => opt.id === answerId)
        )
        const option = question?.options.find(opt => opt.id === answerId)
        return sum + (option?.points || 0)
      }, 0) + questionPoints

      setTimeout(() => {
        setShowPopup(true)
        setEarnedPoints(totalPoints)
      }, 300)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      const prevQuestion = questions[currentQuestion - 1]
      setSelectedOptions(answers[prevQuestion.id] || [])
    }
  }

  const handleComplete = () => {
    const totalPoints = Object.values(answers).flat().reduce((sum, answerId) => {
      const question = questions.find(q => 
        q.options.some(opt => opt.id === answerId)
      )
      const option = question?.options.find(opt => opt.id === answerId)
      return sum + (option?.points || 0)
    }, 0)

    onComplete(answers, totalPoints)
  }

  const currentQ = questions[currentQuestion]

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
            <Badge variant="secondary" className="mb-2">
              Basic Wellness Assessment
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentQ.question}
            </h2>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div className="grid gap-3" key={animationKey}>
            {currentQ.options.map((option, index) => {
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
                      <div className={`text-2xl transition-transform duration-200 ${
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
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Button
              onClick={handleNext}
              disabled={selectedOptions.length === 0}
              className="btn-primary-wellness"
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
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
                  Assessment Complete!
                </h3>
                <p className="text-gray-600 mb-4">
                  Great job! You've earned points for completing your wellness assessment.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#DCFCE7] to-[#FED7AA] rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="h-6 w-6 text-[#22C55E]" />
                  <span className="text-lg font-bold text-[#22C55E]">
                    +{earnedPoints} Points Earned
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Use these points for discounts on your supplement recommendations!
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleComplete}
                  className="w-full btn-primary-wellness"
                >
                  View My Recommendations
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
