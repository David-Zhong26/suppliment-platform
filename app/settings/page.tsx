'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PersistentNav from '@/components/navigation/persistent-nav'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  CheckCircle,
  Heart,
  Target,
  Calendar
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-01-15',
      gender: 'male',
      timezone: 'America/New_York',
      language: 'en'
    },
    notifications: {
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      achievementAlerts: true,
      communityUpdates: true,
      supplementReminders: true,
      weeklyReports: true,
      expertContent: false,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'friends',
      showEmail: false,
      showPhone: false,
      dataSharing: false,
      analyticsTracking: true,
      personalizedAds: false
    },
    wellness: {
      supplementReminders: true,
      reminderTimes: ['08:00', '12:00', '18:00'],
      weeklyGoal: 21,
      streakNotifications: true,
      achievementAlerts: true,
      communityChallenges: true
    },
    appearance: {
      theme: 'light',
      accentColor: 'green',
      fontSize: 'medium',
      compactMode: false
    }
  })

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'wellness', label: 'Wellness Goals', icon: Target },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={3} userName="John" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <Settings className="h-8 w-8 inline mr-3 text-[#22C55E]" />
            Settings
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account preferences and wellness goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-lg sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-[#22C55E] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="bg-white rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-[#22C55E]" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={settings.profile.firstName}
                          onChange={(e) => updateSetting('profile', 'firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={settings.profile.lastName}
                          onChange={(e) => updateSetting('profile', 'lastName', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={settings.profile.phone}
                        onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={settings.profile.dateOfBirth}
                          onChange={(e) => updateSetting('profile', 'dateOfBirth', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={settings.profile.gender}
                          onValueChange={(value) => updateSetting('profile', 'gender', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={settings.profile.timezone}
                          onValueChange={(value) => updateSetting('profile', 'timezone', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={settings.profile.language}
                          onValueChange={(value) => updateSetting('profile', 'language', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card className="bg-white rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-[#22C55E]" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">General Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications on your device</p>
                          </div>
                          <Switch
                            id="push-notifications"
                            checked={settings.notifications.pushNotifications}
                            onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={settings.notifications.emailNotifications}
                            onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications via text message</p>
                          </div>
                          <Switch
                            id="sms-notifications"
                            checked={settings.notifications.smsNotifications}
                            onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Wellness Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="supplement-reminders">Supplement Reminders</Label>
                            <p className="text-sm text-gray-600">Reminders to take your supplements</p>
                          </div>
                          <Switch
                            id="supplement-reminders"
                            checked={settings.notifications.supplementReminders}
                            onCheckedChange={(checked) => updateSetting('notifications', 'supplementReminders', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                            <p className="text-sm text-gray-600">Notifications when you earn achievements</p>
                          </div>
                          <Switch
                            id="achievement-alerts"
                            checked={settings.notifications.achievementAlerts}
                            onCheckedChange={(checked) => updateSetting('notifications', 'achievementAlerts', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="weekly-reports">Weekly Reports</Label>
                            <p className="text-sm text-gray-600">Weekly progress summaries</p>
                          </div>
                          <Switch
                            id="weekly-reports"
                            checked={settings.notifications.weeklyReports}
                            onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Community & Content</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="community-updates">Community Updates</Label>
                            <p className="text-sm text-gray-600">Updates from your communities and groups</p>
                          </div>
                          <Switch
                            id="community-updates"
                            checked={settings.notifications.communityUpdates}
                            onCheckedChange={(checked) => updateSetting('notifications', 'communityUpdates', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="expert-content">Expert Content</Label>
                            <p className="text-sm text-gray-600">New content from verified experts</p>
                          </div>
                          <Switch
                            id="expert-content"
                            checked={settings.notifications.expertContent}
                            onCheckedChange={(checked) => updateSetting('notifications', 'expertContent', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketing-emails">Marketing Emails</Label>
                            <p className="text-sm text-gray-600">Product updates and special offers</p>
                          </div>
                          <Switch
                            id="marketing-emails"
                            checked={settings.notifications.marketingEmails}
                            onCheckedChange={(checked) => updateSetting('notifications', 'marketingEmails', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'wellness' && (
              <div className="space-y-6">
                <Card className="bg-white rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-[#22C55E]" />
                      <span>Wellness Goals & Reminders</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Supplement Tracking</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="supplement-reminders-wellness">Enable Reminders</Label>
                            <p className="text-sm text-gray-600">Get reminded to log your supplement intake</p>
                          </div>
                          <Switch
                            id="supplement-reminders-wellness"
                            checked={settings.wellness.supplementReminders}
                            onCheckedChange={(checked) => updateSetting('wellness', 'supplementReminders', checked)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="weekly-goal">Weekly Supplement Goal</Label>
                          <Select
                            value={settings.wellness.weeklyGoal.toString()}
                            onValueChange={(value) => updateSetting('wellness', 'weeklyGoal', parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="14">14 supplements per week</SelectItem>
                              <SelectItem value="21">21 supplements per week</SelectItem>
                              <SelectItem value="28">28 supplements per week</SelectItem>
                              <SelectItem value="35">35 supplements per week</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Motivation & Engagement</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="streak-notifications">Streak Notifications</Label>
                            <p className="text-sm text-gray-600">Celebrate your daily streaks</p>
                          </div>
                          <Switch
                            id="streak-notifications"
                            checked={settings.wellness.streakNotifications}
                            onCheckedChange={(checked) => updateSetting('wellness', 'streakNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="achievement-alerts-wellness">Achievement Alerts</Label>
                            <p className="text-sm text-gray-600">Get notified when you unlock achievements</p>
                          </div>
                          <Switch
                            id="achievement-alerts-wellness"
                            checked={settings.wellness.achievementAlerts}
                            onCheckedChange={(checked) => updateSetting('wellness', 'achievementAlerts', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="community-challenges">Community Challenges</Label>
                            <p className="text-sm text-gray-600">Participate in group wellness challenges</p>
                          </div>
                          <Switch
                            id="community-challenges"
                            checked={settings.wellness.communityChallenges}
                            onCheckedChange={(checked) => updateSetting('wellness', 'communityChallenges', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <Card className="bg-white rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-[#22C55E]" />
                      <span>Account Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Data & Privacy</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download My Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Danger Zone</h3>
                      <div className="space-y-4 p-4 border border-red-200 rounded-lg bg-red-50">
                        <div>
                          <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                          <p className="text-sm text-red-700 mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
