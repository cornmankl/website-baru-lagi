'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Gift, Clock, CheckCircle } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  const currentDeals = [
    {
      title: "Flash Sale",
      description: "50% off Chocolate Corn",
      timeLeft: "2h 15m",
      badge: "Limited Time"
    },
    {
      title: "Weekend Special",
      description: "Buy 2 Get 1 Free",
      timeLeft: "1d 8h",
      badge: "Weekend"
    },
    {
      title: "New Customer",
      description: "RM5 off first order",
      timeLeft: "3d",
      badge: "Welcome"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-amber-500 to-orange-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Signup */}
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-6 w-6" />
              <h2 className="text-3xl font-bold">Stay Updated</h2>
            </div>
            
            <p className="text-xl mb-6 text-amber-100">
              Get RM5 off your first order + weekly recipes and exclusive offers!
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500 flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-gray-900 hover:bg-gray-800 text-white whitespace-nowrap"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-sm text-amber-200">
                  Join 10,000+ corn lovers. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-300" />
                  <div>
                    <h3 className="font-semibold text-lg">Thank you for subscribing!</h3>
                    <p className="text-amber-100">Check your email for your RM5 discount code.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center space-x-3">
                <Gift className="h-5 w-5 text-amber-200" />
                <span className="text-amber-100">Exclusive discounts and promotions</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-amber-200" />
                <span className="text-amber-100">Be the first to know about new flavors</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-200" />
                <span className="text-amber-100">Weekly corn recipes and tips</span>
              </div>
            </div>
          </div>

          {/* Current Deals */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Current Deals</h3>
            
            <div className="space-y-4">
              {currentDeals.map((deal, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-white">{deal.title}</h4>
                          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                            {deal.badge}
                          </Badge>
                        </div>
                        <p className="text-amber-100 text-sm mb-2">{deal.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-amber-200">
                          <Clock className="h-3 w-3" />
                          <span>Ends in {deal.timeLeft}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="bg-white hover:bg-gray-100 text-gray-900"
                      >
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Countdown Timer */}
            <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-white mb-2">Next Flash Sale Starts In</h4>
                <div className="flex justify-center space-x-4 text-2xl font-mono text-white">
                  <div className="text-center">
                    <div className="bg-white/20 rounded px-3 py-2">02</div>
                    <div className="text-xs mt-1 text-amber-200">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded px-3 py-2">15</div>
                    <div className="text-xs mt-1 text-amber-200">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded px-3 py-2">30</div>
                    <div className="text-xs mt-1 text-amber-200">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}