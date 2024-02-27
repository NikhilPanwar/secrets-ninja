
'use client';

import { Table } from 'flowbite-react';

function MainPageTable() {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Key Type</Table.HeadCell>
          <Table.HeadCell>Regex</Table.HeadCell>
          <Table.HeadCell>Endpoints</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Stripe'}
            </Table.Cell>
            <Table.Cell>{'[rs]k_live_[a-zA-Z0-9]{20,247}'}</Table.Cell>
            <Table.Cell>Balance, Customers, Orders, Payment Intents, Account</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Submit Endpoint
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Github
            </Table.Cell>
            <Table.Cell>ghp_******</Table.Cell>
            <Table.Cell>User, Repos</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
              Submit Endpoint
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Shopify</Table.Cell>
            <Table.Cell>(shppa_|shpat_)([0-9A-Fa-f]{32})</Table.Cell>
            <Table.Cell>Customers, Orders</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
              Submit Endpoint
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default MainPageTable;