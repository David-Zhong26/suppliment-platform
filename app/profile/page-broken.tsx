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
  CheckCircle,
  Plus,
  Edit,
  Settings,
  Star,
  Clock,
  Award,
  Zap,
  Heart,
  Shield,
  BookOpen,
  TrendingUp,
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
  const [supplementLog, setSupplementLog] = useState({
    omega3: { taken: true, time: '08:00' },
    vitaminD: { taken: false, time: '12:00' },
    magnesium: { taken: false, time: '18:00' }
  })

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
    weeklyGoal: 21, // 3 supplements x 7 days
    weeklyProgress: 18,
    badges: [
      { name: 'First Week', icon: '🎯', earned: true, date: '2024-01-15' },
      { name: 'Perfect Week', icon: '⭐', earned: true, date: '2024-01-22' },
      { name: 'Consistency King', icon: '👑', earned: false, progress: 0.8 },
      { name: 'Health Hero', icon: '🦸', earned: false, progress: 0.6 }
    ]
  }

  const supplementGoals = [
    { id: 'omega3', name: 'Omega-3', icon: '🐟', target: 1, taken: 1, time: '08:00', completed: true },
    { id: 'vitaminD', name: 'Vitamin D3', icon: '☀️', target: 1, taken: 0, time: '12:00', completed: false },
    { id: 'magnesium', name: 'Magnesium', icon: '🍌', target: 1, taken: 0, time: '18:00', completed: false }
  ]

  const recentActivity = [
    { date: '2024-01-15', action: 'Logged Omega-3', xp: 10, streak: true },
    { date: '2024-01-14', action: 'Perfect day! All supplements taken', xp: 50, streak: true },
    { date: '2024-01-13', action: 'Logged Vitamin D3', xp: 10, streak: true },
    { date: '2024-01-12', action: 'Weekly goal completed!', xp: 100, streak: false },
  ]

  const weeklyProgress = (userStats.weeklyProgress / userStats.weeklyGoal) * 100

  const logSupplement = (supplementId: string) => {
    setSupplementLog(prev => {
      const current = prev[supplementId as keyof typeof prev]
      return {
        ...prev,
        [supplementId]: { ...current, taken: !current.taken }
      }
    })
  }

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
              <h1 className="text-4xl font-bold text-gray-900 mb-3">John Doe</h1>
              <p className="text-xl text-gray-600 mb-6">Wellness Enthusiast • Level {userStats.level}</p>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <Flame className="h-6 w-6 text-[#F97316]" />
                  <span className="font-semibold text-gray-900 text-lg">{userStats.currentStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-[#F97316]" />
                  <span className="text-gray-600 text-lg">Best: {userStats.longestStreak} days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#22C55E]" />
                  <span className="text-gray-600 text-lg">{userStats.totalDays} total days</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-3 px-6 py-3">
              <Edit className="h-5 w-5" />
              <span className="text-lg">Edit Profile</span>
            </Button>
          </div>
        </div>

        {/* Level Progress */}
        <Card className="mb-10 bg-gradient-to-r from-[#22C55E] to-[#F97316] text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Level {userStats.level}</h2>
                <p className="opacity-90 text-lg">Keep going to reach Level {userStats.level + 1}!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{userStats.xp} XP</div>
                <div className="text-lg opacity-90">Next: {userStats.nextLevelXp} XP</div>
              </div>
            </div>
            <Progress 
              value={(userStats.xp / userStats.nextLevelXp) * 100} 
              className="h-4 bg-white/20"
            />
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-10 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'health', label: 'Health Profile', icon: Heart },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
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
                <span className="font-medium">{tab.label}</span>
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
              onPurchase={(itemId) => {
                console.log('Purchase item:', itemId)
                // TODO: Implement purchase logic
              }}
              onEquip={(itemId) => {
                console.log('Equip item:', itemId)
                // TODO: Implement equip logic
              }}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Supplement Tracker */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-[#16A34A]" />
                    Today's Supplement Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(supplementLog).map(([supplement, data]) => (
                      <div key={supplement} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            data.taken ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {data.taken ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-semibold capitalize">{supplement.replace(/([A-Z])/g, ' $1').trim()}</h3>
                            <p className="text-sm text-gray-600">Scheduled: {data.time}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={data.taken ? "outline" : "default"}
                          onClick={() => setSupplementLog(prev => ({
                            ...prev,
                            [supplement]: { ...prev[supplement as keyof typeof prev], taken: !data.taken }
                          }))}
                          className={data.taken ? "" : "bg-[#16A34A] hover:bg-[#15803d] text-white"}
                        >
                          {data.taken ? 'Mark as Not Taken' : 'Mark as Taken'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Streak</span>
                      <span className="flex items-center gap-1 font-semibold text-[#F97316]">
                        <Flame className="h-4 w-4" />
                        {userStats.currentStreak} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Weekly Progress</span>
                      <span className="font-semibold">{userStats.weeklyProgress}/{userStats.weeklyGoal}</span>
                    </div>
                    <Progress value={(userStats.weeklyProgress / userStats.weeklyGoal) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userStats.badges.slice(0, 3).map((badge, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-2xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-sm text-gray-600">
                            {badge.earned ? `Earned ${badge.date}` : `${Math.round((badge.progress || 0) * 100)}% complete`}
                          </p>
                        </div>
                        {badge.earned && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'health' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Health Goals */}
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
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{goal}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Nutrient Gap Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-orange-600" />
                  Nutrient Gap Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthProfile.nutrientGaps.map((gap, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{gap.nutrient}</h4>
                        <Badge variant={gap.deficiency === 'Low' ? 'secondary' : 'destructive'}>
                          {gap.deficiency} Deficiency
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{gap.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-600" />
                  Health Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Allergies</h4>
                    <div className="space-y-1">
                      {healthProfile.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline">{allergy}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Medications</h4>
                    <div className="space-y-1">
                      {healthProfile.medications.map((medication, index) => (
                        <Badge key={index} variant="outline">{medication}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Conditions</h4>
                    <div className="space-y-1">
                      {healthProfile.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline">{condition}</Badge>
                      ))}
                    </div>
                  </div>
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
                New Order
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${order.total}</div>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Items:</h4>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Tracking: {order.tracking}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.status === 'Delivered' && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
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
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-[#16A34A]" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">user@example.com</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">123 Wellness St, Health City</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-[#F97316]" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your orders and health</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-gray-600">Light mode</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Privacy</p>
                        <p className="text-sm text-gray-600">Manage your data and privacy settings</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-[#16A34A]" />
                  Language & Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Language
                    </label>
                    <div className="space-y-2">
                      {languages.map((language) => (
                        <div
                          key={language.code}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedLanguage === language.code
                              ? 'border-[#16A34A] bg-[#F0FDF4]'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedLanguage(language.code)}
                        >
                          <span className="text-2xl">{language.flag}</span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{language.name}</p>
                            <p className="text-sm text-gray-600">{language.nativeName}</p>
                          </div>
                          {selectedLanguage === language.code && (
                            <CheckCircle className="h-5 w-5 text-[#16A34A]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Languages className="h-4 w-4" />
                      <span>Current: {languages.find(l => l.code === selectedLanguage)?.name}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-red-600" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'tracker' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daily Tracker */}
            <div className="lg:col-span-2">
              <Card className="bg-white rounded-xl mb-8 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-[#22C55E]" />
                      <span className="text-xl font-bold">Today's Supplements</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#DCFCE7] text-[#22C55E] px-4 py-2 text-sm font-medium">
                      {supplementGoals.filter(s => s.completed).length}/{supplementGoals.length} Complete
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {supplementGoals.map((supplement) => (
                      <div
                        key={supplement.id}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          supplement.completed
                            ? 'border-[#22C55E] bg-[#DCFCE7]'
                            : 'border-gray-200 bg-white hover:border-[#22C55E]/50'
                        }`}
                      >
                        <div className="flex items-center space-x-6">
                          <div className="text-4xl">{supplement.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{supplement.name}</h3>
                            <p className="text-gray-600 mt-1">Target: {supplement.time}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Progress</div>
                              <div className="font-bold text-[#22C55E] text-lg">
                                {supplement.taken}/{supplement.target}
                              </div>
                            </div>
                            <Button
                              onClick={() => logSupplement(supplement.id)}
                              variant={supplement.completed ? 'outline' : 'default'}
                              className={`px-6 py-3 ${
                                supplement.completed 
                                  ? 'border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E] hover:text-white' 
                                  : 'bg-[#22C55E] hover:bg-[#16A34A] text-white'
                              }`}
                            >
                              {supplement.completed ? (
                                <>
                                  <CheckCircle className="h-5 w-5 mr-2" />
                                  <span className="font-medium">Completed</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="h-5 w-5 mr-2" />
                                  <span className="font-medium">Log Intake</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Goal */}
              <Card className="bg-white rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-[#22C55E]" />
                    <span className="text-xl font-bold">Weekly Goal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">This Week's Progress</span>
                      <span className="text-[#22C55E] font-bold text-lg">
                        {userStats.weeklyProgress}/{userStats.weeklyGoal} supplements
                      </span>
                    </div>
                    <Progress value={weeklyProgress} className="h-5" />
                    <div className="flex justify-between text-gray-600">
                      <span>Goal: {userStats.weeklyGoal} supplements</span>
                      <span className="font-medium">{Math.round(weeklyProgress)}% complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Streak Card */}
              <Card className="bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white rounded-xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <Flame className="h-16 w-16 mx-auto mb-6" />
                  <div className="text-4xl font-bold mb-3">{userStats.currentStreak}</div>
                  <div className="text-lg opacity-90 mb-3">Day Streak</div>
                  <div className="text-sm opacity-75">
                    Keep it up! 🔥
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-lg">Total XP</span>
                      <span className="font-bold text-[#22C55E] text-xl">{userStats.xp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-lg">Level</span>
                      <span className="font-bold text-[#22C55E] text-xl">{userStats.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-lg">Best Streak</span>
                      <span className="font-bold text-[#F97316] text-xl">{userStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-lg">Total Days</span>
                      <span className="font-bold text-[#22C55E] text-xl">{userStats.totalDays}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.streak ? 'bg-[#22C55E]' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-500">{activity.date}</div>
                        </div>
                        <div className="font-bold text-[#22C55E] text-lg">+{activity.xp} XP</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.badges.map((badge, index) => (
              <Card key={index} className={`bg-white rounded-lg ${
                badge.earned ? 'ring-2 ring-[#22C55E]' : ''
              }`}>
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl mb-4 ${
                    badge.earned ? '' : 'grayscale opacity-50'
                  }`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                  {badge.earned ? (
                    <div>
                      <Badge className="bg-[#22C55E] text-white">Earned</Badge>
                      <p className="text-xs text-gray-500 mt-2">{badge.date}</p>
                    </div>
                  ) : (
                    <div>
                      <Badge variant="secondary">In Progress</Badge>
                      <div className="mt-2">
                        <Progress value={(badge.progress || 0) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((badge.progress || 0) * 100)}% complete
                        </p>
                      </div>
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
                    <TrendingUp className="h-6 w-6 text-[#22C55E]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Consistency Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#FED7AA] rounded-lg">
                    <Trophy className="h-6 w-6 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Badges Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#DCFCE7] rounded-lg">
                    <Calendar className="h-6 w-6 text-[#22C55E]" />
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
