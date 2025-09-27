'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Home, 
  Store, 
  Users, 
  User, 
  Bell, 
  Settings,
  Plus
} from 'lucide-react'

interface PersistentNavProps {
  userLevel?: number
  userName?: string
  notificationCount?: number
}

export default function PersistentNav({ 
  userLevel = 1, 
  userName = 'User',
  notificationCount = 0 
}: PersistentNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)

  const navItems = [
    { id: '/dashboard/user', label: 'Dashboard', icon: Home },
    { id: '/comparison', label: 'Marketplace', icon: Store },
    { id: '/community', label: 'Community', icon: Users },
    { id: '/profile', label: 'Profile', icon: User },
    { id: '/notifications', label: 'Notifications', icon: Bell },
    { id: '/settings', label: 'Settings', icon: Settings },
  ]

  const handleNavigation = (path: string) => {
    setActiveTab(path)
    router.push(path)
  }

  const isActive = (path: string) => activeTab === path

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-[#22C55E]" />
            <span className="text-2xl font-bold text-gray-900">Wellness Platform</span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-2 transition-colors relative ${
                    isActive(item.id)
                      ? 'text-[#22C55E]'
                      : 'text-gray-600 hover:text-[#22C55E]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.id) && (
                    <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-[#22C55E] rounded-full" />
                  )}
                  {item.id === '/notifications' && notificationCount > 0 && (
                    <Badge className="ml-1 bg-[#F97316] text-white text-xs px-1.5 py-0.5">
                      {notificationCount}
                    </Badge>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => router.push('/comparison')}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Browse Supplements
            </Button>
            
            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span className="text-[#F97316]">⭐</span>
                <span>Level {userLevel}</span>
              </Badge>
              <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
