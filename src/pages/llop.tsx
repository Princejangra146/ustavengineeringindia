import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Plus, Minus, CheckCircle } from 'lucide-react';

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

const LlopPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const s = localStorage.getItem('cart');
    return s ? JSON.parse(s) : [];
  });
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Two LLOP products
  const products: Product[] = [
    { id: 401, name: 'LLOP Model A', description: 'Standard LLOP unit', price: 980, originalPrice: 1225, image: '/pic4.png' },
    { id: 402, name: 'LLOP Model B', description: 'Advanced LLOP with extra features', price: 1280, originalPrice: 1600, image: '/pic2.png' }
  ];

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const q = quantities[product.id] || 1;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      const next = existing
        ? prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + q } : i)
        : [...prev, { product, quantity: q }];
      localStorage.setItem('cart', JSON.stringify(next));
      return next;
    });
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 3000);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const increaseQuantity = (id: number, e: React.MouseEvent) => { e.stopPropagation(); setQuantities(p => ({ ...p, [id]: (p[id] || 1) + 1 })); };
  const decreaseQuantity = (id: number, e: React.MouseEvent) => { e.stopPropagation(); setQuantities(p => ({ ...p, [id]: Math.max(1, (p[id] || 1) - 1) })); };

  const cartItemCount = cart.reduce((s, it) => s + it.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - without phone per your request */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-green-700 hover:text-green-800">
            <ArrowLeft size={20} />
            <span className="font-semibold text-gray-800">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Intentionally no phone shown here */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">LLOP Units</h1>
          <p className="text-gray-600 mt-2">High-quality LLOP units for industrial applications.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <article key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
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
                      <button onClick={(e) => decreaseQuantity(product.id, e)} className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700" aria-label={`Decrease quantity for ${product.name}`}>
                        <Minus size={16} />
                      </button>
                      <div className="px-4 text-sm font-medium">{quantities[product.id] || 1}</div>
                      <button onClick={(e) => increaseQuantity(product.id, e)} className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700" aria-label={`Increase quantity for ${product.name}`}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="ml-4 flex-1">
                      <button onClick={(e) => addToCart(product, e)} className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center gap-2 shadow hover:bg-green-700 transition-colors">
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

      {showCartPopup && (
        <div className="fixed bottom-6 right-6 bg-green-700 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3 z-50">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Item added to cart!</span>
          <button onClick={() => navigate('/checkout', { state: { cart } })} className="ml-4 px-3 py-1 bg-white text-green-700 rounded-md font-medium hover:bg-gray-100 transition-colors">Go to Checkout</button>
        </div>
      )}

      {cartItemCount > 0 && (
        <button onClick={() => navigate('/checkout', { state: { cart } })} className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center z-40">
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{cartItemCount}</span>
        </button>
      )}
    </div>
  );
};

export default LlopPage;