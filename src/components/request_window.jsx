import React from 'react';
import { Card } from 'flowbite-react';
import CopyButton from './copy_button';
import '../css/json_theme.css';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('bash', bash);

const customStyle = {
  ...github,
  'hljs': {
    ...github['hljs'],
    background: 'transparent',
    color: '#333'
  },
  'hljs-string': {
    ...github['hljs-string'],
    color: '#ff5e5e'
  },
  'hljs-literal': {
    ...github['hljs-literal'],
    color: '#ff5e5e'
  },
  'hljs-number': {
    ...github['hljs-number'],
    color: '#ff5e5e'
  },
  'hljs-built_in': {
    ...github['hljs-built_in'],
    color: '#ff5e5e'
  }
};

function RequestWindow({ curl = '' }) {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold dark:text-white">Request</h2>
        <CopyButton textToCopy={curl} />
      </div>
      <div className="overflow-x-auto" style={{ maxHeight: '58vh' }}>
        <SyntaxHighlighter
          codeTagProps={{
            className: 'text-xs md:text-sm font-mono dark:text-white',
            style: { whiteSpace: 'pre' }
          }}
          wrapLongLines={false}
          language="bash"
          style={customStyle}
        >
          {curl}
        </SyntaxHighlighter>
      </div>
    </Card>
  );
}

export default RequestWindow;
