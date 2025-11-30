import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Phone, CheckCircle, ArrowLeft, Plus, Minus } from 'lucide-react';

// Define product type
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

const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Add this effect for scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showCartPopup, setShowCartPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = products.filter(
        product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  // Quantity handlers
  const increaseQuantity = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decreaseQuantity = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      return {
        ...prev,
        [productId]: Math.max(1, currentQty - 1)
      };
    });
  };

  // Sample products data
  const products: Product[] = [
    {
      id: 1,
      name: "AVR (UEI-01)",
      description: "Automatic Voltage Regulator",
      price: 550,
      originalPrice: 688,
      image: "/UEI.png"
    },
    {
      id: 2,
      name: "TAVR-20",
      description: " Automatic Voltage Regulator",
      price: 600,
      originalPrice: 750,
      image: "/pic2.png"
    },
    {
      id: 3,
      name: "R-120",
      description: "High-power voltage regulator",
      price: 650,
      originalPrice: 812,
      image: "/pic4.png"
    },
    {
      id: 4,
      name: "UEI-A10",
      description: "Advanced Automatic Voltage Regulator",
      price: 900,
      originalPrice: 1125,
      image: "/pic5.png"
    },
    {
      id: 5,
      name: "UEI-A4",
      description: "Advanced Automatic Voltage Regulator",
      price: 1250,
      originalPrice: 1562,
      image: "/pic7.png"
    }
  ];

  // Add to cart function with popup
  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const quantity = quantities[product.id] || 1;
    
    const updatedCart = (prevCart: CartItem[]) => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { product, quantity }];
      }
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      
      return newCart;
    };
    
    setCart(updatedCart);
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 3000);
    
    // Reset quantity after adding to cart
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Cart Popup Component
  const CartPopup = () => (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in-up">
      <CheckCircle className="h-5 w-5" />
      <span>Item added to cart!</span>
      <button 
        onClick={() => navigate('/checkout', { state: { cart } })}
        className="ml-4 px-3 py-1 bg-white text-green-600 rounded-md font-medium hover:bg-green-50 transition-colors"
      >
        Go to Checkout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Top Header - Compact Sticky */}
  <div className={`sticky top-0 z-50 text-white py-1.5 text-sm transition-all duration-300 ${
  isScrolled 
    ? 'bg-gradient-to-r from-green-700 to-green-600 shadow' 
    : 'bg-gradient-to-r from-green-800 to-green-700'
}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold tracking-wide text-sm">🛍️ Shop Now</span>
          <a href="tel:+919911231643" className="flex items-center gap-2 hover:text-green-100 transition-colors text-sm">
            <Phone size={14} />
            <span className="font-medium">+91 9911231643</span>
          </a>
        </div>
      </div>

      {/* Navbar - Compact Sticky */}
 <nav className={`sticky top-[40px] z-40 shadow-sm transition-all duration-300 ${
  isScrolled 
    ? 'bg-white/95 backdrop-blur-sm shadow-md' 
    : 'bg-white'
}`}>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="UEI Logo" 
              className="h-8 w-auto object-contain" 
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white text-sm"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all shadow-sm"
              >
                <Search size={16} />
              </button>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 text-sm">
            <div className="relative group">
              <Link to="/checkout" className="relative p-2 hover:bg-gray-100 rounded-full transition-all">
                <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-green-600 transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all">
              <Menu size={20} />
            </button>

          </div>
        </div>

        {/* Category Bar */}
<div className={`sticky z-30 transition-all duration-300 ${
  isScrolled 
    ? 'bg-white/90 backdrop-blur-sm shadow-sm' 
    : 'bg-white'
}`} style={{
  WebkitBackdropFilter: isScrolled ? 'blur(8px)' : 'none',
  backdropFilter: isScrolled ? 'blur(8px)' : 'none',
  top: isScrolled ? '80px' : '88px'
}}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {/* Category items will go here */}
              <button className="flex-shrink-0 px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-sm font-semibold whitespace-nowrap shadow-sm hover:from-green-700 hover:to-green-600 transition-all">
                All Categories
              </button>
              <Link 
  to="/avr"
  className="flex-shrink-0 px-4 py-1.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-green-500 whitespace-nowrap transition-all hover:text-green-600"
>
  AVR
</Link>
{['Safety Unit', 'Solenoid', 'Battery Charger', 'Diode',
  'LLOP', 'RRA', 'Level Switch', 'Hardness Wire', 'Stop Unit', 'Controller', 'Panel', 'Rectifier'
].map((category) => (
  category === 'Safety Unit' ? (
    <Link key={category} to="/safety-unit" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Solenoid' ? (
    <Link key={category} to="/solenoid" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Battery Charger' ? (
    <Link key={category} to="/battery-charger" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Diode' ? (
    <Link key={category} to="/diode" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'LLOP' ? (
    <Link key={category} to="/llop" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'RRA' ? (
    <Link key={category} to="/rra" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Level Switch' ? (
    <Link key={category} to="/level-switch" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Hardness Wire' ? (
    <Link key={category} to="/hardness-wire" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Stop Unit' ? (
    <Link key={category} to="/stop-unit" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Controller' ? (
    <Link key={category} to="/controller" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Panel' ? (
    <Link key={category} to="/panel" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : category === 'Rectifier' ? (
    <Link key={category} to="/rectifier" className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"> {category} </Link>
  ) : (
    <button 
      key={category}
      className="flex-shrink-0 px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-green-500 whitespace-nowrap transition-all transform hover:scale-105 hover:text-green-600"
    >
      {category}
    </button>
  )
))}
            </div>
          </div>
        </div>
      </nav>

      {/* Add this to your global CSS or style tag */}
   <style>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  /* Improved backdrop blur support */
  @supports (backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px)) {
    .backdrop-blur-sm {
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    }
  }
`}</style>

      {/* Banner Section */}
      <div className="w-full relative mt-6">
        {/* Desktop/Laptop Banner (hidden on mobile) */}
        <div className="hidden md:block">
          <img
            src="/banner.png"
            alt="Banner"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute left-[3.75%] top-[67%]">
            <button
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300"
              style={{ minWidth: "150px" }}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Banner (hidden on desktop) */}
        <div className="md:hidden">
          <div className="relative w-full" style={{ backgroundColor: '#F9ECDE' }}>
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                  Premium Quality Products
                </h1>
                <p className="text-green-800 mb-6">
                  Discover our exclusive collection at unbeatable prices
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-green-800 text-white hover:bg-green-700 font-bold py-2 px-6 rounded-md shadow-lg transition duration-300"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {searchQuery && filteredProducts.length > 0 && (
        <div className="container mx-auto px-4 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Search Results for "{searchQuery}"</h2>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilteredProducts([]);
              }}
              className="text-green-600 hover:text-green-800 font-medium flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => {
                  setSearchQuery('');
                  navigate(`/product/${product.id}`);
                }}
              >
                <div className="h-48 bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center">
                    <span className="text-green-700 font-bold">₹{product.price}/-</span>
                    <span className="ml-2 text-gray-400 text-sm line-through">₹{product.originalPrice}/-</span>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice * 100))}%
                    </span>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center mt-3 mb-2">
                    <button
                      onClick={(e) => decreaseQuantity(product.id, e)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-center text-sm">
                      {quantities[product.id] || 1}
                    </div>
                    <button
                      onClick={(e) => increaseQuantity(product.id, e)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, e);
                    }}
                    className="w-full bg-green-800 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

     
      {/* Products Section */}
      <div id="products" className="pt-8">
        {(!searchQuery || filteredProducts.length === 0) && (
          <div className="container mx-auto px-4 py-12">
            {searchQuery && (
              <div className="text-center py-8">
                <p className="text-gray-600">No products found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-green-600 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Products</h2>
              <a href="#" className="text-green-600 hover:underline font-medium">View All</a>
            </div>
            <div className="flex overflow-x-auto pb-6 gap-6 px-4 sm:px-0 scrollbar-hide">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-100 flex flex-col h-full w-72 flex-shrink-0"
                 onClick={(e) => {
    // Stop propagation to prevent event bubbling to parent elements
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  }}
                >
                  {/* Product Image */}
                  <div className="relative h-56 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice * 100))}% OFF
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 
                      className="text-lg font-bold text-gray-800 mb-2 hover:text-green-600 transition-colors cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-center mb-4">
                        <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                        <span className="ml-2 text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center mb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decreaseQuantity(product.id, e);
                          }}
                          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-l-lg hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <div className="w-12 h-9 flex items-center justify-center border-t border-b border-gray-200 bg-white text-center text-sm font-medium">
                          {quantities[product.id] || 1}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            increaseQuantity(product.id, e);
                          }}
                          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-r-lg hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
 
                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, e);
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {showCartPopup && <CartPopup />}

      {/* Add the animation to your CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>

     {/* Trusted By Section */}
