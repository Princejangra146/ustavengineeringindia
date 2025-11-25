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
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Products
        </button>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Price Section */}
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-green-700">₹{product.price}/-</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="ml-3 text-xl text-gray-400 line-through">₹{product.originalPrice}/-</span>
                      <span className="ml-3 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <p className="mt-1 text-sm text-green-700">
                    You save ₹{product.originalPrice - product.price} ({discountPercentage}%)
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

            {/* Add to Cart Button */}
<div className="mt-8 space-y-3">
  <button
    onClick={handleAddToCart}
    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
  >
    <ShoppingCart className="h-5 w-5 mr-2" />
    Add to Cart
  </button>
  
  {/* Show Checkout button only if there are items in cart */}
  {showAddedToCart && (
    <>
      <button
        onClick={() => navigate('/checkout')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
      >
        Proceed to Checkout
      </button>
      <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center">
        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
        <span>Item added to cart!</span>
      </div>
    </>
  )}
</div>

              {/* Features */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                        {key}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-500">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;