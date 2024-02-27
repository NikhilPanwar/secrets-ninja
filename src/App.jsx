import React, { useState } from 'react';
import FlowbiteNavbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SB from './components/sidebar';
import FT from './components/footer';
import { Flowbite, theme } from 'flowbite-react';
import UniversalComponent from './modules/universal';
import { GoSidebarCollapse } from "react-icons/go";
import MainPageTable from './components/table';

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
            {sidebarVisible && <SB visible={sidebarVisible} className="dark:bg-slate-700" />}
            <div className={`flex-1 bg-gray-100 dark:bg-gray-700 overflow-auto ${sidebarVisible ? 'ml-[sidebar-width]' : ''}`}> {/* Adjust margin based on sidebar visibility */}
              <Routes>
                <Route path="/"/> 
                <Route path="/stripe" element={<UniversalComponent serviceType="Stripe" />} />
                <Route path="/openai" element={<UniversalComponent serviceType="OpenAI" />} />
                <Route path="/paystack" element={<UniversalComponent serviceType="Paystack" />} />
                <Route path="/github" element={<UniversalComponent serviceType="Github" />} />
                <Route path="/launchdarkly" element={<UniversalComponent serviceType="LaunchDarkly" />} />
                <Route path="/omnisend" element={<UniversalComponent serviceType="Omnisend" />} />
                <Route path="/shopify" element={<UniversalComponent serviceType="Shopify" />} />
                <Route path="/paypal" element={<UniversalComponent serviceType="Paypal" />} />
                <Route path="/telegram" element={<UniversalComponent serviceType="Telegram" />} />
                <Route path="/clearbit" element={<UniversalComponent serviceType="Clearbit" />} />
              </Routes>
            </div>
          </div>
          {/* <FT /> */}
        </div>
      </Router>
    </Flowbite>
  );
}
