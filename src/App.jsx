import FlowbiteNavbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SB from './components/sidebar';
import FT from './components/footer';
import { Flowbite, theme } from 'flowbite-react';
import UniversalComponent from './modules/universal';

export default function MyPage() { 
  return (
    <Flowbite>
      <Router>
        <div className="flex flex-col h-screen">
          <FlowbiteNavbar />
          <div className="flex flex-1 overflow-hidden">
            <SB className="dark:bg-slate-700" />
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 overflow-auto">
              <Routes>
                <Route path="/" element={<UniversalComponent serviceType="Paypal" />} />
                <Route path="/stripe" element={<UniversalComponent serviceType="Stripe" />} />
                {/* <Route path="/github" element={<Github />} />
                <Route path="/shopify" element={<Shopify />} />
                <Route path="/telegram" element={<Telegram />} />
                <Route path="/openai" element={<OpenAI />} />
                <Route path="/paystack" element={<Paystack />} />
                <Route path="/omnisend" element={<Omnisend />} />
                <Route path="/launchdarkly" element={<LaunchDarkly />} />
                <Route path="/clearbit" element={<Clearbit />} />
                <Route path="/paypal" element={<Paypal />} /> */}
              </Routes>
            </div>
          </div>
          {/* <FT /> */}
        </div>
      </Router>
    </Flowbite>
  );
}
