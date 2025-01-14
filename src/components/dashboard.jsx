import React from 'react';
import MainPageTable from './table';
import { Alert, Button } from 'flowbite-react';
import { ImNewTab } from 'react-icons/im';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Dashboard({ servicesConfig }) {
  return (
    <div className="px-10 py-10">
      <Alert color="info">
        <ul className="list-disc list-inside">
          <li>
            <span className="font-medium">
              Found API Keys, Credentials while Pentesting!
            </span>{' '}
            Test them using Secrets Ninja ...
          </li>
          <li>
            <span className="font-medium">Note:</span> Secrets Ninja is an{' '}
            <a
              href="https://github.com/NikhilPanwar/secrets-ninja"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              open source
            </a>
            <ImNewTab className="inline-block ml-1" /> project for validating
            secrets from the frontend using JS in your browser.
          </li>
          <li>
            <span className="font-medium">By:</span>{' '}
            <a
              href="https://x.com/cyb3rs3cd4wg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              @cyb3rs3cd4wg{' '}
            </a>
          </li>
          <li>
            <span className="font-medium">Links:</span>{' '}
            <a
              href="https://github.com/NikhilPanwar/secrets-ninja"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              <FaGithub className="inline-block mr-1" />
            </a>
            <a
              href="https://x.com/cyb3rs3cd4wg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              <FaXTwitter className="inline-block mr-1" />
            </a>
          </li>
        </ul>
      </Alert>
      <div>
        <h1 className="text-2xl font-semibold dark:text-white py-10">
          Supported Keys
        </h1>
        <div>
          <MainPageTable servicesConfig={servicesConfig} />
        </div>
      </div>
    </div>
  );
}
