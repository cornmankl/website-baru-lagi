'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Trash2, 
  Heart,
  ArrowRight,
  Clock,
  Truck
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SlideOutCart() {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart()

  const formatPrice = (price: number) => `RM${price.toFixed(2)}`

  const shipping = state.subtotal > 50 ? 0 : 5.00
  const tax = state.subtotal * 0.06 // 6% SST
  const total = state.subtotal + shipping + tax

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({state.totalItems} items)
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some delicious corn to get started!</p>
                <Button onClick={closeCart} asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {item.weight && (
                        <p className="text-xs text-gray-500 mb-2">{item.weight}</p>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-amber-600">
                          {formatPrice(item.price)}
                        </span>
                        {item.comparePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.comparePrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {state.items.length > 0 && (
            <div className="border-t bg-gray-50 p-6 space-y-4">
              {/* Promo Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (6% SST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-amber-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {state.subtotal < 50 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-800 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>
                      Add {formatPrice(50 - state.subtotal)} more for free shipping!
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  asChild
                >
                  <Link href="/checkout" onClick={closeCart}>
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={closeCart}
                    asChild
                  >
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-800 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Same-day delivery available for orders before 6 PM</span>
                </div>
              </div>

              {/* Save for Later */}
              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-amber-600">
                  <Heart className="h-4 w-4 mr-2" />
                  Save items for later
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}