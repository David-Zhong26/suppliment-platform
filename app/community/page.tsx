'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import PersistentNav from '@/components/navigation/persistent-nav'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
  Filter,
  TrendingUp,
  Star,
  Clock,
  Award,
  Plus,
  Video,
  BookOpen,
  Target,
  Trophy,
  Zap,
  CheckCircle,
  MessageSquare,
  User,
  Calendar,
  Gift,
  Crown,
  Medal,
  Flame,
  Brain,
  Dumbbell,
  Apple,
  ChefHat,
  ArrowRight,
  Info
} from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  // User data (demo)
  const currentUser = {
    name: 'John Doe',
    avatar: 'JD',
    level: 'Silver',
    points: 750,
    nextLevelPoints: 1000,
    healthGoals: ['Muscle gain', 'Energy'],
    badge: 'Top Contributor',
    streak: 7
  }

  // Detailed challenge data
  const challenges = [
    {
      id: 'hydration',
      name: 'Hydration Challenge',
      icon: '💧',
      description: 'Drink 8 glasses of water daily for 30 days. Track your streak and earn points for consistency. Staying hydrated supports energy, skin health, and digestion.',
      duration: '30 days',
      difficulty: 'Easy',
      participants: 1247,
      points: 50,
      badge: 'Hydration Hero',
      discount: '5%',
      benefits: [
        'Improved energy levels throughout the day',
        'Better skin health and complexion',
        'Enhanced digestion and nutrient absorption',
        'Reduced headaches and fatigue',
        'Better cognitive function and focus'
      ],
      tips: [
        'Start your day with a glass of water',
        'Set hourly reminders on your phone',
        'Use a marked water bottle to track intake',
        'Add lemon or cucumber for flavor variety',
        'Track your progress in the app daily'
      ],
      leaderboard: [
        { rank: 1, name: 'FitLifeJane', avatar: 'FJ', progress: 27, total: 30, streak: 12, points: 45, tier: 'Gold' },
        { rank: 2, name: 'HealthyMike', avatar: 'HM', progress: 25, total: 30, streak: 9, points: 40, tier: 'Silver' },
        { rank: 3, name: 'SarahM', avatar: 'SM', progress: 24, total: 30, streak: 7, points: 38, tier: 'Silver' },
        { rank: 4, name: 'User123', avatar: 'U1', progress: 20, total: 30, streak: 5, points: 35, tier: 'Bronze' },
        { rank: 5, name: 'AlexR', avatar: 'AR', progress: 18, total: 30, streak: 3, points: 30, tier: 'Bronze' }
      ],
      userProgress: { progress: 15, total: 30, streak: 7, rank: 8 }
    },
    {
      id: 'veggie',
      name: 'Veggie Boost Challenge',
      icon: '🥦',
      description: 'Eat 3 servings of vegetables daily for 14 days. Focus on variety and color to maximize nutrient intake.',
      duration: '14 days',
      difficulty: 'Medium',
      participants: 892,
      points: 30,
      badge: 'Veggie Master',
      discount: '3%',
      benefits: [
        'Increased fiber intake for better digestion',
        'Higher vitamin and mineral consumption',
        'Improved immune system function',
        'Better weight management',
        'Reduced inflammation in the body'
      ],
      tips: [
        'Meal prep vegetables at the start of the week',
        'Add vegetables to smoothies and soups',
        'Keep cut vegetables ready for snacking',
        'Try new vegetables each week',
        'Use herbs and spices to enhance flavor'
      ],
      leaderboard: [
        { rank: 1, name: 'GreenEater', avatar: 'GE', progress: 12, total: 14, streak: 10, points: 28, tier: 'Silver' },
        { rank: 2, name: 'VeggieVibes', avatar: 'VV', progress: 11, total: 14, streak: 8, points: 25, tier: 'Silver' },
        { rank: 3, name: 'HealthyChoices', avatar: 'HC', progress: 10, total: 14, streak: 6, points: 22, tier: 'Bronze' }
      ],
      userProgress: { progress: 8, total: 14, streak: 5, rank: 5 }
    },
    {
      id: 'sleep',
      name: 'Sleep Reset Challenge',
      icon: '💤',
      description: 'Go to bed before 11 PM for 7 days straight. Establish a consistent sleep schedule for better rest and recovery.',
      duration: '7 days',
      difficulty: 'Hard',
      participants: 634,
      points: 40,
      badge: 'Sleep Champion',
      discount: '4%',
      benefits: [
        'Improved sleep quality and duration',
        'Better mood and emotional regulation',
        'Enhanced memory and learning',
        'Stronger immune system',
        'Reduced stress and anxiety'
      ],
      tips: [
        'Create a relaxing bedtime routine',
        'Avoid screens 1 hour before bed',
        'Keep your bedroom cool and dark',
        'Avoid caffeine after 2 PM',
        'Use relaxation techniques like meditation'
      ],
      leaderboard: [
        { rank: 1, name: 'SleepWell', avatar: 'SW', progress: 6, total: 7, streak: 6, points: 38, tier: 'Gold' },
        { rank: 2, name: 'RestEasy', avatar: 'RE', progress: 5, total: 7, streak: 5, points: 35, tier: 'Silver' },
        { rank: 3, name: 'DreamCatcher', avatar: 'DC', progress: 5, total: 7, streak: 4, points: 32, tier: 'Silver' }
      ],
      userProgress: { progress: 3, total: 7, streak: 3, rank: 4 }
    }
  ]

  // Topic categories
  const topicCategories = [
    { 
      id: 'general', 
      label: 'General Nutrition', 
      description: 'Everyday tips & questions',
      icon: <Apple className="h-6 w-6" />,
      posts: 245,
      color: 'bg-green-100 text-green-700'
    },
    { 
      id: 'supplements', 
      label: 'Supplements Q&A', 
      description: 'Discuss products & ingredients',
      icon: <Brain className="h-6 w-6" />,
      posts: 189,
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 'recipes', 
      label: 'Recipes & Meal Plans', 
      description: 'Share and browse meal ideas',
      icon: <ChefHat className="h-6 w-6" />,
      posts: 156,
      color: 'bg-orange-100 text-orange-700'
    },
    { 
      id: 'fitness', 
      label: 'Fitness & Training', 
      description: 'Workouts, recovery, habits',
      icon: <Dumbbell className="h-6 w-6" />,
      posts: 203,
      color: 'bg-purple-100 text-purple-700'
    }
  ]

  // Featured discussions
  const featuredDiscussions = [
    {
      id: 1,
      title: 'Best magnesium supplement for sleep?',
      author: 'Sarah M.',
      replies: 32,
      views: 1247,
      time: '2 hours ago',
      category: 'supplements',
      pinned: false,
      trending: true
    },
    {
      id: 2,
      title: 'My 30-day gut health journey',
      author: 'Mike T.',
      replies: 89,
      views: 2156,
      time: '1 day ago',
      category: 'general',
      pinned: true,
      trending: false,
      type: 'User Story'
    },
    {
      id: 3,
      title: 'Ask Me Anything with Dr. Smith, Nutritionist — Sept 30',
      author: 'Dr. Smith',
      replies: 156,
      views: 3245,
      time: '3 hours ago',
      category: 'general',
      pinned: true,
      trending: true,
      type: 'Expert Session'
    }
  ]

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'User123', points: 1240, level: 'Gold', avatar: 'U1', streak: 15 },
    { rank: 2, name: 'FitLifeJane', points: 980, level: 'Silver', avatar: 'FJ', streak: 12 },
    { rank: 3, name: 'HealthGuy', points: 750, level: 'Silver', avatar: 'HG', streak: 8 },
    { rank: 4, name: 'NutriPro', points: 680, level: 'Silver', avatar: 'NP', streak: 10 },
    { rank: 5, name: 'WellnessWiz', points: 520, level: 'Bronze', avatar: 'WW', streak: 6 }
  ]

  // User profiles
  const userProfiles = [
    {
      name: 'Sarah M.',
      avatar: 'SM',
      healthGoals: ['Muscle gain', 'Energy'],
      points: 450,
      badge: 'Top Contributor',
      recentActivity: 'Posted: "My protein shake recipe"'
    },
    {
      name: 'Mike T.',
      avatar: 'MT',
      healthGoals: ['Weight loss', 'Cardio'],
      points: 380,
      badge: 'Active Member',
      recentActivity: 'Commented on sleep optimization'
    },
    {
      name: 'Dr. Lisa K.',
      avatar: 'LK',
      healthGoals: ['Expert', 'Education'],
      points: 1200,
      badge: 'Verified Expert',
      recentActivity: 'Answered: "Multivitamin benefits"'
    }
  ]

  // Gamification system
  const earningSystem = [
    { action: 'New post', points: 10, icon: <MessageSquare className="h-4 w-4" /> },
    { action: 'Helpful comment', points: 5, icon: <Heart className="h-4 w-4" /> },
    { action: 'Verified answer', points: 20, icon: <CheckCircle className="h-4 w-4" /> },
    { action: 'Complete challenge', points: 50, icon: <Trophy className="h-4 w-4" /> }
  ]

  const rewards = [
    { points: 500, reward: '5% shop discount', icon: <Gift className="h-5 w-5" /> },
    { points: 1000, reward: 'Free nutrition consultation', icon: <User className="h-5 w-5" /> },
    { points: 2000, reward: 'Exclusive product beta access', icon: <Crown className="h-5 w-5" /> }
  ]

  // XP tiers
  const getTierInfo = (points: number) => {
    if (points >= 2000) return { tier: 'Platinum', color: 'text-purple-600', bg: 'bg-purple-100', icon: <Crown className="h-5 w-5" /> }
    if (points >= 1000) return { tier: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: <Medal className="h-5 w-5" /> }
    if (points >= 500) return { tier: 'Silver', color: 'text-gray-600', bg: 'bg-gray-100', icon: <Award className="h-5 w-5" /> }
    return { tier: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-100', icon: <Trophy className="h-5 w-5" /> }
  }

  const currentTier = getTierInfo(currentUser.points)
  const nextTier = getTierInfo(currentUser.nextLevelPoints)
  const progressToNext = ((currentUser.points / currentUser.nextLevelPoints) * 100)

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={1} userName={currentUser.name} notificationCount={3} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#16A34A] to-[#F97316] rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome to your Nutrition Community
              </h1>
              <p className="text-lg opacity-90">
                Share experiences, ask questions, and learn together with verified experts and like-minded members.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-white text-[#16A34A] hover:bg-gray-100">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start a Discussion
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#16A34A]">
                <User className="h-4 w-4 mr-2" />
                Ask an Expert
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'home', label: 'Home', icon: <Users className="h-4 w-4" /> },
            { id: 'topics', label: 'Topics', icon: <BookOpen className="h-4 w-4" /> },
            { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="h-4 w-4" /> },
            { id: 'profile', label: 'My Profile', icon: <User className="h-4 w-4" /> },
            { id: 'shop', label: 'Shop', icon: <Gift className="h-4 w-4" /> }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'bg-[#16A34A] text-white' 
                  : 'bg-white text-gray-600 hover:bg-[#16A34A] hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Upcoming Challenges - Highlighted at the top */}
            {activeTab === 'home' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Challenges</h2>
                
                {/* Challenge Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-[#16A34A]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">{challenge.icon}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{challenge.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {challenge.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {challenge.duration}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {challenge.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Participants</span>
                            <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Rewards</span>
                            <div className="flex gap-2">
                              <Badge className="bg-[#16A34A] text-white text-xs">+{challenge.points} pts</Badge>
                              <Badge variant="outline" className="text-xs">{challenge.discount} off</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-[#16A34A] hover:bg-[#15803d] text-white"
                            onClick={() => setSelectedChallenge(challenge)}
                          >
                            Join Challenge
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setSelectedChallenge(challenge)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Topic Categories */}
            {activeTab === 'topics' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Topic Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicCategories.map((category) => (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                            {category.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">{category.label}</h3>
                            <p className="text-gray-600 mb-2">{category.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{category.posts} posts</span>
                              <Button size="sm" variant="outline" className="text-[#16A34A] border-[#16A34A] hover:bg-[#16A34A] hover:text-white">
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Discussions */}
            {activeTab === 'home' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Featured Discussions</h2>
                  <Button className="bg-[#16A34A] hover:bg-[#15803d] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </div>
                <div className="space-y-4">
                  {featuredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {discussion.pinned && (
                                <Badge className="bg-[#16A34A] text-white">Pinned</Badge>
                              )}
                              {discussion.trending && (
                                <Badge className="bg-[#F97316] text-white">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {discussion.type && (
                                <Badge variant="secondary">{discussion.type}</Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{discussion.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>By {discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.time}</span>
                              <span>•</span>
                              <span>{discussion.replies} replies</span>
                              <span>•</span>
                              <span>{discussion.views} views</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Discussion
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Leaderboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Weekly Leaderboard */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-[#F97316]" />
                        Top Members This Week
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {leaderboard.map((member, index) => {
                          const tier = getTierInfo(member.points)
                          return (
                            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#16A34A] text-white font-bold text-sm">
                                {member.rank}
                              </div>
                              <div className={`w-10 h-10 rounded-full ${tier.bg} flex items-center justify-center`}>
                                {tier.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{member.name}</span>
                                  <Badge variant="secondary" className={tier.color}>
                                    {tier.tier}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>{member.points} pts</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Flame className="h-3 w-3" />
                                    {member.streak} day streak
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Earning System */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-[#16A34A]" />
                        How to Earn Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {earningSystem.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <span className="text-gray-900">{item.action}</span>
                            </div>
                            <Badge variant="secondary" className="bg-[#16A34A] text-white">
                              +{item.points} pts
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* User Profile */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Profile Info */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-[#16A34A] rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {currentUser.avatar}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{currentUser.name}</h3>
                          <div className="flex items-center gap-2">
                            {currentTier.icon}
                            <span className={`font-medium ${currentTier.color}`}>{currentTier.tier} Member</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress to {nextTier.tier}</span>
                            <span>{currentUser.points}/{currentUser.nextLevelPoints} pts</span>
                          </div>
                          <Progress value={progressToNext} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            {currentUser.nextLevelPoints - currentUser.points} points to {nextTier.tier}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Health Goals</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentUser.healthGoals.map((goal, index) => (
                              <Badge key={index} variant="secondary" className="bg-[#F0FDF4] text-[#16A34A]">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-[#F97316]" />
                            <span>{currentUser.points} points</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-[#F97316]" />
                            <span>{currentUser.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rewards */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rewards.map((reward, index) => {
                          const isUnlocked = currentUser.points >= reward.points
                          return (
                            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                              isUnlocked ? 'bg-[#F0FDF4] border border-[#16A34A]' : 'bg-gray-50'
                            }`}>
                              <div className="flex items-center gap-3">
                                {reward.icon}
                                <span className={isUnlocked ? 'text-gray-900' : 'text-gray-500'}>
                                  {reward.reward}
                                </span>
                              </div>
                              <Badge variant={isUnlocked ? 'default' : 'secondary'}>
                                {reward.points} pts
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Updated Layout Order */}
          <div className="space-y-6">
            {/* 1. Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#16A34A]" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${currentTier.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      {currentTier.icon}
                    </div>
                    <h3 className={`font-bold ${currentTier.color}`}>{currentTier.tier}</h3>
                    <p className="text-sm text-gray-600">{currentUser.points} points</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Next level</span>
                      <span>{progressToNext.toFixed(0)}%</span>
                    </div>
                    <Progress value={progressToNext} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Flame className="h-4 w-4 text-[#F97316]" />
                    <span>{currentUser.streak} day streak</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Poll */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-[#16A34A]" />
                  Community Poll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Which vitamin do you take daily?</h4>
                  <div className="space-y-2">
                    {['Vitamin D', 'Vitamin B12', 'Vitamin C', 'None'].map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <span className="text-sm">{option}</span>
                        <span className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 30) + 10}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Expert Spotlight */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#F97316]" />
                  Expert Spotlight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#16A34A] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                    DL
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Dr. Lee</h4>
                  <p className="text-sm text-gray-600 mb-3">This week's verified nutritionist</p>
                  <Button size="sm" className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white">
                    Ask a Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Challenge Detail Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
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
                        <span className="text-gray-600">Current Rank: #{selectedChallenge.userProgress.rank}</span>
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
                    👉 Join Challenge
                  </Button>
                  <Button variant="outline" className="px-8">
                    Share Challenge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
            <a href="#" className="hover:text-[#16A34A] transition-colors">Guidelines</a>
            <a href="#" className="hover:text-[#16A34A] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#16A34A] transition-colors">Contact</a>
          </div>
          <p className="text-xs text-gray-500">
            This is a demo community. For medical issues, consult a professional.
          </p>
        </div>
      </div>
    </div>
  )
}