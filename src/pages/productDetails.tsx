import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  specifications: Record<string, string>;
}

const productsData = [
  {
    id: 1,
    name: "AVR (UEI-01)",
    description: "Automatic Voltage Regulator with advanced features for stable power supply. Designed for both residential and commercial use, ensuring your equipment receives clean and stable power at all times.",
    price: 0,
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
  price: 0,
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
  price: 0,
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
    "Input Voltage": "3-Phase, 4-Wire, 3 x 380V ± 20%",
    "Output Voltage": "3-Phase, 4-Wire, 3 x 380V",
    "Frequency": "50/60Hz ± 5%",
    "Power Capacity": "120KVA",
    "Voltage Regulation": "±0.5% (Balanced Load)",
    "Load Power Factor": "0.8 Lag to 0.9 Lead",
    "Efficiency": ">95%",
    "Response Time": "<1 Cycle",
    "Overload Capacity": "125% for 1 minute",
    "Cooling": "Forced Air with Temperature Control",
    "Protection": "Overload, Short Circuit, Over Temperature, Phase Failure, Phase Sequence, Surge Protection",
    "Display": "LCD Display with Touch Controls",
    "Communication": "RS485/Modbus RTU (Standard)",
    "Enclosure": "IP42 (Indoor Use)",
    "Standards": "IEC 62040-1, IEC 62040-2, IEC 62040-3, UL 1778, CE",
    "Operating Temperature": "0°C to 40°C",
    "Humidity": "0-95% (Non-condensing)",
    "Noise Level": "<65dB at 1m",
    "Dimensions": "800 x 600 x 2000 mm (WxDxH)",
    "Weight": "Approx. 350 kg",
    "Warranty": "2 Years"
  }
},
  {
  id: 4,
  name: "UEI-A10",
  description: "Advanced Automatic Voltage Regulator with smart features for modern power management. Ideal for commercial and industrial applications requiring precise voltage control.",
  price: 0,
  image: "/pic5.png",
  features: [
    "Advanced digital control system",
    "High precision voltage regulation (±0.5%)",
    "Energy saving mode",
    "Comprehensive protection features",
    "LCD display with intuitive interface",
    "Remote monitoring and control",
    "Compact and modular design",
    "Low noise operation"
  ],
  specifications: {
    "Model": "UEI-A10",
    "Input Voltage": "3-Phase, 4-Wire, 3 x 380V ± 15%",
    "Output Voltage": "3-Phase, 4-Wire, 3 x 380V",
    "Frequency": "50/60Hz ± 5%",
    "Power Capacity": "10KVA",
    "Voltage Regulation": "±0.5% (Balanced Load)",
    "Load Power Factor": "0.8 Lag to 0.9 Lead",
    "Efficiency": ">96%",
    "Response Time": "<10ms",
    "Overload Capacity": "150% for 10 seconds",
    "Cooling": "Temperature Controlled Fan",
    "Protection": "Overload, Short Circuit, Over Temperature, Phase Failure, Surge Protection",
    "Display": "LCD with Backlight",
    "Communication": "Optional RS485/Modbus RTU",
    "Enclosure": "IP20 (Indoor Use)",
    "Standards": "IEC 62040-1, IEC 62040-2, CE, RoHS",
    "Operating Temperature": "0°C to 40°C",
    "Humidity": "0-90% (Non-condensing)",
    "Noise Level": "<45dB at 1m",
    "Dimensions": "482 x 350 x 88 mm (WxDxH)",
    "Weight": "Approx. 15 kg",
    "Warranty": "2 Years"
  }
},
  {
  id: 5,
  name: "AVR Pro-30",
  description: "Professional-grade automatic voltage regulator for critical applications. Designed for maximum reliability and performance in demanding environments.",
  price: 0,
  image: "/pic7.png",
  features: [
    "High power capacity (30KVA)",
    "Three-phase voltage regulation",
    "Precision voltage control (±0.5%)",
    "Advanced cooling system with temperature control",
    "Comprehensive protection features",
    "User-friendly LCD interface",
    "Rugged industrial construction",
    "Remote monitoring and control"
  ],
  specifications: {
    "Model": "AVR Pro-30",
    "Input Voltage": "3-Phase, 4-Wire, 3 x 380V ± 20%",
    "Output Voltage": "3-Phase, 4-Wire, 3 x 380V",
    "Frequency": "50/60Hz ± 5%",
    "Power Capacity": "30KVA",
    "Voltage Regulation": "±0.5% (Balanced Load)",
    "Load Power Factor": "0.8 Lag to 0.9 Lead",
    "Efficiency": ">96%",
    "Response Time": "<1 Cycle",
    "Overload Capacity": "150% for 10 seconds",
    "Cooling": "Dual Fans with Temperature Control",
    "Protection": "Overload, Short Circuit, Over Temperature, Phase Failure, Phase Sequence, Surge Protection",
    "Display": "LCD with Status Indicators",
    "Communication": "RS485/Modbus RTU (Standard)",
    "Enclosure": "IP20 (Indoor Use)",
    "Standards": "IEC 62040-1, IEC 62040-2, CE, RoHS",
    "Operating Temperature": "0°C to 40°C",
    "Humidity": "0-95% (Non-condensing)",
    "Noise Level": "<55dB at 1m",
    "Dimensions": "600 x 450 x 180 mm (WxDxH)",
    "Weight": "Approx. 45 kg",
    "Warranty": "2 Years"
  }
},
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const addToCart = () => {
    if (!product) return;
    
    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart.push({
        product: product,
        quantity: 1
      });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show checkout button
    setShowCheckout(true);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors group"
          >
            <svg 
              className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="font-medium">Back to Products</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Image */}
            <div className="p-6 lg:p-8">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain object-center p-6"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 lg:p-8 lg:border-l border-gray-100">
              <div className="lg:sticky lg:top-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="prose prose-sm text-gray-500 mb-6">
                  <p>{product.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h2>
                  <ul className="grid grid-cols-1 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <div className="mt-8 space-y-4">
                    {!showCheckout ? (
                      <button
                        onClick={addToCart}
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-center justify-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Item added to cart!</span>
                        </div>
                        <button
                          onClick={handleCheckout}
                          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <span>Go to Checkout</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setShowCheckout(false)}
                          className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium mt-2"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="border-t border-gray-200 px-6 py-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 w-2/5">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">
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
      </main>
    </div>
  );
};

export default ProductDetails;