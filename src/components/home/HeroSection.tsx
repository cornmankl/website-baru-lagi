'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Star, Truck, Leaf, Award } from 'lucide-react'
import Link from 'next/link'

const heroSlides = [
  {
    id: 1,
    title: "CRNMN Premium Corn",
    subtitle: "Artisanal Malaysian Street Food",
    description: "Handcrafted gourmet corn with authentic flavors, delivered fresh to your doorstep",
    image: "/cornmn-hero-1.jpg",
    ctaPrimary: "Order Now",
    ctaSecondary: "View Menu",
    badge: "Limited Edition"
  },
  {
    id: 2,
    title: "CRNMN Corn Experience",
    subtitle: "Fresh Ingredients, Bold Flavors",
    description: "Experience the perfect blend of premium corn and artisanal seasonings",
    image: "/cornmn-hero-2.jpg",
    ctaPrimary: "Shop Now",
    ctaSecondary: "Learn More",
    badge: "Best Seller"
  },
  {
    id: 3,
    title: "CRNMN Gourmet Collection",
    subtitle: "Street Food Redefined",
    description: "Discover our signature corn varieties crafted with passion and expertise",
    image: "/cornmn-hero-1.jpg",
    ctaPrimary: "Explore",
    ctaSecondary: "View All",
    badge: "New Arrival"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Slider */}
      <div className="relative h-[600px] md:h-[700px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <Badge className="mb-4 bg-amber-500 hover:bg-amber-600">
                    {slide.badge}
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl mb-6 text-amber-100">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg mb-8 text-gray-200">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
                      <Link href="/products">{slide.ctaPrimary}</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
                      <Link href="/products">{slide.ctaSecondary}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Truck className="h-4 w-4 text-amber-500" />
              <span>Same-day delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Leaf className="h-4 w-4 text-green-500" />
              <span>100% Fresh</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="h-4 w-4 text-blue-500" />
              <span>Halal Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9 (2,847 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}