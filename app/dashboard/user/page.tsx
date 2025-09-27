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
  BookOpen,
  ShoppingCart
} from 'lucide-react'
import QuestionnaireLauncher from '@/components/questionnaire/questionnaire-launcher'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [supplementStreak, setSupplementStreak] = useState(7)
  const [todayLogs, setTodayLogs] = useState(3)
  const [weeklyGoal, setWeeklyGoal] = useState(21) // 3 supplements x 7 days

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const recommendations = [
    {
      id: 1,
      name: 'Premium Whey Protein',
      matchScore: 95,
      reason: 'Perfect for your muscle gain goals',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200',
      tags: ['High Protein', 'Muscle Building']
    },
    {
      id: 2,
      name: 'Daily Multivitamin',
      matchScore: 88,
      reason: 'Fills nutrient gaps in your diet',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8713?w=200',
      tags: ['Daily Health', 'Energy']
    },
    {
      id: 3,
      name: 'Omega-3 Fish Oil',
      matchScore: 92,
      reason: 'Supports heart and brain health',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
      tags: ['Heart Health', 'Anti-Inflammatory']
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'supplement',
      action: 'Logged',
      item: 'Whey Protein',
      time: '2 hours ago',
      icon: Pill
    },
    {
      id: 2,
      type: 'goal',
      action: 'Achieved',
      item: '7-day supplement streak',
      time: '1 day ago',
      icon: Award
    },
    {
      id: 3,
      type: 'community',
      action: 'Posted in',
      item: 'Muscle Building Masters',
      time: '2 days ago',
      icon: Users
    }
  ]

  const weeklyProgress = (todayLogs / weeklyGoal) * 100

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-[#2E7D32]" />
              <span className="text-2xl font-bold">Wellness Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Level 1</span>
              </Badge>
              <div className="text-sm text-gray-600">
                Welcome back, {session?.user?.name}!
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#212121] mb-2">
            Good morning, {session?.user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-[#4E944F]">
            Ready to continue your wellness journey? Here's what's happening today.
          </p>
        </div>

        {/* Questionnaire Section */}
        <div className="mb-8">
          <QuestionnaireLauncher />
        </div>

        {/* Comparison Feature Highlight */}
        <div className="wellness-header p-6 mb-8 rounded-2xl border-2 border-[#A5D6A7]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#212121] mb-2">
                🎯 Find Your Perfect Supplements
              </h2>
              <p className="text-[#4E944F] text-lg mb-4">
                Compare supplements side-by-side with our AI-powered matching algorithm
              </p>
              <div className="flex items-center gap-4">
                <Button 
                  size="lg" 
                  className="btn-primary-wellness text-lg px-8"
                  onClick={() => router.push('/comparison')}
                >
                  Compare Supplements
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
                <div className="text-sm text-[#22C55E]">
                  <span className="font-semibold">95%+ accuracy</span> in matching your profile
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-gradient-to-r from-[#22C55E] to-[#F97316] rounded-full flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#A5D6A7] rounded-lg">
                  <Pill className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{supplementStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#A5D6A7] rounded-lg">
                  <Target className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{todayLogs}/3</div>
                  <div className="text-sm text-gray-600">Today's Logs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#A5D6A7] rounded-lg">
                  <Users className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-gray-600">Active Groups</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-gray-600">Goal Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Supplement Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-6 w-6 text-blue-600" />
                  <span>Today's Supplement Log</span>
                </CardTitle>
                <CardDescription>
                  Track your daily supplement intake and maintain your streak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Weekly Goal Progress</span>
                    <span className="text-sm text-gray-600">{todayLogs}/{weeklyGoal} supplements</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-3" />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl">✅</div>
                      <div className="text-sm font-medium">Whey Protein</div>
                      <div className="text-xs text-gray-500">8:00 AM</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl">✅</div>
                      <div className="text-sm font-medium">Multivitamin</div>
                      <div className="text-xs text-gray-500">12:00 PM</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl">✅</div>
                      <div className="text-sm font-medium">Omega-3</div>
                      <div className="text-xs text-gray-500">6:00 PM</div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Pill className="h-4 w-4 mr-2" />
                    Log New Supplement
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <span>Personalized Recommendations</span>
                </CardTitle>
                <CardDescription>
                  Supplements matched to your profile and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant="secondary">{item.matchScore}% match</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                        <div className="flex items-center space-x-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${item.price}</div>
                        <Button size="sm" className="mt-2">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Safety Checker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  <span>Safety Checker</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Check for potential interactions between your supplements and medications.
                </p>
                <Button className="w-full" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Check Interactions
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {activity.action} {activity.item}
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  <span>Community Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-sm">New challenge in Muscle Building Masters</div>
                    <div className="text-xs text-gray-600">30-day protein challenge starting Monday</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-sm">New post from @janesmith</div>
                    <div className="text-xs text-gray-600">"My clean eating meal prep routine"</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Users className="h-4 w-4 mr-2" />
                  View All Updates
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn About Supplements
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Set New Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Join Communities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
