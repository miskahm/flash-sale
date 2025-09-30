'use client';

import { useState, useEffect } from 'react';

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
        if (prev <= 1) return 7200; // Reset to 2 hours
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
              updated[numKey] = product.timerDuration; // Reset to original duration
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

  const handleBuyNow = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId && p.remainingStock > 0
          ? { ...p, remainingStock: p.remainingStock - 1 }
          : p
      )
    );

    const product = products.find((p) => p.id === productId);
    if (product) {
      const id = notificationId;
      setNotificationId(id + 1);
      setNotifications((prev) => [
        ...prev,
        { id, message: `You purchased ${product.name}!` },
      ]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            ⚡ FLASH SALE
          </h1>
          <div className="text-right">
            <div className="text-sm text-white/80">Sale ends in</div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-300">
              {formatTime(globalTimer)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Viewer Count Banner */}
        <div className="bg-red-600 text-white text-center py-3 rounded-lg mb-8 font-semibold animate-pulse">
          🔥 {viewerCount.toLocaleString()} people viewing right now!
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-3xl"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
                <div className="text-8xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold text-white">{product.name}</h3>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-4xl font-bold text-red-600">
                    ${product.discountedPrice}
                  </span>
                </div>

                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-4 text-center">
                  <div className="text-sm font-semibold text-yellow-800">
                    {Math.round((1 - product.discountedPrice / product.originalPrice) * 100)}% OFF
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-semibold text-red-600">
                      Only {product.remainingStock} left!
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full transition-all"
                      style={{
                        width: `${(product.remainingStock / product.totalStock) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-purple-100 rounded-lg p-3 mb-4 text-center">
                  <div className="text-sm text-purple-800 mb-1">Deal expires in</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {formatTime(productTimers[product.id])}
                  </div>
                </div>

                <button
                  onClick={() => handleBuyNow(product.id)}
                  disabled={product.remainingStock === 0}
                  className={`w-full py-4 rounded-lg font-bold text-xl transition-all ${
                    product.remainingStock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {product.remainingStock === 0 ? 'SOLD OUT' : 'BUY NOW'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-[slide-in-right_0.3s_ease-out]"
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}