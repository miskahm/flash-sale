'use client';

import { useEffect } from 'react';

interface OrderConfirmationProps {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
}

export default function OrderConfirmation({ isOpen, orderNumber, onClose }: OrderConfirmationProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-[fade-in_0.3s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl animate-[scale-in_0.5s_ease-out]">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-t-2xl text-center">
            <div className="text-7xl mb-4 animate-[bounce-subtle_0.6s_ease-out]">✓</div>
            <h2 className="text-4xl font-bold text-white mb-2">Order Confirmed!</h2>
            <p className="text-green-100 text-lg">Thank you for your purchase</p>
          </div>

          <div className="p-8">
            {/* Order Details */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 mb-6 border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Order Number</p>
                  <p className="text-white text-2xl font-bold">{orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Order Date</p>
                  <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="text-gray-400 text-sm mb-1">Estimated Delivery</p>
                <p className="text-green-400 text-xl font-bold">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📧</span>
                  <h3 className="text-white font-bold">Confirmation Email</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  A confirmation email with tracking details has been sent to your email address.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🚚</span>
                  <h3 className="text-white font-bold">Track Your Order</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  You can track your order status using the order number above.
                </p>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 mb-6">
              <h3 className="text-white font-bold text-lg mb-3">📦 What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-white font-semibold">Order Processing</p>
                    <p className="text-gray-400 text-sm">We&apos;ll prepare your items for shipping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-white font-semibold">Shipping</p>
                    <p className="text-gray-400 text-sm">Your order will be shipped within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="text-white font-semibold">Delivery</p>
                    <p className="text-gray-400 text-sm">FREE delivery to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all"
              >
                🖨️ Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}