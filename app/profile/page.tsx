'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import PersistentNav from '@/components/navigation/persistent-nav'
import CharacterAvatar from '@/components/character-avatar-simple'
import { 
  User, 
  Calendar, 
  Target, 
  Trophy, 
  Flame, 
  Star,
  ShoppingCart,
  Package,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Bell,
  Palette,
  Lock,
  HelpCircle,
  Download,
  Globe,
  Languages
} from 'lucide-react'

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  
  // Character and points system
  const [userXp] = useState(3247)
  const [userPoints] = useState(1250)

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' }
  ]

  // Health profile data
  const healthProfile = {
    goals: ['Heart Health', 'Energy', 'Sleep Quality'],
    nutrientGaps: [
      { nutrient: 'Vitamin D', deficiency: 'Low', recommendation: '1000 IU daily' },
      { nutrient: 'Omega-3', deficiency: 'Moderate', recommendation: '1000mg EPA/DHA' },
      { nutrient: 'Magnesium', deficiency: 'Low', recommendation: '400mg daily' }
    ],
    allergies: ['None'],
    medications: ['None'],
    conditions: ['None']
  }

  // Orders and purchases
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: ['Premium Omega-3 Complex', 'Vitamin D3+K2'],
      total: 54.98,
      status: 'Delivered',
      tracking: 'TRK-123456'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: ['Magnesium Glycinate'],
      total: 19.99,
      status: 'Shipped',
      tracking: 'TRK-789012'
    }
  ]

  const userStats = {
    currentStreak: 12,
    longestStreak: 28,
    totalDays: 45,
    level: 3,
    xp: 1240,
    nextLevelXp: 1500,
    weeklyGoal: 21,
    weeklyProgress: 18,
    badges: [
      { name: 'First Week', icon: '🎯', earned: true, date: '2024-01-15' },
      { name: 'Perfect Week', icon: '⭐', earned: true, date: '2024-01-22' },
      { name: 'Consistency King', icon: '👑', earned: false, progress: 0.8 },
      { name: 'Health Hero', icon: '🦸', earned: false, progress: 0.6 }
    ]
  }

  const [supplementGoals, setSupplementGoals] = useState([
    { id: 'omega3', name: 'Omega-3', icon: '🐟', target: 1, taken: 1, time: '08:00', completed: true },
    { id: 'vitaminD', name: 'Vitamin D3', icon: '☀️', target: 1, taken: 0, time: '12:00', completed: false },
    { id: 'magnesium', name: 'Magnesium', icon: '🍌', target: 1, taken: 0, time: '18:00', completed: false }
  ])

  const recentActivity = [
    { date: '2024-01-15', action: 'Logged Omega-3', xp: 10, streak: true },
    { date: '2024-01-14', action: 'Perfect day! All supplements taken', xp: 50, streak: true },
    { date: '2024-01-13', action: 'Logged Vitamin D3', xp: 10, streak: true },
    { date: '2024-01-12', action: 'Weekly goal completed!', xp: 100, streak: false }
  ]

  const weeklyProgress = (userStats.weeklyProgress / userStats.weeklyGoal) * 100

  const logSupplement = (supplementId: string) => {
    setSupplementGoals(prev => 
      prev.map(supplement => 
        supplement.id === supplementId 
          ? { ...supplement, completed: !supplement.completed, taken: supplement.completed ? 0 : 1 }
          : supplement
      )
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'health', label: 'Health Profile', icon: Target },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Palette },
    { id: 'tracker', label: 'Tracker', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'stats', label: 'Stats', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={userStats.level} userName="John" notificationCount={2} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-10 mb-10 shadow-sm">
          <div className="flex items-center space-x-8">
            <div className="w-24 h-24 bg-gradient-to-r from-[#22C55E] to-[#F97316] rounded-full flex items-center justify-center text-white text-4xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-gray-600 mb-4">Wellness Enthusiast • Level {userStats.level}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold text-orange-600">{userStats.currentStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-yellow-600">{userStats.xp} XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-purple-600">{userStats.badges.filter(b => b.earned).length} badges</span>
                </div>
              </div>
            </div>
            <Button className="bg-[#16A34A] hover:bg-[#15803d] text-white">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 ${
                  selectedTab === tab.id
                    ? 'bg-white text-[#16A34A] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Character Avatar */}
            <CharacterAvatar 
              userXp={userXp} 
              userPoints={userPoints}
              userName="John" // Using the hardcoded name from the profile header
              onPurchase={(itemId) => {
                console.log('Purchase item:', itemId)
              }}
              onEquip={(itemId) => {
                console.log('Equip item:', itemId)
              }}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Daily Goals */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Daily Goals</h2>
                    <p className="text-gray-600">Track your daily wellness activities</p>
                  </div>
                </div>

                {/* Daily Goals - Supplements Only */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                  {/* Supplement Intake */}
                  <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-full">
                          <Target className="h-6 w-6 text-green-600" />
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            supplementGoals.filter(s => s.completed).length >= supplementGoals.length 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {supplementGoals.filter(s => s.completed).length}/{supplementGoals.length}
                          {supplementGoals.filter(s => s.completed).length > supplementGoals.length && ' 🎉'}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Supplements</h3>
                      <Progress 
                        value={(supplementGoals.filter(s => s.completed).length / supplementGoals.length) * 100} 
                        className="h-2 mb-3"
                      />
                      <div className="space-y-2">
                        {supplementGoals.map((supplement) => (
                          <div key={supplement.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{supplement.icon}</span>
                              <span className="font-medium text-gray-900">{supplement.name}</span>
                              <span className="text-sm text-gray-500">{supplement.time}</span>
                            </div>
                            <Button
                              variant={supplement.completed ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => logSupplement(supplement.id)}
                              className={supplement.completed ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                              {supplement.completed ? '✓ Taken' : 'Mark Taken'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Streak</span>
                        <span>{userStats.currentStreak} days</span>
                      </div>
                      <Progress value={(userStats.currentStreak / 30) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Progress</span>
                        <span>{userStats.weeklyProgress}/{userStats.weeklyGoal}</span>
                      </div>
                      <Progress value={weeklyProgress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total XP</span>
                      <span className="font-semibold">{userStats.xp}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {userStats.badges.slice(0, 3).map((badge, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <span className="text-xl">{badge.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{badge.name}</p>
                            <p className="text-xs text-gray-500">{badge.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'health' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-[#16A34A]" />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {healthProfile.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-[#16A34A]" />
                  Nutrient Gap Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthProfile.nutrientGaps.map((gap, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{gap.nutrient}</h4>
                        <Badge variant={gap.deficiency === 'Low' ? 'secondary' : 'destructive'}>
                          {gap.deficiency}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{gap.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Orders & Purchases</h2>
              <Button className="bg-[#16A34A] hover:bg-[#15803d] text-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-gray-600">{order.date}</p>
                        <div className="mt-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm text-gray-700">• {item}</div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total}</p>
                        <Badge className={order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                          {order.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{order.tracking}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-[#16A34A]" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">john.doe@example.com</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">+1 (555) 123-4567</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">123 Wellness St, Health City, HC 12345</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-6 w-6 text-[#16A34A]" />
                  Language & Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedLanguage === lang.code
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedLanguage(lang.code)}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <div>
                        <p className="font-medium">{lang.name}</p>
                        <p className="text-sm opacity-75">{lang.nativeName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.badges.map((badge, index) => (
              <Card key={index} className={`bg-white rounded-lg ${
                badge.earned ? 'ring-2 ring-[#22C55E]' : ''
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{badge.name}</h3>
                  {badge.earned ? (
                    <div>
                      <Badge className="bg-green-100 text-green-700 mb-2">Earned</Badge>
                      <p className="text-sm text-gray-600">{badge.date}</p>
                    </div>
                  ) : (
                    <div>
                      <Badge variant="secondary" className="mb-2">In Progress</Badge>
                      <Progress value={(badge.progress || 0) * 100} className="h-2" />
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round((badge.progress || 0) * 100)}% complete
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#DCFCE7] rounded-lg">
                    <Flame className="h-6 w-6 text-[#22C55E]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{userStats.currentStreak}</div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#FEF3C7] rounded-lg">
                    <Star className="h-6 w-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{userStats.xp}</div>
                    <div className="text-sm text-gray-600">Total XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#E0E7FF] rounded-lg">
                    <Calendar className="h-6 w-6 text-[#6366F1]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">45</div>
                    <div className="text-sm text-gray-600">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
