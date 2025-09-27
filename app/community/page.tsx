'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  Target
} from 'lucide-react'

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Posts', count: 156 },
    { id: 'weight-loss', label: 'Weight Management', count: 42 },
    { id: 'muscle-gain', label: 'Muscle Building', count: 38 },
    { id: 'nutrition', label: 'Nutrition', count: 29 },
    { id: 'wellness', label: 'General Wellness', count: 47 }
  ]

  const popularCommunities = [
    { name: 'Weight Management Warriors', members: 15420, icon: '⚖️', description: 'Supporting each other on weight loss journeys' },
    { name: 'Muscle Building Masters', members: 12850, icon: '💪', description: 'Building strength and muscle together' },
    { name: 'Clean Eating Champions', members: 11230, icon: '🥗', description: 'Sharing healthy recipes and meal prep tips' },
    { name: 'Stress & Recovery', members: 9870, icon: '🧘', description: 'Managing stress and improving sleep' },
    { name: 'Athlete Wellness', members: 7560, icon: '🏃', description: 'Performance nutrition for athletes' },
    { name: 'Senior Health', members: 5430, icon: '👴', description: 'Healthy aging and longevity' }
  ]

  const expertNetwork = [
    { name: 'Dr. Sarah Johnson', title: 'Nutritionist', rating: 4.9, specialties: ['Weight Loss', 'Metabolism'], avatar: 'S', verified: true },
    { name: 'Alex Chen', title: 'Fitness Coach', rating: 4.8, specialties: ['Muscle Building', 'Training'], avatar: 'A', verified: true },
    { name: 'Dr. Maria Rodriguez', title: 'Wellness Expert', rating: 4.9, specialties: ['Stress Management', 'Sleep'], avatar: 'M', verified: true }
  ]

  const trendingPosts = [
    {
      id: 1,
      author: 'Sarah M.',
      role: 'Nutrition Expert',
      avatar: 'S',
      time: '2 hours ago',
      title: 'My 30-day protein challenge results',
      content: 'Just finished my protein challenge and gained 3lbs of lean muscle! Here\'s what worked for me...',
      image: '💪',
      likes: 1247,
      comments: 89,
      shares: 23,
      category: 'muscle-gain',
      verified: true
    },
    {
      id: 2,
      author: 'Mike T.',
      role: 'Community Member',
      avatar: 'M',
      time: '4 hours ago',
      title: 'Omega-3 supplement timing question',
      content: 'Should I take my Omega-3 with breakfast or dinner? I\'ve heard conflicting advice...',
      image: '🐟',
      likes: 156,
      comments: 34,
      shares: 8,
      category: 'nutrition',
      verified: false
    },
    {
      id: 3,
      author: 'Dr. Lisa K.',
      role: 'Health Expert',
      avatar: 'L',
      time: '6 hours ago',
      title: 'The truth about multivitamins',
      content: 'As a nutritionist, I often get asked about multivitamins. Here\'s what the research actually shows...',
      image: '💊',
      likes: 892,
      comments: 67,
      shares: 45,
      category: 'wellness',
      verified: true
    }
  ]

  const trendingTopics = [
    { topic: '#ProteinChallenge2024', posts: 1247, trend: 'up' },
    { topic: '#SleepOptimization', posts: 892, trend: 'up' },
    { topic: '#Omega3Benefits', posts: 634, trend: 'up' },
    { topic: '#MorningRoutine', posts: 445, trend: 'down' },
    { topic: '#SupplementsForSeniors', posts: 321, trend: 'up' }
  ]

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={1} userName="User" notificationCount={3} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wellness <span className="text-[#22C55E]">Community</span>
          </h1>
          <p className="text-xl text-gray-600">
            Connect with like-minded people, share your journey, and learn from verified experts.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts, people, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id 
                  ? 'bg-[#22C55E] text-white' 
                  : 'bg-white text-gray-600 hover:bg-[#22C55E] hover:text-white'
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {trendingPosts.map((post) => (
                <Card key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{post.author}</h3>
                          {post.verified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              Verified
                            </Badge>
                          )}
                          <span className="text-gray-500 text-sm">{post.role}</span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-400 text-sm">{post.time}</span>
                        </div>
                        
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{post.title}</h4>
                        <p className="text-gray-600 mb-4">{post.content}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-[#22C55E] transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-[#22C55E] transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-[#22C55E] transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                      <div className="text-4xl">{post.image}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Communities */}
            <Card className="bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#22C55E]" />
                  <span>Popular Communities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularCommunities.map((community, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="text-2xl">{community.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{community.name}</h4>
                        <p className="text-sm text-gray-600">{community.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{community.members.toLocaleString()} members</span>
                          <Button size="sm" variant="outline" className="text-xs">
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expert Network */}
            <Card className="bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-[#F97316]" />
                  <span>Expert Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expertNetwork.map((expert, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-bold">
                        {expert.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{expert.name}</h4>
                          {expert.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{expert.title}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-[#F97316] fill-current" />
                          <span className="text-sm text-gray-500">{expert.rating}</span>
                          <span className="text-xs text-gray-400">
                            • {expert.specialties.join(', ')}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#22C55E] mb-1">150+</div>
                    <div className="text-sm text-gray-600">Verified Experts</div>
                  </div>
                  <Button className="w-full mt-3 bg-[#22C55E] hover:bg-[#16A34A] text-white">
                    Browse All Experts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-[#F97316]" />
                  <span>Trending Now</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{topic.topic}</span>
                        <TrendingUp className={`h-4 w-4 ${
                          topic.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`} />
                      </div>
                      <span className="text-sm text-gray-500">{topic.posts} posts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
