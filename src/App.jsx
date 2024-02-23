import FlowbiteNavbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SB from './components/sidebar';
import FT from './components/footer';
import Dashboard from './components/dashboard';
import Stripe from './modules/stripe';
import Github from './modules/github';
import Shopify from './modules/shopify';
import Telegram from './modules/telegram';
import OpenAI from './modules/openai';
import Paystack from './modules/paystack';
import Omnisend from './modules/omnisend';
import LaunchDarkly from './modules/launchdarkly';
import Clearbit from './modules/clearbit';
import Paypal from './modules/paypal';
import { Flowbite, theme } from 'flowbite-react';

export default function MyPage() { 
  return (
    <Flowbite>
    <Router>
    <div>
      <FlowbiteNavbar />
      <div className="flex h-screen">
        <SB />
        <div className="flex-1 bg-gray-100 dark:bg-gray-800">
        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stripe" element={<Stripe />} />
              <Route path="/github" element={<Github />} />
              <Route path="/shopify" element={<Shopify />} />
              <Route path="/telegram" element={<Telegram />} />
              <Route path="/openai" element={<OpenAI />} />
              <Route path="/paystack" element={<Paystack />} />
              <Route path="/omnisend" element={<Omnisend />} />
              <Route path="/launchdarkly" element={<LaunchDarkly />} />
              <Route path="/clearbit" element={<Clearbit />} />
              <Route path="/paypal" element={<Paypal />} />
            </Routes>
        </div>
    </div>
  </div>
  {/* <FT /> */}
  </Router>
  </Flowbite>
  );
}