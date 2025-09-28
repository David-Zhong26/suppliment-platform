'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PersistentNav from '@/components/navigation/persistent-nav'

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <PersistentNav userLevel={3} userName="John" notificationCount={2} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-10 mb-10 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Profile Page</h1>
          <p className="text-gray-600 mt-2">This is a minimal profile page to test the build.</p>
        </div>
      </div>
    </div>
  )
}
