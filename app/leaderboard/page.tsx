'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import PersistentNav from '@/components/navigation/persistent-nav'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Flame, 
  Award, 
  Target,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Gem,
  ChevronRight,
  Calendar
} from 'lucide-react'

// League system data
const leagues = [
  { id: 'bronze', name: 'Bronze League', color: '#CD7F32', icon: Medal, minXP: 0, maxXP: 999 },
  { id: 'silver', name: 'Silver League', color: '#C0C0C0', icon: Shield, minXP: 1000, maxXP: 2499 },
  { id: 'gold', name: 'Gold League', color: '#FFD700', icon: Crown, minXP: 2500, maxXP: 4999 },
  { id: 'platinum', name: 'Platinum League', color: '#E5E4E2', icon: Star, minXP: 5000, maxXP: 9999 },
  { id: 'diamond', name: 'Diamond League', color: '#B9F2FF', icon: Gem, minXP: 10000, maxXP: 99999 }
]

// Demo leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    xp: 1247,
    level: 8,
    streak: 15,
    league: 'gold',
    badges: ['Hydration Hero', 'Supplement Master'],
    rank: 1,
    avatarColor: 'bg-blue-500',
    flag: '🇺🇸'
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: 'MC',
    xp: 1156,
    level: 7,
    streak: 23,
    league: 'gold',
    badges: ['Sleep Champion', 'Fitness Guru'],
    rank: 2,
    avatarColor: 'bg-green-500',
    flag: '🇨🇦'
  },
  {
    id: 3,
    name: 'Emma Davis',
    avatar: 'ED',
    xp: 1089,
    level: 7,
    streak: 8,
    league: 'gold',
    badges: ['Wellness Warrior'],
    rank: 3,
    avatarColor: 'bg-purple-500',
    flag: '🇬🇧'
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    avatar: 'AR',
    xp: 987,
    level: 6,
    streak: 31,
    league: 'silver',
    badges: ['Consistency King', 'Challenge Master'],
    rank: 4,
    avatarColor: 'bg-orange-500',
    flag: '🇲🇽',
    isCurrentUser: true
  },
  {
    id: 5,
    name: 'Lisa Wang',
    avatar: 'LW',
    xp: 892,
    level: 6,
    streak: 12,
    league: 'silver',
    badges: ['Nutrition Expert'],
    rank: 5,
    avatarColor: 'bg-pink-500',
    flag: '🇨🇳'
  },
  {
    id: 6,
    name: 'David Kim',
    avatar: 'DK',
    xp: 756,
    level: 5,
    streak: 19,
    league: 'silver',
    badges: ['Early Bird'],
    rank: 6,
    avatarColor: 'bg-red-500',
    flag: '🇰🇷'
  },
  {
    id: 7,
    name: 'Maria Garcia',
    avatar: 'MG',
    xp: 634,
    level: 5,
    streak: 6,
    league: 'bronze',
    badges: ['Newcomer'],
    rank: 7,
    avatarColor: 'bg-yellow-500',
    flag: '🇪🇸'
  },
  {
    id: 8,
    name: 'James Wilson',
    avatar: 'JW',
    xp: 543,
    level: 4,
    streak: 3,
    league: 'bronze',
    badges: [],
    rank: 8,
    avatarColor: 'bg-indigo-500',
    flag: '🇦🇺'
  },
  {
    id: 9,
    name: 'Anna Mueller',
    avatar: 'AM',
    xp: 456,
    level: 4,
    streak: 14,
    league: 'bronze',
    badges: ['Team Player'],
    rank: 9,
    avatarColor: 'bg-teal-500',
    flag: '🇩🇪'
  },
  {
    id: 10,
    name: 'Tom Anderson',
    avatar: 'TA',
    xp: 389,
    level: 3,
    streak: 2,
    league: 'bronze',
    badges: [],
    rank: 10,
    avatarColor: 'bg-gray-500',
    flag: '🇳🇴'
  }
]

