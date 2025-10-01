// ManyChat Integration Service
export interface ManyChatWebhookData {
  event: string
  data: any
}

export interface OrderData {
  orderId: string
  customerId: string
  customerName: string
  customerPhone: string
  orderDetails: {
    totalAmount: number
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    deliveryAddress: string
  }
  estimatedDelivery?: string
}

export interface DeliveryPerson {
  name: string
  phone: string
}

export interface PaymentFailureData {
  orderId: string
  customerId: string
  customerName: string
  customerPhone: string
  failureReason: string
  retryUrl: string
}

export interface DeliveredData {
  orderId: string
  customerId: string
  customerName: string
  customerPhone: string
  discountCode: string
  discountAmount: number
}

export class ManyChatService {
  private static instance: ManyChatService
  private apiKey: string
  private baseUrl = 'https://api.manychat.com'

  private constructor() {
    this.apiKey = process.env.MANYCHAT_API_KEY || ''
  }

  public static getInstance(): ManyChatService {
    if (!ManyChatService.instance) {
      ManyChatService.instance = new ManyChatService()
    }
    return ManyChatService.instance
  }

  // Send order status updates to ManyChat
  async sendOrderStatusUpdate(event: string, data: any): Promise<boolean> {
    try {
      const response = await fetch('/api/webhooks/manychat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, data }),
      })

      return response.ok
    } catch (error) {
      console.error('Error sending order status update:', error)
      return false
    }
  }

  // Order confirmed - Trigger "Thank You" flow
  async sendOrderConfirmation(orderData: OrderData): Promise<boolean> {
    return this.sendOrderStatusUpdate('order_confirmed', orderData)
  }

  // Payment failed - Trigger "Payment Retry" sequence
  async sendPaymentFailure(paymentData: PaymentFailureData): Promise<boolean> {
    return this.sendOrderStatusUpdate('payment_failed', paymentData)
  }

  // Out for delivery - Send tracking info via WhatsApp
  async sendOutForDelivery(
    orderId: string,
    customerId: string,
    customerName: string,
    customerPhone: string,
    deliveryPerson: DeliveryPerson,
    trackingLink: string,
    estimatedArrival: string
  ): Promise<boolean> {
    return this.sendOrderStatusUpdate('out_for_delivery', {
      orderId,
      customerId,
      customerName,
      customerPhone,
      deliveryPerson,
      trackingLink,
      estimatedArrival,
    })
  }

  // Delivered - Request review + offer discount for next order
  async sendDeliveryConfirmation(deliveredData: DeliveredData): Promise<boolean> {
    return this.sendOrderStatusUpdate('delivered', deliveredData)
  }

  // Get subscriber info by phone number
  async getSubscriberByPhone(phone: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/fb/subscriber/findByPhone?phone_number=${phone}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`ManyChat API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error getting subscriber by phone:', error)
      return null
    }
  }

  // Send custom message to subscriber
  async sendCustomMessage(subscriberId: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/fb/page/send_message`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriber_id: subscriberId,
          message: {
            text: message,
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error('Error sending custom message:', error)
      return false
    }
  }

  // Add custom field to subscriber
  async addCustomField(subscriberId: string, fieldName: string, value: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/fb/subscriber/setCustomField`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriber_id: subscriberId,
          field_name: fieldName,
          value: value,
        }),
      })

      return response.ok
    } catch (error) {
      console.error('Error adding custom field:', error)
      return false
    }
  }

  // Check if subscriber exists
  async subscriberExists(subscriberId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/fb/subscriber/info?subscriber_id=${subscriberId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      return response.ok
    } catch (error) {
      console.error('Error checking subscriber existence:', error)
      return false
    }
  }

  // Get flow information
  async getFlowInfo(flowId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/fb/flow/getInfo?flow_id=${flowId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`ManyChat API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting flow info:', error)
      return null
    }
  }
}

// Export singleton instance
export const manyChatService = ManyChatService.getInstance()