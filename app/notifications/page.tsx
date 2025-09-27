'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import PersistentNav from '@/components/navigation/persistent-nav'
import { 
  Bell, 
  Check, 
  X, 
  Heart, 
  MessageCircle, 
  Users, 
  Award, 
  Zap,
  Calendar,
  Star,
  TrendingUp,
  Settings,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'Achievement Unlocked! 🎉',
      message: 'You\'ve completed your first week of supplement tracking!',
      time: '2 minutes ago',
      read: false,
      icon: Award,
      color: 'text-[#F97316]',
      bgColor: 'bg-[#FED7AA]'
    },
    {
      id: 2,
      type: 'community',
      title: 'New reply to your post',
      message: 'Sarah M. replied to your question about Omega-3 timing',
      time: '1 hour ago',
      read: false,
      icon: MessageCircle,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[#DCFCE7]'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Time for your supplements!',
      message: 'Don\'t forget to take your Vitamin D3 supplement',
      time: '3 hours ago',
      read: true,
      icon: Bell,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[#DCFCE7]'
    },
    {
      id: 4,
      type: 'social',
      title: 'Someone liked your post',
      message: 'Mike T. and 5 others liked your protein challenge post',
      time: '5 hours ago',
      read: true,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 5,
      type: 'system',
      title: 'Weekly Progress Report',
      message: 'You\'re 85% complete with your weekly supplement goal',
      time: '1 day ago',
      read: true,
      icon: TrendingUp,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[#DCFCE7]'
    },
    {
      id: 6,
      type: 'expert',
      title: 'Expert Advice Available',
      message: 'Dr. Sarah Johnson shared new insights about sleep optimization',
      time: '2 days ago',
      read: true,
      icon: Star,
      color: 'text-[#F97316]',
      bgColor: 'bg-[#FED7AA]'
    }
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    achievementAlerts: true,
    communityUpdates: true,
    supplementReminders: true,
    weeklyReports: true,
    expertContent: false,
    marketingEmails: false
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const updateSetting = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }))
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'achievement': return 'Achievement'
      case 'community': return 'Community'
      case 'reminder': return 'Reminder'
      case 'social': return 'Social'
      case 'system': return 'System'
      case 'expert': return 'Expert'
      default: return 'General'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-[#F97316] text-white'
      case 'community': return 'bg-[#22C55E] text-white'
      case 'reminder': return 'bg-blue-500 text-white'
      case 'social': return 'bg-red-500 text-white'
      case 'system': return 'bg-gray-500 text-white'
      case 'expert': return 'bg-purple-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={3} userName="John" notificationCount={unreadCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <Bell className="h-8 w-8 inline mr-3 text-[#22C55E]" />
              Notifications
            </h1>
            <p className="text-xl text-gray-600">
              Stay updated with your wellness journey
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications Feed */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Notifications
                </h2>
                <Badge variant="secondary" className="bg-[#DCFCE7] text-[#22C55E]">
                  {unreadCount} unread
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <Card 
                    key={notification.id} 
                    className={`bg-white rounded-lg transition-all ${
                      notification.read ? 'opacity-75' : 'shadow-md ring-2 ring-[#22C55E]/20'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${notification.bgColor}`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-[#22C55E] rounded-full" />
                                )}
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${getTypeColor(notification.type)}`}
                                >
                                  {getTypeLabel(notification.type)}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-2">{notification.message}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{notification.time}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs"
                                >
                                  {notification.read ? (
                                    <>
                                      <EyeOff className="h-3 w-3 mr-1" />
                                      Mark Unread
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-3 w-3 mr-1" />
                                      Mark Read
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {notifications.length === 0 && (
              <Card className="bg-white rounded-lg">
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notifications yet
                  </h3>
                  <p className="text-gray-600">
                    You'll see updates about your wellness journey here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Notification Summary */}
            <Card className="bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-[#22C55E]" />
                  <span>Notification Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unread</span>
                    <Badge className="bg-[#22C55E] text-white">{unreadCount}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium">{notifications.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-[#22C55E]" />
                  <span>Quick Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="text-sm">
                      Push Notifications
                    </Label>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="text-sm">
                      Email Notifications
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="achievement-alerts" className="text-sm">
                      Achievement Alerts
                    </Label>
                    <Switch
                      id="achievement-alerts"
                      checked={notificationSettings.achievementAlerts}
                      onCheckedChange={(checked) => updateSetting('achievementAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="supplement-reminders" className="text-sm">
                      Supplement Reminders
                    </Label>
                    <Switch
                      id="supplement-reminders"
                      checked={notificationSettings.supplementReminders}
                      onCheckedChange={(checked) => updateSetting('supplementReminders', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Types */}
            <Card className="bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg">Notification Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#F97316] rounded-full" />
                      <span className="text-sm">Achievements</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#FED7AA] text-[#F97316]">
                      {notifications.filter(n => n.type === 'achievement').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#22C55E] rounded-full" />
                      <span className="text-sm">Community</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#DCFCE7] text-[#22C55E]">
                      {notifications.filter(n => n.type === 'community').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-sm">Reminders</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {notifications.filter(n => n.type === 'reminder').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-sm">Social</span>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {notifications.filter(n => n.type === 'social').length}
                    </Badge>
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
