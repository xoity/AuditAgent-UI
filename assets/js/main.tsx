import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/style.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import DeviceActivate from './components/DeviceActivate';

console.log('AuditAgent UI mounting...');

const Landing = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <Hero />
    <Features />
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/device/activate" element={<DeviceActivate />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
