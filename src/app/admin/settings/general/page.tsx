'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Switch,
} from '@/components/ui/switch'
import { 
  Save,
  RefreshCw,
  Store,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Truck,
  CreditCard,
  Bell,
  Shield,
  Database,
  Users,
  Settings as SettingsIcon,
  Package
} from 'lucide-react'

// Mock data for settings
const generalSettings = {
  storeName: 'CORNMAN',
  storeEmail: 'info@cornman.com',
  storePhone: '+6012-3456789',
  storeAddress: '123, Jalan Cornman, Kuala Lumpur, 50450',
  currency: 'MYR',
  timezone: 'Asia/Kuala_Lumpur',
  language: 'en',
  maintenanceMode: false,
  allowRegistration: true
}

const deliverySettings = {
  freeShippingThreshold: 50.00,
  standardDeliveryFee: 5.00,
  expressDeliveryFee: 12.00,
  deliveryRadius: 15,
  preparationTime: 30,
  deliveryHours: {
    monday: { open: '09:00', close: '22:00' },
    tuesday: { open: '09:00', close: '22:00' },
    wednesday: { open: '09:00', close: '22:00' },
    thursday: { open: '09:00', close: '22:00' },
    friday: { open: '09:00', close: '22:00' },
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '10:00', close: '23:00' }
  },
  deliveryZones: [
    { name: 'Kuala Lumpur', fee: 5.00, estimatedTime: '30-45 min' },
    { name: 'Selangor', fee: 8.00, estimatedTime: '45-60 min' },
    { name: 'Penang', fee: 15.00, estimatedTime: '2-3 hours' }
  ]
}

const paymentSettings = {
  enabledMethods: ['stripe', 'grabpay', 'touchngo', 'fpx', 'cod'],
  stripe: {
    publishableKey: 'pk_test_...',
    secretKey: 'sk_test_...',
    webhookSecret: 'whsec_...'
  },
  grabpay: {
    merchantId: 'GRAB_MERCHANT_123',
    clientId: 'GRAB_CLIENT_123',
    clientSecret: '***'
  },
  autoCapture: true,
    refundPolicy: '7 days',
  partialPayments: false
}

