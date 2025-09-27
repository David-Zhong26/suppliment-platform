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
  ShoppingCart,
  Home,
  Store,
  User,
  Bell,
  Settings,
  Plus,
  Clock,
  MapPin,
  Video
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

  const upcomingActivities = [
    {
      id: 1,
      type: 'consultation',
      title: 'Wellness Consultation with Dr. Sarah',
      provider: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '2:00 PM - 3:00 PM',
      location: 'Virtual Meeting',
      status: 'confirmed',
      avatar: 'S'
    },
    {
      id: 2,
      type: 'community',
      title: 'Nutrition Workshop with Alex',
      provider: 'Alex Chen, Nutritionist',
      date: '2024-01-16',
      time: '10:00 AM - 11:00 AM',
      location: 'Community Center',
      status: 'confirmed',
      avatar: 'A'
    },
    {
      id: 3,
      type: 'assessment',
      title: 'Follow-up Assessment with Dr. Mike',
      provider: 'Dr. Mike Davis',
      date: '2024-01-18',
      time: '4:00 PM - 5:00 PM',
      location: 'Health Clinic',
      status: 'pending',
      avatar: 'M'
    }
  ]

  const recommendations = [
    {
      id: 1,
      name: 'Premium Omega-3 Complex',
      matchScore: 95,
      reason: 'Perfect for your heart health goals',
      price: 29.99,
      image: '🐟',
      tags: ['Heart Health', 'Brain Function']
    },
    {
      id: 2,
      name: 'Vitamin D3+K2',
      matchScore: 88,
      reason: 'Fills your vitamin D needs',
      price: 24.99,
      image: '☀️',
      tags: ['Bone Health', 'Immunity']
    },
    {
      id: 3,
      name: 'Magnesium Glycinate',
      matchScore: 92,
      reason: 'Supports better sleep and relaxation',
      price: 19.99,
      image: '🍌',
      tags: ['Sleep Quality', 'Stress Relief']
    }
  ]

  const weeklyProgress = (todayLogs / weeklyGoal) * 100

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-[#22C55E]" />
              <span className="text-2xl font-bold text-gray-900">Wellness Platform</span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => router.push('/dashboard/user')}
                className="flex items-center space-x-2 text-[#22C55E] border-b-2 border-[#22C55E] pb-1"
              >
                <Home className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button 
                onClick={() => router.push('/comparison')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors"
              >
                <Store className="h-4 w-4" />
                <span>Marketplace</span>
              </button>
              <button 
                onClick={() => router.push('/community')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </button>
              <button 
                onClick={() => router.push('/profile')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
              <button 
                onClick={() => router.push('/notifications')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </button>
              <button 
                onClick={() => router.push('/settings')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.push('/comparison')}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse Supplements
              </Button>
              
              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-[#F97316]" />
                  <span>Level 1</span>
                </Badge>
                <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-medium">
                  {session?.user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {session?.user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your wellness journey and supplement routine
            </p>
          </div>
          <Button 
            onClick={() => router.push('/comparison')}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Browse Supplements
          </Button>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#DCFCE7] rounded-lg">
                  <Calendar className="h-6 w-6 text-[#22C55E]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Upcoming Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#DCFCE7] rounded-lg">
                  <Pill className="h-6 w-6 text-[#22C55E]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Active Supplements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#DCFCE7] rounded-lg">
                  <Users className="h-6 w-6 text-[#22C55E]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Health Experts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#FED7AA] rounded-lg">
                  <Target className="h-6 w-6 text-[#F97316]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4</div>
                  <div className="text-sm text-gray-600">Available TAs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Sessions</h2>
            <p className="text-gray-600">Your scheduled wellness consultations and community sessions</p>
          </div>
          
          <div className="space-y-4">
            {upcomingActivities.map((session) => (
              <Card key={session.id} className="bg-white rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {session.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{session.provider}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {session.location.includes('Virtual') ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <MapPin className="h-4 w-4" />
                          )}
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                        className={session.status === 'confirmed' ? 'bg-gray-900' : 'bg-gray-100 text-gray-600'}
                      >
                        {session.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={session.status === 'confirmed' ? 'border-gray-900 text-gray-900' : ''}
                      >
                        {session.status === 'confirmed' ? 'Join Session' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
