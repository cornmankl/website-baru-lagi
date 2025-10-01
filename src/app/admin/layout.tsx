'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  Settings, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut
} from 'lucide-react'

const adminNavigation = [
  {
    label: 'Dashboard',
    items: [
      { name: 'Overview', href: '/admin', icon: LayoutDashboard },
      { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    ]
  },
  {
    label: 'Orders',
    items: [
      { name: 'All Orders', href: '/admin/orders', icon: ShoppingCart },
      { name: 'Order Processing', href: '/admin/orders/processing', icon: ShoppingCart },
      { name: 'Delivery Tracking', href: '/admin/orders/delivery', icon: ShoppingCart },
    ]
  },
  {
    label: 'Products',
    items: [
      { name: 'Product Catalog', href: '/admin/products', icon: Package },
      { name: 'Inventory', href: '/admin/inventory', icon: Package },
      { name: 'Categories', href: '/admin/categories', icon: Package },
    ]
  },
  {
    label: 'Customers',
    items: [
      { name: 'Customer List', href: '/admin/customers', icon: Users },
      { name: 'Customer Insights', href: '/admin/customers/insights', icon: Users },
      { name: 'Segments', href: '/admin/customers/segments', icon: Users },
    ]
  },
  {
    label: 'Marketing',
    items: [
      { name: 'Campaigns', href: '/admin/marketing/campaigns', icon: MessageSquare },
      { name: 'ManyChat', href: '/admin/marketing/manychat', icon: MessageSquare },
      { name: 'Promotions', href: '/admin/marketing/promotions', icon: MessageSquare },
    ]
  },
  {
    label: 'Content',
    items: [
      { name: 'Blog Posts', href: '/admin/content/blog', icon: FileText },
      { name: 'Recipes', href: '/admin/content/recipes', icon: FileText },
      { name: 'Media Library', href: '/admin/content/media', icon: FileText },
    ]
  },
  {
    label: 'Finance',
    items: [
      { name: 'Sales Reports', href: '/admin/finance/sales', icon: CreditCard },
      { name: 'Payment Processing', href: '/admin/finance/payments', icon: CreditCard },
      { name: 'P&L Statement', href: '/admin/finance/pl-statement', icon: CreditCard },
    ]
  },
  {
    label: 'Settings',
    items: [
      { name: 'General', href: '/admin/settings/general', icon: Settings },
      { name: 'Users & Roles', href: '/admin/settings/users', icon: Settings },
      { name: 'ManyChat', href: '/admin/settings/manychat', icon: Settings },
      { name: 'Integrations', href: '/admin/settings/integrations', icon: Settings },
      { name: 'Delivery Zones', href: '/admin/settings/delivery', icon: Settings },
    ]
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-green-600">CORNMAN</h1>
            <Badge variant="outline" className="ml-2">ADMIN</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          {adminNavigation.map((section) => (
            <div key={section.label} className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.label}
              </h3>
              <div className="mt-1 space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@cornman.com</p>
                </div>
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}