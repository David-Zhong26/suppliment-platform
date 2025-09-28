'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
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
  ChevronLeft
} from 'lucide-react'
import PersistentNav from '@/components/navigation/persistent-nav'

export default function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')

  // Topic categories
  const topicCategories = [
    {
      id: 'nutrition',
      name: 'Nutrition Q&A',
      icon: '🥗',
      description: 'Ask questions about healthy eating, meal planning, and nutrition science',
      posts: 1247,
      members: 8920,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'supplements',
      name: 'Supplement Reviews',
      icon: '💊',
      description: 'Share experiences with supplements, brands, and dosages',
      posts: 892,
      members: 5430,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'recipes',
      name: 'Recipes & Meal Plans',
      icon: '🍳',
      description: 'Share healthy recipes, meal prep ideas, and cooking tips',
      posts: 634,
      members: 6780,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'fitness',
      name: 'Fitness & Lifestyle',
      icon: '💪',
      description: 'Discuss workouts, exercise routines, and healthy lifestyle habits',
      posts: 445,
      members: 3210,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'challenges',
      name: 'Challenge Discussions',
      icon: '🎯',
      description: 'Connect with others participating in wellness challenges',
      posts: 567,
      members: 4560,
      color: 'bg-yellow-100 text-yellow-700'
    }
  ]

  // Featured discussions
  const featuredDiscussions = [
    {
      id: 1,
      title: 'Best Omega-3 supplements for heart health?',
      author: 'Sarah M.',
      avatar: 'SM',
      category: 'supplements',
      replies: 23,
      likes: 45,
      time: '2 hours ago',
      isPinned: true,
      isExpert: true
    },
    {
      id: 2,
      title: 'Meal prep ideas for busy professionals',
      author: 'Mike R.',
      avatar: 'MR',
      category: 'recipes',
      replies: 18,
      likes: 32,
      time: '4 hours ago',
      isPinned: false,
      isExpert: false
    },
    {
      id: 3,
      title: 'Hydration challenge - Day 15 progress',
      author: 'Emma L.',
      avatar: 'EL',
      category: 'challenges',
      replies: 12,
      likes: 28,
      time: '6 hours ago',
      isPinned: false,
      isExpert: false
    },
    {
      id: 4,
      title: 'Morning workout routine that fits my schedule',
      author: 'David K.',
      avatar: 'DK',
      category: 'fitness',
      replies: 15,
      likes: 22,
      time: '8 hours ago',
      isPinned: false,
      isExpert: false
    },
    {
      id: 5,
      title: 'Plant-based protein sources comparison',
      author: 'Lisa P.',
      avatar: 'LP',
      category: 'nutrition',
      replies: 31,
      likes: 67,
      time: '1 day ago',
      isPinned: false,
      isExpert: false
    }
  ]

  // Expert spotlight
  const expertSpotlight = {
    name: 'Dr. Sarah Johnson',
    title: 'Nutritionist & Wellness Expert',
    avatar: 'SJ',
    expertise: 'Clinical Nutrition, Supplement Safety',
    nextAMA: 'Tomorrow at 2:00 PM',
    followers: 12450
  }

  // User data (demo)
  const currentUser = {
    name: 'John Doe',
    avatar: 'JD',
    level: 3,
    points: 1250,
    badges: ['Early Adopter', 'Challenge Master'],
    streak: 15
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
              Nutrition Community 💬
            </h1>
            <p className="text-gray-600 text-lg">
              Connect, learn, and share your wellness journey with others
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#16A34A] hover:bg-[#15803d] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Start Discussion
            </Button>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask Expert
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'home', label: 'Home' },
            { id: 'topics', label: 'Topics' },
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'experts', label: 'Experts' }
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
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search discussions, topics, or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'home' && (
              <>
                {/* Featured Discussions */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Discussions</h2>
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {featuredDiscussions.map((discussion) => (
                      <Card key={discussion.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-bold">
                              {discussion.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                                {discussion.isPinned && (
                                  <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                                    📌 Pinned
                                  </Badge>
                                )}
                                {discussion.isExpert && (
                                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                                    👨‍⚕️ Expert
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span>by {discussion.author}</span>
                                <span>•</span>
                                <span>{discussion.time}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {discussion.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  {discussion.replies} replies
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  {discussion.likes} likes
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Featured Articles */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Expert Articles</h2>
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Article 1 */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            DR
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                Expert Article
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Nutrition
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              The Science Behind Omega-3 Supplementation: What You Need to Know
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Dr. Sarah Chen explores the latest research on omega-3 fatty acids, optimal dosages, and how to choose the right supplement for your health goals.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                Dr. Sarah Chen, RD
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                5 min read
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                4.9 rating
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Article 2 */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                            MJ
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Expert Article
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Sleep & Recovery
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              Magnesium for Better Sleep: A Comprehensive Guide
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Dr. Michael Johnson shares evidence-based insights on how magnesium supplementation can improve sleep quality and overall recovery.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                Dr. Michael Johnson, PhD
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                7 min read
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                4.8 rating
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'topics' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Topic Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicCategories.map((topic) => (
                    <Card key={topic.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl">{topic.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{topic.name}</h3>
                            <p className="text-gray-600 text-sm">{topic.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{topic.posts} posts</span>
                            <span>{topic.members.toLocaleString()} members</span>
                          </div>
                          <Button size="sm" className="bg-[#16A34A] hover:bg-[#15803d] text-white">
                            Join
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Leaderboard</h2>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'Sarah M.', avatar: 'SM', points: 2450, tier: 'Gold', badge: 'Top Contributor' },
                    { rank: 2, name: 'Mike R.', avatar: 'MR', points: 2180, tier: 'Gold', badge: 'Expert Helper' },
                    { rank: 3, name: 'Emma L.', avatar: 'EL', points: 1950, tier: 'Silver', badge: 'Active Member' },
                    { rank: 4, name: 'David K.', avatar: 'DK', points: 1720, tier: 'Silver', badge: 'Helpful' },
                    { rank: 5, name: 'Lisa P.', avatar: 'LP', points: 1580, tier: 'Silver', badge: 'Contributor' }
                  ].map((member) => (
                    <Card key={member.rank} className="bg-white rounded-xl shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#16A34A] text-white font-bold">
                            {member.rank}
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-r from-[#16A34A] to-[#15803d] rounded-full flex items-center justify-center text-white font-bold">
                            {member.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{member.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {member.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">{member.points.toLocaleString()} points</span>
                              <Badge className={`text-xs ${member.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                                {member.tier}
                              </Badge>
                            </div>
                          </div>
                          <Trophy className="h-6 w-6 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experts' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Expert Spotlight</h2>
                <Card className="bg-gradient-to-r from-[#16A34A] to-[#15803d] text-white">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {expertSpotlight.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{expertSpotlight.name}</h3>
                        <p className="text-green-100 mb-2">{expertSpotlight.title}</p>
                        <p className="text-green-100 text-sm mb-4">{expertSpotlight.expertise}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{expertSpotlight.followers.toLocaleString()} followers</span>
                          <span>•</span>
                          <span>Next AMA: {expertSpotlight.nextAMA}</span>
                        </div>
                      </div>
                      <Button className="bg-white text-[#16A34A] hover:bg-gray-50">
                        Follow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#16A34A]" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Level {currentUser.level}</span>
                    <Badge variant="secondary">
                      <Crown className="h-3 w-3 mr-1" />
                      {currentUser.badges[0]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Points</span>
                    <span className="font-semibold text-[#16A34A]">{currentUser.points.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Streak</span>
                    <span className="flex items-center gap-1 text-[#F97316]">
                      <Flame className="h-4 w-4" />
                      {currentUser.streak} days
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Poll */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#F97316]" />
                  Community Poll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium">What's your biggest wellness challenge?</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="poll" className="text-[#16A34A]" />
                      <span className="text-sm">Staying consistent</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="poll" className="text-[#16A34A]" />
                      <span className="text-sm">Finding time</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="poll" className="text-[#16A34A]" />
                      <span className="text-sm">Knowing what works</span>
                    </label>
                  </div>
                  <Button size="sm" className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white">
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/challenges')}
                  >
                    <Trophy className="h-4 w-4 mr-3" />
                    Join Challenges
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/comparison')}
                  >
                    <BookOpen className="h-4 w-4 mr-3" />
                    Browse Supplements
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/profile')}
                  >
                    <User className="h-4 w-4 mr-3" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• Be respectful and supportive</p>
                  <p>• Share evidence-based information</p>
                  <p>• No medical advice without credentials</p>
                  <p>• Report inappropriate content</p>
                </div>
                <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-xs text-[#16A34A]">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}