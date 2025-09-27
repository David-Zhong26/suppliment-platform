'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import PersistentNav from '@/components/navigation/persistent-nav'
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
  TrendingUp
} from 'lucide-react'

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('tracker')
  const [supplementLog, setSupplementLog] = useState({
    omega3: { taken: true, time: '08:00' },
    vitaminD: { taken: false, time: '12:00' },
    magnesium: { taken: false, time: '18:00' }
  })

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
    setSupplementLog(prev => ({
      ...prev,
      [supplementId]: { ...prev[supplementId], taken: !prev[supplementId].taken }
    }))
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={userStats.level} userName="John" notificationCount={2} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#22C55E] to-[#F97316] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-gray-600 mb-4">Wellness Enthusiast • Level {userStats.level}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-[#F97316]" />
                  <span className="font-semibold text-gray-900">{userStats.currentStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-[#F97316]" />
                  <span className="text-gray-600">Best: {userStats.longestStreak} days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#22C55E]" />
                  <span className="text-gray-600">{userStats.totalDays} total days</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 bg-gradient-to-r from-[#22C55E] to-[#F97316] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">Level {userStats.level}</h2>
                <p className="opacity-90">Keep going to reach Level {userStats.level + 1}!</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{userStats.xp} XP</div>
                <div className="text-sm opacity-90">Next: {userStats.nextLevelXp} XP</div>
              </div>
            </div>
            <Progress 
              value={(userStats.xp / userStats.nextLevelXp) * 100} 
              className="h-3 bg-white/20"
            />
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg w-fit">
          <Button
            variant={selectedTab === 'tracker' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('tracker')}
            className={selectedTab === 'tracker' ? 'bg-[#22C55E] text-white' : 'text-gray-600'}
          >
            <Target className="h-4 w-4 mr-2" />
            Supplement Tracker
          </Button>
          <Button
            variant={selectedTab === 'achievements' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('achievements')}
            className={selectedTab === 'achievements' ? 'bg-[#22C55E] text-white' : 'text-gray-600'}
          >
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </Button>
          <Button
            variant={selectedTab === 'stats' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('stats')}
            className={selectedTab === 'stats' ? 'bg-[#22C55E] text-white' : 'text-gray-600'}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Statistics
          </Button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'tracker' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daily Tracker */}
            <div className="lg:col-span-2">
              <Card className="bg-white rounded-lg mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-[#22C55E]" />
                      <span>Today's Supplements</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#DCFCE7] text-[#22C55E]">
                      {supplementGoals.filter(s => s.completed).length}/{supplementGoals.length} Complete
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplementGoals.map((supplement) => (
                      <div
                        key={supplement.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          supplement.completed
                            ? 'border-[#22C55E] bg-[#DCFCE7]'
                            : 'border-gray-200 bg-white hover:border-[#22C55E]/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{supplement.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{supplement.name}</h3>
                            <p className="text-sm text-gray-600">Target: {supplement.time}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Progress</div>
                              <div className="font-bold text-[#22C55E]">
                                {supplement.taken}/{supplement.target}
                              </div>
                            </div>
                            <Button
                              onClick={() => logSupplement(supplement.id)}
                              variant={supplement.completed ? 'outline' : 'default'}
                              className={supplement.completed 
                                ? 'border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E] hover:text-white' 
                                : 'bg-[#22C55E] hover:bg-[#16A34A] text-white'
                              }
                            >
                              {supplement.completed ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Log Intake
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
              <Card className="bg-white rounded-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-[#22C55E]" />
                    <span>Weekly Goal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">This Week's Progress</span>
                      <span className="text-[#22C55E] font-bold">
                        {userStats.weeklyProgress}/{userStats.weeklyGoal} supplements
                      </span>
                    </div>
                    <Progress value={weeklyProgress} className="h-4" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Goal: {userStats.weeklyGoal} supplements</span>
                      <span>{Math.round(weeklyProgress)}% complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Streak Card */}
              <Card className="bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white">
                <CardContent className="p-6 text-center">
                  <Flame className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{userStats.currentStreak}</div>
                  <div className="text-sm opacity-90">Day Streak</div>
                  <div className="text-xs opacity-75 mt-2">
                    Keep it up! 🔥
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total XP</span>
                      <span className="font-bold text-[#22C55E]">{userStats.xp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="font-bold text-[#22C55E]">{userStats.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Streak</span>
                      <span className="font-bold text-[#F97316]">{userStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Days</span>
                      <span className="font-bold text-[#22C55E]">{userStats.totalDays}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.streak ? 'bg-[#22C55E]' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-gray-500">{activity.date}</div>
                        </div>
                        <div className="text-sm font-bold text-[#22C55E]">+{activity.xp} XP</div>
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
                        <Progress value={badge.progress * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round(badge.progress * 100)}% complete
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
