import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import CopyButton from './copy_button';
import '../css/json_theme.css';

function RequestWindow({ curl = '' }) {

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold dark:text-white">Request</h2>
        <CopyButton textToCopy={curl} />
      </div>
      <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
        <pre className="text-xs md:text-sm font-mono dark:text-white whitespace-pre-wrap">
          {curl}
        </pre>
      </div>
    </Card>
  );
}

export default RequestWindow;