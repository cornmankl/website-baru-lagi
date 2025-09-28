'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Plus, 
  Minus,
  Truck,
  Clock,
  Leaf,
  Award,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  RotateCcw
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

// Mock product data - in real app, this would come from API based on slug
const mockProduct = {
  id: 1,
  name: "Sweet Butter Corn",
  price: 12.90,
  comparePrice: 15.90,
  description: "Indulge in our premium Sweet Butter Corn, crafted with the finest Malaysian corn and rich buttery goodness. Each kernel is perfectly coated with our signature butter blend, creating a luxurious snacking experience that melts in your mouth.",
  shortDesc: "Premium sweet corn with rich butter coating",
  images: [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600"
  ],
  category: "Sweet",
  rating: 4.9,
  reviewCount: 1247,
  inStock: true,
  isNew: false,
  isFeatured: true,
  sku: "SBC-001",
  weight: "250g",
  dimensions: "15cm x 10cm x 5cm",
  ingredients: "Premium Malaysian corn, unsalted butter, sea salt, natural flavoring",
  nutritionInfo: {
    calories: 180,
    protein: "4g",
    carbs: "22g",
    fat: "9g",
    fiber: "3g",
    sodium: "120mg"
  },
  allergens: "Dairy (butter)",
  preparation: "Ready to eat. Best served at room temperature. Store in a cool, dry place.",
  dietary: ['Vegetarian'],
  variants: [
    { id: 'small', name: 'Small', price: 12.90, weight: '200g' },
    { id: 'regular', name: 'Regular', price: 15.90, weight: '250g' },
    { id: 'large', name: 'Large', price: 19.90, weight: '350g' }
  ],
  addOns: [
    { id: 'extra-butter', name: 'Extra Butter', price: 2.00 },
    { id: 'sea-salt', name: 'Sea Salt Sprinkle', price: 1.00 },
    { id: 'herbs', name: 'Mixed Herbs', price: 1.50 }
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah Lim",
      rating: 5,
      comment: "Absolutely amazing! The butter flavor is perfect and the corn is so fresh. Will definitely order again!",
      date: "2 days ago",
      verified: true,
      helpful: 24
    },
    {
      id: 2,
      name: "Ahmad Hassan",
      rating: 5,
      comment: "Best sweet corn I've ever had. The butter coating is generous and the quality is outstanding.",
      date: "1 week ago",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      name: "Emily Chen",
      rating: 4,
      comment: "Really good quality corn with great butter flavor. Only wish the portion was a bit bigger.",
      date: "2 weeks ago",
      verified: true,
      helpful: 12
    }
  ],
  relatedProducts: [
    {
      id: 2,
      name: "Chocolate Drizzle Corn",
      price: 15.90,
      image: "/api/placeholder/200/200",
      slug: "chocolate-drizzle-corn"
    },
    {
      id: 3,
      name: "Cheese Explosion Corn",
      price: 14.90,
      image: "/api/placeholder/200/200",
      slug: "cheese-explosion-corn"
    },
    {
      id: 5,
      name: "Honey Glazed Corn",
      price: 16.90,
      image: "/api/placeholder/200/200",
      slug: "honey-glazed-corn"
    },
    {
      id: 6,
      name: "Caramel Sea Salt Corn",
      price: 14.90,
      image: "/api/placeholder/200/200",
      slug: "caramel-sea-salt-corn"
    }
  ],
  deliveryInfo: {
    areas: ["Kuala Lumpur", "Petaling Jaya", "Subang Jaya", "Shah Alam"],
    estimatedTime: "2-4 hours",
    freeShipping: true
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('regular')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [isZoomed, setIsZoomed] = useState(false)
  const { addItem, openCart } = useCart()

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const selectedVariantData = mockProduct.variants.find(v => v.id === selectedVariant)
  const addOnsTotal = mockProduct.addOns
    .filter(addOn => selectedAddOns.includes(addOn.id))
    .reduce((sum, addOn) => sum + addOn.price, 0)
  
  const totalPrice = (selectedVariantData?.price || mockProduct.price) * quantity + addOnsTotal

  const handleAddToCart = () => {
    const selectedAddOnsData = mockProduct.addOns
      .filter(addOn => selectedAddOns.includes(addOn.id))
      .map(addOn => addOn.name)

    addItem({
      productId: mockProduct.id.toString(),
      variantId: selectedVariant,
      name: mockProduct.name,
      price: selectedVariantData?.price || mockProduct.price,
      comparePrice: mockProduct.comparePrice,
      image: mockProduct.images[0],
      quantity,
      weight: selectedVariantData?.weight || mockProduct.weight,
      attributes: JSON.stringify({
        variant: selectedVariantData?.name,
        addOns: selectedAddOnsData
      })
    })
    openCart()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/products?category=${mockProduct.category.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
              {mockProduct.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <Image
                src={mockProduct.images[selectedImageIndex]}
                alt={mockProduct.name}
                fill
                className={`object-cover cursor-zoom-in ${isZoomed ? 'scale-150' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {mockProduct.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    New
                  </Badge>
                )}
                {mockProduct.isFeatured && (
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedImageIndex ? 'border-amber-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
              <p className="text-gray-600 mb-4">{mockProduct.shortDesc}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{mockProduct.sku}</Badge>
                  {mockProduct.inStock ? (
                    <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-amber-600">
                RM{selectedVariantData?.price.toFixed(2) || mockProduct.price.toFixed(2)}
              </span>
              {mockProduct.comparePrice && (
                <span className="text-lg text-gray-500 line-through">
                  RM{mockProduct.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Customization */}
            <div className="space-y-4">
              {/* Size Options */}
              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {mockProduct.variants.map(variant => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant === variant.id ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => setSelectedVariant(variant.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-xs opacity-70">RM{variant.price.toFixed(2)}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center font-medium">{quantity}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="text-sm font-medium mb-2 block">Add-ons</label>
                <div className="space-y-2">
                  {mockProduct.addOns.map(addOn => (
                    <label key={addOn.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="mr-3"
                        />
                        <span>{addOn.name}</span>
                      </div>
                      <span className="font-medium">+RM{addOn.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                disabled={!mockProduct.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - RM{totalPrice.toFixed(2)}
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <Truck className="h-4 w-4" />
                    <span>Same-day delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Clock className="h-4 w-4" />
                    <span>2-4 hours</span>
                  </div>
                  {mockProduct.deliveryInfo.freeShipping && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <Award className="h-4 w-4" />
                      <span>Free shipping</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Available in: {mockProduct.deliveryInfo.areas.join(', ')}
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xs">100% Natural</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Award className="h-6 w-6 text-blue-500" />
                <span className="text-xs">Halal Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-6 w-6 text-amber-500" />
                <span className="text-xs">Fresh Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {mockProduct.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Product Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><span className="font-medium">Weight:</span> {mockProduct.weight}</div>
                        <div><span className="font-medium">Dimensions:</span> {mockProduct.dimensions}</div>
                        <div><span className="font-medium">SKU:</span> {mockProduct.sku}</div>
                        <div><span className="font-medium">Category:</span> {mockProduct.category}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Dietary Information</h4>
                      <div className="space-y-1">
                        {mockProduct.dietary.map(diet => (
                          <Badge key={diet} variant="outline" className="text-xs">
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                      <p className="text-gray-700 mb-4">{mockProduct.ingredients}</p>
                      
                      <h4 className="font-medium mb-2">Allergens</h4>
                      <Badge variant="destructive" className="mb-4">
                        {mockProduct.allergens}
                      </Badge>
                      
                      <h4 className="font-medium mb-2">Preparation Instructions</h4>
                      <p className="text-gray-700 text-sm">{mockProduct.preparation}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Nutritional Information</h3>
                      <div className="space-y-2">
                        {Object.entries(mockProduct.nutritionInfo).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="font-medium capitalize">
                              {key === 'calories' ? 'Calories' : key}
                            </span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">
                          *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {mockProduct.reviews.map(review => (
                      <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{review.name}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="hover:text-gray-700">
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Shipping & Delivery</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Delivery Areas</h4>
                      <div className="space-y-2">
                        {mockProduct.deliveryInfo.areas.map(area => (
                          <div key={area} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Delivery Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span><strong>Estimated Time:</strong> {mockProduct.deliveryInfo.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-green-500" />
                          <span><strong>Shipping:</strong> {mockProduct.deliveryInfo.freeShipping ? 'Free' : 'Calculated at checkout'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-amber-500" />
                          <span><strong>Freshness:</strong> Made to order</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-900">Order Processing</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Orders are processed within 1 hour</li>
                      <li>• Fresh preparation ensures maximum quality</li>
                      <li>• Real-time order tracking available</li>
                      <li>• Contactless delivery option available</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customers Also Bought</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockProduct.relatedProducts.map(product => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">
                      <Link 
                        href={`/products/${product.slug}`}
                        className="hover:text-amber-600 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-600">
                        RM{product.price.toFixed(2)}
                      </span>
                      <Button size="sm" variant="outline">
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}