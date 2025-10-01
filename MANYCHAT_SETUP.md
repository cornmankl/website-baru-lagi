# ManyChat Integration Setup Guide

## 📋 ManyChat API Configuration

**API Key:** `3003801:e08684d563c15098daeb41a99fd788d3`

This API key has been configured in your environment variables and is ready for use.

## 🚀 Setting Up ManyChat Flows

### Required Flows to Create

You need to create the following flows in your ManyChat account:

#### 1. Thank You Flow (`MANYCHAT_FLOW_THANK_YOU`)
- **Trigger:** Order confirmation
- **Purpose:** Send order confirmation and thank you message
- **Content:**
  - Order details (items, total amount)
  - Estimated delivery time
  - Thank you message
  - Contact information

#### 2. Payment Retry Flow (`MANYCHAT_FLOW_PAYMENT_RETRY`)
- **Trigger:** Payment failure
- **Purpose:** Notify customer and provide retry option
- **Content:**
  - Payment failure notification
  - Reason for failure
  - Retry payment link
  - Customer support contact

#### 3. Order Shipped Flow (`MANYCHAT_FLOW_ORDER_SHIPPED`)
- **Trigger:** Order marked as shipped
- **Purpose:** Send tracking information
- **Content:**
  - Order shipped confirmation
  - Tracking link
  - Delivery person details
  - Estimated arrival time

#### 4. Order Delivered Flow (`MANYCHAT_FLOW_ORDER_DELIVERED`)
- **Trigger:** Order marked as delivered
- **Purpose:** Request review and offer discount
- **Content:**
  - Delivery confirmation
  - Review request
  - Discount code for next order
  - Thank you message

#### 5. Customer Update Flow (`MANYCHAT_FLOW_CUSTOMER_UPDATE`)
- **Trigger:** Customer profile update
- **Purpose:** Confirm changes to customer
- **Content:**
  - Profile update confirmation
  - Summary of changes
  - Support contact if changes were not made by customer

### 🔧 Webhook Configuration

#### 1. Set Up Webhook in ManyChat

1. **Go to ManyChat Dashboard**
   - Navigate to Settings → API
   - Find Webhooks section

2. **Configure Webhook URL**
   ```
   https://your-domain.vercel.app/api/webhooks/manychat/receive
   ```

3. **Webhook Events to Subscribe:**
   - `subscriber.new` - New subscriber
   - `subscriber.updated` - Profile updates
   - `flow.started` - Flow started
   - `flow.finished` - Flow completed

#### 2. Test Webhook Connection

```bash
# Test webhook endpoint
curl -X POST https://your-domain.vercel.app/api/health

# Test ManyChat integration
curl -X POST https://your-domain.vercel.app/api/webhooks/manychat/receive \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": {"message": "Test webhook"}}'
```

### 📱 WhatsApp Integration

#### 1. Connect WhatsApp Business Account

1. **In ManyChat:**
   - Go to Channels → WhatsApp
   - Connect your WhatsApp Business Account
   - Verify phone number

2. **Configure WhatsApp Templates:**
   - Order confirmation template
   - Payment failure template
   - Shipping update template
   - Delivery confirmation template

#### 2. Template Examples

**Order Confirmation Template:**
```
Hello {{customer_name}}! 🌽

Your CORNMAN order #{{order_id}} has been confirmed!

📋 Order Details:
{{order_items}}

💰 Total: RM{{total_amount}}

🚚 Estimated Delivery: {{estimated_delivery}}

Thank you for choosing CORNMAN! 🎉
```

**Payment Failure Template:**
```
Hi {{customer_name}}, 

We encountered an issue with your payment for order #{{order_id}}.

❌ Payment Failed: {{failure_reason}}

🔄 Please retry your payment:
{{retry_url}}

Need help? Contact us at support@cornman.com
```

### 🔍 Testing the Integration

#### 1. Test API Connection

```javascript
// Test ManyChat API connection
const testConnection = async () => {
  const response = await fetch('https://api.manychat.com/fb/page/getInfo', {
    headers: {
      'Authorization': 'Bearer 3003801:e08684d563c15098daeb41a99fd788d3'
    }
  });
  
  const data = await response.json();
  console.log('API Connection Test:', data);
};
```

#### 2. Test Flow Triggers

1. **Create a test order** in your admin panel
2. **Check if ManyChat flow** is triggered
3. **Verify message delivery** to test phone number

#### 3. Test Webhook Reception

1. **Send test webhook** from ManyChat
2. **Check server logs** for webhook reception
3. **Verify data processing** in your application

### 📊 Monitoring and Analytics

#### 1. Monitor Webhook Delivery

- Check Vercel logs for webhook reception
- Monitor ManyChat dashboard for message delivery status
- Set up error alerts for failed webhooks

#### 2. Track Message Performance

- Open rates
- Click-through rates
- Conversion rates
- Customer engagement metrics

### 🔒 Security Considerations

#### 1. API Key Security
- ✅ API key is stored in environment variables
- ✅ Never expose API key in client-side code
- ✅ Rotate API key periodically

#### 2. Webhook Security
- ✅ Verify webhook signatures
- ✅ Validate incoming data
- ✅ Rate limit webhook endpoints

#### 3. Data Privacy
- ✅ Comply with PDPA (Malaysia)
- ✅ Get customer consent for WhatsApp messages
- ✅ Provide opt-out options

### 🚨 Troubleshooting

#### Common Issues

1. **Webhook Not Receiving Data**
   - Check webhook URL in ManyChat
   - Verify server is running
   - Check firewall settings

2. **API Authentication Failed**
   - Verify API key is correct
   - Check API key permissions
   - Ensure API key is not expired

3. **Messages Not Sending**
   - Check WhatsApp template approval
   - Verify phone number format
   - Check message content restrictions

4. **Flow Not Triggering**
   - Verify flow IDs are correct
   - Check flow triggers configuration
   - Test flow manually in ManyChat

#### Debug Commands

```bash
# Check environment variables
echo $MANYCHAT_API_KEY

# Test API connection
curl -H "Authorization: Bearer 3003801:e08684d563c15098daeb41a99fd788d3" \
  https://api.manychat.com/fb/page/getInfo

# Check webhook endpoint
curl -X POST https://your-domain.vercel.app/api/webhooks/manychat/receive \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": {}}'
```

### 📞 Support

If you encounter any issues:

1. **ManyChat Documentation:** https://manychat.github.io/manychat-api/
2. **WhatsApp Business API:** https://developers.facebook.com/docs/whatsapp/
3. **Vercel Support:** https://vercel.com/support
4. **Project Repository:** https://github.com/cornmankl/website-baru-lagi

---

## 🎉 Next Steps

1. **Create Required Flows** in ManyChat dashboard
2. **Configure Webhook URL** in ManyChat settings
3. **Test Integration** with sample data
4. **Monitor Performance** after deployment
5. **Set Up Analytics** for message tracking

Your ManyChat integration is now ready to automate customer communication! 🚀🇲🇾