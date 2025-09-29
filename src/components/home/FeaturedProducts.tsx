'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

const featuredProducts = [
  {
    id: 1,
    name: "CRNMN Sweet Butter",
    price: 12.90,
    comparePrice: 15.90,
    image: "/products/cornmn-sweet-butter.jpg",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 1247,
    isNew: false,
    slug: "cornmn-sweet-butter"
  },
  {
    id: 2,
    name: "CRNMN Chocolate",
    price: 15.90,
    comparePrice: null,
    image: "/products/cornmn-chocolate.jpg",
    badge: "New",
    rating: 4.8,
    reviewCount: 856,
    isNew: true,
    slug: "cornmn-chocolate"
  },
  {
    id: 3,
    name: "CRNMN Cheese",
    price: 14.90,
    comparePrice: 17.90,
    image: "/products/cornmn-cheese.jpg",
    badge: "Popular",
    rating: 4.7,
    reviewCount: 623,
    isNew: false,
    slug: "cornmn-cheese"
  },
  {
    id: 4,
    name: "CRNMN Spicy Thai",
    price: 13.90,
    comparePrice: null,
    image: "/products/cornmn-spicy-thai.jpg",
    badge: "Limited",
    rating: 4.6,
    reviewCount: 432,
    isNew: false,
    slug: "cornmn-spicy-thai"
  },
  {
    id: 5,
    name: "CRNMN Honey",
    price: 16.90,
    comparePrice: 19.90,
    image: "/products/cornmn-honey.jpg",
    badge: "Premium",
    rating: 4.9,
    reviewCount: 892,
    isNew: false,
    slug: "cornmn-honey"
  },
  {
    id: 6,
    name: "CRNMN Caramel",
    price: 14.90,
    comparePrice: null,
    image: "/products/cornmn-caramel.jpg",
    badge: "New",
    rating: 4.8,
    reviewCount: 567,
    isNew: true,
    slug: "cornmn-caramel"
  }
]

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addItem, openCart } = useCart()

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      comparePrice: product.comparePrice,
      image: product.image,
      quantity: 1,
    })
    openCart()
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular gourmet corn varieties, handcrafted with premium ingredients
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        New
                      </Badge>
                    )}
                    <Badge className="bg-amber-500 hover:bg-amber-600">
                      {product.badge}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => console.log('Add to wishlist', product.id)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => console.log('Quick view', product.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Add to Cart Button (Hover) */}
                  <div 
                    className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100' : ''
                    }`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Button 
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    <Link 
                      href={`/products/${product.slug}`}
                      className="hover:text-amber-600 transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-amber-600">
                      RM{product.price.toFixed(2)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-gray-500 line-through">
                        RM{product.comparePrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quick Add */}
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}