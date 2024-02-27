'use client';

import { Button, Navbar } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import { GoSidebarCollapse } from "react-icons/go";

function FlowbiteNavbar({ toggleSidebar }) { // Accept toggleSidebar as a prop
  const toggleStyle = {
    fontSize: "0.8rem",
    padding: "0px",
  };

  return (
    <Navbar fluid>
      <Navbar.Brand onClick={toggleSidebar}>
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Secrets Ninja</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Keys Checker
        </Navbar.Link>
        <Navbar.Link href="#">Find Your Secrets</Navbar.Link>
        <DarkThemeToggle style={toggleStyle} />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default FlowbiteNavbar;
