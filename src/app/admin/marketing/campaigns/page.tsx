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
  Plus, 
  Play, 
  Pause,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Calendar,
  MessageSquare,
  Mail,
  Smartphone,
  Facebook,
  Instagram,
  Share2,
  BarChart3,
  PieChart
} from 'lucide-react'

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 'CAMP-001',
    name: 'New Year Promotion 2024',
    type: 'promotion',
    channel: 'email',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    budget: 2000.00,
    spent: 1247.50,
    targetAudience: 5000,
    reached: 3847,
    clicks: 423,
    conversions: 89,
    revenue: 3245.60,
    roi: 160.2,
    description: 'New year discount on all CRNMN products'
  },
  {
    id: 'CAMP-002',
    name: 'Chocolate Lovers Week',
    type: 'product_launch',
    channel: 'social',
    status: 'completed',
    startDate: '2024-01-08',
    endDate: '2024-01-14',
    budget: 1500.00,
    spent: 1489.00,
    targetAudience: 3000,
    reached: 2654,
    clicks: 298,
    conversions: 67,
    revenue: 2890.40,
    roi: 94.1,
    description: 'Special promotion for chocolate corn products'
  },
  {
    id: 'CAMP-003',
    name: 'Weekend Special',
    type: 'promotion',
    channel: 'sms',
    status: 'scheduled',
    startDate: '2024-01-20',
    endDate: '2024-01-21',
    budget: 800.00,
    spent: 0,
    targetAudience: 2000,
    reached: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    roi: 0,
    description: 'Weekend discount for loyal customers'
  },
  {
    id: 'CAMP-004',
    name: 'VIP Customer Exclusive',
    type: 'retention',
    channel: 'email',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    budget: 1000.00,
    spent: 456.80,
    targetAudience: 500,
    reached: 423,
    clicks: 89,
    conversions: 34,
    revenue: 1876.30,
    roi: 310.7,
    description: 'Exclusive offers for VIP customers'
  },
  {
    id: 'CAMP-005',
    name: 'Penang Market Expansion',
    type: 'awareness',
    channel: 'social',
    status: 'paused',
    startDate: '2024-01-05',
    endDate: '2024-01-25',
    budget: 2500.00,
    spent: 1120.00,
    targetAudience: 8000,
    reached: 5432,
    clicks: 234,
    conversions: 45,
    revenue: 1567.80,
    roi: 39.9,
    description: 'Brand awareness campaign in Penang area'
  }
]

const campaignTypes = [
  { name: 'Promotion', count: 2, color: 'bg-blue-100 text-blue-800' },
  { name: 'Product Launch', count: 1, color: 'bg-green-100 text-green-800' },
  { name: 'Retention', count: 1, color: 'bg-purple-100 text-purple-800' },
  { name: 'Awareness', count: 1, color: 'bg-orange-100 text-orange-800' }
]

const channelPerformance = [
  { name: 'Email', icon: Mail, campaigns: 8, avgROI: 145.2, spent: 3240.00, revenue: 8945.60 },
  { name: 'SMS', icon: Smartphone, campaigns: 3, avgROI: 89.7, spent: 1200.00, revenue: 2276.40 },
  { name: 'Social Media', icon: Share2, campaigns: 12, avgROI: 67.3, spent: 5600.00, revenue: 9448.80 },
  { name: 'ManyChat', icon: MessageSquare, campaigns: 5, avgROI: 203.4, spent: 1800.00, revenue: 5461.20 }
]

