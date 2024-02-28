import React, { useState } from 'react';
import FlowbiteNavbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SB from './components/sidebar';
import FT from './components/footer';
import { Flowbite, theme } from 'flowbite-react';
import UniversalComponent from './modules/universal';
import Dashboard from './components/dashboard';
import servicesConfig from './data/detectors.json';

export default function MyPage() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Flowbite>
      <Router>
        <div className="flex flex-col h-screen">
          <FlowbiteNavbar toggleSidebar={toggleSidebar} />
          <div className="flex flex-1 overflow-hidden">
            {sidebarVisible && <SB visible={sidebarVisible} servicesConfig={servicesConfig} className="dark:bg-slate-700" />}
            <div className={`flex-1 bg-gray-100 dark:bg-gray-700 overflow-auto ${sidebarVisible ? 'ml-[sidebar-width]' : ''}`}> {/* Adjust margin based on sidebar visibility */}
              <Routes>
                <Route path="/" element={<Dashboard servicesConfig={servicesConfig}/>} />
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
          {/* <FT /> */}
        </div>
      </Router>
    </Flowbite>
  );
}
