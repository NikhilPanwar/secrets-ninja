'use client';

import { Table } from 'flowbite-react';
import servicesConfig from '../data/detectors.json';

function MainPageTable() {
  // Helper function to capitalize first letter and replace underscores
  const formatEndpointName = (name) => {
    return name
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  // Function to transform service config into rows for rendering
  const renderServiceRows = () => {
    return Object.entries(servicesConfig).map(([serviceName, serviceDetails]) => (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={serviceName}>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {serviceName}
        </Table.Cell>
        <Table.Cell>
          {Object.keys(serviceDetails.endpoints)
            .map(endpointName => formatEndpointName(endpointName))
            .join(', ')}
        </Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Service Name</Table.HeadCell>
          <Table.HeadCell>Endpoints</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {renderServiceRows()}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MainPageTable;
