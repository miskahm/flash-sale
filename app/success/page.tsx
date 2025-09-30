'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (sessionId) {
      // Generate order number from session ID
      const orderNum = `FS${Date.now().toString().slice(-8)}`;
      setOrderNumber(orderNum);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-[scale-in_0.3s_ease-out]">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full p-4 animate-[bounce-subtle_0.6s_ease-out]">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Payment Successful!
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
            <span className="text-gray-400">Order Number:</span>
            <span className="text-white font-bold text-xl">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
            <span className="text-gray-400">Payment Status:</span>
            <span className="text-green-400 font-semibold">✓ Confirmed</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Stripe Session:</span>
            <span className="text-gray-500 text-sm font-mono">{sessionId?.slice(0, 20)}...</span>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-4">What happens next?</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-white font-semibold">Order Confirmation Email</p>
                <p className="text-gray-400 text-sm">You&apos;ll receive a confirmation email with your order details shortly.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="text-white font-semibold">Processing</p>
                <p className="text-gray-400 text-sm">We&apos;ll process your order within 1-2 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="text-white font-semibold">Shipping</p>
                <p className="text-gray-400 text-sm">Estimated delivery: 3-7 business days (Finland)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-center"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all border border-gray-700 hover:border-gray-600"
          >
            Print Receipt
          </button>
        </div>

        {/* Contact Support */}
        <p className="text-gray-400 text-center text-sm mt-8">
          Need help? Contact us at <a href="mailto:info@flashsale.fi" className="text-purple-400 hover:text-purple-300">info@flashsale.fi</a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}