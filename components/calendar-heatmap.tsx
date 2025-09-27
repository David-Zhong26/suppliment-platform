'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Target,
  Droplets,
  Pill,
  Moon,
  Activity
} from 'lucide-react'

interface DayData {
  water: boolean
  supplements: boolean
  sleep: boolean
  activity: boolean
}

interface CalendarHeatmapProps {
  data: Record<string, DayData>
  onDayClick?: (date: string, data: DayData) => void
}

export default function CalendarHeatmap({ data, onDayClick }: CalendarHeatmapProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getCompletionPercentage = (dayData: DayData) => {
    const tasks = [dayData.water, dayData.supplements, dayData.sleep, dayData.activity]
    const completed = tasks.filter(task => task).length
    return (completed / tasks.length) * 100
  }

  const getCellColor = (dayData: DayData) => {
    const percentage = getCompletionPercentage(dayData)
    
    if (percentage === 0) return 'bg-gray-100 hover:bg-gray-200'
    if (percentage === 25) return 'bg-green-100 hover:bg-green-200'
    if (percentage === 50) return 'bg-green-200 hover:bg-green-300'
    if (percentage === 75) return 'bg-green-300 hover:bg-green-400'
    if (percentage === 100) return 'bg-green-500 hover:bg-green-600'
    
    return 'bg-gray-100 hover:bg-gray-200'
  }

  const getStreakCount = () => {
    const today = new Date()
    let streak = 0
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayData = data[dateStr]
      
      if (dayData && getCompletionPercentage(dayData) === 100) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const streak = getStreakCount()

  if (isMobile) {
    // Mobile: Weekly view slider
    const getWeekDays = (startDate: Date) => {
      const weekDays = []
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate)
        day.setDate(startDate.getDate() + i)
        weekDays.push(day)
      }
      return weekDays
    }

    const currentWeekStart = new Date(currentDate)
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay())

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[#16A34A]" />
            Daily Tracking Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Streak Counter */}
          <div className="flex items-center gap-2 mb-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
            <Flame className="h-6 w-6 text-orange-500" />
            <div>
              <div className="font-bold text-orange-700">Current Streak</div>
              <div className="text-2xl font-bold text-orange-600">{streak} days</div>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">{getMonthName(currentDate)}</h3>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getWeekDays(currentWeekStart).map((day, index) => {
                const dateStr = formatDate(day)
                const dayData = data[dateStr]
                const isToday = day.toDateString() === new Date().toDateString()
                
                return (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                        dayData ? getCellColor(dayData) : 'bg-gray-100 hover:bg-gray-200'
                      } ${isToday ? 'ring-2 ring-[#16A34A]' : ''}`}
                      onClick={() => {
                        if (dayData) {
                          setSelectedDate(dateStr)
                          onDayClick?.(dateStr, dayData)
                        }
                      }}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Desktop: Full monthly view
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[#16A34A]" />
            Daily Tracking Calendar
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-orange-600">{streak} day streak</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="text-gray-600">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <div className="w-3 h-3 bg-green-300 rounded"></div>
            <div className="w-3 h-3 bg-green-500 rounded"></div>
          </div>
          <span className="text-gray-600">More</span>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2">{day}</div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2"></div>
              }
              
              const dateStr = formatDate(day)
              const dayData = data[dateStr]
              const isToday = day.toDateString() === new Date().toDateString()
              
              return (
                <div
                  key={index}
                  className={`p-2 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                    dayData ? getCellColor(dayData) : 'bg-gray-100 hover:bg-gray-200'
                  } ${isToday ? 'ring-2 ring-[#16A34A]' : ''}`}
                  onClick={() => {
                    if (dayData) {
                      setSelectedDate(dateStr)
                      onDayClick?.(dateStr, dayData)
                    }
                  }}
                >
                  {day.getDate()}
                </div>
              )
            })}
          </div>
        </div>

        {/* Day Details Modal */}
        {selectedDate && data[selectedDate] && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedDate(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Water Intake</span>
                  </div>
                  <div className={`text-2xl ${data[selectedDate].water ? 'text-green-600' : 'text-red-500'}`}>
                    {data[selectedDate].water ? '✅' : '❌'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Supplements</span>
                  </div>
                  <div className={`text-2xl ${data[selectedDate].supplements ? 'text-green-600' : 'text-red-500'}`}>
                    {data[selectedDate].supplements ? '✅' : '❌'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Sleep Quality</span>
                  </div>
                  <div className={`text-2xl ${data[selectedDate].sleep ? 'text-green-600' : 'text-red-500'}`}>
                    {data[selectedDate].sleep ? '✅' : '❌'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Physical Activity</span>
                  </div>
                  <div className={`text-2xl ${data[selectedDate].activity ? 'text-green-600' : 'text-red-500'}`}>
                    {data[selectedDate].activity ? '✅' : '❌'}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <strong>Completion:</strong> {getCompletionPercentage(data[selectedDate])}% 
                  ({[data[selectedDate].water, data[selectedDate].supplements, data[selectedDate].sleep, data[selectedDate].activity].filter(Boolean).length}/4 tasks)
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
