import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AVRPage from './pages/avr';
import ProductDetails from './pages/details';
import SafetyUnit from './pages/safetyUnit';
import Solenoid from './pages/solenoid';
import Diode from './pages/diode';
import BatteryChargerPage from './pages/batteryCharger';
import Checkout from './pages/checkoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import LlopPage from './pages/llop';
import RRAPage from './pages/rra';
import LevelSwitchPage from './pages/levelSwitch';
import HardnessWirePage from './pages/hardnessWire';
import StopUnitPage from './pages/stopUnit';
import ControllerPage from './pages/controller';
import PanelPage from './pages/panel';
import RectifierPage from './pages/rectifier';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/avr" element={<AVRPage />} />
  <Route path="/solenoid" element={<Solenoid />} />
  <Route path="/diode" element={<Diode />} />
  <Route path="/battery-charger" element={<BatteryChargerPage />} />
      <Route path="/safety-unit" element={<SafetyUnit />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/llop" element={<LlopPage />} />
        <Route path="/rra" element={<RRAPage />} />
        <Route path="/level-switch" element={<LevelSwitchPage />} />
        <Route path="/hardness-wire" element={<HardnessWirePage />} />
        <Route path="/stop-unit" element={<StopUnitPage />} />
        <Route path="/controller" element={<ControllerPage />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/rectifier" element={<RectifierPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);