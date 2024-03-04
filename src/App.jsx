import React, { useState, useEffect } from 'react';
import FlowbiteNavbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SB from './components/sidebar';
import FT from './components/footer';
import { Flowbite } from 'flowbite-react';
import UniversalComponent from './modules/universal';
import Dashboard from './components/dashboard';
import servicesConfig from './data/detectors.json';

// Custom hook to listen to window resize events
const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

export default function MyPage() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [width] = useWindowSize();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const isLargeScreen = width >= 1024;

  // Adjusted styles to ensure footer is always visible and not overlaid
  const containerStyle = `flex flex-col h-screen`;
  const contentContainerStyle = isLargeScreen ? 'flex flex-1' : 'flex flex-1 overflow-hidden';
  const sidebarStyle = isLargeScreen ?
    { maxHeight: '100%', overflowY: 'auto' } : // Adjust for navbar height
    { zIndex: 30, position: 'fixed', width: '100%', height: 'calc(100vh - 60px)', overflowY: 'auto' };
  const contentStyle = isLargeScreen ? 'flex-1 bg-gray-100 dark:bg-gray-700 overflow-auto' : `flex-1 bg-gray-100 dark:bg-gray-700 overflow-auto ${sidebarVisible ? 'sidebar-overlay' : ''}`;
  const footerStyle = { zIndex: 50, position: 'relative' }; // Ensure the footer has a higher zIndex

  return (
    <Flowbite>
      <Router>
        <div className={containerStyle}>
          <div className="sticky top-0 z-50">
            <FlowbiteNavbar toggleSidebar={toggleSidebar} />
          </div>
          <div className={contentContainerStyle}>
            {sidebarVisible && (
              <div style={sidebarStyle}>
                <SB visible={sidebarVisible} servicesConfig={servicesConfig} className="dark:bg-slate-700" />
              </div>
            )}
            <div className={contentStyle}>
              <Routes>
                <Route path="/" element={<Dashboard servicesConfig={servicesConfig} />} />
                {Object.keys(servicesConfig).map((service) => (
                  <Route
                    key={service}
                    path={`/${service.toLowerCase()}`}
                    element={<UniversalComponent serviceType={service} servicesConfig={servicesConfig} />}
                  />
                ))}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Flowbite>
  );
}