<div className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-24 relative overflow-hidden">
  {/* Decorative Background Elements */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-block mb-4">
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">✨ Why Trust Us</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trusted By Thousands</h2>
      <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-6"></div>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Join thousands of satisfied customers who trust our premium quality products and exceptional service
      </p>
    </div>
    
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
  {/* Trust Badge 1 */}
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
    <div className="relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-green-50 border border-gray-100 h-full flex flex-col">
      <div className="h-16 w-16 mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl group-hover:from-green-600 group-hover:to-green-500 transition-all flex-shrink-0">
        <svg className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">Premium Quality</h3>
      <p className="text-center text-sm text-gray-600 mt-2 flex-grow">ISO certified products meeting industry standards</p>
    </div>
  </div>
  
  {/* Trust Badge 2 */}
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
    <div className="relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-gray-100 h-full flex flex-col">
      <div className="h-16 w-16 mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl group-hover:from-blue-600 group-hover:to-blue-500 transition-all flex-shrink-0">
        <svg className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Fast Delivery</h3>
      <p className="text-center text-sm text-gray-600 mt-2 flex-grow">Swift shipping across India with tracking</p>
    </div>
  </div>
  
  {/* Trust Badge 3 */}
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
    <div className="relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 border border-gray-100 h-full flex flex-col">
      <div className="h-16 w-16 mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl group-hover:from-purple-600 group-hover:to-purple-500 transition-all flex-shrink-0">
        <svg className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Secure Payments</h3>
      <p className="text-center text-sm text-gray-600 mt-2 flex-grow">Encrypted & safe payment gateway</p>
    </div>
  </div>
  
  {/* Trust Badge 4 */}
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
    <div className="relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-orange-50 border border-gray-100 h-full flex flex-col">
      <div className="h-16 w-16 mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl group-hover:from-orange-600 group-hover:to-orange-500 transition-all flex-shrink-0">
        <svg className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Certified Excellence</h3>
      <p className="text-center text-sm text-gray-600 mt-2 flex-grow">Award-winning quality assurance</p>
    </div>
  </div>
  
  {/* Trust Badge 5 */}
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
    <div className="relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-red-50 border border-gray-100 h-full flex flex-col">
      <div className="h-16 w-16 mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-red-100 to-red-50 rounded-xl group-hover:from-red-600 group-hover:to-red-500 transition-all flex-shrink-0">
        <svg className="h-8 w-8 text-red-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">24/7 Support</h3>
      <p className="text-center text-sm text-gray-600 mt-2 flex-grow">Expert assistance always available</p>
    </div>
  </div>
  </div>
  </div>
</div>      {/* Modern About Section */}
    <div id="about" className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-gray-900">About Utsav Engineering India</h2>
                <div className="h-1 w-20 bg-green-600 rounded-full"></div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-semibold text-green-700">"Utsav Engineering India"</span> is one of the leading names involved in offering high-quality Panels and AVR (Automatic Voltage Regulators). Since our inception in 2011, we have carved a niche for ourselves in the industry in a very short span of time.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Special Products</h3>
                    <p className="text-gray-600">Customized solutions tailored to your specific needs</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AVR for Small Generators</h3>
                    <p className="text-gray-600">Precision voltage regulation for small-scale applications</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AVR for Large Machines</h3>
                    <p className="text-gray-600">Robust solutions for industrial-grade machinery</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Excitation Panels</h3>
                    <p className="text-gray-600">Analogue panels for advanced control and monitoring</p>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-700 pt-4 border-t border-gray-200">
                We offer these premium products at industry-leading prices. Backed by a team of experienced professionals, we are committed to delivering high-quality solutions that exceed customer expectations and provide excellent value for money.
              </p>
            </div>

            {/* Right Side - Stats */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-green-600 mb-2">13+</div>
                  <p className="text-gray-600 font-medium">Years of Excellence</p>
                  <p className="text-sm text-gray-500 mt-1">Since 2011</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                  <p className="text-gray-600 font-medium">Happy Clients</p>
                  <p className="text-sm text-gray-500 mt-1">Satisfied customers worldwide</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                  <p className="text-gray-600 font-medium">Quality Assured</p>
                  <p className="text-sm text-gray-500 mt-1">ISO certified products</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                  <p className="text-gray-600 font-medium">Product Range</p>
                  <p className="text-sm text-gray-500 mt-1">Diverse solutions available</p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
                <h3 className="font-semibold text-green-900 mb-2">Why Choose Us?</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Industry-leading prices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Premium quality products
                    </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Experienced professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Fast & reliable delivery
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
            
            {/* Modern Footer Section */}
  <footer id="contact" className="bg-gradient-to-r from-green-900 to-green-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ustav Engineering India</h3>
              <p className="text-green-100 leading-relaxed">
                Your trusted partner for high-quality electrical components and industrial solutions.
              </p>
              <div className="pt-2">
                <p className="text-green-200 text-sm">ISO 9001:2015 Certified</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b border-green-700 pb-2">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                    <a href="#" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Home
                    </a>
                </li>
                <li>
                    <a href="#products" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Products
                    </a>
                </li>
                <li>
                  <a href="#about" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b border-green-700 pb-2">Contact Us</h3>
              <ul className="space-y-3 text-green-100">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Plot No.-6, Near Police Choki, Bhagat Singh Colony,Ballabgarh-121004, Faridabad</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+919911231643" className="hover:text-white transition-colors">+91 9911231643 </a>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@ustavengineering.com" className="hover:text-white transition-colors">utsavengg.india@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-green-800 mt-12 pt-6 text-center text-green-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Ustav Engineering India. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;