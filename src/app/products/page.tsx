'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { 
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/slider'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Eye, 
  ShoppingCart,
  Star,
  MapPin,
  Clock
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data - in real app, this would come from API
const categories = [
  { id: 'sweet', name: 'Sweet', count: 2 },
  { id: 'savory', name: 'Savory', count: 1 },
  { id: 'chocolate', name: 'Chocolate', count: 1 },
  { id: 'cheese', name: 'Cheese', count: 1 },
  { id: 'special', name: 'Special Editions', count: 1 }
]

const dietaryOptions = [
  { id: 'vegan', name: 'Vegan', count: 2 },
  { id: 'gluten-free', name: 'Gluten-Free', count: 2 },
  { id: 'low-sugar', name: 'Low Sugar', count: 1 },
  { id: 'keto', name: 'Keto-Friendly', count: 1 }
]

const locations = [
  { id: 'kl', name: 'Kuala Lumpur', count: 6 },
  { id: 'selangor', name: 'Selangor', count: 5 },
  { id: 'penang', name: 'Penang', count: 4 }
]

const mockProducts = [
  {
    id: 1,
    name: "CRNMN Sweet Butter",
    price: 12.90,
    comparePrice: 15.90,
    image: "/api/placeholder/300/300",
    category: "sweet",
    rating: 4.9,
    reviewCount: 1247,
    isNew: false,
    isFeatured: true,
    inStock: true,
    slug: "cornmn-sweet-butter",
    dietary: ['vegan', 'gluten-free'],
    locations: ['kl', 'selangor', 'penang']
  },
  {
    id: 2,
    name: "CRNMN Chocolate",
    price: 15.90,
    comparePrice: null,
    image: "/api/placeholder/300/300",
    category: "chocolate",
    rating: 4.8,
    reviewCount: 856,
    isNew: true,
    isFeatured: true,
    inStock: true,
    slug: "cornmn-chocolate",
    dietary: ['vegetarian'],
    locations: ['kl', 'selangor']
  },
  {
    id: 3,
    name: "CRNMN Cheese",
    price: 14.90,
    comparePrice: 17.90,
    image: "/api/placeholder/300/300",
    category: "cheese",
    rating: 4.7,
    reviewCount: 623,
    isNew: false,
    isFeatured: true,
    inStock: true,
    slug: "cornmn-cheese",
    dietary: ['vegetarian'],
    locations: ['kl', 'selangor', 'penang']
  },
  {
    id: 4,
    name: "CRNMN Spicy Thai",
    price: 13.90,
    comparePrice: null,
    image: "/api/placeholder/300/300",
    category: "savory",
    rating: 4.6,
    reviewCount: 432,
    isNew: false,
    isFeatured: false,
    inStock: true,
    slug: "cornmn-spicy-thai",
    dietary: ['vegan', 'gluten-free'],
    locations: ['kl', 'penang']
  },
  {
    id: 5,
    name: "CRNMN Honey",
    price: 16.90,
    comparePrice: 19.90,
    image: "/api/placeholder/300/300",
    category: "sweet",
    rating: 4.9,
    reviewCount: 892,
    isNew: false,
    isFeatured: true,
    inStock: true,
    slug: "cornmn-honey",
    dietary: ['vegetarian'],
    locations: ['kl', 'selangor']
  },
  {
    id: 6,
    name: "CRNMN Caramel",
    price: 14.90,
    comparePrice: null,
    image: "/api/placeholder/300/300",
    category: "sweet",
    rating: 4.8,
    reviewCount: 567,
    isNew: true,
    isFeatured: false,
    inStock: true,
    slug: "cornmn-caramel",
    dietary: ['vegetarian'],
    locations: ['selangor', 'penang']
  }
]

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' }
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [priceRange, setPriceRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [filteredProducts, setFilteredProducts] = useState(mockProducts)

  // Apply filters
  useEffect(() => {
    let filtered = mockProducts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Dietary filter
    if (selectedDietary.length > 0) {
      filtered = filtered.filter(product =>
        selectedDietary.some(diet => product.dietary.includes(diet))
      )
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(product =>
        product.locations.includes(selectedLocation)
      )
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // popularity - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, selectedDietary, selectedLocation, priceRange, sortBy])

  const toggleDietary = (dietary: string) => {
    setSelectedDietary(prev =>
      prev.includes(dietary)
        ? prev.filter(d => d !== dietary)
        : [...prev, dietary]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedDietary([])
    setSelectedLocation('')
    setPriceRange([0, 50])
    setSortBy('popularity')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search corn flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>

              <Accordion type="multiple" defaultValue={['categories', 'dietary', 'price', 'location']} className="w-full">
                {/* Categories */}
                <AccordionItem value="categories">
                  <AccordionTrigger className="text-sm">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              checked={selectedCategory === category.id}
                              onChange={() => setSelectedCategory(category.id)}
                              className="mr-2"
                            />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">({category.count})</span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Dietary */}
                <AccordionItem value="dietary">
                  <AccordionTrigger className="text-sm">Dietary</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {dietaryOptions.map(option => (
                        <label key={option.id} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedDietary.includes(option.id)}
                              onChange={() => toggleDietary(option.id)}
                              className="mr-2"
                            />
                            <span className="text-sm">{option.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">({option.count})</span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                  <AccordionTrigger className="text-sm">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={50}
                        step={1}
                        className="w-full"
                      >
                        <SliderTrack>
                          <SliderRange />
                        </SliderTrack>
                        <SliderThumb />
                        <SliderThumb />
                      </Slider>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>RM{priceRange[0]}</span>
                        <span>RM{priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Location */}
                <AccordionItem value="location">
                  <AccordionTrigger className="text-sm">Available in your area</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {locations.map(location => (
                        <label key={location.id} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="location"
                              checked={selectedLocation === location.id}
                              onChange={() => setSelectedLocation(location.id)}
                              className="mr-2"
                            />
                            <span className="text-sm">{location.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">({location.count})</span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsFilterOpen(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                    ×
                  </Button>
                </div>
                {/* Mobile filter content would go here - similar to desktop */}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Products</h1>
                <p className="text-gray-600">{filteredProducts.length} products found</p>
              </div>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
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
                          {product.isFeatured && (
                            <Badge className="bg-amber-500 hover:bg-amber-600">
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                          >
                            <Eye className="h-4 w-4" />
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

                        {/* Dietary Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.dietary.map(diet => (
                            <Badge key={diet} variant="outline" className="text-xs">
                              {diet}
                            </Badge>
                          ))}
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

                        {/* Add to Cart */}
                        <Button 
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">
                                <Link 
                                  href={`/products/${product.slug}`}
                                  className="hover:text-amber-600 transition-colors"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                              
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
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
                                  <span className="text-sm text-gray-600 ml-1">
                                    {product.rating} ({product.reviewCount})
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <MapPin className="h-4 w-4" />
                                  <span>
                                    {locations.find(loc => loc.id === product.locations[0])?.name}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>Same-day delivery</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {product.dietary.map(diet => (
                                  <Badge key={diet} variant="outline" className="text-xs">
                                    {diet}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold text-amber-600">
                                  RM{product.price.toFixed(2)}
                                </span>
                                {product.comparePrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    RM{product.comparePrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                >
                                  <Heart className="h-4 w-4 mr-1" />
                                  Save
                                </Button>
                                <Button 
                                  size="sm"
                                  className="bg-amber-500 hover:bg-amber-600 text-white"
                                  disabled={!product.inStock}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}