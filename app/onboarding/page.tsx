'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Star, Trophy, Target, Users, Gift } from 'lucide-react'

interface OnboardingTask {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  component: React.ReactNode
}

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentTask, setCurrentTask] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedDiet, setSelectedDiet] = useState<string>('')
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const handleTaskComplete = (taskId: string, points: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId])
      setTotalPoints(totalPoints + points)
    }
  }

  const tasks: OnboardingTask[] = [
    {
      id: 'wellness-goals',
      title: 'Set Your Wellness Goals',
      description: 'Tell us what you want to achieve',
      points: 100,
      completed: completedTasks.includes('wellness-goals'),
      component: (
        <WellnessGoalsTask
          selectedGoals={selectedGoals}
          onGoalsChange={setSelectedGoals}
          onComplete={() => handleTaskComplete('wellness-goals', 100)}
        />
      )
    },
    {
      id: 'diet-lifestyle',
      title: 'Share Your Diet & Lifestyle',
      description: 'Help us personalize your recommendations',
      points: 150,
      completed: completedTasks.includes('diet-lifestyle'),
      component: (
        <DietLifestyleTask
          selectedDiet={selectedDiet}
          onDietChange={setSelectedDiet}
          selectedLifestyle={selectedLifestyle}
          onLifestyleChange={setSelectedLifestyle}
          onComplete={() => handleTaskComplete('diet-lifestyle', 150)}
        />
      )
    },
    {
      id: 'first-supplement',
      title: 'Log Your First Supplement',
      description: 'Start tracking your supplement intake',
      points: 200,
      completed: completedTasks.includes('first-supplement'),
      component: (
        <FirstSupplementTask
          onComplete={() => handleTaskComplete('first-supplement', 200)}
        />
      )
    },
    {
      id: 'join-community',
      title: 'Join a Community',
      description: 'Connect with like-minded people',
      points: 100,
      completed: completedTasks.includes('join-community'),
      component: (
        <JoinCommunityTask
          onComplete={() => handleTaskComplete('join-community', 100)}
        />
      )
    },
    {
      id: 'safety-quiz',
      title: 'Safety Knowledge Quiz',
      description: 'Learn about supplement safety',
      points: 150,
      completed: completedTasks.includes('safety-quiz'),
      component: (
        <SafetyQuizTask
          onComplete={() => handleTaskComplete('safety-quiz', 150)}
        />
      )
    }
  ]

  const progress = (completedTasks.length / tasks.length) * 100

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">Welcome to Wellness Platform!</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Earn points and unlock rewards as you build your wellness profile
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedTasks.length}/{tasks.length} tasks</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Points Display */}
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              {totalPoints} Points Earned
            </Badge>
            {totalPoints >= 500 && (
              <Badge className="text-lg px-4 py-2 bg-green-600">
                <Trophy className="h-4 w-4 mr-2" />
                Profile Level 1 Unlocked!
              </Badge>
            )}
          </div>
        </div>

        {/* Task Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {tasks.map((task, index) => (
              <button
                key={task.id}
                onClick={() => setCurrentTask(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  task.completed
                    ? 'bg-green-600 text-white'
                    : index === currentTask
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {task.completed ? '✓' : index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Task */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span>{tasks[currentTask].title}</span>
              <Badge variant="outline" className="ml-auto">
                {tasks[currentTask].points} pts
              </Badge>
            </CardTitle>
            <CardDescription>{tasks[currentTask].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {tasks[currentTask].component}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between max-w-2xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentTask(Math.max(0, currentTask - 1))}
            disabled={currentTask === 0}
          >
            Previous
          </Button>
          
          {completedTasks.length === tasks.length ? (
            <Button
              onClick={() => router.push('/dashboard/user')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Gift className="h-4 w-4 mr-2" />
              Complete Onboarding & Get Rewards!
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentTask(Math.min(tasks.length - 1, currentTask + 1))}
              disabled={currentTask === tasks.length - 1}
            >
              Next
            </Button>
          )}
        </div>

        {/* Rewards Preview */}
        {totalPoints >= 200 && (
          <Card className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Gift className="h-6 w-6 mr-2" />
                Available Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">10%</span>
                  </div>
                  <span className="text-green-700">10% off first supplement purchase</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-green-700">Premium community access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Wellness Goals Task Component
function WellnessGoalsTask({ 
  selectedGoals, 
  onGoalsChange, 
  onComplete 
}: { 
  selectedGoals: string[]
  onGoalsChange: (goals: string[]) => void
  onComplete: () => void
}) {
  const goals = [
    { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️' },
    { id: 'muscle-gain', name: 'Muscle Gain', icon: '💪' },
    { id: 'energy-boost', name: 'Energy Boost', icon: '⚡' },
    { id: 'immune-support', name: 'Immune Support', icon: '🛡️' },
    { id: 'clean-eating', name: 'Clean Eating', icon: '🥗' },
    { id: 'stress-management', name: 'Stress Management', icon: '🧘' },
    { id: 'better-sleep', name: 'Better Sleep', icon: '😴' },
    { id: 'heart-health', name: 'Heart Health', icon: '❤️' }
  ]

  const handleGoalToggle = (goalId: string) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId]
    
    onGoalsChange(newGoals)
    
    if (newGoals.length > 0) {
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Select your wellness goals (choose as many as apply):</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {goals.map(goal => (
          <div
            key={goal.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedGoals.includes(goal.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleGoalToggle(goal.id)}
          >
            <div className="text-2xl mb-2">{goal.icon}</div>
            <div className="font-medium text-sm">{goal.name}</div>
          </div>
        ))}
      </div>
      {selectedGoals.length > 0 && (
        <div className="text-green-600 text-sm font-medium">
          ✓ {selectedGoals.length} goal(s) selected - Task completed!
        </div>
      )}
    </div>
  )
}

// Diet & Lifestyle Task Component
function DietLifestyleTask({
  selectedDiet,
  onDietChange,
  selectedLifestyle,
  onLifestyleChange,
  onComplete
}: {
  selectedDiet: string
  onDietChange: (diet: string) => void
  selectedLifestyle: string[]
  onLifestyleChange: (lifestyle: string[]) => void
  onComplete: () => void
}) {
  const diets = [
    { id: 'omnivore', name: 'Omnivore' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'keto', name: 'Keto' },
    { id: 'paleo', name: 'Paleo' },
    { id: 'mediterranean', name: 'Mediterranean' }
  ]

  const lifestyles = [
    { id: 'sedentary', name: 'Sedentary' },
    { id: 'light-exercise', name: 'Light Exercise' },
    { id: 'moderate-exercise', name: 'Moderate Exercise' },
    { id: 'active', name: 'Active' },
    { id: 'very-active', name: 'Very Active' }
  ]

  const handleDietChange = (diet: string) => {
    onDietChange(diet)
    if (diet && selectedLifestyle.length > 0) {
      onComplete()
    }
  }

  const handleLifestyleToggle = (lifestyle: string) => {
    const newLifestyle = selectedLifestyle.includes(lifestyle)
      ? selectedLifestyle.filter(l => l !== lifestyle)
      : [...selectedLifestyle, lifestyle]
    
    onLifestyleChange(newLifestyle)
    
    if (selectedDiet && newLifestyle.length > 0) {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">What's your diet type?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {diets.map(diet => (
            <button
              key={diet.id}
              onClick={() => handleDietChange(diet.id)}
              className={`p-3 text-sm border rounded-lg transition-all ${
                selectedDiet === diet.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {diet.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">What's your activity level?</h3>
        <div className="space-y-2">
          {lifestyles.map(lifestyle => (
            <div key={lifestyle.id} className="flex items-center space-x-2">
              <Checkbox
                id={lifestyle.id}
                checked={selectedLifestyle.includes(lifestyle.id)}
                onCheckedChange={() => handleLifestyleToggle(lifestyle.id)}
              />
              <label htmlFor={lifestyle.id} className="text-sm">
                {lifestyle.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {selectedDiet && selectedLifestyle.length > 0 && (
        <div className="text-green-600 text-sm font-medium">
          ✓ Diet and lifestyle preferences saved - Task completed!
        </div>
      )}
    </div>
  )
}

// First Supplement Task Component
function FirstSupplementTask({ onComplete }: { onComplete: () => void }) {
  const [supplementName, setSupplementName] = useState('')
  const [dosage, setDosage] = useState('')

  const handleComplete = () => {
    if (supplementName && dosage) {
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Log your first supplement to start tracking:</p>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Supplement Name</label>
          <input
            type="text"
            value={supplementName}
            onChange={(e) => setSupplementName(e.target.value)}
            placeholder="e.g., Multivitamin, Protein Powder"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Dosage</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 1 tablet daily, 1 scoop"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <Button 
        onClick={handleComplete}
        disabled={!supplementName || !dosage}
        className="w-full"
      >
        Log My First Supplement
      </Button>

      {supplementName && dosage && (
        <div className="text-green-600 text-sm font-medium">
          ✓ Supplement logged - Task completed!
        </div>
      )}
    </div>
  )
}

// Join Community Task Component
function JoinCommunityTask({ onComplete }: { onComplete: () => void }) {
  const [selectedCommunity, setSelectedCommunity] = useState('')

  const communities = [
    { id: 'weight-loss', name: 'Weight Loss Warriors', members: '1,250' },
    { id: 'muscle-gain', name: 'Muscle Building Masters', members: '890' },
    { id: 'clean-eating', name: 'Clean Eating Champions', members: '2,100' },
    { id: 'energy-boost', name: 'Energy & Vitality', members: '650' }
  ]

  const handleJoin = () => {
    if (selectedCommunity) {
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Join a community that matches your goals:</p>
      
      <div className="space-y-2">
        {communities.map(community => (
          <div
            key={community.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedCommunity === community.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedCommunity(community.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{community.name}</div>
                <div className="text-sm text-gray-500">{community.members} members</div>
              </div>
              <div className="text-blue-600">→</div>
            </div>
          </div>
        ))}
      </div>

      <Button 
        onClick={handleJoin}
        disabled={!selectedCommunity}
        className="w-full"
      >
        Join Community
      </Button>

      {selectedCommunity && (
        <div className="text-green-600 text-sm font-medium">
          ✓ Community joined - Task completed!
        </div>
      )}
    </div>
  )
}

// Safety Quiz Task Component
function SafetyQuizTask({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = [
    {
      question: "When should you consult a doctor before taking supplements?",
      options: [
        "Only if you're taking prescription medication",
        "When combining multiple supplements",
        "If you have underlying health conditions",
        "All of the above"
      ],
      correct: 3
    },
    {
      question: "What's the most important factor when choosing supplements?",
      options: [
        "Price",
        "Brand popularity",
        "Third-party testing and quality",
        "Packaging design"
      ],
      correct: 2
    },
    {
      question: "Can supplements interact with medications?",
      options: [
        "No, supplements are always safe",
        "Yes, some can cause dangerous interactions",
        "Only prescription supplements can interact",
        "Only if taken in large doses"
      ],
      correct: 1
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      onComplete()
    }
  }

  const score = answers.filter((answer, index) => answer === questions[index].correct).length

  if (quizCompleted) {
    return (
      <div className="text-center space-y-4">
        <div className="text-4xl">🎉</div>
        <h3 className="text-xl font-semibold">Quiz Completed!</h3>
        <p className="text-gray-600">
          You scored {score}/{questions.length} correct answers
        </p>
        <div className="text-green-600 text-sm font-medium">
          ✓ Safety knowledge quiz completed - Task completed!
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      <h3 className="font-semibold">{questions[currentQuestion].question}</h3>
      
      <div className="space-y-2">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