export default function CampaignsPage() {
  const [campaigns] = useState(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'paused': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'sms': return <Smartphone className="h-4 w-4" />
      case 'social': return <Share2 className="h-4 w-4" />
      case 'manychat': return <MessageSquare className="h-4 w-4" />
      default: return <Share2 className="h-4 w-4" />
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter
    const matchesChannel = channelFilter === 'all' || campaign.channel === channelFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesChannel
  })

  const totalBudget = campaigns.reduce((acc, campaign) => acc + campaign.budget, 0)
  const totalSpent = campaigns.reduce((acc, campaign) => acc + campaign.spent, 0)
  const totalRevenue = campaigns.reduce((acc, campaign) => acc + campaign.revenue, 0)
  const avgROI = campaigns.reduce((acc, campaign) => acc + campaign.roi, 0) / campaigns.length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
          <p className="mt-2 text-gray-600">Manage and track marketing campaigns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
                <p className="text-xs text-gray-500">
                  {formatPercent((totalSpent / totalBudget) * 100)} spent
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                <p className="text-xs text-gray-500">
                  Across {campaigns.length} campaigns
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +24.5% from target
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average ROI</p>
                <p className="text-2xl font-bold">{avgROI.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Above target
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
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
                    placeholder="Search campaigns..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="product_launch">Product Launch</SelectItem>
                    <SelectItem value="retention">Retention</SelectItem>
                    <SelectItem value="awareness">Awareness</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={channelFilter} onValueChange={setChannelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="manychat">ManyChat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>Campaigns ({filteredCampaigns.length})</CardTitle>
              <CardDescription>Manage your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget vs Spent</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-gray-500">{campaign.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {campaign.startDate} - {campaign.endDate}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {campaign.type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getChannelIcon(campaign.channel)}
                            <span className="capitalize">{campaign.channel}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{formatCurrency(campaign.spent)}</p>
                            <p className="text-xs text-gray-500">
                              of {formatCurrency(campaign.budget)}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full" 
                                style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {campaign.roi > 100 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`font-medium ${
                              campaign.roi > 100 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {campaign.roi.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{campaign.reached}/{campaign.targetAudience} reached</p>
                            <p className="text-gray-500">{campaign.conversions} conversions</p>
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
                                Edit Campaign
                              </DropdownMenuItem>
                              {campaign.status === 'active' ? (
                                <DropdownMenuItem>
                                  <Pause className="h-4 w-4 mr-2" />
                                  Pause Campaign
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="h-4 w-4 mr-2" />
                                  Resume Campaign
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Campaign
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>ROI comparison across campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Campaign Performance Chart</p>
                    <p className="text-sm text-gray-400">Bar chart showing ROI by campaign</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Revenue by marketing channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Channel Performance Chart</p>
                    <p className="text-sm text-gray-400">Pie chart showing revenue by channel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>Campaigns with highest ROI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns
                  .sort((a, b) => b.roi - a.roi)
                  .slice(0, 5)
                  .map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-gray-500">{campaign.channel} • {campaign.type.replace('_', ' ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(campaign.revenue)}</p>
                        <div className="flex items-center justify-end">
                          {campaign.roi > 100 ? (
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                          )}
                          <span className={`text-sm ${
                            campaign.roi > 100 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {campaign.roi.toFixed(1)}% ROI
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channelPerformance.map((channel, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <channel.icon className="h-8 w-8 text-blue-500" />
                    <Badge variant="outline">{channel.campaigns} campaigns</Badge>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{channel.name}</p>
                    <p className="text-2xl font-bold">{channel.avgROI.toFixed(1)}% ROI</p>
                    <p className="text-sm text-gray-500">Average ROI</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Spent:</span> {formatCurrency(channel.spent)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Revenue:</span> {formatCurrency(channel.revenue)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Pre-built email campaign templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold mb-2">Welcome Series</h3>
                  <p className="text-sm text-gray-600 mb-3">Welcome new customers with a series of emails</p>
                  <Badge variant="outline">Email</Badge>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold mb-2">Promotional Offer</h3>
                  <p className="text-sm text-gray-600 mb-3">Send discount codes and special offers</p>
                  <Badge variant="outline">Email</Badge>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold mb-2">Product Launch</h3>
                  <p className="text-sm text-gray-600 mb-3">Announce new products to your audience</p>
                  <Badge variant="outline">Email</Badge>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold mb-2">Flash Sale</h3>
                  <p className="text-sm text-gray-600 mb-3">Limited time offers and flash sales</p>
                  <Badge variant="outline">SMS</Badge>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold mb-2">Re-engagement</h3>
                  <p className="text-sm text-gray-600 mb-3">Win back inactive customers</p>
                  <Badge variant="outline">Email</Badge>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold mb-2">VIP Exclusive</h3>
                  <p className="text-sm text-gray-600 mb-3">Exclusive offers for VIP customers</p>
                  <Badge variant="outline">Email</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}