export default function LeaderboardPage() {
  const [currentLeague, setCurrentLeague] = useState('gold')
  const [timeRemaining, setTimeRemaining] = useState(5) // days
  const [currentUser] = useState(leaderboardData.find(user => user.isCurrentUser))

  const getLeagueInfo = (leagueId: string) => {
    return leagues.find(league => league.id === leagueId) || leagues[0]
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Medal className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Medal className="h-6 w-6 text-amber-600" />
      default: return <span className="text-gray-500 font-medium">{rank}</span>
    }
  }

  const getLeagueIcon = (leagueId: string) => {
    const league = getLeagueInfo(leagueId)
    const Icon = league.icon
    return <Icon className="h-6 w-6" style={{ color: league.color }} />
  }

  const getAdvancementInfo = () => {
    const currentLeagueInfo = getLeagueInfo(currentLeague)
    const nextLeague = leagues[leagues.indexOf(currentLeagueInfo) + 1]
    
    if (!nextLeague) return null

    const currentUserXP = currentUser?.xp || 0
    const xpNeeded = nextLeague.minXP - currentUserXP

    return {
      nextLeague,
      xpNeeded: Math.max(0, xpNeeded),
      progress: Math.min(100, (currentUserXP / nextLeague.minXP) * 100)
    }
  }

  const advancementInfo = getAdvancementInfo()

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={currentUser?.level || 1} userName={currentUser?.name || 'User'} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Wellness League</h1>
          <p className="text-gray-600 text-lg">Compete with fellow wellness enthusiasts and climb the ranks!</p>
        </div>

        {/* League Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-white rounded-2xl p-2 shadow-sm">
            {leagues.map((league) => {
              const Icon = league.icon
              const isActive = league.id === currentLeague
              const isUnlocked = currentUser && currentUser.xp >= league.minXP
              
              return (
                <div
                  key={league.id}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#F0FDF4] border-2 border-[#16A34A]' 
                      : isUnlocked 
                        ? 'hover:bg-gray-50 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => isUnlocked && setCurrentLeague(league.id)}
                >
                  <Icon 
                    className="h-8 w-8 mb-2" 
                    style={{ color: isActive ? '#16A34A' : isUnlocked ? league.color : '#9CA3AF' }}
                  />
                  <span className={`text-sm font-medium ${isActive ? 'text-[#16A34A]' : 'text-gray-600'}`}>
                    {league.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Current League Info */}
        <Card className="mb-8 bg-gradient-to-r from-[#16A34A] to-[#15803d] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {getLeagueIcon(currentLeague)}
                <div>
                  <h2 className="text-2xl font-bold">{getLeagueInfo(currentLeague).name}</h2>
                  <p className="text-green-100">Top 7 advance to the next league</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-green-100 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-lg font-medium">{timeRemaining} days</span>
                </div>
                <p className="text-sm text-green-100">Until league reset</p>
              </div>
            </div>

            {/* Current User Progress */}
            {currentUser && advancementInfo && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Progress to {advancementInfo.nextLeague.name}</span>
                  <span className="text-sm">{advancementInfo.xpNeeded} XP needed</span>
                </div>
                <Progress 
                  value={advancementInfo.progress} 
                  className="h-3 bg-white/20"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-[#16A34A]" />
              Current Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {leaderboardData.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 p-4 transition-colors ${
                    user.isCurrentUser 
                      ? 'bg-[#F0FDF4] border-l-4 border-[#16A34A]' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-bold`}>
                      {user.avatar}
                    </div>
                    {user.flag && (
                      <div className="absolute -top-1 -right-1 text-lg">
                        {user.flag}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${user.isCurrentUser ? 'text-[#16A34A]' : 'text-gray-900'}`}>
                        {user.name}
                      </h3>
                      {user.badges.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {user.badges[0]}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>Level {user.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>{user.streak} day streak</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getLeagueIcon(user.league)}
                        <span className="capitalize">{user.league}</span>
                      </div>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${user.isCurrentUser ? 'text-[#16A34A]' : 'text-gray-900'}`}>
                      {user.xp} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* League Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-500" />
                League Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Exclusive badges and achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Higher marketplace discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Early access to new features</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-500" />
                How to Gain XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Log daily supplements</span>
                  <Badge variant="secondary">+10 XP</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Complete challenges</span>
                  <Badge variant="secondary">+50 XP</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Help community members</span>
                  <Badge variant="secondary">+20 XP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-500" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="text-sm">1,247 active members</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm">+89 new members this week</span>
                </div>
                <Button variant="outline" className="w-full">
                  Join Community
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}
