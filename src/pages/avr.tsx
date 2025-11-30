import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Plus, Minus, CheckCircle, Phone } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const AVRPage = () => {
  console.log('AVRPage component is loading...');
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample AVR products data
  const products: Product[] = [
    { id: 1, name: "UEI-AVR (UEI-01)", description: "Basic Automatic Voltage Regulator", price: 550, originalPrice: 688, image: "/UEI.png" },
    { id: 2, name: "UEI-T-20", description: "Advanced Automatic Voltage Regulator", price: 600, originalPrice: 750, image: "/pic2.png" },
    { id: 3, name: "UEI-120", description: "High-power voltage regulator", price: 650, originalPrice: 812, image: "/pic4.png" },
    { id: 4, name: "UEI-A10", description: "Professional Grade AVR", price: 900, originalPrice: 1125, image: "/pic5.png" },
    { id: 5, name: "UEI-A4", description: "Industrial AVR", price: 1250, originalPrice: 1562, image: "/pic7.png" },
    { id: 6, name: "UEI-SX460", description: "AVR for Brush less Alternator", price: 1472.5, originalPrice: 1767, image: "/avr8.png" },
    { id: 7, name: "UEI-SX440", description: "Compact AVR unit", price: 3610, originalPrice: 4332, image: "/avr9.png" },
    { id: 8, name: "UEI-AO4", description: "Industrial grade AVR", price: 332.5, originalPrice: 398.4, image: "/avr12.png" },
    { id: 9, name: "UEI-JYTOI AVR", description: "High stability AVR", price: 7125, originalPrice: 8550, image: "/jyoti.jpg" },
    { id: 10, name: "UEI- PANEL AVR", description: "Standard AVR model", price: 1472.5, originalPrice: 1767, image: "/avr13.png" },
    { id: 11, name: "UEI-HONDA AVR ", description: "Heavy-duty AVR", price: 931, originalPrice: 1117.2, image: "/avr17.png" },
    { id: 12, name: "UEI-HONDA AVR", description: "Precision AVR", price: 1159, originalPrice: 1370, image: "/avr18.png" },
    { id: 13, name: "UEI-AUTOMATIC GENERATOR STOP UNIT", description: "Compact automatic regulator", price: 560, originalPrice: 700, image: "/Sp.jpg" },
    { id: 14, name: "UEI-AVR R446", description: "Industrial AVR with cooling", price: 8075, originalPrice: 8550, image: "/avr43.png" },
    { id: 15, name: "UEI-AVR A6 SLIPRING ALTERNATOR", description: "High efficiency AVR", price: 1472.5, originalPrice: 1950, image: "/avr47.png" },
    { id: 16, name: "UEI-AVR DSR", description: "Economy AVR model", price: 2470, originalPrice: 2890, image: "/avr48.png" },
    { id: 17, name: "UEI-AVR-SX460", description: "Rack-mount AVR", price: 1472.5, originalPrice: 1812, image: "/avr49.png" },
    { id: 18, name: "UEI-AVR-7/6", description: "Micro AVR unit", price: 2470, originalPrice: 3000, image: "/avr50.png" },
     { id: 19, name: " UEI-6M", description: "Micro AVR unit", price: 2400, originalPrice: 3000, image: "/avr11.png" },
  
   
   
   
    
  ];

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const quantity = quantities[product.id] || 1;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      const newCart = existingItem
        ? prevCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevCart, { product, quantity }];
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 3000);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const increaseQuantity = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decreaseQuantity = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Simple test to check if component renders
  console.log('AVRPage is rendering with products:', products.length);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-green-700 hover:text-green-800">
            <ArrowLeft size={20} />
            <span className="font-semibold text-gray-800">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center text-sm text-gray-600">
             
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">AVR Products</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">High quality automatic voltage regulators for industrial and home applications. Browse, select quantity and add to cart.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="relative bg-white h-48 flex items-center justify-center p-6 border-b">
                <img src={product.image} alt={product.name} className="max-h-36 object-contain" />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>

                <div className="mb-3">
                  <div className="text-lg font-bold text-green-700">₹{product.price}</div>
                  <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center border border-gray-200 rounded-md overflow-hidden">
                      <button
                        onClick={(e) => decreaseQuantity(product.id, e)}
                        className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700"
                        aria-label={`Decrease quantity for ${product.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <div className="px-4 text-sm font-medium">{quantities[product.id] || 1}</div>
                      <button
                        onClick={(e) => increaseQuantity(product.id, e)}
                        className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700"
                        aria-label={`Increase quantity for ${product.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="ml-4 flex-1">
                      <button
                        onClick={(e) => addToCart(product, e)}
                        className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center gap-2 shadow hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart size={18} />
                        <span className="font-medium">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Cart Popup */}
      {showCartPopup && (
        <div className="fixed bottom-6 right-6 bg-green-700 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3 z-50">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Item added to cart!</span>
          <button
            onClick={() => navigate('/checkout', { state: { cart } })}
            className="ml-4 px-3 py-1 bg-white text-green-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Go to Checkout
          </button>
        </div>
      )}

      {/* Cart Floating Button */}
      {cartItemCount > 0 && (
        <button
          onClick={() => navigate('/checkout', { state: { cart } })}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center z-40"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartItemCount}
          </span>
        </button>
      )}
    </div>
  );
};

export default AVRPage;