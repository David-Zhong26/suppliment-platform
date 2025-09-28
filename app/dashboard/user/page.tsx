'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Pill, 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Star,
  Calendar,
  Award,
  Zap,
  Settings,
  BookOpen,
  ShoppingCart,
  Home,
  Store,
  User,
  Bell,
  Plus,
  Clock,
  MapPin,
  Video,
  Droplets,
  Moon,
  Activity,
  Trophy,
  ArrowRight,
  CheckCircle,
  Flame,
  Info
} from 'lucide-react'
import QuestionnaireLauncher from '@/components/questionnaire/questionnaire-launcher'
import PersistentNav from '@/components/navigation/persistent-nav'
import CalendarHeatmap from '@/components/calendar-heatmap'
import CharacterAvatar from '@/components/character-avatar-simple'
import EditTasksModal from '@/components/edit-tasks-modal'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Daily tracking state - allowing users to exceed goals
  const [dailyTracking, setDailyTracking] = useState({
    water: { current: 10, goal: 8 }, // glasses - user exceeded goal!
    supplements: { taken: 6, total: 5 }, // supplements taken - user exceeded goal!
    sleep: { hours: 8.5, goal: 8 }, // hours - user exceeded goal!
    activity: { steps: 12500, goal: 10000 } // steps - user exceeded goal!
  })

  // Celebration state
  const [showCelebration, setShowCelebration] = useState<string | null>(null)

  // Character and points system
  const [userXp] = useState(3247)
  const [userPoints] = useState(1250)
  const [showEditTasksModal, setShowEditTasksModal] = useState(false)

  // Determine character mood based on goal achievement
  const getCharacterMood = (): 'happy' | 'sad' | 'cool' => {
    const goalsMet = [
      dailyTracking.water.current >= dailyTracking.water.goal,
      dailyTracking.supplements.taken >= dailyTracking.supplements.total,
      dailyTracking.sleep.hours >= dailyTracking.sleep.goal,
      dailyTracking.activity.steps >= dailyTracking.activity.goal
    ]
    
    const goalsMetCount = goalsMet.filter(Boolean).length
    
    if (goalsMetCount >= 3) return 'happy' // Most goals met
    if (goalsMetCount >= 1) return 'cool'  // Some goals met
    return 'sad' // Few or no goals met
  }

  // Calendar tracking data - showing 5-day streak for demo with varied completion (September 2025)
  const [calendarData, setCalendarData] = useState<Record<string, {
    water: boolean
    supplements: boolean
    sleep: boolean
    activity: boolean
  }>>({
    // 5-day streak ending today - mostly green with some variety
    '2025-09-24': { water: true, supplements: true, sleep: true, activity: false }, // Day 1 - 75% complete
    '2025-09-25': { water: true, supplements: true, sleep: true, activity: true }, // Day 2 - 100% complete
    '2025-09-26': { water: true, supplements: false, sleep: true, activity: true }, // Day 3 - 75% complete
    '2025-09-27': { water: true, supplements: true, sleep: true, activity: true }, // Day 4 - 100% complete
    '2025-09-28': { water: true, supplements: true, sleep: false, activity: true }, // Day 5 - 75% complete (today)
    
    // Previous days - showing mixed progress with more green circles
    '2025-09-19': { water: false, supplements: false, sleep: false, activity: false }, // Bad day - 0% complete
    '2025-09-20': { water: true, supplements: false, sleep: false, activity: false }, // Started water - 25% complete
    '2025-09-21': { water: true, supplements: true, sleep: false, activity: false }, // Added supplements - 50% complete
    '2025-09-22': { water: true, supplements: true, sleep: true, activity: false }, // Added sleep - 75% complete
    '2025-09-23': { water: true, supplements: true, sleep: true, activity: true }, // Perfect day before streak - 100% complete
    
    // Additional days for more variety
    '2025-09-14': { water: true, supplements: false, sleep: true, activity: true }, // 75% complete
    '2025-09-15': { water: false, supplements: true, sleep: true, activity: false }, // 50% complete
    '2025-09-16': { water: true, supplements: true, sleep: false, activity: true }, // 75% complete
    '2025-09-17': { water: true, supplements: true, sleep: true, activity: true }, // 100% complete
    '2025-09-18': { water: true, supplements: false, sleep: false, activity: true }, // 50% complete
    
    // More recent days for better visibility
    '2025-09-10': { water: false, supplements: true, sleep: true, activity: false }, // 50% complete
    '2025-09-11': { water: true, supplements: false, sleep: false, activity: true }, // 50% complete
    '2025-09-12': { water: true, supplements: true, sleep: true, activity: false }, // 75% complete
    '2025-09-13': { water: true, supplements: true, sleep: true, activity: true }, // 100% complete
  })

  // Active challenges
  const [activeChallenges] = useState([
    {
      id: 1,
      name: 'Hydration Hero',
      icon: '💧',
      progress: 15,
      total: 30,
      streak: 5,
      points: 150
    },
    {
      id: 2,
      name: 'Supplement Streak',
      icon: '💊',
      progress: 7,
      total: 21,
      streak: 7,
      points: 210
    }
  ])

  // Personal recommendations
  const [recommendations] = useState([
    {
      id: 1,
      name: 'Premium Omega-3 Complex',
      matchScore: 95,
      reason: 'Perfect for your heart health goals',
      price: 29.99,
      category: 'Heart Health'
    },
    {
      id: 2,
      name: 'Vitamin D3+K2',
      matchScore: 88,
      reason: 'Fills your vitamin D deficiency',
      price: 24.99,
      category: 'Bone Health'
    },
    {
      id: 3,
      name: 'Magnesium Glycinate',
      matchScore: 92,
      reason: 'Supports better sleep quality',
      price: 19.99,
      category: 'Sleep Support'
    }
  ])

  const logActivity = (type: string) => {
    setShowCelebration(type)
    setTimeout(() => setShowCelebration(null), 2000)
    
    // Update tracking (simulate logging)
    setDailyTracking(prev => {
      switch (type) {
        case 'water':
          return { ...prev, water: { ...prev.water, current: prev.water.current + 1 }} // No limit!
        case 'supplements':
          return { ...prev, supplements: { ...prev.supplements, taken: prev.supplements.taken + 1 }} // No limit!
        case 'sleep':
          return { ...prev, sleep: { ...prev.sleep, hours: prev.sleep.hours + 0.5 }} // No limit!
        case 'activity':
          return { ...prev, activity: { ...prev.activity, steps: prev.activity.steps + 500 }} // No limit!
        default:
          return prev
      }
    })
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={1} userName={session?.user?.name || 'User'} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Good morning, {session?.user?.name?.split(' ')[0]}! 👋
          </h1>
            <p className="text-gray-600 text-lg">
              Track your daily progress and stay on top of your wellness goals
          </p>
        </div>
                <Button 
                  onClick={() => router.push('/comparison')}
            className="bg-[#16A34A] hover:bg-[#15803d] text-white"
                >
            <Store className="h-4 w-4 mr-2" />
            Browse Marketplace
                </Button>
                </div>

        {/* Daily Tracking Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Daily Goals</h2>
            <p className="text-gray-600">Track your daily wellness activities</p>
          </div>
          <Button 
            variant="outline" 
            className="border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
            onClick={() => setShowEditTasksModal(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Edit Tasks
          </Button>
        </div>

        {/* Daily Tracking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Water Intake */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
                    dailyTracking.water.current >= dailyTracking.water.goal 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {dailyTracking.water.current}/{dailyTracking.water.goal}
                  {dailyTracking.water.current > dailyTracking.water.goal && ' 🎉'}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Water Intake</h3>
              <Progress 
                value={(dailyTracking.water.current / dailyTracking.water.goal) * 100} 
                className="h-2 mb-3"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => logActivity('water')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Log Glass
              </Button>
            </CardContent>
          </Card>

          {/* Supplement Intake */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Pill className="h-6 w-6 text-green-600" />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
                    dailyTracking.supplements.taken >= dailyTracking.supplements.total 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {dailyTracking.supplements.taken}/{dailyTracking.supplements.total}
                  {dailyTracking.supplements.taken > dailyTracking.supplements.total && ' 🎉'}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Supplements</h3>
              <Progress 
                value={(dailyTracking.supplements.taken / dailyTracking.supplements.total) * 100} 
                className="h-2 mb-3"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => logActivity('supplements')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Log Supplement
              </Button>
            </CardContent>
          </Card>

          {/* Sleep */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Moon className="h-6 w-6 text-purple-600" />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
                    dailyTracking.sleep.hours >= dailyTracking.sleep.goal 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {dailyTracking.sleep.hours.toFixed(1)}h/{dailyTracking.sleep.goal}h
                  {dailyTracking.sleep.hours > dailyTracking.sleep.goal && ' 🎉'}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sleep Quality</h3>
              <Progress 
                value={(dailyTracking.sleep.hours / dailyTracking.sleep.goal) * 100} 
                className="h-2 mb-3"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => logActivity('sleep')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Log Sleep
              </Button>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
                    dailyTracking.activity.steps >= dailyTracking.activity.goal 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {dailyTracking.activity.steps.toLocaleString()}/{dailyTracking.activity.goal.toLocaleString()}
                  {dailyTracking.activity.steps > dailyTracking.activity.goal && ' 🎉'}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Activity</h3>
              <Progress 
                value={(dailyTracking.activity.steps / dailyTracking.activity.goal) * 100} 
                className="h-2 mb-3"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => logActivity('activity')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Log Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Character Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Calendar Heatmap - Left Side */}
          <div className="lg:col-span-1">
            <CalendarHeatmap 
              data={calendarData} 
              compact={true}
              onDayClick={(date, data) => {
                console.log('Day clicked:', date, data)
              }}
            />
          </div>

          {/* Character Status - Right Side */}
          <div className="lg:col-span-1">
            <CharacterAvatar 
              userXp={userXp} 
              userPoints={userPoints}
              goalStatus={getCharacterMood()}
              onPurchase={(itemId) => {
                console.log('Purchase item:', itemId)
                // TODO: Implement purchase logic
              }}
              onEquip={(itemId) => {
                console.log('Equip item:', itemId)
                // TODO: Implement equip logic
              }}
            />
          </div>
                  </div>

        {/* Active Challenge Preview */}
        <Card className="bg-gradient-to-r from-[#16A34A] to-[#15803d] text-white mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Active Challenge</h2>
                <p className="text-green-100">Keep your streak going!</p>
              </div>
              <Button 
                variant="outline" 
                className="bg-white text-[#16A34A] hover:bg-gray-50"
                onClick={() => router.push('/challenges')}
              >
                View All Challenges
              </Button>
                    </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h3 className="font-semibold">{challenge.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-green-100">
                        <Flame className="h-4 w-4" />
                        {challenge.streak} day streak
                    </div>
                    </div>
                  </div>
                  <Progress 
                    value={(challenge.progress / challenge.total) * 100} 
                    className="h-2 mb-2 bg-white/20"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>{challenge.progress}/{challenge.total} days</span>
                    <span className="font-semibold">+{challenge.points} pts</span>
                  </div>
                </div>
              ))}
                </div>
              </CardContent>
            </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                <CardTitle className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-[#16A34A]" />
                      <span>Personal Recommendations</span>
                </CardTitle>
                <CardDescription>
                      Top supplement matches based on your profile
                </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push('/comparison')}
                  >
                    Compare All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 bg-[#F0FDF4] rounded-lg flex items-center justify-center">
                        <Pill className="h-8 w-8 text-[#16A34A]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge className="bg-[#16A34A] text-white">
                            {item.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                            </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-[#16A34A]">${item.price}</div>
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => router.push('/comparison')}
                          >
                            <Info className="h-4 w-4 mr-1" />
                            More Info
                          </Button>
                          <Button size="sm" className="bg-[#16A34A] hover:bg-[#15803d]">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                        </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Links */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/community')}
                  >
                    <Users className="h-4 w-4 mr-3" />
                    Join Community
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/challenges')}
                  >
                    <Trophy className="h-4 w-4 mr-3" />
                    View Challenges
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/comparison')}
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Safety Check
                </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#16A34A]" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Logged Omega-3 supplement
                      </div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                        Logged 2 glasses of water
                      </div>
                      <div className="text-xs text-gray-500">3 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="h-4 w-4 text-purple-600" />
                        </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Completed wellness assessment
                      </div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

                {/* League Standing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span>Your League Standing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-medium">
                            JD
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Gold League</div>
                            <div className="text-sm text-gray-600">Rank #4</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#16A34A]">987 XP</div>
                          <div className="text-xs text-gray-500">31 day streak</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Platinum</span>
                          <span>1,013 XP needed</span>
                  </div>
                        <Progress value={49} className="h-2" />
                  </div>
                </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => router.push('/leaderboard')}
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      View Full Leaderboard
                </Button>
              </CardContent>
            </Card>

                {/* Community Updates */}
            <Card>
              <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span>Community Updates</span>
                    </CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-sm">New challenge: Hydration Hero</div>
                        <div className="text-xs text-gray-600">Join 1,200+ participants</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-sm">Expert Q&A: Dr. Sarah Johnson</div>
                        <div className="text-xs text-gray-600">Live at 2:00 PM today</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => router.push('/community')}
                    >
                    <Users className="h-4 w-4 mr-2" />
                      View All Updates
                  </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce">
            <div className="text-6xl">🎉</div>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold text-[#16A34A]">
                {showCelebration === 'water' && 'Great job staying hydrated! 💧'}
                {showCelebration === 'supplements' && 'Supplements logged! 💊'}
                {showCelebration === 'sleep' && 'Sleep logged! 😴'}
                {showCelebration === 'activity' && 'Activity logged! 🏃‍♂️'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tasks Modal */}
      <EditTasksModal
        isOpen={showEditTasksModal}
        onClose={() => setShowEditTasksModal(false)}
        onSave={(tasks) => {
          // Handle saving tasks - for now just close modal
          console.log('Tasks saved:', tasks)
          setShowEditTasksModal(false)
        }}
        initialTasks={[
          {
            id: '1',
            name: 'Water Intake',
            type: 'counter',
            goal: 8,
            unit: 'glasses',
            icon: 'Droplets',
            color: 'blue',
            reminder: true,
            reminderTime: '09:00',
            frequency: 'daily',
            startDate: '2025-01-01',
          },
          {
            id: '2',
            name: 'Supplements',
            type: 'boolean',
            goal: 3,
            unit: 'pills',
            icon: 'Pill',
            color: 'green',
            reminder: true,
            reminderTime: '08:00',
            frequency: 'daily',
            startDate: '2025-01-01',
          },
          {
            id: '3',
            name: 'Sleep',
            type: 'timer',
            goal: 8,
            unit: 'hours',
            icon: 'Moon',
            color: 'purple',
            reminder: false,
            reminderTime: '22:00',
            frequency: 'daily',
            startDate: '2025-01-01',
          },
          {
            id: '4',
            name: 'Activity',
            type: 'counter',
            goal: 10000,
            unit: 'steps',
            icon: 'Activity',
            color: 'orange',
            reminder: false,
            reminderTime: '18:00',
            frequency: 'daily',
            startDate: '2025-01-01',
          },
        ]}
      />
    </div>
  )
}
