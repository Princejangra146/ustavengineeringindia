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
      {/* Top Header - Sticky */}
  <div className={`sticky top-0 z-50 text-white py-2 text-sm transition-all duration-300 ${
  isScrolled 
    ? 'bg-green-800/90 backdrop-blur-sm' 
    : 'bg-green-800'
}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Shop Now</span>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+91 9911231643</span>
          </div>
        </div>
      </div>

      {/* Navbar - Sticky */}
 <nav className={`sticky top-8 z-40 shadow-md transition-all duration-300 ${
  isScrolled 
    ? 'bg-white/90 backdrop-blur-sm' 
    : 'bg-white'
}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="UEI Logo" 
              className="h-14 w-auto object-contain" 
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
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-green-600 text-white rounded-r-md hover:bg-green-700"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Link to="/checkout" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Category Bar */}
<div className={`sticky top-[104px] z-30 border-t border-gray-100 transition-all duration-300 ${
  isScrolled 
    ? 'bg-white/90 backdrop-blur-sm' 
    : 'bg-white'
}`} style={{
  WebkitBackdropFilter: isScrolled ? 'blur(4px)' : 'none',
  backdropFilter: isScrolled ? 'blur(4px)' : 'none'
}}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-hide">
              {/* Category items will go here */}
              <button className="flex-shrink-0 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
                All Categories
              </button>
              {[
                'AVR', 'Safety Unit', 'Solenoid', 'Battery Charger', 'Diode',
                'LLOP', 'RRA', 'Level Switch', 'Hardness Wire', 'Stop Unit'
              ].map((category) => (
                <button 
                  key={category}
                  className="flex-shrink-0 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 whitespace-nowrap transition-colors"
                >
                  {category}
                </button>
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
    </div>
  );
};

export default Home;