const notificationSettings = {
  emailNotifications: {
    newOrder: true,
    orderStatusChange: true,
    paymentReceived: true,
    lowStock: true,
    customerRegistration: true
  },
  smsNotifications: {
    orderConfirmation: true,
    deliveryUpdate: true,
    promotional: false
  },
  adminAlerts: {
    failedPayments: true,
    lowStock: true,
    newCustomers: true,
    negativeReviews: true
  }
}

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    general: generalSettings,
    delivery: deliverySettings,
    payment: paymentSettings,
    notifications: notificationSettings
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
  }

  const updateGeneralSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [key]: value
      }
    }))
  }

  const updateDeliverySetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [key]: value
      }
    }))
  }

  const updatePaymentSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [key]: value
      }
    }))
  }

  const updateNotificationSetting = (category: string, key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [category]: {
          ...prev.notifications[category as keyof typeof prev.notifications],
          [key]: value
        }
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="mt-2 text-gray-600">Configure your store settings and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Store Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="h-5 w-5" />
                  <span>Store Information</span>
                </CardTitle>
                <CardDescription>Basic information about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Store Name</label>
                  <Input
                    value={settings.general.storeName}
                    onChange={(e) => updateGeneralSetting('storeName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    type="email"
                    value={settings.general.storeEmail}
                    onChange={(e) => updateGeneralSetting('storeEmail', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    value={settings.general.storePhone}
                    onChange={(e) => updateGeneralSetting('storePhone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={settings.general.storeAddress}
                    onChange={(e) => updateGeneralSetting('storeAddress', e.target.value)}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Regional Settings</span>
                </CardTitle>
                <CardDescription>Configure regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Currency</label>
                  <Select value={settings.general.currency} onValueChange={(value) => updateGeneralSetting('currency', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Timezone</label>
                  <Select value={settings.general.timezone} onValueChange={(value) => updateGeneralSetting('timezone', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kuala_Lumpur">Kuala Lumpur (GMT+8)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                      <SelectItem value="Asia/Bangkok">Bangkok (GMT+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Language</label>
                  <Select value={settings.general.language} onValueChange={(value) => updateGeneralSetting('language', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ms">Bahasa Malaysia</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>System Settings</span>
              </CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Temporarily disable your store</p>
                </div>
                <Switch
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) => updateGeneralSetting('maintenanceMode', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Customer Registration</p>
                  <p className="text-sm text-gray-500">Let customers create accounts</p>
                </div>
                <Switch
                  checked={settings.general.allowRegistration}
                  onCheckedChange={(checked) => updateGeneralSetting('allowRegistration', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Delivery Configuration</span>
                </CardTitle>
                <CardDescription>Configure delivery options and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Free Shipping Threshold</label>
                  <Input
                    type="number"
                    value={settings.delivery.freeShippingThreshold}
                    onChange={(e) => updateDeliverySetting('freeShippingThreshold', parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Standard Delivery Fee</label>
                  <Input
                    type="number"
                    value={settings.delivery.standardDeliveryFee}
                    onChange={(e) => updateDeliverySetting('standardDeliveryFee', parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Express Delivery Fee</label>
                  <Input
                    type="number"
                    value={settings.delivery.expressDeliveryFee}
                    onChange={(e) => updateDeliverySetting('expressDeliveryFee', parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Preparation Time (minutes)</label>
                  <Input
                    type="number"
                    value={settings.delivery.preparationTime}
                    onChange={(e) => updateDeliverySetting('preparationTime', parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Zones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Delivery Zones</span>
                </CardTitle>
                <CardDescription>Manage delivery areas and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settings.delivery.deliveryZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{zone.name}</p>
                        <p className="text-sm text-gray-500">{zone.estimatedTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">RM{zone.fee.toFixed(2)}</p>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add Delivery Zone
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Operating Hours</span>
              </CardTitle>
              <CardDescription>Set your store's operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(settings.delivery.deliveryHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 w-20 capitalize">
                      {day}
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateDeliverySetting('deliveryHours', {
                          ...settings.delivery.deliveryHours,
                          [day]: { ...hours, open: e.target.value }
                        })}
                        className="w-24"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateDeliverySetting('deliveryHours', {
                          ...settings.delivery.deliveryHours,
                          [day]: { ...hours, close: e.target.value }
                        })}
                        className="w-24"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </CardTitle>
                <CardDescription>Configure available payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['stripe', 'grabpay', 'touchngo', 'fpx', 'cod'].map((method) => (
                    <div key={method} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{method}</p>
                        <p className="text-sm text-gray-500">
                          {method === 'stripe' && 'Credit/Debit Cards'}
                          {method === 'grabpay' && 'GrabPay E-Wallet'}
                          {method === 'touchngo' && 'Touch n Go E-Wallet'}
                          {method === 'fpx' && 'Online Banking'}
                          {method === 'cod' && 'Cash on Delivery'}
                        </p>
                      </div>
                      <Switch
                        checked={settings.payment.enabledMethods.includes(method)}
                        onCheckedChange={(checked) => {
                          const methods = checked 
                            ? [...settings.payment.enabledMethods, method]
                            : settings.payment.enabledMethods.filter(m => m !== method)
                          updatePaymentSetting('enabledMethods', methods)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Configuration</CardTitle>
                <CardDescription>Payment processing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Capture Payments</p>
                    <p className="text-sm text-gray-500">Automatically capture payments</p>
                  </div>
                  <Switch
                    checked={settings.payment.autoCapture}
                    onCheckedChange={(checked) => updatePaymentSetting('autoCapture', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Partial Payments</p>
                    <p className="text-sm text-gray-500">Enable split payments</p>
                  </div>
                  <Switch
                    checked={settings.payment.partialPayments}
                    onCheckedChange={(checked) => updatePaymentSetting('partialPayments', checked)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Refund Policy</label>
                  <Select value={settings.payment.refundPolicy} onValueChange={(value) => updatePaymentSetting('refundPolicy', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 days">3 days</SelectItem>
                      <SelectItem value="7 days">7 days</SelectItem>
                      <SelectItem value="14 days">14 days</SelectItem>
                      <SelectItem value="30 days">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Gateway Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Configuration</CardTitle>
              <CardDescription>Configure payment gateway credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Stripe Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Publishable Key</label>
                      <Input
                        value={settings.payment.stripe.publishableKey}
                        onChange={(e) => updatePaymentSetting('stripe', {
                          ...settings.payment.stripe,
                          publishableKey: e.target.value
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Secret Key</label>
                      <Input
                        type="password"
                        value={settings.payment.stripe.secretKey}
                        onChange={(e) => updatePaymentSetting('stripe', {
                          ...settings.payment.stripe,
                          secretKey: e.target.value
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">GrabPay Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Merchant ID</label>
                      <Input
                        value={settings.payment.grabpay.merchantId}
                        onChange={(e) => updatePaymentSetting('grabpay', {
                          ...settings.payment.grabpay,
                          merchantId: e.target.value
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Client ID</label>
                      <Input
                        value={settings.payment.grabpay.clientId}
                        onChange={(e) => updatePaymentSetting('grabpay', {
                          ...settings.payment.grabpay,
                          clientId: e.target.value
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email Notifications</span>
                </CardTitle>
                <CardDescription>Configure email notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.notifications.emailNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'newOrder' && 'Send email for new orders'}
                        {key === 'orderStatusChange' && 'Notify on order status changes'}
                        {key === 'paymentReceived' && 'Confirm payment received'}
                        {key === 'lowStock' && 'Alert when stock is low'}
                        {key === 'customerRegistration' && 'Welcome new customers'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('emailNotifications', key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>SMS Notifications</span>
                </CardTitle>
                <CardDescription>Configure SMS notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.notifications.smsNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'orderConfirmation' && 'Send SMS order confirmation'}
                        {key === 'deliveryUpdate' && 'Notify on delivery updates'}
                        {key === 'promotional' && 'Send promotional messages'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('smsNotifications', key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Admin Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Admin Alerts</span>
              </CardTitle>
              <CardDescription>Configure admin notification alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.notifications.adminAlerts).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'failedPayments' && 'Alert on payment failures'}
                        {key === 'lowStock' && 'Notify on low inventory'}
                        {key === 'newCustomers' && 'Alert on new customer registration'}
                        {key === 'negativeReviews' && 'Notify on negative reviews'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('adminAlerts', key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Configure security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Require 2FA for admin access</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-gray-500">Automatically logout inactive users</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password Expiry</p>
                    <p className="text-sm text-gray-500">Force password reset every</p>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Data Management</span>
                </CardTitle>
                <CardDescription>Manage data and backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restore Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Export Customer Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Export Product Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current system status and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Version</p>
                  <p className="text-lg font-semibold">2.1.0</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Last Backup</p>
                  <p className="text-lg font-semibold">2 hours ago</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Database Size</p>
                  <p className="text-lg font-semibold">245 MB</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-lg font-semibold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}