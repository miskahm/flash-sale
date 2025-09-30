'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from './context/CartContext';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmation from './components/OrderConfirmation';

interface Product {
  id: number;
  name: string;
  icon: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  totalStock: number;
  remainingStock: number;
}

interface Notification {
  id: number;
  message: string;
}

// All available products
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Premium Headphones',
    icon: '🎧',
    image: '/images/products/headphones.png',
    originalPrice: 299,
    discountedPrice: 99,
    totalStock: 50,
    remainingStock: 12,
  },
  {
    id: 2,
    name: 'Gaming GPU RTX 4090',
    icon: '🎮',
    image: '/images/products/gpu.avif',
    originalPrice: 1999,
    discountedPrice: 1299,
    totalStock: 20,
    remainingStock: 5,
  },
  {
    id: 3,
    name: 'Robot Vacuum Cleaner',
    icon: '🤖',
    image: '/images/products/vacuum.webp',
    originalPrice: 599,
    discountedPrice: 299,
    totalStock: 40,
    remainingStock: 15,
  },
  {
    id: 4,
    name: 'Smart Watch Pro',
    icon: '⌚',
    image: '/images/products/smartwatch.jpg',
    originalPrice: 499,
    discountedPrice: 199,
    totalStock: 30,
    remainingStock: 8,
  },
  {
    id: 5,
    name: 'Mechanical Keyboard RGB',
    icon: '⌨️',
    image: '/images/products/keyboard.jpg',
    originalPrice: 189,
    discountedPrice: 79,
    totalStock: 45,
    remainingStock: 18,
  },
  {
    id: 6,
    name: '4K Ultra HD Monitor',
    icon: '🖥️',
    image: '/images/products/monitor.jpg',
    originalPrice: 799,
    discountedPrice: 449,
    totalStock: 25,
    remainingStock: 7,
  },
  {
    id: 7,
    name: 'Wireless Gaming Mouse',
    icon: '🖱️',
    image: '/images/products/mouse.jpg',
    originalPrice: 129,
    discountedPrice: 59,
    totalStock: 60,
    remainingStock: 22,
  },
  {
    id: 8,
    name: '4K Webcam HD Pro',
    icon: '📷',
    image: '/images/products/webcam.jpg',
    originalPrice: 179,
    discountedPrice: 89,
    totalStock: 35,
    remainingStock: 11,
  },
  {
    id: 9,
    name: 'USB-C Hub 11-in-1',
    icon: '🔌',
    image: '/images/products/usb-hub.jpg',
    originalPrice: 99,
    discountedPrice: 39,
    totalStock: 50,
    remainingStock: 16,
  },
];

// Current batch - first 3 products
const PRODUCTS: Product[] = ALL_PRODUCTS.slice(0, 3);

