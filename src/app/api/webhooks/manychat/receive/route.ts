import { NextRequest, NextResponse } from 'next/server'

// ManyChat webhook verification helper
function verifyManyChatSignature(request: NextRequest, secret: string): boolean {
  // In production, you should verify the webhook signature
  // For now, we'll skip verification for development
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    // Verify webhook signature (in production)
    const secret = process.env.MANYCHAT_WEBHOOK_SECRET
    if (!verifyManyChatSignature(request, secret || '')) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    console.log('Received ManyChat webhook:', { event, data })

    // Handle different webhook events
    switch (event) {
      case 'new_subscriber':
        await handleNewSubscriber(data)
        break
      case 'profile_updated':
        await handleProfileUpdated(data)
        break
      case 'order_placed':
        await handleOrderPlaced(data)
        break
      default:
        console.log('Unhandled event:', event)
    }

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error processing ManyChat webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle new subscriber event
async function handleNewSubscriber(data: any) {
  try {
    const { subscriber_id, first_name, last_name, phone, email, custom_fields } = data
    
    // Create or update customer profile in database
    // This would integrate with your customer management system
    const customerData = {
      manyChatId: subscriber_id,
      firstName: first_name,
      lastName: last_name,
      phone: phone,
      email: email,
      preferences: custom_fields || {},
      source: 'manychat',
      subscribedAt: new Date().toISOString()
    }

    // TODO: Save to database using Prisma
    console.log('Creating customer profile:', customerData)
    
    // Send welcome message back to ManyChat
    await sendToManyChat('new_subscriber_welcome', {
      subscriber_id,
      customerData
    })
  } catch (error) {
    console.error('Error handling new subscriber:', error)
  }
}

// Handle profile updated event
async function handleProfileUpdated(data: any) {
  try {
    const { subscriber_id, custom_fields } = data
    
    // Update customer delivery preferences
    const preferences = {
      deliveryAddress: custom_fields?.delivery_address,
      deliveryTime: custom_fields?.preferred_delivery_time,
      specialInstructions: custom_fields?.special_instructions,
      notificationPreferences: custom_fields?.notification_preferences
    }

    // TODO: Update customer in database
    console.log('Updating customer preferences:', preferences)
    
    // Confirm update to customer
    await sendToManyChat('profile_updated_confirmation', {
      subscriber_id,
      preferences
    })
  } catch (error) {
    console.error('Error handling profile update:', error)
  }
}

// Handle order placed event
async function handleOrderPlaced(data: any) {
  try {
    const { subscriber_id, order_data } = data
    
    // Sync order with inventory system
    const orderInfo = {
      manyChatOrderId: order_data?.order_id,
      customerId: subscriber_id,
      items: order_data?.items || [],
      totalAmount: order_data?.total_amount,
      deliveryAddress: order_data?.delivery_address,
      specialInstructions: order_data?.special_instructions,
      orderDate: new Date().toISOString()
    }

    // TODO: Create order in database and update inventory
    console.log('Creating order from ManyChat:', orderInfo)
    
    // Send order confirmation
    await sendToManyChat('order_confirmation', {
      subscriber_id,
      orderInfo
    })
  } catch (error) {
    console.error('Error handling order placed:', error)
  }
}

// Helper function to send data back to ManyChat
async function sendToManyChat(flowName: string, data: any) {
  try {
    const manyChatApiUrl = 'https://api.manychat.com/fb/page/send_flow'
    const apiKey = process.env.MANYCHAT_API_KEY
    
    if (!apiKey) {
      console.warn('ManyChat API key not configured')
      return
    }

    const payload = {
      flow_id: getFlowId(flowName),
      subscriber_id: data.subscriber_id,
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

    console.log('Successfully sent to ManyChat:', flowName)
  } catch (error) {
    console.error('Error sending to ManyChat:', error)
  }
}

// Helper function to get flow ID by name
function getFlowId(flowName: string): string {
  const flowIds: Record<string, string> = {
    'new_subscriber_welcome': process.env.MANYCHAT_FLOW_WELCOME || '',
    'profile_updated_confirmation': process.env.MANYCHAT_FLOW_PROFILE_UPDATED || '',
    'order_confirmation': process.env.MANYCHAT_FLOW_ORDER_CONFIRMATION || ''
  }
  
  return flowIds[flowName] || ''
}