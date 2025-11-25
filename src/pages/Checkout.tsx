import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from either location state or localStorage
  useEffect(() => {
    const loadCart = () => {
      // First try to get cart from location state
      if (location.state?.cart) {
        setCartItems(location.state.cart);
        localStorage.setItem('cart', JSON.stringify(location.state.cart));
      } 
      // If no cart in location state, try localStorage
      else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    };

    loadCart();
  }, [location.state]);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  // Update cart item quantity
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleWhatsAppContact = (phoneNumber: string) => {
    const orderItems = cartItems.map(item =>
      `- ${item.product.name} (${item.quantity} units)`
    ).join('%0A');

    const message = `Hello! I'm interested in placing an order for:%0A%0A${orderItems}%0A%0APlease contact me to proceed.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    clearCart();
  };

  // Clear cart after order is placed
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={handleContinueShopping}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors group mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your Order</h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.product.id} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="h-20 w-20 bg-gray-100 rounded-lg flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <button
                onClick={() => handleWhatsAppContact('919911237143')}
                disabled={cartItems.length === 0}
                className={`w-full text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  cartItems.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.498 14.382a.8.8 0 0 0-.8-.8h-.2a.8.8 0 0 0-.8.8v.2a.8.8 0 0 0 .8.8h.2a.8.8 0 0 0 .8-.8v-.2zm-3.2 0a.8.8 0 0 0-.8-.8h-.2a.8.8 0 0 0-.8.8v.2a.8.8 0 0 0 .8.8h.2a.8.8 0 0 0 .8-.8v-.2zm-3.2 0a.8.8 0 0 0-.8-.8h-.2a.8.8 0 0 0-.8.8v.2a.8.8 0 0 0 .8.8h.2a.8.8 0 0 0 .8-.8v-.2z"/>
                  <path d="M12 0C5.373 0 0 4.925 0 11c0 2.2.7 4.2 1.9 5.8L0 24l7.3-1.9c1.6 1 3.5 1.6 5.5 1.6 6.7 0 12-4.9 12-11 0-6.1-5.3-11-12-11zm6.1 16.5c-.3.9-1.5 1.6-2.5 1.8-.7.1-1.6.2-4.6-.8-3.1-1.1-5.1-3.7-5.3-3.9-.2-.2-1.6-2.1-1.6-4 0-1.9 1-2.8 1.4-3.2.4-.4.8-.6 1.2-.6h.3c.3 0 .7.1 1 .6.3.5 1 1.7 1.1 1.8.1.2.2.4.1.6-.1.2-.2.4-.4.5-.2.1-.3.2-.6.2s-.5.1-.7.2c-.2.1-.3.3-.2.5.1.2.6 1.1 1.3 1.8.9.8 1.6 1.1 1.9 1.2.2.1.4.1.6 0 .2-.1.5-.2.7-.4.2-.2.5-.5.6-.6.2-.1.3-.1.5 0 .2 0 1.2.6 1.4.7.2.1.3.2.4.3.1.2.1.5-.1.7z"/>
                </svg>
                <span>Contact on WhatsApp</span>
              </button>
            </div>
            
            <button
              onClick={handleContinueShopping}
              className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;