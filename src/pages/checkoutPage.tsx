import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from either location state or localStorage
  useEffect(() => {
    const loadCart = () => {
      if (location.state?.cart) {
        setCartItems(location.state.cart);
        localStorage.setItem('cart', JSON.stringify(location.state.cart));
      } else {
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

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(prevItems => 
        prevItems.filter(item => item.product.id !== productId)
      );
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateGST = () => {
    const total = calculateTotal();
    return Math.round(total * 0.18); // 18% GST
  };

  const calculateTotalWithGST = () => {
    return calculateTotal() + calculateGST();
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      if (item.product.originalPrice > item.product.price) {
        return savings + ((item.product.originalPrice - item.product.price) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const handleWhatsAppContact = () => {
    const orderItems = cartItems.map(item => {
      const itemTotal = item.product.price * item.quantity;
      return `${item.quantity}x ${item.product.name} - ₹${itemTotal}/-`;
    }).join('%0A');

    const totalAmount = calculateTotalWithGST();
    const totalSavings = calculateSavings();

    let message = `Hello! I'm interested in placing an order for:%0A%0A${orderItems}%0A%0A`;
    
    if (totalSavings > 0) {
      message += `Total Savings: ₹${totalSavings}/-%0A`;
    }
    
    message += `Subtotal: ₹${calculateTotal()}/-%0A`;
    message += `GST (18%): ₹${calculateGST()}/-%0A`;
    message += `*Freight charges extra%0A`;
    message += `Total Amount (incl. GST): ₹${totalAmount}/-%0A%0APlease contact me to proceed.`;
    
    window.open(`https://wa.me/919911231643?text=${message}`, '_blank');
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const discountPercentage = item.product.originalPrice > item.product.price 
                ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                : 0;
              
              return (
                <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row">
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    
                    {/* Price Display */}
                    <div className="mt-2">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-700">₹{item.product.price}/-</span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="ml-2 text-gray-400 line-through">₹{item.product.originalPrice}/-</span>
                        )}
                      </div>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-sm text-green-700">
                          Save ₹{(item.product.originalPrice - item.product.price) * item.quantity} ({discountPercentage}% off)
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-4 flex items-center">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-center">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-4 text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map(item => {
                  const singlePrice = item.product.price;
                  const totalPrice = singlePrice * item.quantity;
                  
                  return (
                    <div key={item.product.id} className="text-sm mb-2">
                      <div className="font-medium">{item.product.name}</div>
                      <div className="flex justify-between text-gray-600 pl-2">
                        <span>₹{singlePrice}/- × {item.quantity}</span>
                        <span>= ₹{totalPrice}/-</span>
                      </div>
                      {item.product.originalPrice > singlePrice && (
                        <div className="text-xs text-green-600 pl-2">
                          You save ₹{(item.product.originalPrice - singlePrice) * item.quantity}/-
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {calculateSavings() > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-green-700">
                    <span>You Save</span>
                    <span>₹{calculateSavings()}/-</span>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}/-</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{calculateGST()}/-</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic text-center">
                  *Freight charges extra
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>₹{calculateTotalWithGST()}/-</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppContact}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
              >
                Proceed to WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;