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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
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

            {/* Upcoming Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#F97316]" />
                  Upcoming Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-[#F0FDF4] border border-[#16A34A] rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Hydration Challenge</h4>
                    <p className="text-sm text-gray-600 mb-3">Drink 8 glasses/day for 30 days</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#16A34A] text-white">+50 pts</Badge>
                      <Button size="sm" variant="outline" className="text-[#16A34A] border-[#16A34A] hover:bg-[#16A34A] hover:text-white">
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Polls */}
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

            {/* Expert Spotlight */}
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

            {/* User Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#16A34A]" />
                  Active Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfiles.map((profile, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {profile.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{profile.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {profile.healthGoals.join(', ')}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {profile.badge}
                          </Badge>
                          <span className="text-xs text-gray-500">{profile.points} pts</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{profile.recentActivity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

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