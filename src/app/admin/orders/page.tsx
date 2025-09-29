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
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingCart,
  Package,
  MessageSquare
} from 'lucide-react'
import { useManyChat } from '@/hooks/useManyChat'
import { toast } from '@/hooks/use-toast'

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: 'Ahmad Ibrahim',
      email: 'ahmad@email.com',
      phone: '+6012-3456789',
      location: 'Kuala Lumpur'
    },
    date: '2024-01-15',
    time: '14:30',
    amount: 45.90,
    status: 'delivered',
    paymentStatus: 'paid',
    items: [
      { name: 'CRNMN Sweet Butter', quantity: 2, price: 25.80 },
      { name: 'CRNMN Chocolate', quantity: 1, price: 15.90 },
      { name: 'Delivery Fee', quantity: 1, price: 4.20 }
    ],
    rider: 'Mohamed Ali'
  },
  {
    id: 'ORD-2024-002',
    customer: {
      name: 'Siti Aminah',
      email: 'siti@email.com',
      phone: '+6019-8765432',
      location: 'Selangor'
    },
    date: '2024-01-15',
    time: '13:15',
    amount: 32.70,
    status: 'processing',
    paymentStatus: 'paid',
    items: [
      { name: 'CRNMN Cheese', quantity: 2, price: 29.80 },
      { name: 'Delivery Fee', quantity: 1, price: 2.90 }
    ],
    rider: null
  },
  {
    id: 'ORD-2024-003',
    customer: {
      name: 'Mohamed Hassan',
      email: 'hassan@email.com',
      phone: '+6017-6543210',
      location: 'Penang'
    },
    date: '2024-01-15',
    time: '12:45',
    amount: 28.90,
    status: 'shipped',
    paymentStatus: 'paid',
    items: [
      { name: 'CRNMN Honey', quantity: 1, price: 16.90 },
      { name: 'CRNMN Spicy Thai', quantity: 1, price: 13.90 },
      { name: 'Delivery Fee', quantity: 1, price: 5.10 }
    ],
    rider: 'Fatimah Yusof'
  },
  {
    id: 'ORD-2024-004',
    customer: {
      name: 'Fatimah Ali',
      email: 'fatimah@email.com',
      phone: '+6011-2345678',
      location: 'Kuala Lumpur'
    },
    date: '2024-01-15',
    time: '11:30',
    amount: 51.40,
    status: 'pending',
    paymentStatus: 'pending',
    items: [
      { name: 'CRNMN Caramel', quantity: 2, price: 29.80 },
      { name: 'CRNMN Sweet Butter', quantity: 1, price: 12.90 },
      { name: 'CRNMN Chocolate', quantity: 1, price: 15.90 },
      { name: 'Delivery Fee', quantity: 1, price: 4.20 }
    ],
    rider: null
  },
  {
    id: 'ORD-2024-005',
    customer: {
      name: 'Razak Ahmad',
      email: 'razak@email.com',
      phone: '+6016-3456789',
      location: 'Selangor'
    },
    date: '2024-01-14',
    time: '19:20',
    amount: 38.80,
    status: 'delivered',
    paymentStatus: 'paid',
    items: [
      { name: 'CRNMN Cheese', quantity: 1, price: 14.90 },
      { name: 'CRNMN Honey', quantity: 1, price: 16.90 },
      { name: 'Delivery Fee', quantity: 1, price: 7.00 }
    ],
    rider: 'Ahmad Faisal'
  }
]

export default function OrdersPage() {
  const [orders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const { sendOrderConfirmation, sendPaymentFailure, sendOutForDelivery, sendDeliveryConfirmation } = useManyChat()

  // ManyChat notification handlers
  const handleSendOrderConfirmation = async (order: any) => {
    try {
      const success = await sendOrderConfirmation({
        orderId: order.id,
        customerId: order.customer.email,
        customerName: order.customer.name,
        customerPhone: order.customer.phone,
        orderDetails: {
          totalAmount: order.amount,
          items: order.items,
          deliveryAddress: `${order.customer.location}`
        },
        estimatedDelivery: '2-4 hours'
      })
      
      if (success) {
        toast({
          title: "Success",
          description: "Order confirmation sent to ManyChat",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send order confirmation",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send order confirmation",
        variant: "destructive",
      })
    }
  }

  const handleSendOutForDelivery = async (order: any) => {
    try {
      const success = await sendOutForDelivery(
        order.id,
        order.customer.email,
        order.customer.name,
        order.customer.phone,
        {
          name: order.rider || 'Delivery Team',
          phone: '+6012-3456789'
        },
        `https://cornman.com/track/${order.id}`,
        '30-45 minutes'
      )
      
      if (success) {
        toast({
          title: "Success",
          description: "Delivery notification sent to ManyChat",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send delivery notification",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send delivery notification",
        variant: "destructive",
      })
    }
  }

  const handleSendDeliveryConfirmation = async (order: any) => {
    try {
      const discountCode = `THANKS${order.id.split('-')[2]}`
      const success = await sendDeliveryConfirmation({
        orderId: order.id,
        customerId: order.customer.email,
        customerName: order.customer.name,
        customerPhone: order.customer.phone,
        discountCode,
        discountAmount: 5.00
      })
      
      if (success) {
        toast({
          title: "Success",
          description: "Delivery confirmation sent to ManyChat",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send delivery confirmation",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send delivery confirmation",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'shipped': return <Truck className="h-4 w-4 text-blue-500" />
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'pending': return <XCircle className="h-4 w-4 text-gray-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter
    
    return matchesSearch && matchesStatus && matchesPayment
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-2 text-gray-600">Manage and track all customer orders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
          <Button>
            Create New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>Manage and track customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{order.customer.location}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{order.date}</p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
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
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="h-4 w-4 mr-2" />
                            Assign Rider
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendOrderConfirmation(order)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Order Confirmation
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendOutForDelivery(order)}>
                            <MapPin className="h-4 w-4 mr-2" />
                            Send Delivery Notification
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendDeliveryConfirmation(order)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Send Delivery Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel Order
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
    </div>
  )
}