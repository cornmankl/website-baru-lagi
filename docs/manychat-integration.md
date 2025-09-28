# ManyChat Integration Documentation

## Overview

This document describes the integration between CORNMAN website and ManyChat for automated customer communication via WhatsApp.

## Features

### Website → ManyChat Webhooks

**Order Status Updates:**
- **Order Confirmed** → Triggers "Thank You" flow
- **Payment Failed** → Triggers "Payment Retry" sequence  
- **Out for Delivery** → Send tracking info via WhatsApp
- **Delivered** → Request review + offer discount for next order

### ManyChat → Website Webhooks  

**Customer Data Sync:**
- **New subscriber** → Create customer profile
- **Profile updated** → Update delivery preferences
- **Order placed** → Sync with inventory system

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# ManyChat API Configuration
MANYCHAT_API_KEY=your_manychat_api_key_here
MANYCHAT_WEBHOOK_SECRET=your_webhook_secret_here

# ManyChat Flow IDs
MANYCHAT_FLOW_THANK_YOU=your_thank_you_flow_id
MANYCHAT_FLOW_PAYMENT_RETRY=your_payment_retry_flow_id
MANYCHAT_FLOW_OUT_FOR_DELIVERY=your_out_for_delivery_flow_id
MANYCHAT_FLOW_DELIVERED=your_delivered_flow_id
MANYCHAT_FLOW_WELCOME=your_welcome_flow_id
MANYCHAT_FLOW_PROFILE_UPDATED=your_profile_updated_flow_id
MANYCHAT_FLOW_ORDER_CONFIRMATION=your_order_confirmation_flow_id
```

### 2. ManyChat Setup

#### Getting API Key
1. Go to ManyChat Dashboard
2. Navigate to Settings → API
3. Copy your API Key

#### Setting Up Webhooks
1. In ManyChat, go to Settings → Webhooks
2. Add new webhook URL: `https://your-domain.com/api/webhooks/manychat/receive`
3. Configure events to send:
   - New subscriber
   - Custom field updated
   - Custom trigger (for order placement)

#### Creating Flows
Create the following flows in ManyChat:

1. **Thank You Flow** (`MANYCHAT_FLOW_THANK_YOU`)
   - Trigger: Order confirmed
   - Send order confirmation message
   - Include estimated delivery time
   - Thank customer for purchase

2. **Payment Retry Flow** (`MANYCHAT_FLOW_PAYMENT_RETRY`)
   - Trigger: Payment failed
   - Send payment failure notification
   - Include retry payment link
   - Provide support contact

3. **Out for Delivery Flow** (`MANYCHAT_FLOW_OUT_FOR_DELIVERY`)
   - Trigger: Order out for delivery
   - Send delivery person details
   - Include tracking link
   - Provide estimated arrival time

4. **Delivered Flow** (`MANYCHAT_FLOW_DELIVERED`)
   - Trigger: Order delivered
   - Request product review
   - Offer discount for next order
   - Include review link

5. **Welcome Flow** (`MANYCHAT_FLOW_WELCOME`)
   - Trigger: New subscriber
   - Send welcome message
   - Introduce CORNMAN products
   - Offer first-time discount

6. **Profile Updated Flow** (`MANYCHAT_FLOW_PROFILE_UPDATED`)
   - Trigger: Profile updated
   - Confirm changes received
   - Update delivery preferences

7. **Order Confirmation Flow** (`MANYCHAT_FLOW_ORDER_CONFIRMATION`)
   - Trigger: Order placed via ManyChat
   - Send order confirmation
   - Sync with website inventory

### 3. Website Integration

#### Using the ManyChat Service

