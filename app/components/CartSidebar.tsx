'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] animate-[fade-in_0.3s_ease-out]"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-gray-900 shadow-2xl z-[110] animate-[slide-in-right_0.4s_ease-out] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            <p className="text-purple-100 text-sm">{getCartCount()} items</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-400 text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add some amazing deals!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl p-4 flex gap-4 items-center hover:bg-gray-700 transition-all"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-green-400 font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-600 hover:bg-gray-500 text-white w-8 h-8 rounded-lg font-bold transition-all"
                  >
                    −
                  </button>
                  <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-600 hover:bg-gray-500 text-white w-8 h-8 rounded-lg font-bold transition-all"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-400 hover:text-red-300 transition-all"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-700 p-6 space-y-4 bg-gray-900">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-white font-bold">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Shipping:</span>
              <span className="text-green-400 font-semibold">FREE</span>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
              <span className="text-xl text-white font-bold">Total:</span>
              <span className="text-2xl text-green-400 font-bold">${getCartTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}