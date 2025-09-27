'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Trophy, 
  Star, 
  Clock, 
  Target,
  Gift,
  CheckCircle,
  Zap
} from 'lucide-react'
import BasicQuestionnaire from './basic-questionnaire'
import AdvancedQuestionnaire from './advanced-questionnaire'

interface QuestionnaireData {
  basic: {
    completed: boolean
    points: number
    answers: any
  }
  advanced: {
    completed: boolean
    points: number
    answers: any
  }
}

interface QuestionnaireLauncherProps {
  userData?: QuestionnaireData
  onDataUpdate?: (data: QuestionnaireData) => void
}

export default function QuestionnaireLauncher({ userData, onDataUpdate }: QuestionnaireLauncherProps) {
  const [showBasic, setShowBasic] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [data, setData] = useState<QuestionnaireData>(userData || {
    basic: { completed: false, points: 0, answers: {} },
    advanced: { completed: false, points: 0, answers: {} }
  })

  const handleBasicComplete = (answers: any, points: number) => {
    const newData = {
      ...data,
      basic: { completed: true, points, answers }
    }
    setData(newData)
    onDataUpdate?.(newData)
    setShowBasic(false)
  }

  const handleAdvancedComplete = (answers: any, points: number) => {
    const newData = {
      ...data,
      advanced: { completed: true, points, answers }
    }
    setData(newData)
    onDataUpdate?.(newData)
    setShowAdvanced(false)
  }

  const totalPoints = data.basic.points + data.advanced.points
  const completionPercentage = ((data.basic.completed ? 50 : 0) + (data.advanced.completed ? 50 : 0))

  const getDiscountTier = (points: number) => {
    if (points >= 100) return { tier: 'Gold', discount: '15%', color: 'text-yellow-600 bg-yellow-100' }
    if (points >= 75) return { tier: 'Silver', discount: '10%', color: 'text-gray-600 bg-gray-100' }
    if (points >= 50) return { tier: 'Bronze', discount: '5%', color: 'text-orange-600 bg-orange-100' }
    return { tier: 'Starter', discount: '0%', color: 'text-blue-600 bg-blue-100' }
  }

  const discountInfo = getDiscountTier(totalPoints)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center wellness-slide-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Complete Your <span className="wellness-gradient-text">Wellness Profile</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take our assessments to get personalized supplement recommendations and earn points for discounts.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="wellness-card wellness-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#F97316]" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-bold text-[#22C55E]">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-[#DCFCE7] to-[#FED7AA] rounded-lg">
                <div className="text-2xl font-bold text-[#22C55E]">{data.basic.points}</div>
                <div className="text-sm text-gray-600">Basic Points</div>
                {data.basic.completed && (
                  <CheckCircle className="h-5 w-5 text-[#22C55E] mx-auto mt-1" />
                )}
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-[#FED7AA] to-[#DCFCE7] rounded-lg">
                <div className="text-2xl font-bold text-[#F97316]">{data.advanced.points}</div>
                <div className="text-sm text-gray-600">Advanced Points</div>
                {data.advanced.completed && (
                  <CheckCircle className="h-5 w-5 text-[#F97316] mx-auto mt-1" />
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">{totalPoints}</div>
              <div className="text-sm text-gray-600 mb-2">Total Points Earned</div>
              <Badge className={`${discountInfo.color} px-3 py-1`}>
                <Gift className="h-4 w-4 mr-1" />
                {discountInfo.tier} Tier - {discountInfo.discount} Discount
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questionnaires */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Questionnaire */}
        <Card className="wellness-card wellness-card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-[#22C55E]" />
                Basic Assessment
              </CardTitle>
              {data.basic.completed && (
                <CheckCircle className="h-6 w-6 text-[#22C55E]" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What you'll discover:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Your wellness goals and preferences</li>
                  <li>• Lifestyle and activity level</li>
                  <li>• Basic dietary patterns</li>
                  <li>• Initial supplement recommendations</li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>~5 minutes</span>
                <Star className="h-4 w-4 ml-2" />
                <span>Up to 50 points</span>
              </div>

              <Button
                onClick={() => setShowBasic(true)}
                className="w-full btn-primary-wellness"
                disabled={data.basic.completed}
              >
                {data.basic.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed ({data.basic.points} pts)
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Assessment
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Questionnaire */}
        <Card className="wellness-card wellness-card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-[#F97316]" />
                Advanced Survey
              </CardTitle>
              {data.advanced.completed && (
                <CheckCircle className="h-6 w-6 text-[#F97316]" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Detailed insights:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Daily consumption patterns</li>
                  <li>• Current supplement usage</li>
                  <li>• Sleep and hydration habits</li>
                  <li>• Advanced personalized recommendations</li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>~8 minutes</span>
                <Star className="h-4 w-4 ml-2" />
                <span>Up to 70 points</span>
              </div>

              <Button
                onClick={() => setShowAdvanced(true)}
                className="w-full btn-secondary-wellness"
                disabled={data.advanced.completed}
              >
                {data.advanced.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed ({data.advanced.points} pts)
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Survey
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Section */}
      {totalPoints > 0 && (
        <Card className="wellness-card wellness-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-[#22C55E]" />
              Your Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-[#DCFCE7] to-[#FED7AA] rounded-lg">
                <div className="text-2xl font-bold text-[#22C55E]">{discountInfo.discount}</div>
                <div className="text-sm text-gray-600">Current Discount</div>
                <div className="text-xs text-gray-500 mt-1">{discountInfo.tier} Tier</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-[#FED7AA] to-[#DCFCE7] rounded-lg">
                <div className="text-2xl font-bold text-[#F97316]">{totalPoints}</div>
                <div className="text-sm text-gray-600">Points Available</div>
                <div className="text-xs text-gray-500 mt-1">For future purchases</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-[#DCFCE7] to-[#FED7AA] rounded-lg">
                <div className="text-2xl font-bold text-[#22C55E]">
                  {Math.max(0, 100 - totalPoints)}
                </div>
                <div className="text-sm text-gray-600">Points to Gold</div>
                <div className="text-xs text-gray-500 mt-1">15% discount tier</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questionnaire Components */}
      {showBasic && (
        <BasicQuestionnaire
          onComplete={handleBasicComplete}
          onClose={() => setShowBasic(false)}
        />
      )}

      {showAdvanced && (
        <AdvancedQuestionnaire
          onComplete={handleAdvancedComplete}
          onClose={() => setShowAdvanced(false)}
        />
      )}
    </div>
  )
}
