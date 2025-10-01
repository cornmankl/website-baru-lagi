'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Truck, Clock, Leaf } from 'lucide-react'

const valueProps = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description: "Fresh corn delivered to your doorstep within hours across KL, Selangor, and Penang",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "Made-to-order within 2 hours to ensure maximum freshness and quality",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No artificial preservatives, just pure, natural ingredients in every bite",
    color: "text-amber-500",
    bgColor: "bg-amber-50"
  }
]

export default function ValuePropositions() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CORNMAN?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering the finest gourmet corn experience with unmatched quality and service
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-full ${prop.bgColor} flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`h-10 w-10 ${prop.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4">{prop.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {prop.description}
                  </p>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                      <span>Available 7 days a week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">100K+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
              <div className="text-gray-600">Locations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">4.9</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}