export default function Home() {
  const { addToCart, getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [dealTimer, setDealTimer] = useState(3600); // 1 hour per drop
  const [viewerCount, setViewerCount] = useState(1247);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  // Deal timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setDealTimer((prev) => {
        if (prev <= 1) {
          return 3600; // Reset to 1 hour
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      }, 6000);
    }, 15000);
    return () => clearInterval(interval);
  }, [notificationId, products]);

  const handleCloseNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

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
        image: product.image,
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
      }, 6000);
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
              <div className="text-sm text-white/80">Next drop in</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                {formatTime(dealTimer)}
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
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white text-center py-4 rounded-2xl mb-4 font-bold text-lg shadow-2xl animate-[scale-in_0.5s_ease-out]">
          <span className="animate-[bounce-subtle_1s_ease-out_infinite]">🔥</span> {viewerCount.toLocaleString()} people viewing right now! <span className="animate-[bounce-subtle_1s_ease-out_infinite]">🔥</span>
        </div>

        {/* Universal Timer with Past & Upcoming */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Past Products */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 text-center border border-gray-700/30 shadow-xl">
            <div className="text-gray-400 mb-4 font-semibold">📦 Last Batch</div>
            <div className="flex justify-center gap-4 opacity-60">
              <Image src="/images/products/mouse.jpg" alt="Last batch" width={70} height={70} className="object-contain" />
              <Image src="/images/products/webcam.jpg" alt="Last batch" width={70} height={70} className="object-contain" />
              <Image src="/images/products/usb-hub.jpg" alt="Last batch" width={70} height={70} className="object-contain" />
            </div>
          </div>

          {/* Deal Expires Timer */}
          <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-2xl p-6 text-center border-2 border-red-500/30 shadow-2xl animate-[scale-in_0.5s_ease-out]">
            <div className="text-red-300 mb-2 font-semibold text-lg">⏰ Deal Expires In</div>
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {formatTime(dealTimer)}
            </div>
          </div>

          {/* Upcoming Deals */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 text-center border border-gray-700/30 shadow-xl">
            <div className="text-gray-400 mb-4 font-semibold">🎁 Upcoming Batch</div>
            <div className="flex justify-center gap-4 opacity-60">
              <Image src="/images/products/smartwatch.jpg" alt="Upcoming batch" width={70} height={70} className="object-contain" />
              <Image src="/images/products/keyboard.jpg" alt="Upcoming batch" width={70} height={70} className="object-contain" />
              <Image src="/images/products/monitor.jpg" alt="Upcoming batch" width={70} height={70} className="object-contain" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-purple-500/20 border border-white/10 animate-[scale-in_0.5s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a href={`/product/${product.id}`} className="block">
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative flex items-center justify-center mb-4 h-60">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={250}
                      height={250}
                      className="object-contain drop-shadow-2xl animate-[float_3s_ease-in-out_infinite] group-hover:scale-110"
                      style={{ animationDelay: `${index * 0.5}s` }}
                      priority={index === 0}
                    />
                  </div>
                  <h3 className="relative text-2xl font-bold text-white drop-shadow-lg">{product.name}</h3>
                </div>
              </a>

              <div className="p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-2xl text-gray-400 line-through">
                    €{product.originalPrice}
                  </span>
                  <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    €{product.discountedPrice}
                  </span>
                </div>
                <p className="text-center text-gray-400 text-xs mb-4">
                  Price includes VAT 24%
                </p>

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

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.remainingStock === 0}
                  className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
                    product.remainingStock === 0
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400 shadow-lg'
                      : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white transform hover:scale-105 border-2 border-transparent animate-[rainbow-glow_3s_linear_infinite]'
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
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-[slide-in-right_0.3s_ease-out] border border-white/20 relative"
          >
            <button
              onClick={() => handleCloseNotification(notification.id)}
              className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
              aria-label="Close notification"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 pr-6">
              <span className="text-xl">✓</span>
              <span className="font-semibold">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Company Information</h3>
              <p className="text-gray-300 text-sm space-y-1">
                <span className="block">Flash Sale Oy</span>
                <span className="block">Mannerheimintie 1</span>
                <span className="block">00100 Helsinki, Finland</span>
                <span className="block">Business ID: 1234567-8</span>
                <span className="block">VAT: FI12345678</span>
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-300 text-sm space-y-1">
                <span className="block">Email: info@flashsale.fi</span>
                <span className="block">Phone: +358 9 1234 5678</span>
                <span className="block">Customer Service:</span>
                <span className="block">Mon-Fri 9:00-17:00 EET</span>
              </p>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/returns" className="hover:text-white transition-colors">Returns &amp; Cancellation</a></li>
                <li><a href="/warranty" className="hover:text-white transition-colors">Warranty Information</a></li>
              </ul>
            </div>

            {/* Payment & Shipping */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Payment &amp; Shipping</h3>
              <p className="text-gray-300 text-sm space-y-1 mb-3">
                <span className="block font-semibold">Accepted Payment Methods:</span>
                <span className="block">• Credit/Debit Cards (Visa, Mastercard)</span>
                <span className="block">• Bank Transfer</span>
                <span className="block">• Mobile Pay</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="block font-semibold">Shipping:</span>
                <span className="block">Finland: €4.90 (Free over €50)</span>
                <span className="block">EU: €9.90</span>
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              All prices include Finnish VAT (24%). 14-day return policy applies to all purchases.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Flash Sale Oy. All rights reserved.
            </p>
            <p className="text-yellow-400 text-xs mt-2 italic">
              ⚠️ DEMO SITE: Viewer counts and purchase notifications are simulated for demonstration purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}