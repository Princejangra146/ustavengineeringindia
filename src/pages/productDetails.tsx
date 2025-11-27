import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle, ArrowLeft, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
  specifications: Record<string, string>;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "AVR (UEI-01)",
    description: "Automatic Voltage Regulator with advanced features for stable power supply. Designed for both residential and commercial use, ensuring your equipment receives clean and stable power at all times.",
    price: 550,
    originalPrice: 660,
    image: "/UEI.png",
    features: [
      "Wide input voltage range (90-300V)",
      "High precision voltage regulation (±1%)",
      "Overload and short circuit protection",
      "Automatic voltage boost/cut",
      "LED indicators for status",
      "Compact and wall-mountable design",
      "Cooling fan for temperature control",
      "Durable metal casing"
    ],
    specifications: {
      "Model": "UEI-01",
      "Input Voltage": "90-300V AC",
      "Output Voltage": "220-240V AC",
      "Frequency": "50/60Hz",
      "Power Capacity": "5KVA",
      "Efficiency": ">95%",
      "Response Time": "<10ms",
      "Operating Temperature": "0°C to 40°C",
      "Dimensions": "300 x 200 x 150 mm",
      "Weight": "8.5 kg",
      "Warranty": "2 Years"
    }
  },
  {
    id: 2,
    name: "TAVR-20",
    description: "Three Phase Automatic Voltage Regulator designed for industrial applications. Ensures stable power supply and protects sensitive equipment from voltage fluctuations.",
    price: 600,
    originalPrice: 750,
    image: "/pic2.png",
    features: [
      "Three-phase voltage regulation",
      "High precision (±1% output voltage accuracy)",
      "Forced air cooling system",
      "Comprehensive protection features",
      "LED display for monitoring",
      "Rugged industrial design",
      "Optional communication interface",
      "Suitable for harsh environments"
    ],
    specifications: {
      "Model": "TAVR-20",
      "Input Voltage": "3-Phase, 4-Wire, 3 x 380V ± 20% (Line to Neutral)",
      "Output Voltage": "3-Phase, 4-Wire, 3 x 380V (Line to Neutral)",
      "Frequency": "50/60Hz ± 5%",
      "Power Capacity": "20KVA",
      "Output Accuracy": "±1% (Balanced Load)",
      "Load Power Factor": "0.8 Lag to 0.9 Lead",
      "Efficiency": ">98%",
      "Response Time": "<1/2 Cycle",
      "Overload Capacity": "150% for 10 seconds",
      "Cooling": "Forced Air Cooling",
      "Protection": "Overload, Short Circuit, Over Temperature, Phase Failure, Phase Sequence",
      "Display": "LED for Output Voltage, Load Current, and Status",
      "Communication": "Optional RS485/Modbus RTU",
      "Enclosure": "IP20 (Indoor Use)",
      "Standards": "IEC 61000-4-11, IEC 61000-4-5, IEC 61000-4-29, IEC 62040-1/2/3",
      "Operating Temperature": "0°C to 45°C",
      "Warranty": "2 Years"
    }
  },
  {
    id: 3,
    name: "R-120",
    description: "High-power voltage regulator for industrial applications. Built to withstand harsh environments and provide reliable voltage regulation for critical equipment.",
    price: 650,
    originalPrice: 812,
    image: "/pic4.png",
    features: [
      "High power capacity (120KVA)",
      "Three-phase voltage regulation",
      "Precision voltage control (±0.5%)",
      "Advanced cooling system",
      "Comprehensive protection features",
      "Digital display and controls",
      "Rugged industrial construction",
      "Remote monitoring capability"
    ],
    specifications: {
      "Model": "R-120",
      "Input Voltage": "3-Phase, 4-Wire, 3 x 415V ± 25%",
      "Output Voltage": "3-Phase, 4-Wire, 3 x 415V",
      "Frequency": "50/60Hz",
      "Power Capacity": "120KVA",
      "Voltage Regulation": "±0.5% (Balanced Load)",
      "Efficiency": ">98%",
      "Response Time": "<20ms",
      "Cooling": "Forced Air with Temperature Control",
      "Protection": "Overload, Short Circuit, Over Temperature, Phase Failure, Phase Sequence, Surge Protection",
      "Display": "LCD with Touch Interface",
      "Communication": "RS485/Modbus, Ethernet (Optional)",
      "Enclosure": "IP54 (Dust and Water Resistant)",
      "Operating Temperature": "-10°C to 50°C",
      "Warranty": "3 Years"
    }
  },
  {
    id: 4,
    name: "UEI-A10",
    description: "Advanced Automatic Voltage Regulator with smart features for modern power management. Ideal for commercial and industrial applications requiring precise voltage control.",
    price: 900,
    originalPrice: 1125,
    image: "/pic5.png",
    features: [
      "Smart voltage regulation",
      "Energy saving mode",
      "Wi-Fi connectivity",
      "Mobile app control",
      "Real-time monitoring",
      "Automatic bypass",
      "Compact design",
      "Multiple protection features"
    ],
    specifications: {
      "Model": "UEI-A10",
      "Input Voltage": "140-300V AC",
      "Output Voltage": "220-240V AC",
      "Frequency": "50/60Hz",
      "Power Capacity": "10KVA",
      "Voltage Regulation": "±1%",
      "Efficiency": ">96%",
      "Response Time": "<5ms",
      "Cooling": "Temperature Controlled Fan",
      "Protection": "Overload, Short Circuit, Over Temperature, Surge Protection",
      "Connectivity": "Wi-Fi 802.11 b/g/n",
      "Display": "LCD with Touch Interface",
      "App Support": "iOS & Android",
      "Enclosure": "Wall Mountable",
      "Operating Temperature": "0°C to 40°C",
      "Warranty": "3 Years"
    }
  },
  {
    id: 5,
    name: "UEI-A4",
    description: "Premium Automatic Voltage Regulator with advanced features for critical applications. Provides clean and stable power for sensitive electronic equipment.",
    price: 1250,
    originalPrice: 1562,
    image: "/pic7.png",
    features: [
      "Ultra-precise voltage regulation",
      "Pure sine wave output",
      "Double conversion technology",
      "Zero transfer time",
      "LCD display with touch controls",
      "Remote monitoring",
      "Hot-swappable batteries (optional)",
      "Network-grade protection"
    ],
    specifications: {
      "Model": "UEI-A4",
      "Input Voltage": "160-280V AC",
      "Output Voltage": "220-240V AC",
      "Frequency": "50/60Hz",
      "Power Capacity": "4KVA",
      "Voltage Regulation": "±1%",
      "Waveform": "Pure Sine Wave",
      "Efficiency": ">95%",
      "Transfer Time": "0ms",
      "Battery Backup": "Optional",
      "Display": "Color LCD with Touch Interface",
      "Connectivity": "USB, RS232, Ethernet",
      "Protection": "Overload, Short Circuit, Over Temperature, Surge Protection, Battery Backup",
      "Enclosure": "Tower/Desktop",
      "Operating Temperature": "0°C to 40°C",
      "Warranty": "3 Years"
    }
  }
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id || '0'));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item: any) => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          description: product.description
        },
        quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setShowAddedToCart(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 3000);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading product details...</div>
      </div>
    );
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-sm">Back to Products</span>
            </button>
            <div className="text-sm text-gray-500">/</div>
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image + details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 rounded-lg p-6">
                  <img src={product.image} alt={product.name} className="max-h-96 object-contain" />
                </div>
                <div className="md:w-1/2">
                  <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
                  <p className="text-gray-600 mt-3">{product.description}</p>

                  <div className="mt-6 flex items-center gap-4">
                    <div>
                      <div className="text-3xl font-bold text-green-700">₹{product.price}/-</div>
                      {product.originalPrice > product.price && (
                        <div className="flex items-center gap-3 mt-1">
                          <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}/-</div>
                          <div className="text-sm bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">{discountPercentage}% OFF</div>
                        </div>
                      )}
                    </div>
                    <div className="ml-auto text-sm text-gray-500">In Stock</div>
                  </div>

                  {/* Features grid */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 text-green-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="text-gray-600 text-sm">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3 align-top">{key}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Sticky Purchase Card (hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-xl font-bold text-green-700">₹{product.price}/-</div>
              </div>

              {product.originalPrice > product.price && (
                <div className="mt-2 text-sm text-gray-400 line-through">₹{product.originalPrice}/-</div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button onClick={decrementQuantity} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-l-md bg-gray-50 text-gray-700 hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-200 bg-white">{quantity}</div>
                  <button onClick={incrementQuantity} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button onClick={handleAddToCart} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-green-600 transition-all">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>

                {showAddedToCart && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1 text-sm">Item added to cart!</div>
                    <button onClick={() => navigate('/checkout')} className="text-sm text-blue-600 font-medium">Checkout</button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
      {/* Mobile Add to Cart Bar (visible only on small screens) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button onClick={decrementQuantity} className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-700"><Minus className="h-4 w-4" /></button>
            <div className="w-12 text-center text-sm">{quantity}</div>
            <button onClick={incrementQuantity} className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-700"><Plus className="h-4 w-4" /></button>
          </div>

          <button onClick={handleAddToCart} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>

        {showAddedToCart && (
          <div className="mt-2 px-2">
            <div className="bg-green-50 text-green-700 rounded-md p-2 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Item added to cart!</div>
              <button onClick={() => navigate('/checkout')} className="text-sm text-blue-600 font-medium">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;