```typescript
import { manyChatService } from '@/lib/services/manychat'

// Send order confirmation
await manyChatService.sendOrderConfirmation({
  orderId: 'ORD-001',
  customerId: 'customer@example.com',
  customerName: 'John Doe',
  customerPhone: '+60123456789',
  orderDetails: {
    totalAmount: 45.90,
    items: [...],
    deliveryAddress: '123, Jalan Cornman'
  }
})

// Send delivery notification
await manyChatService.sendOutForDelivery(
  'ORD-001',
  'customer@example.com',
  'John Doe',
  '+60123456789',
  { name: 'Delivery Person', phone: '+60123456789' },
  'https://cornman.com/track/ORD-001',
  '30-45 minutes'
)
```

#### Using the React Hook

```typescript
import { useManyChat } from '@/hooks/useManyChat'

function MyComponent() {
  const { sendOrderConfirmation, sendDeliveryConfirmation } = useManyChat()

  const handleOrderComplete = async (orderData) => {
    const success = await sendOrderConfirmation(orderData)
    if (success) {
      // Show success message
    }
  }
}
```

### 4. Admin Configuration

Configure ManyChat integration in admin panel:

1. Go to `/admin/settings/manychat`
2. Enter your API key and webhook secret
3. Configure flow IDs for each event type
4. Enable/disable specific events
5. Test integration using built-in test tools

## API Endpoints

### Receive Webhooks from ManyChat
```
POST /api/webhooks/manychat/receive
```

Events handled:
- `new_subscriber`
- `profile_updated`
- `order_placed`

### Send Webhooks to ManyChat
```
POST /api/webhooks/manychat/send
```

Events supported:
- `order_confirmed`
- `payment_failed`
- `out_for_delivery`
- `delivered`

## Webhook Payload Examples

### Order Confirmed
```json
{
  "event": "order_confirmed",
  "data": {
    "orderId": "ORD-2024-001",
    "customerId": "customer@example.com",
    "customerName": "John Doe",
    "customerPhone": "+60123456789",
    "orderDetails": {
      "totalAmount": 45.90,
      "items": [
        { "name": "CRNMN Sweet Butter", "quantity": 2, "price": 25.80 }
      ],
      "deliveryAddress": "123, Jalan Cornman, Kuala Lumpur"
    },
    "estimatedDelivery": "2-4 hours"
  }
}
```

### New Subscriber
```json
{
  "event": "new_subscriber",
  "data": {
    "subscriber_id": "123456789",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+60123456789",
    "email": "john@example.com",
    "custom_fields": {
      "delivery_address": "123, Jalan Cornman",
      "preferred_delivery_time": "evening"
    }
  }
}
```

## Testing

### Admin Panel Testing
1. Go to `/admin/settings/manychat`
2. Use "Test Integration" tab
3. Test individual flows and webhooks
4. View integration status

### Manual Testing
```bash
# Test webhook endpoint
curl -X POST https://your-domain.com/api/webhooks/manychat/receive \
  -H "Content-Type: application/json" \
  -d '{"event":"new_subscriber","data":{"subscriber_id":"123","first_name":"Test"}}'

# Test sending to ManyChat
curl -X POST https://your-domain.com/api/webhooks/manychat/send \
  -H "Content-Type: application/json" \
  -d '{"event":"order_confirmed","data":{"orderId":"TEST-001"}}'
```

## Security

1. **Webhook Verification**: All incoming webhooks are verified using a secret key
2. **API Key Protection**: ManyChat API key is stored securely in environment variables
3. **Rate Limiting**: Implement rate limiting for webhook endpoints
4. **Input Validation**: All webhook data is validated before processing

## Troubleshooting

### Common Issues

1. **Webhooks not receiving**
   - Check ManyChat webhook URL configuration
   - Verify server is accessible from internet
   - Check firewall settings

2. **API authentication failed**
   - Verify API key is correct
   - Check API key permissions in ManyChat
   - Ensure environment variables are set

3. **Flows not triggering**
   - Verify flow IDs are correct
   - Check if subscriber exists in ManyChat
   - Test flow manually in ManyChat

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=manychat=*
```

## Support

For integration support:
1. Check admin panel logs
2. Review browser console for errors
3. Verify ManyChat dashboard for webhook delivery status
4. Contact development team for advanced issues