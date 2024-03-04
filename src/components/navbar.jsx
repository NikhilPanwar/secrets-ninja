import React, { useState } from 'react'; // Import useState
import { Navbar } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import logo from '../assets/logo-t.png';
import Hamburger from 'hamburger-react';

function FlowbiteNavbar({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  // Function to toggle sidebar and hamburger state
  const handleToggle = () => {
    // setIsOpen(!isOpen); // Toggle the state
    toggleSidebar(); // Call the prop function to actually toggle the sidebar
  };

  const toggleStyle = {
    fontSize: "0.8rem",
    padding: "0px",
  };

  return (
    <Navbar fluid>
      <div className="flex items-center">
        <Hamburger toggled={!isOpen} toggle={handleToggle} className="mr-3" size={20} direction="left" color='#9CA3AF' hideOutline={false} distance="lg" />
        <Navbar.Brand>
          <img src={logo} className="h-10 sm:h-10" alt="Secrets Ninja Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Secrets Ninja</span>
        </Navbar.Brand>
      </div>
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
