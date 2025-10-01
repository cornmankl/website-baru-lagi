'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Award,
  AlertTriangle
} from 'lucide-react'

// Mock data for analytics
const salesData = {
  daily: [
    { date: '2024-01-10', revenue: 1250.00, orders: 35, customers: 28 },
    { date: '2024-01-11', revenue: 1450.00, orders: 42, customers: 35 },
    { date: '2024-01-12', revenue: 1180.00, orders: 33, customers: 26 },
    { date: '2024-01-13', revenue: 1680.00, orders: 48, customers: 41 },
    { date: '2024-01-14', revenue: 1520.00, orders: 44, customers: 37 },
    { date: '2024-01-15', revenue: 1890.00, orders: 54, customers: 46 }
  ],
  weekly: [
    { week: 'Week 1', revenue: 8750.00, orders: 245, customers: 198 },
    { week: 'Week 2', revenue: 9230.00, orders: 261, customers: 213 },
    { week: 'Week 3', revenue: 8960.00, orders: 252, customers: 205 },
    { week: 'Week 4', revenue: 10240.00, orders: 289, customers: 234 }
  ],
  monthly: [
    { month: 'Oct 2023', revenue: 32450.00, orders: 892, customers: 723 },
    { month: 'Nov 2023', revenue: 35680.00, orders: 987, customers: 801 },
    { month: 'Dec 2023', revenue: 42130.00, orders: 1167, customers: 945 },
    { month: 'Jan 2024', revenue: 45231.89, orders: 1247, customers: 1012 }
  ]
}

const productPerformance = [
  { name: 'CRNMN Sweet Butter', revenue: 4423.80, orders: 342, growth: 15.2 },
  { name: 'CRNMN Chocolate', revenue: 4597.10, orders: 289, growth: 22.1 },
  { name: 'CRNMN Cheese', revenue: 3978.30, orders: 267, growth: 8.7 },
  { name: 'CRNMN Honey', revenue: 3954.60, orders: 234, growth: 12.4 },
  { name: 'CRNMN Spicy Thai', revenue: 2752.20, orders: 198, growth: -5.2 },
  { name: 'CRNMN Caramel', revenue: 2816.10, orders: 189, growth: 18.9 }
]

const customerMetrics = {
  newCustomers: 156,
  returningCustomers: 856,
  avgOrderValue: 36.26,
  customerLifetimeValue: 245.80,
  retentionRate: 78.5,
  churnRate: 21.5
}

const deliveryPerformance = {
  onTime: 92.3,
  averageDeliveryTime: 28,
  deliveryZones: [
    { zone: 'Kuala Lumpur', orders: 456, onTime: 94.5 },
    { zone: 'Selangor', orders: 389, onTime: 91.2 },
    { zone: 'Penang', orders: 256, onTime: 88.7 }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('monthly')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getCurrentData = () => {
    switch (timeRange) {
      case 'daily': return salesData.daily
      case 'weekly': return salesData.weekly
      case 'monthly': return salesData.monthly
      default: return salesData.monthly
    }
  }

  const calculateGrowth = () => {
    const data = getCurrentData()
    if (data.length < 2) return 0
    const current = data[data.length - 1].revenue
    const previous = data[data.length - 2].revenue
    return ((current - previous) / previous) * 100
  }

  const growth = calculateGrowth()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="mt-2 text-gray-600">Comprehensive business performance insights</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(getCurrentData().reduce((acc, curr) => acc + curr.revenue, 0))}
                </p>
                <p className="text-xs text-muted-foreground flex items-center">
                  {growth > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  {Math.abs(growth).toFixed(1)}% from previous period
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">
                  {getCurrentData().reduce((acc, curr) => acc + curr.orders, 0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {timeRange === 'daily' ? 'Today' : timeRange === 'weekly' ? 'This week' : 'This month'}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customers</p>
                <p className="text-2xl font-bold">
                  {getCurrentData().reduce((acc, curr) => acc + curr.customers, 0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Unique customers
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(customerMetrics.avgOrderValue)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Per order average
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue Chart Visualization</p>
                    <p className="text-sm text-gray-400">Interactive chart showing revenue trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Order Volume</CardTitle>
                <CardDescription>Number of orders over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Order Volume Chart</p>
                        <p className="text-sm text-gray-400">Interactive chart showing order trends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                        <p className="text-2xl font-bold">3.2%</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +0.3% from last month
                        </p>
                      </div>
                      <Zap className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer Retention</p>
                        <p className="text-2xl font-bold">{formatPercent(customerMetrics.retentionRate)}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +2.1% from last month
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer Lifetime Value</p>
                        <p className="text-2xl font-bold">{formatCurrency(customerMetrics.customerLifetimeValue)}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12.5% from last month
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                    <CardDescription>Revenue by product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {productPerformance.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.orders} orders</p>
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

                {/* Product Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Category</CardTitle>
                    <CardDescription>Breakdown by product category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Category Revenue Chart</p>
                        <p className="text-sm text-gray-400">Pie chart showing revenue by category</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">New Customers</p>
                        <p className="text-2xl font-bold">{customerMetrics.newCustomers}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15.3% from last month
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Returning Customers</p>
                        <p className="text-2xl font-bold">{customerMetrics.returningCustomers}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +8.7% from last month
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                        <p className="text-2xl font-bold">{formatPercent(customerMetrics.retentionRate)}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +2.1% improvement
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                        <p className="text-2xl font-bold">{formatPercent(customerMetrics.churnRate)}</p>
                        <p className="text-xs text-red-600 flex items-center">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          -1.2% improvement
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Acquisition & Retention</CardTitle>
                  <CardDescription>Customer behavior over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Customer Analytics Chart</p>
                      <p className="text-sm text-gray-400">Line chart showing customer trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">On-Time Delivery</p>
                        <p className="text-2xl font-bold">{formatPercent(deliveryPerformance.onTime)}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +1.8% improvement
                        </p>
                      </div>
                      <Package className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                        <p className="text-2xl font-bold">{deliveryPerformance.averageDeliveryTime}m</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          -3m faster
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                        <p className="text-2xl font-bold">
                          {deliveryPerformance.deliveryZones.reduce((acc, zone) => acc + zone.orders, 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          This month
                        </p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance by Zone</CardTitle>
                  <CardDescription>On-time delivery rates by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deliveryPerformance.deliveryZones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{zone.zone}</p>
                          <p className="text-sm text-gray-500">{zone.orders} deliveries</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPercent(zone.onTime)}</p>
                          <Badge className={zone.onTime >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {zone.onTime >= 90 ? 'Excellent' : 'Good'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )
    }