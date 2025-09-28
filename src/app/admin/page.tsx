'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

// Mock data for dashboard metrics
const metrics = {
  totalRevenue: 45231.89,
  revenueGrowth: 12.5,
  totalOrders: 1247,
  ordersGrowth: 8.2,
  totalCustomers: 892,
  customersGrowth: 15.3,
  avgOrderValue: 36.26,
  conversionRate: 3.2,
  customerSatisfaction: 4.8
}

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Ahmad Ibrahim',
    amount: 45.90,
    status: 'delivered',
    time: '2 hours ago',
    location: 'Kuala Lumpur'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Siti Aminah',
    amount: 32.70,
    status: 'processing',
    time: '3 hours ago',
    location: 'Selangor'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Mohamed Hassan',
    amount: 28.90,
    status: 'shipped',
    time: '4 hours ago',
    location: 'Penang'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Fatimah Ali',
    amount: 51.40,
    status: 'pending',
    time: '5 hours ago',
    location: 'Kuala Lumpur'
  }
]

const topProducts = [
  {
    name: 'CRNMN Sweet Butter',
    sales: 342,
    revenue: 4423.80,
    growth: 15.2
  },
  {
    name: 'CRNMN Chocolate',
    sales: 289,
    revenue: 4597.10,
    growth: 22.1
  },
  {
    name: 'CRNMN Cheese',
    sales: 267,
    revenue: 3978.30,
    growth: 8.7
  },
  {
    name: 'CRNMN Honey',
    sales: 234,
    revenue: 3954.60,
    growth: 12.4
  },
  {
    name: 'CRNMN Spicy Thai',
    sales: 198,
    revenue: 2752.20,
    growth: -5.2
  }
]

const alerts = [
  {
    type: 'warning',
    title: 'Low Inventory',
    message: 'CRNMN Chocolate stock below threshold (15 units left)',
    time: '1 hour ago'
  },
  {
    type: 'info',
    title: 'New Review',
    message: '5-star review received for CRNMN Sweet Butter',
    time: '2 hours ago'
  },
  {
    type: 'error',
    title: 'Payment Failed',
    message: 'Payment failed for order ORD-2024-005',
    time: '3 hours ago'
  }
]

export default function AdminDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {metrics.revenueGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {Math.abs(metrics.revenueGrowth)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {metrics.ordersGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {Math.abs(metrics.ordersGrowth)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {metrics.customersGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {Math.abs(metrics.customersGrowth)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.avgOrderValue)}</div>
            <p className="text-xs text-muted-foreground">
              Conversion rate: {metrics.conversionRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{order.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(order.amount)}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>System alerts and important updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-500">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best-selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(product.revenue)}</p>
                    <p className={`text-sm flex items-center justify-end ${
                      product.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(product.growth)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Latest customer feedback and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {metrics.customerSatisfaction}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(metrics.customerSatisfaction) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Average rating from 1,247 reviews</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">5 stars</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm text-gray-600">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">4 stars</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm text-gray-600">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">3 stars</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
                <span className="text-sm text-gray-600">7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">2 stars</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '2%' }}></div>
                </div>
                <span className="text-sm text-gray-600">2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">1 star</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                </div>
                <span className="text-sm text-gray-600">1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}