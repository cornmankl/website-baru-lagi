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
  RefreshCw, 
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  FileText,
  Receipt,
  Banknote,
  Smartphone,
  Globe
} from 'lucide-react'

// Mock data for payments
const mockPayments = [
  {
    id: 'PAY-2024-001',
    orderId: 'ORD-2024-001',
    customer: 'Ahmad Ibrahim',
    amount: 45.90,
    method: 'credit_card',
    status: 'completed',
    transactionId: 'ch_3Ovx1l2eZvKYlo2C1ABC123',
    provider: 'stripe',
    processedAt: '2024-01-15T14:32:00Z',
    settledAt: '2024-01-15T14:35:00Z',
    fee: 1.37,
    netAmount: 44.53
  },
  {
    id: 'PAY-2024-002',
    orderId: 'ORD-2024-002',
    customer: 'Siti Aminah',
    amount: 32.70,
    method: 'ewallet',
    status: 'completed',
    transactionId: 'MYR2024011500001234',
    provider: 'grabpay',
    processedAt: '2024-01-15T13:18:00Z',
    settledAt: '2024-01-15T13:20:00Z',
    fee: 0.98,
    netAmount: 31.72
  },
  {
    id: 'PAY-2024-003',
    orderId: 'ORD-2024-003',
    customer: 'Mohamed Hassan',
    amount: 28.90,
    method: 'bank_transfer',
    status: 'pending',
    transactionId: 'BT2024011500005678',
    provider: 'fpx',
    processedAt: '2024-01-15T12:47:00Z',
    settledAt: null,
    fee: 0.87,
    netAmount: 28.03
  },
  {
    id: 'PAY-2024-004',
    orderId: 'ORD-2024-004',
    customer: 'Fatimah Ali',
    amount: 51.40,
    method: 'credit_card',
    status: 'failed',
    transactionId: 'ch_3Ovx1l2eZvKYlo2C1DEF456',
    provider: 'stripe',
    processedAt: '2024-01-15T11:25:00Z',
    settledAt: null,
    fee: 0,
    netAmount: 0,
    failureReason: 'Insufficient funds'
  },
  {
    id: 'PAY-2024-005',
    orderId: 'ORD-2024-005',
    customer: 'Razak Ahmad',
    amount: 38.80,
    method: 'ewallet',
    status: 'completed',
    transactionId: 'MYR2024011400009876',
    provider: 'touchngo',
    processedAt: '2024-01-14T19:22:00Z',
    settledAt: '2024-01-14T19:25:00Z',
    fee: 1.16,
    netAmount: 37.64
  }
]

const paymentMethods = [
  { name: 'Credit Card', icon: CreditCard, count: 156, revenue: 12450.00 },
  { name: 'E-Wallet', icon: Smartphone, count: 89, revenue: 3240.00 },
  { name: 'Bank Transfer', icon: Banknote, count: 45, revenue: 1890.00 },
  { name: 'Cash on Delivery', icon: DollarSign, count: 23, revenue: 890.00 }
]

const paymentProviders = [
  { name: 'Stripe', status: 'connected', transactions: 156, success: 98.2 },
  { name: 'GrabPay', status: 'connected', transactions: 89, success: 99.1 },
  { name: 'Touch n Go', status: 'connected', transactions: 67, success: 97.8 },
  { name: 'FPX', status: 'connected', transactions: 45, success: 95.6 }
]

export default function PaymentsPage() {
  const [payments] = useState(mockPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [providerFilter, setProviderFilter] = useState('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="h-4 w-4" />
      case 'ewallet': return <Smartphone className="h-4 w-4" />
      case 'bank_transfer': return <Banknote className="h-4 w-4" />
      case 'cod': return <DollarSign className="h-4 w-4" />
      default: return <CreditCard className="h-4 w-4" />
    }
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter
    const matchesProvider = providerFilter === 'all' || payment.provider === providerFilter
    
    return matchesSearch && matchesStatus && matchesMethod && matchesProvider
  })

  const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0)
  const totalFees = payments.reduce((acc, payment) => acc + payment.fee, 0)
  const netRevenue = totalRevenue - totalFees
  const successRate = (payments.filter(p => p.status === 'completed').length / payments.length) * 100

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Processing</h1>
          <p className="mt-2 text-gray-600">Manage payment transactions and reconciliation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Payments
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate P&L
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
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
                <p className="text-sm font-medium text-gray-600">Net Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(netRevenue)}</p>
                <p className="text-xs text-gray-500">
                  After {formatCurrency(totalFees)} fees
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">{successRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.3% improvement
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Payments</p>
                <p className="text-2xl font-bold">
                  {payments.filter(p => p.status === 'failed').length}
                </p>
                <p className="text-xs text-red-600 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Requires attention
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
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
                    placeholder="Search payments..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="ewallet">E-Wallet</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={providerFilter} onValueChange={setProviderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="grabpay">GrabPay</SelectItem>
                    <SelectItem value="touchngo">Touch n Go</SelectItem>
                    <SelectItem value="fpx">FPX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
              <CardDescription>Manage and track payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Processed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.orderId}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(payment.amount)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getMethodIcon(payment.method)}
                            <span className="capitalize">
                              {payment.method.replace('_', ' ')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payment.status)}
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{payment.provider}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(payment.processedAt).toLocaleDateString()}</p>
                            <p className="text-gray-500">
                              {new Date(payment.processedAt).toLocaleTimeString()}
                            </p>
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
                                <Receipt className="h-4 w-4 mr-2" />
                                Generate Receipt
                              </DropdownMenuItem>
                              {payment.status === 'failed' && (
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Retry Payment
                                </DropdownMenuItem>
                              )}
                              {payment.status === 'pending' && (
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Complete
                                </DropdownMenuItem>
                              )}
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

        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <method.icon className="h-8 w-8 text-blue-500" />
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{method.name}</p>
                    <p className="text-2xl font-bold">{method.count}</p>
                    <p className="text-sm text-gray-500">transactions</p>
                    <p className="text-lg font-medium mt-2">{formatCurrency(method.revenue)}</p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentProviders.map((provider, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold">{provider.name}</p>
                      <Badge className={
                        provider.status === 'connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }>
                        {provider.status}
                      </Badge>
                    </div>
                    <Globe className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Transactions</span>
                      <span className="font-medium">{provider.transactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">{provider.success}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Pending Reconciliation</p>
                  <p className="text-3xl font-bold text-yellow-600">12</p>
                  <p className="text-sm text-gray-500">transactions</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Reconciled Today</p>
                  <p className="text-3xl font-bold text-green-600">45</p>
                  <p className="text-sm text-gray-500">transactions</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Discrepancies Found</p>
                  <p className="text-3xl font-bold text-red-600">3</p>
                  <p className="text-sm text-gray-500">require review</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Summary</CardTitle>
              <CardDescription>Daily payment reconciliation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">January 15, 2024</p>
                    <p className="text-sm text-gray-500">45 transactions reconciled</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(2847.60)}</p>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">January 14, 2024</p>
                    <p className="text-sm text-gray-500">38 transactions reconciled</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(2156.80)}</p>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                  <div>
                    <p className="font-medium">January 13, 2024</p>
                    <p className="text-sm text-gray-500">42 transactions, 3 discrepancies</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(2678.90)}</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Attention Required</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}