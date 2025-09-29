import { useCallback } from 'react'
import { manyChatService, OrderData, PaymentFailureData, DeliveredData, DeliveryPerson } from '@/lib/services/manychat'

export function useManyChat() {
  // Send order confirmation
  const sendOrderConfirmation = useCallback(async (orderData: OrderData) => {
    return await manyChatService.sendOrderConfirmation(orderData)
  }, [])

  // Send payment failure notification
  const sendPaymentFailure = useCallback(async (paymentData: PaymentFailureData) => {
    return await manyChatService.sendPaymentFailure(paymentData)
  }, [])

  // Send out for delivery notification
  const sendOutForDelivery = useCallback(async (
    orderId: string,
    customerId: string,
    customerName: string,
    customerPhone: string,
    deliveryPerson: DeliveryPerson,
    trackingLink: string,
    estimatedArrival: string
  ) => {
    return await manyChatService.sendOutForDelivery(
      orderId,
      customerId,
      customerName,
      customerPhone,
      deliveryPerson,
      trackingLink,
      estimatedArrival
    )
  }, [])

  // Send delivery confirmation with discount
  const sendDeliveryConfirmation = useCallback(async (deliveredData: DeliveredData) => {
    return await manyChatService.sendDeliveryConfirmation(deliveredData)
  }, [])

  // Get subscriber by phone number
  const getSubscriberByPhone = useCallback(async (phone: string) => {
    return await manyChatService.getSubscriberByPhone(phone)
  }, [])

  // Send custom message
  const sendCustomMessage = useCallback(async (subscriberId: string, message: string) => {
    return await manyChatService.sendCustomMessage(subscriberId, message)
  }, [])

  // Add custom field to subscriber
  const addCustomField = useCallback(async (subscriberId: string, fieldName: string, value: any) => {
    return await manyChatService.addCustomField(subscriberId, fieldName, value)
  }, [])

  // Check if subscriber exists
  const subscriberExists = useCallback(async (subscriberId: string) => {
    return await manyChatService.subscriberExists(subscriberId)
  }, [])

  return {
    sendOrderConfirmation,
    sendPaymentFailure,
    sendOutForDelivery,
    sendDeliveryConfirmation,
    getSubscriberByPhone,
    sendCustomMessage,
    addCustomField,
    subscriberExists,
  }
}