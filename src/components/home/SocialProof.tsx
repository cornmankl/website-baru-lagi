'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Instagram, MessageCircle, Heart } from 'lucide-react'
import Image from 'next/image'

const customerReviews = [
  {
    id: 1,
    name: "Sarah Lim",
    location: "Kuala Lumpur",
    rating: 5,
    comment: "The sweet butter corn is absolutely amazing! Fresh, flavorful, and delivered right to my office. Will definitely order again!",
    date: "2 days ago",
    avatar: "/api/placeholder/50/50",
    verified: true
  },
  {
    id: 2,
    name: "Ahmad Hassan",
    location: "Shah Alam",
    rating: 5,
    comment: "Best corn delivery service in Malaysia! The chocolate drizzle corn is a game changer. My kids love it!",
    date: "1 week ago",
    avatar: "/api/placeholder/50/50",
    verified: true
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "Penang",
    rating: 4,
    comment: "Quick delivery and great quality. The cheese explosion corn lived up to its name. Highly recommended!",
    date: "2 weeks ago",
    avatar: "/api/placeholder/50/50",
    verified: true
  }
]

const instagramPosts = [
  {
    id: 1,
    image: "/api/placeholder/300/300",
    likes: 234,
    comments: 45,
    caption: "Fresh corn goodness delivered daily! 🌽 #CornmanMY #FreshCorn"
  },
  {
    id: 2,
    image: "/api/placeholder/300/300",
    likes: 189,
    comments: 32,
    caption: "New chocolate drizzle corn is here! 🍫 #CornmanMY #ChocolateCorn"
  },
  {
    id: 3,
    image: "/api/placeholder/300/300",
    likes: 156,
    comments: 28,
    caption: "Perfect snack for any occasion! 😋 #CornmanMY #GourmetCorn"
  },
  {
    id: 4,
    image: "/api/placeholder/300/300",
    likes: 298,
    comments: 67,
    caption: "Same-day delivery across KL & Selangor! 🚚 #CornmanMY #FastDelivery"
  }
]

const deliveryAreas = [
  "Kuala Lumpur", "Petaling Jaya", "Subang Jaya", "Shah Alam", 
  "Klang", "Penang", "Butterworth", "Bayan Lepas", "Georgetown"
]

export default function SocialProof() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % customerReviews.length)
  }

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + customerReviews.length) % customerReviews.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying Malaysia's premium gourmet corn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Reviews */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>
            
            {/* Review Carousel */}
            <div className="relative">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={customerReviews[currentReviewIndex].avatar}
                        alt={customerReviews[currentReviewIndex].name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">
                            {customerReviews[currentReviewIndex].name}
                          </h4>
                          {customerReviews[currentReviewIndex].verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customerReviews[currentReviewIndex].location}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {customerReviews[currentReviewIndex].date}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < customerReviews[currentReviewIndex].rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed">
                    {customerReviews[currentReviewIndex].comment}
                  </p>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                <Button variant="outline" size="sm" onClick={prevReview}>
                  Previous
                </Button>
                <div className="flex space-x-2">
                  {customerReviews.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentReviewIndex ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentReviewIndex(index)}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={nextReview}>
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Instagram Feed */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Instagram Feed</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Follow Us
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {instagramPosts.map((post) => (
                <div key={post.id} className="relative group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt="Instagram post"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="flex items-center justify-center space-x-4 mb-2">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                        </div>
                        <p className="text-xs px-2 line-clamp-2">{post.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center mt-4 text-sm text-gray-600">
              Follow us @CornmanMY for daily updates and special offers!
            </p>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="mt-16 bg-amber-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">Serving 50+ Locations Across Malaysia</h3>
            <p className="text-gray-600">Fresh corn delivery available in these major areas and more!</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {deliveryAreas.map((area, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-white text-amber-700 hover:bg-amber-100"
              >
                {area}
              </Badge>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline" className="bg-white">
              Check Your Area
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}