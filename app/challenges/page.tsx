'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy,
  Flame,
  Users,
  Calendar,
  Award,
  Star,
  ArrowRight,
  Clock,
  Target,
  Zap,
  CheckCircle,
  X,
  MessageCircle,
  Share2,
  ChevronLeft,
  Info
} from 'lucide-react'
import PersistentNav from '@/components/navigation/persistent-nav'

export default function ChallengesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('ongoing')
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [challengeToJoin, setChallengeToJoin] = useState<typeof challenges[0] | null>(null)

  const challenges = [
    {
      id: 1,
      name: 'Hydration Hero',
      icon: '💧',
      description: 'Drink 8 glasses of water daily for 30 days. Track your streak and earn points for consistency. Staying hydrated supports energy, skin health, and digestion.',
      duration: '30 days',
      difficulty: 'Beginner',
      participants: 1247,
      points: 150,
      badge: '💧 Hydration Hero',
      discount: '5%',
      status: 'ongoing',
      progress: 15,
      total: 30,
      streak: 5,
      benefits: [
        'Improved energy levels throughout the day',
        'Better skin health and complexion',
        'Enhanced digestion and nutrient absorption',
        'Reduced risk of dehydration-related fatigue'
      ],
      tips: [
        'Set hourly water reminders on your phone',
        'Keep a water bottle at your desk',
        'Add lemon or cucumber for flavor variety',
        'Track your intake in the morning and evening'
      ],
      leaderboard: [
        { rank: 1, name: 'Sarah M.', avatar: 'S', progress: 30, total: 30, streak: 30, points: 450, tier: 'Gold' },
        { rank: 2, name: 'Mike R.', avatar: 'M', progress: 29, total: 30, streak: 29, points: 435, tier: 'Gold' },
        { rank: 3, name: 'Emma L.', avatar: 'E', progress: 28, total: 30, streak: 28, points: 420, tier: 'Gold' },
        { rank: 4, name: 'David K.', avatar: 'D', progress: 27, total: 30, streak: 27, points: 405, tier: 'Silver' },
        { rank: 5, name: 'Lisa P.', avatar: 'L', progress: 26, total: 30, streak: 26, points: 390, tier: 'Silver' }
      ],
      userProgress: { progress: 15, total: 30, rank: 8, streak: 5 }
    },
    {
      id: 2,
      name: 'Supplement Streak',
      icon: '💊',
      description: 'Take your daily supplements consistently for 21 days. Build healthy habits and earn rewards for maintaining your supplement routine.',
      duration: '21 days',
      difficulty: 'Beginner',
      participants: 892,
      points: 210,
      badge: '💊 Supplement Master',
      discount: '10%',
      status: 'ongoing',
      progress: 7,
      total: 21,
      streak: 7,
      benefits: [
        'Improved nutrient intake consistency',
        'Better supplement absorption habits',
        'Enhanced overall health outcomes',
        'Reduced forgetfulness with supplements'
      ],
      tips: [
        'Set a daily alarm for supplement time',
        'Keep supplements visible in your routine',
        'Use a pill organizer for organization',
        'Pair supplements with existing habits'
      ],
      leaderboard: [
        { rank: 1, name: 'Alex C.', avatar: 'A', progress: 21, total: 21, streak: 21, points: 630, tier: 'Gold' },
        { rank: 2, name: 'Maria G.', avatar: 'M', progress: 20, total: 21, streak: 20, points: 600, tier: 'Gold' },
        { rank: 3, name: 'John S.', avatar: 'J', progress: 19, total: 21, streak: 19, points: 570, tier: 'Silver' },
        { rank: 4, name: 'Anna T.', avatar: 'A', progress: 18, total: 21, streak: 18, points: 540, tier: 'Silver' },
        { rank: 5, name: 'Tom W.', avatar: 'T', progress: 17, total: 21, streak: 17, points: 510, tier: 'Silver' }
      ],
      userProgress: { progress: 7, total: 21, rank: 12, streak: 7 }
    },
    {
      id: 3,
      name: 'Sleep Reset',
      icon: '💤',
      description: 'Establish a consistent sleep schedule and improve sleep quality over 28 days. Better sleep leads to better health, mood, and energy.',
      duration: '28 days',
      difficulty: 'Intermediate',
      participants: 634,
      points: 200,
      badge: '💤 Sleep Champion',
      discount: '7%',
      status: 'upcoming',
      progress: 0,
      total: 28,
      streak: 0,
      benefits: [
        'Improved sleep quality and duration',
        'Better mood and mental clarity',
        'Enhanced immune system function',
        'Reduced stress and anxiety levels'
      ],
      tips: [
        'Maintain consistent bedtime and wake time',
        'Create a relaxing bedtime routine',
        'Avoid screens 1 hour before bed',
        'Keep bedroom cool, dark, and quiet'
      ],
      leaderboard: [
        { rank: 1, name: 'Rachel B.', avatar: 'R', progress: 28, total: 28, streak: 28, points: 560, tier: 'Gold' },
        { rank: 2, name: 'Chris H.', avatar: 'C', progress: 27, total: 28, streak: 27, points: 540, tier: 'Gold' },
        { rank: 3, name: 'Olivia M.', avatar: 'O', progress: 26, total: 28, streak: 26, points: 520, tier: 'Gold' },
        { rank: 4, name: 'Ryan D.', avatar: 'R', progress: 25, total: 28, streak: 25, points: 500, tier: 'Silver' },
        { rank: 5, name: 'Sophie K.', avatar: 'S', progress: 24, total: 28, streak: 24, points: 480, tier: 'Silver' }
      ],
      userProgress: { progress: 0, total: 28, rank: 0, streak: 0 }
    },
    {
      id: 4,
      name: 'Veggie Boost',
      icon: '🥬',
      description: 'Increase your daily vegetable intake to 5 servings for 21 days. Boost your nutrition and discover new healthy recipes.',
      duration: '21 days',
      difficulty: 'Intermediate',
      participants: 445,
      points: 180,
      badge: '🥬 Veggie Lover',
      discount: '8%',
      status: 'completed',
      progress: 21,
      total: 21,
      streak: 21,
      benefits: [
        'Increased fiber and vitamin intake',
        'Improved digestive health',
        'Enhanced immune system support',
        'Better energy and vitality'
      ],
      tips: [
        'Add vegetables to every meal',
        'Prepare veggie snacks in advance',
        'Try new cooking methods and recipes',
        'Include a variety of colors and types'
      ],
      leaderboard: [
        { rank: 1, name: 'You!', avatar: 'Y', progress: 21, total: 21, streak: 21, points: 540, tier: 'Gold' },
        { rank: 2, name: 'Jenny L.', avatar: 'J', progress: 21, total: 21, streak: 20, points: 540, tier: 'Gold' },
        { rank: 3, name: 'Mark F.', avatar: 'M', progress: 21, total: 21, streak: 19, points: 540, tier: 'Gold' },
        { rank: 4, name: 'Kelly P.', avatar: 'K', progress: 21, total: 21, streak: 18, points: 540, tier: 'Gold' },
        { rank: 5, name: 'Steve N.', avatar: 'S', progress: 21, total: 21, streak: 17, points: 540, tier: 'Gold' }
      ],
      userProgress: { progress: 21, total: 21, rank: 1, streak: 21 }
    }
  ]

  const ongoingChallenges = challenges.filter(c => c.status === 'ongoing')
  const upcomingChallenges = challenges.filter(c => c.status === 'upcoming')
  const completedChallenges = challenges.filter(c => c.status === 'completed')

  const getCurrentChallenges = () => {
    switch (activeTab) {
      case 'ongoing': return ongoingChallenges
      case 'upcoming': return upcomingChallenges
      case 'completed': return completedChallenges
      default: return ongoingChallenges
    }
  }

  const getTabCounts = () => {
    return {
      ongoing: ongoingChallenges.length,
      upcoming: upcomingChallenges.length,
      completed: completedChallenges.length
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={1} userName="User" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/dashboard/user')}
            className="wellness-nav-link"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Challenges & Goals 🎯
            </h1>
            <p className="text-gray-600 text-lg">
              Join challenges, track progress, and earn rewards for healthy habits
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-[#16A34A] text-white">
              <Trophy className="h-4 w-4 mr-1" />
              1,247 Total Points
            </Badge>
            <Badge variant="outline">
              <Flame className="h-4 w-4 mr-1" />
              7 Day Streak
            </Badge>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'ongoing', label: 'Active', count: getTabCounts().ongoing },
            { id: 'upcoming', label: 'Upcoming', count: getTabCounts().upcoming },
            { id: 'completed', label: 'Completed', count: getTabCounts().completed }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#16A34A] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentChallenges().map((challenge) => (
            <Card key={challenge.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedChallenge(challenge)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#16A34A] to-[#15803d] rounded-full flex items-center justify-center">
                      <span className="text-2xl">{challenge.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{challenge.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="secondary" className="text-xs">
                          {challenge.difficulty}
                        </Badge>
                        <span>•</span>
                        <span>{challenge.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {challenge.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                  </div>

                  {challenge.status === 'ongoing' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Your Progress</span>
                        <span className="font-medium">{challenge.progress}/{challenge.total} days</span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.total) * 100} 
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-[#F97316]">
                          <Flame className="h-3 w-3" />
                          {challenge.streak} day streak
                        </span>
                        <span className="font-semibold text-[#16A34A]">
                          +{challenge.points} pts
                        </span>
                      </div>
                    </>
                  )}

                  {challenge.status === 'completed' && (
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                      <span className="font-semibold text-[#16A34A]">
                        +{challenge.points} pts earned
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-[#16A34A] hover:bg-[#15803d]"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (challenge.status === 'upcoming') {
                          setChallengeToJoin(challenge)
                          setShowJoinModal(true)
                        } else if (challenge.status === 'ongoing') {
                          // Continue challenge
                          setSelectedChallenge(challenge)
                        }
                      }}
                    >
                      {challenge.status === 'upcoming' ? 'Join Challenge' : 
                       challenge.status === 'ongoing' ? 'Continue' : 'View Results'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedChallenge(challenge)
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Challenge Detail Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#16A34A] to-[#15803d] rounded-full flex items-center justify-center">
                      <span className="text-3xl">{selectedChallenge.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedChallenge.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary">{selectedChallenge.difficulty}</Badge>
                        <Badge variant="outline">{selectedChallenge.duration}</Badge>
                        <span className="text-sm text-gray-600">{selectedChallenge.participants.toLocaleString()} participants</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedChallenge(null)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Challenge Details */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">About This Challenge</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedChallenge.description}</p>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedChallenge.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[#16A34A] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Success Tips</h3>
                      <ul className="space-y-2">
                        {selectedChallenge.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Target className="h-5 w-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Rewards */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Rewards</h3>
                      <div className="bg-[#F0FDF4] border border-[#16A34A] rounded-lg p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-[#16A34A]">+{selectedChallenge.points}</div>
                            <div className="text-sm text-gray-600">Points</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#16A34A]">{selectedChallenge.badge}</div>
                            <div className="text-sm text-gray-600">Badge</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#16A34A]">{selectedChallenge.discount}</div>
                            <div className="text-sm text-gray-600">Discount</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Leaderboard */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Leaderboard</h3>
                    
                    {/* Your Progress */}
                    <div className="bg-[#F0FDF4] border border-[#16A34A] rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Your Progress</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {selectedChallenge.userProgress.progress}/{selectedChallenge.userProgress.total} days completed
                        </span>
                        <span className="text-sm font-medium text-[#16A34A]">
                          {Math.round((selectedChallenge.userProgress.progress / selectedChallenge.userProgress.total) * 100)}%
                        </span>
                      </div>
                      <Progress value={(selectedChallenge.userProgress.progress / selectedChallenge.userProgress.total) * 100} className="h-2 mb-3" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Current Rank: #{selectedChallenge.userProgress.rank}
                        </span>
                        <span className="flex items-center gap-1 text-[#F97316]">
                          <Flame className="h-4 w-4" />
                          {selectedChallenge.userProgress.streak} day streak
                        </span>
                      </div>
                    </div>

                    {/* Top Participants */}
                    <div className="space-y-3">
                      {selectedChallenge.leaderboard.map((participant, index) => {
                        const progressPercent = (participant.progress / participant.total) * 100
                        const tierColor = participant.tier === 'Gold' ? 'text-yellow-600' : 
                                         participant.tier === 'Silver' ? 'text-gray-600' : 'text-orange-600'
                        const tierBg = participant.tier === 'Gold' ? 'bg-yellow-100' : 
                                       participant.tier === 'Silver' ? 'bg-gray-100' : 'bg-orange-100'
                        
                        return (
                          <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            {/* Rank */}
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#16A34A] text-white font-bold text-sm">
                              {participant.rank}
                            </div>
                            
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-bold">
                              {participant.avatar}
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">{participant.name}</span>
                                <Badge variant="secondary" className={`text-xs ${tierColor} ${tierBg}`}>
                                  {participant.tier}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>{participant.progress}/{participant.total} days</span>
                                <span className="flex items-center gap-1">
                                  <Flame className="h-3 w-3 text-[#F97316]" />
                                  {participant.streak} day streak
                                </span>
                              </div>
                              <Progress value={progressPercent} className="h-1.5 mt-1" />
                            </div>
                            
                            {/* Points */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-[#16A34A]">{participant.points}</div>
                              <div className="text-xs text-gray-500">pts</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  <Button className="flex-1 bg-[#16A34A] hover:bg-[#15803d] text-white text-lg py-3">
                    {selectedChallenge.status === 'upcoming' ? 'Join Challenge' : 
                     selectedChallenge.status === 'ongoing' ? 'Continue Challenge' : 'View Results'}
                  </Button>
                  <Button variant="outline" className="px-8">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discussion
                  </Button>
                  <Button variant="outline" className="px-8">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Join Challenge Modal */}
        {showJoinModal && challengeToJoin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#16A34A] to-[#15803d] rounded-full flex items-center justify-center">
                      <span className="text-3xl">{challengeToJoin.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Join {challengeToJoin.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary">{challengeToJoin.difficulty}</Badge>
                        <Badge variant="outline">{challengeToJoin.duration}</Badge>
                        <span className="text-sm text-gray-600">{challengeToJoin.participants.toLocaleString()} participants</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowJoinModal(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Challenge Details */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Challenge Overview</h3>
                      <p className="text-gray-600 leading-relaxed">{challengeToJoin.description}</p>
                    </div>

                    {/* Challenge Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">What You'll Do</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Target className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Daily Commitment</h4>
                            <p className="text-gray-700 text-sm">
                              {challengeToJoin.name === 'Hydration Hero' && 'Drink 8 glasses of water every day for 30 days'}
                              {challengeToJoin.name === 'Supplement Streak' && 'Take your daily supplements consistently for 21 days'}
                              {challengeToJoin.name === 'Sleep Champion' && 'Maintain 7-8 hours of quality sleep for 14 days'}
                              {challengeToJoin.name === 'Mindful Minutes' && 'Practice 10 minutes of mindfulness daily for 28 days'}
                              {challengeToJoin.name === 'Movement Master' && 'Complete 30 minutes of physical activity daily for 21 days'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Benefits You'll Gain</h3>
                      <ul className="space-y-2">
                        {challengeToJoin.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[#16A34A] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Success Tips */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Success Tips</h3>
                      <ul className="space-y-2">
                        {challengeToJoin.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap className="h-5 w-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Rewards & Commitment */}
                  <div className="space-y-6">
                    {/* Rewards */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Rewards</h3>
                      <div className="bg-[#F0FDF4] border border-[#16A34A] rounded-lg p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#16A34A] rounded-full flex items-center justify-center">
                              <Trophy className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-[#16A34A]">+{challengeToJoin.points} Points</div>
                              <div className="text-sm text-gray-600">Boost your wellness score</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center">
                              <Award className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-[#F97316]">{challengeToJoin.badge}</div>
                              <div className="text-sm text-gray-600">Exclusive achievement badge</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                              <Star className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-purple-600">{challengeToJoin.discount} Discount</div>
                              <div className="text-sm text-gray-600">On your next supplement purchase</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Commitment Level */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Your Commitment</h3>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="h-5 w-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">Duration: {challengeToJoin.duration}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="h-5 w-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">Join {challengeToJoin.participants.toLocaleString()} other participants</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Flame className="h-5 w-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">Build a {challengeToJoin.duration} streak</span>
                        </div>
                      </div>
                    </div>

                    {/* Community Support */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Community Support</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <MessageCircle className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold text-gray-900">Daily Check-ins</div>
                            <div className="text-sm text-gray-600">Share your progress with the community</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <Users className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-semibold text-gray-900">Peer Support</div>
                            <div className="text-sm text-gray-600">Get encouragement from fellow participants</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                          <Info className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-semibold text-gray-900">Expert Tips</div>
                            <div className="text-sm text-gray-600">Weekly insights from wellness experts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowJoinModal(false)}
                  >
                    Maybe Later
                  </Button>
                  <Button 
                    className="flex-1 bg-[#16A34A] hover:bg-[#15803d] text-white"
                    onClick={() => {
                      // Join the challenge logic here
                      console.log('Joining challenge:', challengeToJoin.name)
                      setShowJoinModal(false)
                      // You could add a success toast or redirect here
                    }}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Join Challenge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
