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
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  MoreHorizontal,
  UserPlus
} from 'lucide-react'

// Mock data for customers
const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'Ahmad Ibrahim',
    email: 'ahmad@email.com',
    phone: '+6012-3456789',
    location: 'Kuala Lumpur',
    joinDate: '2023-06-15',
    lastOrder: '2024-01-15',
    totalOrders: 23,
    totalSpent: 847.30,
    avgOrderValue: 36.84,
    status: 'active',
    segment: 'vip',
    preferences: ['sweet', 'chocolate'],
    communication: {
      email: true,
      sms: true,
      whatsapp: true
    }
  },
  {
    id: 'CUST-002',
    name: 'Siti Aminah',
    email: 'siti@email.com',
    phone: '+6019-8765432',
    location: 'Selangor',
    joinDate: '2023-08-22',
    lastOrder: '2024-01-15',
    totalOrders: 18,
    totalSpent: 623.40,
    avgOrderValue: 34.63,
    status: 'active',
    segment: 'regular',
    preferences: ['cheese', 'savory'],
    communication: {
      email: true,
      sms: false,
      whatsapp: true
    }
  },
  {
    id: 'CUST-003',
    name: 'Mohamed Hassan',
    email: 'hassan@email.com',
    phone: '+6017-6543210',
    location: 'Penang',
    joinDate: '2023-09-10',
    lastOrder: '2024-01-15',
    totalOrders: 15,
    totalSpent: 432.60,
    avgOrderValue: 28.84,
    status: 'active',
    segment: 'regular',
    preferences: ['honey', 'spicy'],
    communication: {
      email: true,
      sms: true,
      whatsapp: false
    }
  },
  {
    id: 'CUST-004',
    name: 'Fatimah Ali',
    email: 'fatimah@email.com',
    phone: '+6011-2345678',
    location: 'Kuala Lumpur',
    joinDate: '2023-11-05',
    lastOrder: '2024-01-15',
    totalOrders: 8,
    totalSpent: 287.20,
    avgOrderValue: 35.90,
    status: 'active',
    segment: 'new',
    preferences: ['caramel', 'sweet'],
    communication: {
      email: true,
      sms: true,
      whatsapp: true
    }
  },
  {
    id: 'CUST-005',
    name: 'Razak Ahmad',
    email: 'razak@email.com',
    phone: '+6016-3456789',
    location: 'Selangor',
    joinDate: '2023-07-18',
    lastOrder: '2024-01-14',
    totalOrders: 31,
    totalSpent: 1203.50,
    avgOrderValue: 38.82,
    status: 'active',
    segment: 'vip',
    preferences: ['cheese', 'honey'],
    communication: {
      email: true,
      sms: false,
      whatsapp: true
    }
  }
]

const customerSegments = [
  { name: 'VIP', count: 2, color: 'bg-purple-100 text-purple-800' },
  { name: 'Regular', count: 2, color: 'bg-blue-100 text-blue-800' },
  { name: 'New', count: 1, color: 'bg-green-100 text-green-800' },
  { name: 'Inactive', count: 0, color: 'bg-gray-100 text-gray-800' }
]

export default function CustomersPage() {
  const [customers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'regular': return 'bg-blue-100 text-blue-800'
      case 'new': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    
    return matchesSearch && matchesSegment && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="mt-2 text-gray-600">Manage customer relationships and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Customers
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VIP Customers</p>
                <p className="text-2xl font-bold">
                  {customers.filter(c => c.segment === 'vip').length}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Orders</p>
                <p className="text-2xl font-bold">
                  {Math.round(customers.reduce((acc, c) => acc + c.totalOrders, 0) / customers.length)}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(customers.reduce((acc, c) => acc + c.totalSpent, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Customer List</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
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
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
              <CardDescription>Manage customer accounts and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow 
                        key={customer.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{customer.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSegmentColor(customer.segment)}>
                            {customer.segment.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(customer.totalSpent)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{customer.lastOrder}</span>
                          </div>
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
                                Edit Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 mr-2" />
                                Call Customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerSegments.map((segment) => (
              <Card key={segment.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{segment.name}</p>
                      <p className="text-2xl font-bold">{segment.count}</p>
                    </div>
                    <Badge className={segment.color}>
                      {segment.count} customers
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Preferences</CardTitle>
                <CardDescription>Most popular product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sweet</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cheese</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chocolate</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Spicy</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Highest spending customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customers
                    .sort((a, b) => b.totalSpent - a.totalSpent)
                    .slice(0, 5)
                    .map((customer, index) => (
                      <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.totalOrders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(customer.totalSpent)}</p>
                          <Badge className={getSegmentColor(customer.segment)}>
                            {customer.segment}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}