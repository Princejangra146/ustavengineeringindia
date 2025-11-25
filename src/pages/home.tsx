import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Phone, CheckCircle } from 'lucide-react';

// Define product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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

  // Sample products data
  const products: Product[] = [
    {
      id: 1,
      name: "AVR (UEI-01)",
      description: "Automatic Voltage Regulator",
      price: 199.99,
      image: "/UEI.png"
    },
    {
      id: 2,
      name: "TAVR-20",
      description: "Three Phase Automatic Voltage Regulator",
      price: 349.99,
      image: "/pic2.png"
    },
    {
      id: 3,
      name: "R-120",
      description: "High-power voltage regulator",
      price: 1299.99,
      image: "/pic4.png"
    },
    {
      id: 4,
      name: "UEI-A10",
      description: "Advanced Automatic Voltage Regulator",
      price: 599.99,
      image: "/pic5.png"
    },
    {
      id: 5,
      name: "UEI-A4",
      description: "Advanced Automatic Voltage Regulator",
      price: 599.99,
      image: "/pic7.png"
    }
  ];

  // Add to cart function with popup
  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 3000);
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
      {/* Top Header */}
      <div className="bg-green-800 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Shop Now</span>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+91 9911231643</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md">
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
              <ShoppingCart 
                size={24} 
                className="cursor-pointer" 
                onClick={() => navigate('/checkout', { state: { cart } })} 
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
{/* Banner Section - Responsive with different images */}
<div className="w-full relative">
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
  <div className="relative w-full" style={{ backgroundColor: '#F9ECDE' }}> {/* Dark blue background */}
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
          Premium Quality Products
        </h1>
        <p className="text-green-800 mb-6">
          Discover our exclusive collection at unbeatable prices
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-800 text-white hover:bg-gray-100 font-bold py-2 px-6 rounded-md shadow-lg transition duration-300"
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
          <h2 className="text-2xl font-semibold text-left mb-6">Search Results for "{searchQuery}"</h2>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
          <h2 className="text-3xl font-bold text-left mb-8">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
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
                  <button
                    onClick={(e) => addToCart(product, e)}
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

      {/* Cart Popup */}
      {showCartPopup && <CartPopup />}

      {/* Add the animation to your CSS */}
      <style >{`
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