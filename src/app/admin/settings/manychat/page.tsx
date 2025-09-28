'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageSquare, 
  Settings, 
  Webhook, 
  TestTube, 
  CheckCircle, 
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react'

export default function ManyChatSettingsPage() {
  const [settings, setSettings] = useState({
    apiKey: '',
    webhookSecret: '',
    webhookUrl: '',
    flows: {
      thankYou: '',
      paymentRetry: '',
      outForDelivery: '',
      delivered: '',
      welcome: '',
      profileUpdated: '',
      orderConfirmation: ''
    },
    enabled: true,
    events: {
      orderConfirmed: true,
      paymentFailed: true,
      outForDelivery: true,
      delivered: true,
      newSubscriber: true,
      profileUpdated: true,
      orderPlaced: true
    }
  })

  const [testStatus, setTestStatus] = useState<{
    apiKey: boolean | null
    webhook: boolean | null
    flows: Record<string, boolean | null>
  }>({
    apiKey: null,
    webhook: null,
    flows: {}
  })

  const handleSaveSettings = async () => {
    // Save settings to backend
    console.log('Saving settings:', settings)
    // TODO: Implement API call to save settings
  }

  const testApiKey = async () => {
    setTestStatus(prev => ({ ...prev, apiKey: null }))
    try {
      // Test API key
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setTestStatus(prev => ({ ...prev, apiKey: true }))
    } catch (error) {
      setTestStatus(prev => ({ ...prev, apiKey: false }))
    }
  }

  const testWebhook = async () => {
    setTestStatus(prev => ({ ...prev, webhook: null }))
    try {
      // Test webhook
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setTestStatus(prev => ({ ...prev, webhook: true }))
    } catch (error) {
      setTestStatus(prev => ({ ...prev, webhook: false }))
    }
  }

  const testFlow = async (flowName: string) => {
    setTestStatus(prev => ({
      ...prev,
      flows: { ...prev.flows, [flowName]: null }
    }))
    try {
      // Test flow
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setTestStatus(prev => ({
        ...prev,
        flows: { ...prev.flows, [flowName]: true }
      }))
    } catch (error) {
      setTestStatus(prev => ({
        ...prev,
        flows: { ...prev.flows, [flowName]: false }
      }))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ManyChat Integration</h1>
          <p className="text-gray-600 mt-2">
            Configure your ManyChat integration for automated customer communication
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
          />
          <span className="text-sm font-medium">
            {settings.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="flows">Flow Settings</TabsTrigger>
          <TabsTrigger value="events">Event Settings</TabsTrigger>
          <TabsTrigger value="test">Test Integration</TabsTrigger>
        </TabsList>

        {/* API Configuration */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure your ManyChat API credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">ManyChat API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={settings.apiKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="Enter your ManyChat API key"
                />
                <p className="text-sm text-gray-600">
                  Get your API key from ManyChat dashboard → Settings → API
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookSecret">Webhook Secret</Label>
                <Input
                  id="webhookSecret"
                  type="password"
                  value={settings.webhookSecret}
                  onChange={(e) => setSettings(prev => ({ ...prev, webhookSecret: e.target.value }))}
                  placeholder="Enter webhook secret for verification"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={testApiKey} disabled={!settings.apiKey}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test API Key
                </Button>
                {testStatus.apiKey !== null && (
                  <Badge variant={testStatus.apiKey ? "default" : "destructive"}>
                    {testStatus.apiKey ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Valid
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Invalid
                      </>
                    )}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks */}
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>
                Configure webhook endpoints for two-way communication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhookUrl"
                    value={settings.webhookUrl}
                    onChange={(e) => setSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    placeholder="https://your-domain.com/api/webhooks/manychat/receive"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(settings.webhookUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  This URL should be configured in your ManyChat webhook settings
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Webhook Events</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Website → ManyChat</p>
                      <p className="text-sm text-gray-600">Order status updates, notifications</p>
                    </div>
                    <Badge variant="outline">POST /api/webhooks/manychat/send</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">ManyChat → Website</p>
                      <p className="text-sm text-gray-600">Customer data sync, profile updates</p>
                    </div>
                    <Badge variant="outline">POST /api/webhooks/manychat/receive</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={testWebhook}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Webhook
                </Button>
                {testStatus.webhook !== null && (
                  <Badge variant={testStatus.webhook ? "default" : "destructive"}>
                    {testStatus.webhook ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Working
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Failed
                      </>
                    )}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flow Settings */}
        <TabsContent value="flows">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Flow Settings
              </CardTitle>
              <CardDescription>
                Configure ManyChat flow IDs for different events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="thankYouFlow">Thank You Flow</Label>
                  <Input
                    id="thankYouFlow"
                    value={settings.flows.thankYou}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      flows: { ...prev.flows, thankYou: e.target.value }
                    }))}
                    placeholder="Flow ID for order confirmation"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFlow('thankYou')}
                    disabled={!settings.flows.thankYou}
                  >
                    Test Flow
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentRetryFlow">Payment Retry Flow</Label>
                  <Input
                    id="paymentRetryFlow"
                    value={settings.flows.paymentRetry}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      flows: { ...prev.flows, paymentRetry: e.target.value }
                    }))}
                    placeholder="Flow ID for payment failure"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFlow('paymentRetry')}
                    disabled={!settings.flows.paymentRetry}
                  >
                    Test Flow
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outForDeliveryFlow">Out for Delivery Flow</Label>
                  <Input
                    id="outForDeliveryFlow"
                    value={settings.flows.outForDelivery}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      flows: { ...prev.flows, outForDelivery: e.target.value }
                    }))}
                    placeholder="Flow ID for delivery tracking"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFlow('outForDelivery')}
                    disabled={!settings.flows.outForDelivery}
                  >
                    Test Flow
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveredFlow">Delivered Flow</Label>
                  <Input
                    id="deliveredFlow"
                    value={settings.flows.delivered}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      flows: { ...prev.flows, delivered: e.target.value }
                    }))}
                    placeholder="Flow ID for delivery confirmation"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFlow('delivered')}
                    disabled={!settings.flows.delivered}
                  >
                    Test Flow
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcomeFlow">Welcome Flow</Label>
                  <Input
                    id="welcomeFlow"
                    value={settings.flows.welcome}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      flows: { ...prev.flows, welcome: e.target.value }
                    }))}
                    placeholder="Flow ID for new subscribers"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFlow('welcome')}
                    disabled={!settings.flows.welcome}
                  >
                    Test Flow
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileUpdatedFlow">Profile Updated Flow</Label>
                  <Input
                    id="profileUpdatedFlow"
                    value={settings.flows.profileUpdated}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      flows: { ...prev.flows, profileUpdated: e.target.value }
                    }))}
                    placeholder="Flow ID for profile updates"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFlow('profileUpdated')}
                    disabled={!settings.flows.profileUpdated}
                  >
                    Test Flow
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Event Settings */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
              <CardDescription>
                Enable or disable specific webhook events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Website → ManyChat Events</h3>
                <div className="space-y-3">
                  {[
                    { key: 'orderConfirmed', label: 'Order Confirmed', desc: 'Trigger thank you flow' },
                    { key: 'paymentFailed', label: 'Payment Failed', desc: 'Trigger payment retry sequence' },
                    { key: 'outForDelivery', label: 'Out for Delivery', desc: 'Send tracking info via WhatsApp' },
                    { key: 'delivered', label: 'Delivered', desc: 'Request review + offer discount' }
                  ].map((event) => (
                    <div key={event.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.label}</p>
                        <p className="text-sm text-gray-600">{event.desc}</p>
                      </div>
                      <Switch
                        checked={settings.events[event.key as keyof typeof settings.events]}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          events: { ...prev.events, [event.key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">ManyChat → Website Events</h3>
                <div className="space-y-3">
                  {[
                    { key: 'newSubscriber', label: 'New Subscriber', desc: 'Create customer profile' },
                    { key: 'profileUpdated', label: 'Profile Updated', desc: 'Update delivery preferences' },
                    { key: 'orderPlaced', label: 'Order Placed', desc: 'Sync with inventory system' }
                  ].map((event) => (
                    <div key={event.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.label}</p>
                        <p className="text-sm text-gray-600">{event.desc}</p>
                      </div>
                      <Switch
                        checked={settings.events[event.key as keyof typeof settings.events]}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          events: { ...prev.events, [event.key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Integration */}
        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Test Integration</CardTitle>
              <CardDescription>
                Test your ManyChat integration with sample data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Order Confirmation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Send a test order confirmation to ManyChat
                    </p>
                    <Button className="w-full">
                      Send Test Order Confirmation
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Payment Failure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Send a test payment failure notification
                    </p>
                    <Button className="w-full" variant="destructive">
                      Send Test Payment Failure
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Delivery Notification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Send a test out for delivery notification
                    </p>
                    <Button className="w-full" variant="outline">
                      Send Test Delivery Notification
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Delivery Confirmation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Send a test delivery confirmation with discount
                    </p>
                    <Button className="w-full" variant="default">
                      Send Test Delivery Confirmation
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Integration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>API Connection</span>
                      {testStatus.apiKey === null ? (
                        <Badge variant="outline">Not Tested</Badge>
                      ) : testStatus.apiKey ? (
                        <Badge variant="default">Connected</Badge>
                      ) : (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Webhook Endpoint</span>
                      {testStatus.webhook === null ? (
                        <Badge variant="outline">Not Tested</Badge>
                      ) : testStatus.webhook ? (
                        <Badge variant="default">Working</Badge>
                      ) : (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  )
}