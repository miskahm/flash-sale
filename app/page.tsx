'use client';

import { useState, useEffect } from 'react';
import { useCart } from './context/CartContext';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmation from './components/OrderConfirmation';

interface Product {
  id: number;
  name: string;
  icon: string;
  originalPrice: number;
  discountedPrice: number;
  totalStock: number;
  remainingStock: number;
  timerDuration: number;
}

interface Notification {
  id: number;
  message: string;
}

export default function Home() {
  const { addToCart, getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Headphones',
      icon: '🎧',
      originalPrice: 299,
      discountedPrice: 99,
      totalStock: 50,
      remainingStock: 12,
      timerDuration: 3600,
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      icon: '⌚',
      originalPrice: 499,
      discountedPrice: 199,
      totalStock: 30,
      remainingStock: 7,
      timerDuration: 2700,
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      icon: '🎵',
      originalPrice: 199,
      discountedPrice: 79,
      totalStock: 100,
      remainingStock: 23,
      timerDuration: 4500,
    },
  ]);

  const [globalTimer, setGlobalTimer] = useState(7200);
  const [productTimers, setProductTimers] = useState<{ [key: number]: number }>({
    1: 3600,
    2: 2700,
    3: 4500,
  });
  const [viewerCount, setViewerCount] = useState(1247);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  // Global countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTimer((prev) => {
        if (prev <= 1) return 7200;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Per-product timers
  useEffect(() => {
    const interval = setInterval(() => {
      setProductTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          const numKey = Number(key);
          if (updated[numKey] <= 1) {
            const product = products.find((p) => p.id === numKey);
            if (product) {
              updated[numKey] = product.timerDuration;
            }
          } else {
            updated[numKey] -= 1;
          }
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [products]);

  // Viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 20) - 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Notification system
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Sarah', 'Mike', 'Jessica', 'David', 'Emma'];
      const productName = products[Math.floor(Math.random() * products.length)].name;
      const name = names[Math.floor(Math.random() * names.length)];

      const id = notificationId;
      setNotificationId(id + 1);

      const notification = {
        id,
        message: `${name} just bought ${productName}!`,
      };

      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, [notificationId, products]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddToCart = (product: Product) => {
    if (product.remainingStock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        icon: product.icon,
        price: product.discountedPrice,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id && p.remainingStock > 0
            ? { ...p, remainingStock: p.remainingStock - 1 }
            : p
        )
      );

      const id = notificationId;
      setNotificationId(id + 1);
      setNotifications((prev) => [
        ...prev,
        { id, message: `Added ${product.name} to cart!` },
      ]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrderNumber: string) => {
    setOrderNumber(newOrderNumber);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setOrderNumber('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-[fade-in_1s_ease-out]">
            ⚡ FLASH SALE
          </h1>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <div className="text-sm text-white/80">Sale ends in</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                {formatTime(globalTimer)}
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                🛒 Cart
                {getCartCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-[bounce-subtle_0.6s_ease-out]">
                    {getCartCount()}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Viewer Count Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white text-center py-4 rounded-2xl mb-8 font-bold text-lg shadow-2xl animate-[scale-in_0.5s_ease-out]">
          <span className="animate-[bounce-subtle_1s_ease-out_infinite]">🔥</span> {viewerCount.toLocaleString()} people viewing right now! <span className="animate-[bounce-subtle_1s_ease-out_infinite]">🔥</span>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-purple-500/20 border border-white/10 animate-[scale-in_0.5s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative text-9xl mb-4 animate-[bounce-subtle_2s_ease-out_infinite]">{product.icon}</div>
                <h3 className="relative text-2xl font-bold text-white drop-shadow-lg">{product.name}</h3>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ${product.discountedPrice}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 mb-4 text-center shadow-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {Math.round((1 - product.discountedPrice / product.originalPrice) * 100)}% OFF
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Limited Time Only!</div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Stock:</span>
                    <span className="font-bold text-red-400">
                      Only {product.remainingStock} left!
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                      style={{
                        width: `${(product.remainingStock / product.totalStock) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-4 mb-4 text-center border border-purple-500/30">
                  <div className="text-sm text-purple-300 mb-1">Deal expires in</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    {formatTime(productTimers[product.id])}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.remainingStock === 0}
                  className={`w-full py-4 rounded-xl font-bold text-xl transition-all shadow-lg ${
                    product.remainingStock === 0
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white hover:shadow-2xl transform hover:scale-105'
                  }`}
                >
                  {product.remainingStock === 0 ? '❌ SOLD OUT' : '🛒 ADD TO CART'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation */}
      <OrderConfirmation
        isOpen={isConfirmationOpen}
        orderNumber={orderNumber}
        onClose={handleConfirmationClose}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-[slide-in-right_0.3s_ease-out] border border-white/20"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span className="font-semibold">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}