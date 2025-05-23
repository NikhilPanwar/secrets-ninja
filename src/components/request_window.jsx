import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import CopyButton from './copy_button';
import '../css/json_theme.css';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';

SyntaxHighlighter.registerLanguage('bash', bash);

function RequestWindow({ curl = '' }) {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold dark:text-white">Request</h2>
        <CopyButton textToCopy={curl} />
      </div>
      <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
        <SyntaxHighlighter codeTagProps={{ className: 'text-xs md:text-sm font-mono dark:text-white' }} wrapLongLines={true} language="bash" style={github}>
          {curl}
        </SyntaxHighlighter>
      </div>
    </Card>
  );
}

export default RequestWindow;
