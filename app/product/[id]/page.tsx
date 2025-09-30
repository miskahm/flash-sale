'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

interface ProductDetail {
  id: number;
  name: string;
  icon: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  totalStock: number;
  remainingStock: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  warranty: string;
}

const PRODUCT_DETAILS: { [key: number]: ProductDetail } = {
  1: {
    id: 1,
    name: 'AKG K712 Pro',
    icon: '🎧',
    image: '/images/products/headphones.png',
    originalPrice: 349,
    discountedPrice: 179,
    totalStock: 50,
    remainingStock: 12,
    description: 'Professional open-back studio reference headphones from AKG. The K712 Pro delivers exceptional audio clarity and natural soundstage, perfect for audio production, critical listening, and audiophile music enjoyment.',
    features: [
      'Open-back design for natural soundstage',
      'Premium 53mm drivers with Varimotion technology',
      'Flat-wire voice coil for precise sound reproduction',
      'Genuine leather headband for long-session comfort',
      'Self-adjusting suspension system',
      'Velour ear pads for breathability',
      'Professional 3m detachable cable',
      'Gold-plated 3.5mm jack with 6.35mm adapter',
      'Made in Austria',
      'Ideal for mixing, mastering, and critical listening'
    ],
    specifications: {
      'Driver Size': '53mm',
      'Frequency Response': '10Hz - 39.8kHz',
      'Impedance': '62 Ohms',
      'Sensitivity': '105 dB SPL/V',
      'Max Input Power': '200mW',
      'Cable Length': '3m detachable',
      'Weight': '235g (without cable)',
      'Design': 'Open-back, over-ear',
      'Jack': '3.5mm gold-plated + 6.35mm adapter'
    },
    warranty: '24 months manufacturer warranty'
  },
  2: {
    id: 2,
    name: 'MSI RTX 5090 Gaming Trio',
    icon: '🎮',
    image: '/images/products/gpu.avif',
    originalPrice: 2399,
    discountedPrice: 1899,
    totalStock: 20,
    remainingStock: 5,
    description: 'Dominate every game with the MSI GeForce RTX 5090 Gaming X Trio. Powered by NVIDIA\'s latest Blackwell architecture, featuring revolutionary AI rendering, unmatched ray tracing performance, and extreme cooling with MSI\'s iconic TRI FROZR 4 design.',
    features: [
      'NVIDIA Blackwell GPU architecture',
      '32GB GDDR7 ultra-high bandwidth memory',
      'TRI FROZR 4 cooling with TORX Fan 6.0',
      'Real-time ray tracing and DLSS 4',
      'AI-powered frame generation',
      '4K and 8K gaming at max settings',
      'PCIe 5.0 x16 interface',
      'MSI Center software control',
      'Premium metal backplate with RGB Mystic Light',
      'Zero Frozr technology (fans stop in idle)',
      'Dual BIOS for performance/silent mode'
    ],
    specifications: {
      'GPU': 'NVIDIA GeForce RTX 5090',
      'Architecture': 'Blackwell',
      'CUDA Cores': '21760',
      'Memory': '32GB GDDR7',
      'Memory Interface': '512-bit',
      'Base Clock': '2.31 GHz',
      'Boost Clock': '2.88 GHz',
      'TDP': '575W',
      'Recommended PSU': '1000W',
      'Power Connectors': '3x 8-pin PCIe',
      'Outputs': '3x DisplayPort 2.1, 1x HDMI 2.1b',
      'Dimensions': '340 x 142 x 78mm (3.5 slot)',
      'Weight': '2.1kg'
    },
    warranty: '36 months manufacturer warranty'
  },
  3: {
    id: 3,
    name: 'Roborock S8 MaxV Ultra',
    icon: '🤖',
    image: '/images/products/vacuum.webp',
    originalPrice: 1799,
    discountedPrice: 1299,
    totalStock: 40,
    remainingStock: 15,
    description: 'The ultimate hands-free cleaning system. Roborock S8 MaxV Ultra features advanced AI obstacle recognition, 10,000Pa HyperForce suction, VibraRise 3.0 sonic mopping, and a fully automated all-in-one dock that empties, washes, and refills automatically.',
    features: [
      '10,000Pa HyperForce extreme suction power',
      'ReactiveAI 2.0 obstacle recognition with RGB camera',
      'VibraRise 3.0 sonic mopping system (3,000 vibrations/min)',
      'RockDock Ultra: auto-emptying, mop washing & drying',
      'Dual roller brush system for deep cleaning',
      'PreciSense LiDAR navigation with 3D mapping',
      'Auto mop lifting up to 20mm for carpets',
      'Voice control (Alexa, Google Assistant, Siri)',
      'Multi-level mapping with no-go zones',
      'Off-peak charging scheduling',
      'Self-refilling water tank (3L clean + 2.5L dirty)',
      '7-week dust bag capacity (2.5L)',
      'App control with room-specific settings'
    ],
    specifications: {
      'Suction Power': '10,000Pa HyperForce',
      'Navigation': 'PreciSense LiDAR + ReactiveAI 2.0',
      'Battery': '5,200mAh',
      'Runtime': 'Up to 180 minutes',
      'Dust Bin': '350ml (robot) + 2.5L (dock)',
      'Water Tanks': '200ml (robot) + 3L clean + 2.5L dirty (dock)',
      'Mopping': 'VibraRise 3.0 Sonic (3,000 vpm)',
      'Mop Lift': 'Up to 20mm',
      'Noise Level': '≤67dB',
      'Climbing': 'Up to 30mm',
      'Dimensions': '353 x 350 x 96.5mm (robot)',
      'Weight': '4.4kg (robot)',
      'WiFi': '2.4/5GHz dual-band'
    },
    warranty: '24 months manufacturer warranty'
  },
  4: {
    id: 4,
    name: 'Smart Watch Pro',
    icon: '⌚',
    image: '/images/products/smartwatch.jpg',
    originalPrice: 499,
    discountedPrice: 199,
    totalStock: 30,
    remainingStock: 8,
    description: 'Stay connected and track your fitness goals with the Smart Watch Pro. Featuring comprehensive health monitoring, GPS tracking, and smartphone notifications, this smartwatch is your perfect daily companion.',
    features: [
      'AMOLED touchscreen display',
      'Heart rate and blood oxygen monitoring',
      'GPS and GLONASS positioning',
      'Water resistant up to 50m',
      'Sleep tracking and analysis',
      'Multiple sport modes',
      'Smartphone notifications and calls',
      'Music control and storage',
      'Up to 7 days battery life',
      'Customizable watch faces'
    ],
    specifications: {
      'Display': '1.4" AMOLED',
      'Resolution': '454 x 454 pixels',
      'Battery': '420mAh',
      'Battery Life': 'Up to 7 days',
      'Water Resistance': '5ATM (50m)',
      'Connectivity': 'Bluetooth 5.0',
      'Sensors': 'Heart rate, SpO2, Accelerometer, Gyroscope, GPS',
      'Weight': '45g',
      'Compatibility': 'iOS 10+ and Android 5.0+'
    },
    warranty: '24 months manufacturer warranty'
  },
  5: {
    id: 5,
    name: 'Mechanical Keyboard RGB',
    icon: '⌨️',
    image: '/images/products/keyboard.jpg',
    originalPrice: 189,
    discountedPrice: 79,
    totalStock: 45,
    remainingStock: 18,
    description: 'Elevate your typing and gaming experience with our Mechanical Keyboard. Featuring premium mechanical switches, customizable RGB lighting, and durable construction, it\'s built for performance and style.',
    features: [
      'Premium mechanical switches (Red/Brown/Blue)',
      'Per-key RGB backlighting',
      'Aluminum alloy frame',
      'Anti-ghosting and N-key rollover',
      'Detachable USB-C cable',
      'Programmable macro keys',
      'Dedicated media controls',
      'Wrist rest included',
      'Windows and Mac compatible',
      'Software for customization'
    ],
    specifications: {
      'Switch Type': 'Mechanical (Hot-swappable)',
      'Layout': 'Full-size (104 keys)',
      'Backlighting': 'RGB per-key',
      'Connection': 'USB-C (detachable)',
      'Polling Rate': '1000Hz',
      'Key Rollover': 'N-key',
      'Cable Length': '1.8m braided',
      'Dimensions': '440 x 130 x 35mm',
      'Weight': '1.1kg'
    },
    warranty: '24 months manufacturer warranty'
  },
  6: {
    id: 6,
    name: '4K Ultra HD Monitor',
    icon: '🖥️',
    image: '/images/products/monitor.jpg',
    originalPrice: 799,
    discountedPrice: 449,
    totalStock: 25,
    remainingStock: 7,
    description: 'Experience stunning visuals with our 4K Ultra HD Monitor. Perfect for content creation, gaming, and professional work, featuring HDR support, high refresh rate, and vibrant color accuracy.',
    features: [
      '27-inch 4K UHD display (3840x2160)',
      'IPS panel with 178° viewing angles',
      'HDR10 support',
      '144Hz refresh rate',
      '1ms response time',
      '99% sRGB color gamut',
      'AMD FreeSync and NVIDIA G-Sync compatible',
      'Multiple ports (HDMI 2.1, DisplayPort, USB-C)',
      'Height and tilt adjustable stand',
      'Blue light filter and flicker-free'
    ],
    specifications: {
      'Screen Size': '27 inches',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Panel Type': 'IPS',
      'Refresh Rate': '144Hz',
      'Response Time': '1ms (MPRT)',
      'Brightness': '400 cd/m²',
      'Contrast Ratio': '1000:1',
      'Color Gamut': '99% sRGB, 95% DCI-P3',
      'Ports': '2x HDMI 2.1, 1x DisplayPort 1.4, 1x USB-C',
      'VESA Mount': '100x100mm'
    },
    warranty: '36 months manufacturer warranty'
  },
  7: {
    id: 7,
    name: 'Wireless Gaming Mouse',
    icon: '🖱️',
    image: '/images/products/mouse.jpg',
    originalPrice: 129,
    discountedPrice: 59,
    totalStock: 60,
    remainingStock: 22,
    description: 'Dominate your games with our Wireless Gaming Mouse. Featuring a high-precision sensor, customizable buttons, and ultra-low latency wireless connection for competitive gaming.',
    features: [
      'High-precision 25600 DPI sensor',
      '2.4GHz wireless with <1ms latency',
      'Up to 70 hours battery life',
      'RGB lighting with 16.8M colors',
      '8 programmable buttons',
      'Adjustable weight system',
      'Ergonomic design for right-handed use',
      'On-the-fly DPI switching',
      'PTFE feet for smooth gliding',
      'Rechargeable via USB-C'
    ],
    specifications: {
      'Sensor': 'Optical, 25600 DPI',
      'Polling Rate': '1000Hz',
      'Acceleration': '50G',
      'IPS': '650',
      'Battery Life': 'Up to 70 hours',
      'Connection': '2.4GHz wireless + USB-C wired',
      'Buttons': '8 programmable',
      'Weight': '80g (without cable)',
      'Dimensions': '126 x 68 x 43mm'
    },
    warranty: '24 months manufacturer warranty'
  },
  8: {
    id: 8,
    name: '4K Webcam HD Pro',
    icon: '📷',
    image: '/images/products/webcam.jpg',
    originalPrice: 179,
    discountedPrice: 89,
    totalStock: 35,
    remainingStock: 11,
    description: 'Look your best in video calls and streaming with our 4K Webcam. Featuring superior image quality, autofocus, and built-in dual microphones for crystal-clear communication.',
    features: [
      '4K Ultra HD at 30fps',
      '1080p at 60fps for smooth motion',
      'Autofocus with face tracking',
      'Wide-angle 90° field of view',
      'Built-in dual stereo microphones',
      'Low-light correction',
      'Privacy shutter included',
      'Flexible mount and tripod thread',
      'USB plug-and-play',
      'Compatible with all major platforms'
    ],
    specifications: {
      'Max Resolution': '4K (3840x2160) @ 30fps',
      'Frame Rates': '4K@30fps, 1080p@60fps, 720p@90fps',
      'Field of View': '90°',
      'Focus Type': 'Auto-focus',
      'Microphone': 'Dual stereo',
      'Connection': 'USB 3.0',
      'Cable Length': '2m',
      'Mount': 'Universal clip + 1/4" tripod thread',
      'Compatibility': 'Windows 7+, macOS 10.10+, Chrome OS'
    },
    warranty: '24 months manufacturer warranty'
  },
  9: {
    id: 9,
    name: 'USB-C Hub 11-in-1',
    icon: '🔌',
    image: '/images/products/usb-hub.jpg',
    originalPrice: 99,
    discountedPrice: 39,
    totalStock: 50,
    remainingStock: 16,
    description: 'Expand your connectivity with our 11-in-1 USB-C Hub. Perfect for laptops and tablets, featuring multiple ports for displays, data transfer, charging, and more in one compact device.',
    features: [
      '11 ports in one compact hub',
      '4K HDMI output @ 60Hz',
      'VGA output for legacy displays',
      '3x USB 3.0 ports (5Gbps)',
      '100W USB-C Power Delivery pass-through',
      'SD and microSD card readers',
      'Gigabit Ethernet port',
      '3.5mm audio jack',
      'Aluminum alloy construction',
      'Plug-and-play, no drivers needed',
      'LED indicator lights'
    ],
    specifications: {
      'USB-C Input': 'USB-C 3.1 Gen 2',
      'HDMI Output': '4K @ 60Hz',
      'VGA Output': '1080p @ 60Hz',
      'USB Ports': '3x USB 3.0 (5Gbps)',
      'Power Delivery': 'Up to 100W pass-through',
      'Ethernet': 'Gigabit (10/100/1000Mbps)',
      'Card Readers': 'SD/microSD (UHS-I)',
      'Audio': '3.5mm combo jack',
      'Material': 'Aluminum alloy',
      'Cable Length': '15cm integrated cable'
    },
    warranty: '24 months manufacturer warranty'
  }
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');

  const productId = parseInt(params.id as string);
  const product = PRODUCT_DETAILS[productId];

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.remainingStock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        icon: product.icon,
        image: product.image,
        price: product.discountedPrice,
      });
      setNotification('Added to cart!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent hover:opacity-80 transition-all"
          >
            ⚡ FLASH SALE
          </button>
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-purple-300 transition-all"
          >
            ← Back to Shop
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-xl p-12 mb-4">
              <div className="flex items-center justify-center h-96">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold px-6 py-2 rounded-full text-xl">
                {Math.round((1 - product.discountedPrice / product.originalPrice) * 100)}% OFF
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl text-gray-400 line-through">
                €{product.originalPrice}
              </span>
              <span className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                €{product.discountedPrice}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-2">All prices include VAT 24%</p>

            <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl p-4 mb-6 border border-red-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Stock:</span>
                <span className="font-bold text-red-400">
                  Only {product.remainingStock} left!
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${(product.remainingStock / product.totalStock) * 100}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={product.remainingStock === 0}
              className={`w-full py-4 rounded-xl font-bold text-xl mb-4 transition-all ${
                product.remainingStock === 0
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white transform hover:scale-105'
              }`}
            >
              {product.remainingStock === 0 ? '❌ SOLD OUT' : '🛒 ADD TO CART'}
            </button>

            {notification && (
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-center font-semibold animate-[scale-in_0.3s_ease-out]">
                ✓ {notification}
              </div>
            )}

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/30 mt-6">
              <p className="text-gray-300 text-sm">
                <strong className="text-white">✓ {product.warranty}</strong><br />
                <strong className="text-white">✓ 14-day return policy</strong><br />
                <strong className="text-white">✓ Free shipping over €50</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
            <dl className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-700/50 pb-2">
                  <dt className="text-gray-400 font-semibold">{key}:</dt>
                  <dd className="text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Additional Information</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="font-bold text-white mb-2">📦 Shipping</h3>
              <p className="text-sm">Free shipping on orders over €50. Standard shipping €4.90 within Finland.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">↩️ Returns</h3>
              <p className="text-sm">14-day return policy in accordance with Finnish Consumer Protection Act.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">🛡️ Warranty</h3>
              <p className="text-sm">{product.warranty}. Full warranty details available in our <a href="/warranty" className="text-purple-400 hover:text-purple-300">warranty policy</a>.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}