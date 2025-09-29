import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    console.log('Sending webhook to ManyChat:', { event, data })

    // Handle different order status events
    switch (event) {
      case 'order_confirmed':
        await handleOrderConfirmed(data)
        break
      case 'payment_failed':
        await handlePaymentFailed(data)
        break
      case 'out_for_delivery':
        await handleOutForDelivery(data)
        break
      case 'delivered':
        await handleDelivered(data)
        break
      default:
        console.log('Unhandled event:', event)
        return NextResponse.json({ error: 'Unhandled event type' }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: 'Webhook sent to ManyChat successfully' })
  } catch (error) {
    console.error('Error sending webhook to ManyChat:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle order confirmed event - Trigger "Thank You" flow
async function handleOrderConfirmed(data: any) {
  try {
    const { orderId, customerId, customerName, customerPhone, orderDetails, estimatedDelivery } = data
    
    const flowData = {
      customer_name: customerName,
      order_id: orderId,
      order_total: orderDetails.totalAmount,
      estimated_delivery: estimatedDelivery,
      items: orderDetails.items.map((item: any) => item.name).join(', '),
      delivery_address: orderDetails.deliveryAddress
    }

    await sendToManyChatFlow('thank_you_flow', customerId, flowData)
    
    console.log('Order confirmation sent to ManyChat for order:', orderId)
  } catch (error) {
    console.error('Error handling order confirmed:', error)
  }
}

// Handle payment failed event - Trigger "Payment Retry" sequence
async function handlePaymentFailed(data: any) {
  try {
    const { orderId, customerId, customerName, customerPhone, failureReason, retryUrl } = data
    
    const flowData = {
      customer_name: customerName,
      order_id: orderId,
      failure_reason: failureReason,
      retry_payment_url: retryUrl,
      support_contact: '+6012-3456789' // CORNMAN support number
    }

    await sendToManyChatFlow('payment_retry_flow', customerId, flowData)
    
    console.log('Payment failure notification sent to ManyChat for order:', orderId)
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

// Handle out for delivery event - Send tracking info via WhatsApp
async function handleOutForDelivery(data: any) {
  try {
    const { orderId, customerId, customerName, customerPhone, deliveryPerson, trackingLink, estimatedArrival } = data
    
    const flowData = {
      customer_name: customerName,
      order_id: orderId,
      delivery_person_name: deliveryPerson.name,
      delivery_person_phone: deliveryPerson.phone,
      tracking_link: trackingLink,
      estimated_arrival: estimatedArrival,
      live_tracking_enabled: true
    }

    await sendToManyChatFlow('out_for_delivery_flow', customerId, flowData)
    
    console.log('Out for delivery notification sent to ManyChat for order:', orderId)
  } catch (error) {
    console.error('Error handling out for delivery:', error)
  }
}

// Handle delivered event - Request review + offer discount for next order
async function handleDelivered(data: any) {
  try {
    const { orderId, customerId, customerName, customerPhone, discountCode, discountAmount } = data
    
    const flowData = {
      customer_name: customerName,
      order_id: orderId,
      discount_code: discountCode,
      discount_amount: discountAmount,
      discount_valid_days: 7,
      review_link: `https://cornman.com/review/${orderId}`,
      next_order_link: 'https://cornman.com/products'
    }

    await sendToManyChatFlow('delivered_flow', customerId, flowData)
    
    console.log('Delivery confirmation sent to ManyChat for order:', orderId)
  } catch (error) {
    console.error('Error handling delivered:', error)
  }
}

// Helper function to send flow to ManyChat
async function sendToManyChatFlow(flowName: string, subscriberId: string, data: any) {
  try {
    const manyChatApiUrl = 'https://api.manychat.com/fb/page/send_flow'
    const apiKey = process.env.MANYCHAT_API_KEY
    
    if (!apiKey) {
      console.warn('ManyChat API key not configured')
      return
    }

    const flowId = getFlowId(flowName)
    if (!flowId) {
      console.warn(`Flow ID not found for: ${flowName}`)
      return
    }

    const payload = {
      flow_id: flowId,
      subscriber_id: subscriberId,
      data: data
    }

    const response = await fetch(manyChatApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`ManyChat API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Successfully sent flow to ManyChat:', { flowName, result })
    
    return result
  } catch (error) {
    console.error('Error sending flow to ManyChat:', error)
    throw error
  }
}

// Helper function to get flow ID by name
function getFlowId(flowName: string): string {
  const flowIds: Record<string, string> = {
    'thank_you_flow': process.env.MANYCHAT_FLOW_THANK_YOU || '',
    'payment_retry_flow': process.env.MANYCHAT_FLOW_PAYMENT_RETRY || '',
    'out_for_delivery_flow': process.env.MANYCHAT_FLOW_OUT_FOR_DELIVERY || '',
    'delivered_flow': process.env.MANYCHAT_FLOW_DELIVERED || ''
  }
  
  return flowIds[flowName] || ''
}

// Helper function to find subscriber ID by customer ID
async function findSubscriberId(customerId: string): Promise<string | null> {
  try {
    // In a real implementation, you would query your database to find the ManyChat subscriber ID
    // For now, we'll return a placeholder
    // TODO: Implement database lookup
    return null
  } catch (error) {
    console.error('Error finding subscriber ID:', error)
    return null
  }
}