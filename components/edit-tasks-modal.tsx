'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  X, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Calendar,
  Clock,
  Target,
  Droplets,
  Pill,
  Moon,
  Activity,
  Bell,
  Repeat
} from 'lucide-react'

interface DailyTask {
  id: string
  name: string
  type: 'counter' | 'boolean' | 'timer'
  goal: number
  unit: string
  icon: string
  color: string
  reminder: boolean
  reminderTime: string
  frequency: 'daily' | 'weekly' | 'monthly'
  startDate: string
  endDate?: string
}

interface EditTasksModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (tasks: DailyTask[]) => void
  initialTasks: DailyTask[]
}

const taskTypes = [
  { value: 'counter', label: 'Counter (e.g., glasses of water)', icon: Target },
  { value: 'boolean', label: 'Yes/No (e.g., took supplements)', icon: Pill },
  { value: 'timer', label: 'Timer (e.g., meditation time)', icon: Clock },
]

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

const icons = [
  { value: 'Droplets', label: 'Water', icon: Droplets },
  { value: 'Pill', label: 'Supplements', icon: Pill },
  { value: 'Moon', label: 'Sleep', icon: Moon },
  { value: 'Activity', label: 'Exercise', icon: Activity },
  { value: 'Target', label: 'Goal', icon: Target },
  { value: 'Clock', label: 'Time', icon: Clock },
]

const colors = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-600' },
  { value: 'green', label: 'Green', class: 'bg-green-100 text-green-600' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-600' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-600' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-100 text-pink-600' },
  { value: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-600' },
]

export default function EditTasksModal({ isOpen, onClose, onSave, initialTasks }: EditTasksModalProps) {
  const [tasks, setTasks] = useState<DailyTask[]>(initialTasks)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState<Partial<DailyTask>>({
    name: '',
    type: 'counter',
    goal: 1,
    unit: '',
    icon: 'Target',
    color: 'blue',
    reminder: false,
    reminderTime: '09:00',
    frequency: 'daily',
    startDate: new Date().toISOString().split('T')[0],
  })

  if (!isOpen) return null

  const addTask = () => {
    if (newTask.name && newTask.goal && newTask.unit) {
      const task: DailyTask = {
        id: Date.now().toString(),
        name: newTask.name!,
        type: newTask.type!,
        goal: newTask.goal!,
        unit: newTask.unit!,
        icon: newTask.icon!,
        color: newTask.color!,
        reminder: newTask.reminder!,
        reminderTime: newTask.reminderTime!,
        frequency: newTask.frequency!,
        startDate: newTask.startDate!,
        endDate: newTask.endDate,
      }
      setTasks([...tasks, task])
      setNewTask({
        name: '',
        type: 'counter',
        goal: 1,
        unit: '',
        icon: 'Target',
        color: 'blue',
        reminder: false,
        reminderTime: '09:00',
        frequency: 'daily',
        startDate: new Date().toISOString().split('T')[0],
      })
    }
  }

  const updateTask = (id: string, updates: Partial<DailyTask>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
    setEditingTask(null)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleSave = () => {
    onSave(tasks)
    onClose()
  }

  const selectedIcon = icons.find(icon => icon.value === newTask.icon)
  const selectedColor = colors.find(color => color.value === newTask.color)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit Daily Tasks</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Add New Task */}
          <Card className="mb-6 border-dashed border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#16A34A]" />
                Add New Task
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taskName">Task Name</Label>
                  <Input
                    id="taskName"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    placeholder="e.g., Water Intake"
                  />
                </div>
                <div>
                  <Label htmlFor="taskType">Task Type</Label>
                  <Select value={newTask.type} onValueChange={(value: any) => setNewTask({ ...newTask, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="goal">Goal</Label>
                  <Input
                    id="goal"
                    type="number"
                    value={newTask.goal}
                    onChange={(e) => setNewTask({ ...newTask, goal: parseInt(e.target.value) || 1 })}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newTask.unit}
                    onChange={(e) => setNewTask({ ...newTask, unit: e.target.value })}
                    placeholder="e.g., glasses, hours, minutes"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newTask.frequency} onValueChange={(value: any) => setNewTask({ ...newTask, frequency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={newTask.icon} onValueChange={(value) => setNewTask({ ...newTask, icon: value })}>
                    <SelectTrigger>
                      <SelectValue>
                        {selectedIcon && (
                          <div className="flex items-center gap-2">
                            <selectedIcon.icon className="h-4 w-4" />
                            {selectedIcon.label}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {icons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          <div className="flex items-center gap-2">
                            <icon.icon className="h-4 w-4" />
                            {icon.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Select value={newTask.color} onValueChange={(value) => setNewTask({ ...newTask, color: value })}>
                    <SelectTrigger>
                      <SelectValue>
                        {selectedColor && (
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${selectedColor.class}`} />
                            {selectedColor.label}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${color.class}`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={newTask.reminder}
                    onChange={(e) => setNewTask({ ...newTask, reminder: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="reminder" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Enable Reminder
                  </Label>
                </div>
                {newTask.reminder && (
                  <div>
                    <Label htmlFor="reminderTime">Reminder Time</Label>
                    <Input
                      id="reminderTime"
                      type="time"
                      value={newTask.reminderTime}
                      onChange={(e) => setNewTask({ ...newTask, reminderTime: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <Button onClick={addTask} className="w-full bg-[#16A34A] hover:bg-[#15803d]">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>

          {/* Existing Tasks */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Tasks</h3>
            {tasks.map((task) => (
              <Card key={task.id} className="border">
                <CardContent className="p-4">
                  {editingTask === task.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          value={task.name}
                          onChange={(e) => updateTask(task.id, { name: e.target.value })}
                          placeholder="Task name"
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={task.goal}
                            onChange={(e) => updateTask(task.id, { goal: parseInt(e.target.value) || 1 })}
                            className="flex-1"
                          />
                          <Input
                            value={task.unit}
                            onChange={(e) => updateTask(task.id, { unit: e.target.value })}
                            placeholder="Unit"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingTask(null)}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingTask(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${colors.find(c => c.value === task.color)?.class || 'bg-gray-100'}`}>
                          {(() => {
                            const IconComponent = icons.find(i => i.value === task.icon)?.icon || Target
                            return <IconComponent className="h-5 w-5" />
                          })()}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{task.name}</h4>
                          <p className="text-sm text-gray-500">
                            Goal: {task.goal} {task.unit} • {task.frequency}
                            {task.reminder && (
                              <span className="ml-2 inline-flex items-center gap-1">
                                <Bell className="h-3 w-3" />
                                {task.reminderTime}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-400">
                            Start: {new Date(task.startDate).toLocaleDateString()}
                            {task.endDate && ` • End: ${new Date(task.endDate).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingTask(task.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#16A34A] hover:bg-[#15803d]">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
