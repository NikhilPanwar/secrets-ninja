'use client';

import { Sidebar } from 'flowbite-react';
import { LiaStripeS } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { RiOpenaiFill } from "react-icons/ri";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { SlPaypal } from "react-icons/sl";
import { HiArrowSmRight, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
import { FaGithub, FaShopify, FaTelegramPlane } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { SiSendinblue } from "react-icons/si";
import { FaTrello } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import serviceConfig from '../data/detectors.json';


function SB({ visible }) { // Accept visible as a prop
  if (!visible) return null; // Do not render if not visible

  let serviceIcons = {
    Stripe: LiaStripeS,
    Paypal: SlPaypal,
    OpenAI: RiOpenaiFill,
    LaunchDarkly: HiOutlineRocketLaunch,
    Github: FaGithub,
    Shopify: FaShopify,
    Telegram: FaTelegramPlane,
    Sendinblue: SiSendinblue,
    Trello: FaTrello
  };

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Modules</h2>
          <Sidebar.Item href="/" icon={CiCircleInfo}>
            About
          </Sidebar.Item>
          {Object.keys(serviceConfig).map((service) => (
            <Sidebar.Item
              key={service}
              href={`/${service.toLowerCase()}`}
              icon={serviceIcons[service] ? serviceIcons[service] : IoMdArrowDroprightCircle}
            >
              {service}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SB;
