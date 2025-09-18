'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Users, 
  Eye, 
  ThumbsUp, 
  MessageCircle,
  Plus,
  Video,
  FileText,
  Image,
  TrendingUp,
  Star,
  Award
} from 'lucide-react'

export default function CreatorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Clean Eating Meal Prep for Beginners',
      type: 'video',
      views: 1250,
      likes: 89,
      comments: 23,
      publishedAt: '2 days ago',
      status: 'published'
    },
    {
      id: 2,
      title: 'Top 5 Supplements for Weight Loss',
      type: 'article',
      views: 890,
      likes: 67,
      comments: 15,
      publishedAt: '1 week ago',
      status: 'published'
    },
    {
      id: 3,
      title: 'My Morning Routine for Better Energy',
      type: 'video',
      views: 2100,
      likes: 156,
      comments: 34,
      publishedAt: '2 weeks ago',
      status: 'published'
    },
    {
      id: 4,
      title: 'Understanding Supplement Labels',
      type: 'article',
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null,
      status: 'draft'
    }
  ])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0)
  const publishedPosts = posts.filter(post => post.status === 'published').length

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'article':
        return <FileText className="h-4 w-4" />
      case 'image':
        return <Image className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">Wellness Platform</span>
              <Badge className="ml-4">Creator Portal</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Verified Creator</span>
              </Badge>
              <div className="text-sm text-gray-600">
                Welcome, {session?.user?.name}!
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Creator Dashboard
          </h1>
          <p className="text-gray-600">
            Share your wellness expertise and build your community following.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2.4K</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ThumbsUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalLikes}</div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalComments}</div>
                  <div className="text-sm text-gray-600">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <span>Content Management</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your posts, videos, and articles
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getContentIcon(post.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{post.title}</h3>
                          <Badge 
                            variant={post.status === 'published' ? 'default' : 'secondary'}
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views} views
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes} likes
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments} comments
                          </span>
                          {post.publishedAt && (
                            <span className="text-gray-500">
                              {post.publishedAt}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        {post.status === 'draft' && (
                          <Button size="sm">
                            Publish
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Creator Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span>Performance Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Rate</span>
                      <span>4.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Quality Score</span>
                      <span>8.7/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Trust</span>
                      <span>9.1/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Award className="h-6 w-6 text-yellow-600" />
                    <div>
                      <div className="font-medium text-sm">Verified Creator</div>
                      <div className="text-xs text-gray-600">Quality content verified</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Star className="h-6 w-6 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">1K Followers</div>
                      <div className="text-xs text-gray-600">Milestone reached</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <ThumbsUp className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">High Engagement</div>
                      <div className="text-xs text-gray-600">4%+ engagement rate</div>
                    </div>
                  </div>
                </div>
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
                    <Video className="h-4 w-4 mr-2" />
                    Create Video
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Write Article
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="h-4 w-4 mr-2" />
                    Share Photo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Content Ideas */}
            <Card>
              <CardHeader>
                <CardTitle>Content Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-1">"My Morning Routine"</div>
                    <div className="text-xs text-gray-600">Share your wellness morning routine</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-1">"Supplement Myths Busted"</div>
                    <div className="text-xs text-gray-600">Debunk common supplement myths</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-1">"Meal Prep Tips"</div>
                    <div className="text-xs text-gray-600">Share healthy meal prep strategies</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
