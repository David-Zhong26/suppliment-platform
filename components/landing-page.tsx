'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Shield, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Pill,
  Target,
  MessageCircle
} from 'lucide-react'

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Personalized Supplement Matching",
      description: "Get recommendations based on your health goals, diet, and lifestyle with our advanced matching algorithm."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety & Interaction Checker",
      description: "Avoid dangerous combinations with our comprehensive drug-supplement interaction database."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Health Community",
      description: "Connect with like-minded individuals in goal-based communities and learn from verified creators."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Gamified Onboarding",
      description: "Complete your wellness profile through engaging tasks and earn rewards for supplement purchases."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Supplements Analyzed" },
    { number: "50,000+", label: "Safety Checks" },
    { number: "5,000+", label: "Community Members" },
    { number: "4.9/5", label: "User Rating" }
  ]

  return (
    <div className="min-h-screen wellness-gradient">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 wellness-fade-in">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-[#16A34A] wellness-scale-in" />
            <span className="text-2xl font-bold text-gray-900">Wellness Platform</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="wellness-nav-link">Features</a>
            <a href="#community" className="wellness-nav-link">Community</a>
            <a href="#safety" className="wellness-nav-link">Safety</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="wellness-nav-link hover:text-[#16A34A] focus:text-[#16A34A] active:text-[#16A34A]">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d]">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 wellness-slide-up">
        <div className="container mx-auto text-center">
          <Badge className="wellness-badge mb-4 wellness-scale-in">
            🎯 Trusted by 50,000+ health enthusiasts
          </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Your <span className="text-[#16A34A]">Personalized</span>
          <span className="wellness-gradient-text block">Wellness Journey</span>
        </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover supplements tailored to your unique profile. Get safety insights, 
            community, and shop with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d]">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 btn-outline-wellness hover:bg-[#16A34A] hover:text-white focus:bg-[#16A34A] focus:text-white active:bg-[#16A34A] active:text-white">
              Explore Community
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white wellness-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="wellness-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-4xl font-bold text-[#16A34A] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 wellness-slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for <span className="text-[#F97316]">Optimal Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines AI-powered recommendations, safety checking, 
              community support, and seamless shopping in one trusted place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-[#22C55E]/20 ${
                    activeFeature === index 
                      ? 'border-[#22C55E] bg-[#22C55E] shadow-lg' 
                      : ''
                  } wellness-scale-in`}
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-white/20' 
                        : 'bg-[#DCFCE7]'
                    }`}>
                      <div className={activeFeature === index ? 'text-white' : 'text-[#22C55E]'}>
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${activeFeature === index ? 'text-white' : 'text-gray-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${activeFeature === index ? 'text-white/90' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${activeFeature === index 
                            ? 'bg-white/20 text-white border-white/30' 
                            : 'bg-gray-100 text-gray-700'}`}
                        >
                          Personalized
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${activeFeature === index 
                            ? 'bg-white/20 text-white border-white/30' 
                            : 'bg-gray-100 text-gray-700'}`}
                        >
                          AI-Driven
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 wellness-scale-in">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {features[activeFeature].description}
                </p>
                <Button className="w-full btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d]">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center wellness-slide-up">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                <span className="text-[#16A34A]">Safety First</span>: Your Health is Our Priority
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every recommendation goes through our extensive multi-step safety screening. 
                Your health and safety are our top priority.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 wellness-scale-in">
                  <CheckCircle className="h-6 w-6 text-[#16A34A]" />
                  <span className="text-gray-700">FDA Safety Verified</span>
                </div>
                <div className="flex items-center space-x-3 wellness-scale-in" style={{animationDelay: '0.1s'}}>
                  <CheckCircle className="h-6 w-6 text-[#16A34A]" />
                  <span className="text-gray-700">Safety Checks</span>
                </div>
                <div className="flex items-center space-x-3 wellness-scale-in" style={{animationDelay: '0.2s'}}>
                  <CheckCircle className="h-6 w-6 text-[#16A34A]" />
                  <span className="text-gray-700">Expert Guides</span>
                </div>
                <div className="flex items-center space-x-3 wellness-scale-in" style={{animationDelay: '0.3s'}}>
                  <CheckCircle className="h-6 w-6 text-[#16A34A]" />
                  <span className="text-gray-700">Real-time Safety Alerts</span>
                </div>
              </div>
            </div>
            <div className="bg-[#DCFCE7] p-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="text-center">
                <Shield className="h-16 w-16 text-[#16A34A] mx-auto mb-4 wellness-scale-in" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Safety Promise
                </h3>
                <p className="text-gray-600">
                  Every recommendation goes through our extensive multi-step safety screening. 
                  Your health and safety are our top priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 wellness-slide-up">
            Learn from <span className="text-[#16A34A]">Real People Like You</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with thousands of wellness enthusiasts, get advice from verified experts, 
            and share your journey with people who understand your goals.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 wellness-scale-in">
              <CardHeader>
                <Users className="h-12 w-12 text-[#16A34A] mx-auto mb-4" />
                <CardTitle>Wellness Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with others. Join communities focused on your specific wellness goals 
                  like weight loss, muscle gain, or clean eating.
                </CardDescription>
                <div className="mt-4 flex gap-2 justify-center">
                  <Badge variant="secondary" className="text-xs">Request Support</Badge>
                  <Badge variant="secondary" className="text-xs">Community Updates</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 wellness-scale-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-[#F97316] mx-auto mb-4" />
                <CardTitle>Education Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn from experts. Learn from verified creators who share evidence-based content, 
                  product reviews, and wellness tips.
                </CardDescription>
                <div className="mt-4 flex gap-2 justify-center">
                  <Badge variant="secondary" className="text-xs">Expert Guides</Badge>
                  <Badge variant="secondary" className="text-xs">Myth Busters</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 wellness-scale-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <Star className="h-12 w-12 text-[#16A34A] mx-auto mb-4" />
                <CardTitle>Goal Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track progress. Participate in group challenges, track progress together, 
                  and celebrate achievements as a community.
                </CardDescription>
                <div className="mt-4 flex gap-2 justify-center">
                  <Badge variant="secondary" className="text-xs">Progress Tracking</Badge>
                  <Badge variant="secondary" className="text-xs">Goal Setting</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 btn-primary-wellness hover:bg-[#15803d] focus:bg-[#15803d] active:bg-[#15803d] wellness-scale-in">
              Join the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 wellness-cta-section wellness-slide-up">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your <span className="text-[#16A34A]">Wellness Journey</span> Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get personalized supplement recommendations, safety insights, and join a community 
            of people committed to optimal wellness. It is free to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-[#16A34A] hover:bg-gray-100 hover:text-[#16A34A] focus:bg-gray-100 focus:text-[#16A34A] active:bg-gray-100 active:text-[#16A34A] wellness-scale-in">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-[#16A34A] focus:bg-white focus:text-[#16A34A] active:bg-white active:text-[#16A34A] wellness-scale-in" style={{animationDelay: '0.1s'}}>
              Watch Demo
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="wellness-scale-in">
              <h3 className="text-lg font-semibold mb-2">Personalized Road</h3>
              <p className="text-sm opacity-90">AI-powered recommendations</p>
            </div>
            <div className="wellness-scale-in" style={{animationDelay: '0.1s'}}>
              <h3 className="text-lg font-semibold mb-2">Safe & Trusted</h3>
              <p className="text-sm opacity-90">Rigorous safety screening</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 wellness-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-[#16A34A]" />
                <span className="text-xl font-bold">Wellness Platform</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in personalized wellness and supplement guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Groups</a></li>
                <li><a href="#" className="hover:text-white">Creators</a></li>
                <li><a href="#" className="hover:text-white">Challenges</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Wellness Platform. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="#" className="hover:text-[#16A34A] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#16A34A] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
