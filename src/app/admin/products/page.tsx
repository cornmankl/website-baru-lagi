'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  MoreHorizontal,
  Package,
  TrendingUp,
  TrendingDown,
  Star,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
  Copy,
  MoveVertical
} from 'lucide-react'

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'CRNMN Sweet Butter',
    sku: 'CRN-SB-001',
    price: 12.90,
    comparePrice: 15.90,
    category: 'sweet',
    stock: 45,
    status: 'active',
    isFeatured: true,
    rating: 4.9,
    reviews: 1247,
    sales: 342,
    revenue: 4423.80,
    lastUpdated: '2024-01-15',
    image: '/products/cornmn-sweet-butter.jpg',
    description: 'Classic sweet butter corn with premium butter seasoning',
    tags: ['bestseller', 'sweet', 'vegan']
  },
  {
    id: 2,
    name: 'CRNMN Chocolate',
    sku: 'CRN-CH-002',
    price: 15.90,
    comparePrice: null,
    category: 'chocolate',
    stock: 15,
    status: 'active',
    isFeatured: true,
    rating: 4.8,
    reviews: 856,
    sales: 289,
    revenue: 4597.10,
    lastUpdated: '2024-01-14',
    image: '/products/cornmn-chocolate.jpg',
    description: 'Rich chocolate drizzle corn with premium chocolate sauce',
    tags: ['featured', 'chocolate', 'vegetarian']
  },
  {
    id: 3,
    name: 'CRNMN Cheese',
    sku: 'CRN-CS-003',
    price: 14.90,
    comparePrice: 17.90,
    category: 'cheese',
    stock: 67,
    status: 'active',
    isFeatured: true,
    rating: 4.7,
    reviews: 623,
    sales: 267,
    revenue: 3978.30,
    lastUpdated: '2024-01-13',
    image: '/products/cornmn-cheese.jpg',
    description: 'Explosive cheese corn with blend of premium cheeses',
    tags: ['popular', 'cheese', 'vegetarian']
  },
  {
    id: 4,
    name: 'CRNMN Spicy Thai',
    sku: 'CRN-ST-004',
    price: 13.90,
    comparePrice: null,
    category: 'savory',
    stock: 89,
    status: 'active',
    isFeatured: false,
    rating: 4.6,
    reviews: 432,
    sales: 198,
    revenue: 2752.20,
    lastUpdated: '2024-01-12',
    image: '/products/cornmn-spicy-thai.jpg',
    description: 'Spicy Thai corn with authentic Thai seasonings',
    tags: ['spicy', 'thai', 'vegan']
  },
  {
    id: 5,
    name: 'CRNMN Honey',
    sku: 'CRN-HN-005',
    price: 16.90,
    comparePrice: 19.90,
    category: 'sweet',
    stock: 34,
    status: 'active',
    isFeatured: true,
    rating: 4.9,
    reviews: 892,
    sales: 234,
    revenue: 3954.60,
    lastUpdated: '2024-01-11',
    image: '/products/cornmn-honey.jpg',
    description: 'Golden honey glazed corn with premium honey',
    tags: ['premium', 'sweet', 'vegetarian']
  },
  {
    id: 6,
    name: 'CRNMN Caramel',
    sku: 'CRN-CR-006',
    price: 14.90,
    comparePrice: null,
    category: 'sweet',
    stock: 56,
    status: 'active',
    isFeatured: false,
    rating: 4.8,
    reviews: 567,
    sales: 189,
    revenue: 2816.10,
    lastUpdated: '2024-01-10',
    image: '/products/cornmn-caramel.jpg',
    description: 'Sweet caramel corn with sea salt flakes',
    tags: ['sweet', 'caramel', 'vegetarian']
  }
]

const categories = [
  { name: 'Sweet', count: 3, color: 'bg-green-100 text-green-800' },
  { name: 'Chocolate', count: 1, color: 'bg-purple-100 text-purple-800' },
  { name: 'Cheese', count: 1, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Savory', count: 1, color: 'bg-red-100 text-red-800' }
]

export default function ProductsPage() {
  const [products] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 10) return { color: 'bg-red-100 text-red-800', text: 'Low Stock' }
    if (stock <= 30) return { color: 'bg-yellow-100 text-yellow-800', text: 'Medium Stock' }
    return { color: 'bg-green-100 text-green-800', text: 'In Stock' }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="mt-2 text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <div className="flex space-x-2">
          {selectedProducts.length > 0 && (
            <div className="flex space-x-2">
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate ({selectedProducts.length})
              </Button>
              <Button variant="outline">
                <MoveVertical className="h-4 w-4 mr-2" />
                Change Category
              </Button>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Update Prices
              </Button>
            </div>
          )}
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Products
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold">
                  {products.filter(p => p.stock <= 10).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold">
                  {products.filter(p => p.isFeatured).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(products.reduce((acc, p) => acc + p.revenue, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Product List</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="sweet">Sweet</SelectItem>
                    <SelectItem value="chocolate">Chocolate</SelectItem>
                    <SelectItem value="cheese">Cheese</SelectItem>
                    <SelectItem value="savory">Savory</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedProducts.length === filteredProducts.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => {
                      const stockStatus = getStockStatus(product.stock)
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-500">
                                    {product.rating} ({product.reviews})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{formatCurrency(product.price)}</p>
                              {product.comparePrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  {formatCurrency(product.comparePrice)}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{product.stock}</span>
                              <Badge className={stockStatus.color}>
                                {stockStatus.text}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(product.revenue)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                {product.isFeatured ? (
                                  <DropdownMenuItem>
                                    <Star className="h-4 w-4 mr-2" />
                                    Remove from Featured
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>
                                    <Star className="h-4 w-4 mr-2" />
                                    Add to Featured
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Product
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{category.name}</p>
                      <p className="text-2xl font-bold">{category.count}</p>
                    </div>
                    <Badge className={category.color}>
                      {category.count} products
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Products with highest revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {products
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 5)
                    .map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sales} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(product.revenue)}</p>
                          <div className="flex items-center justify-end">
                            {product.revenue > products.reduce((acc, p) => acc + p.revenue, 0) / products.length ? (
                              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <span className="text-xs text-gray-500">
                              {Math.round((product.revenue / products.reduce((acc, p) => acc + p.revenue, 0)) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock Level Analysis</CardTitle>
                <CardDescription>Current inventory status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low Stock (&le;10)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {products.filter(p => p.stock <= 10).length} products
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium Stock (11-30)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {products.filter(p => p.stock > 10 && p.stock <= 30).length} products
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Good Stock (&gt;30)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {products.filter(p => p.stock > 30).length} products
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}