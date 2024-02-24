'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie } from 'react-icons/hi';
import { LiaStripeS } from "react-icons/lia";
import { Link } from 'react-router-dom';

function SB({ visible }) { // Accept visible as a prop
  if (!visible) return null; // Do not render if not visible

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Modules</h2>
          <Sidebar.Item href="/" icon={HiChartPie}>
            Meta
          </Sidebar.Item>
          <Link to="/stripe">
            <Sidebar.Item href="/stripe" icon={LiaStripeS}>
              Stripe
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SB;
