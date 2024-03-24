import { Card, Button } from 'flowbite-react';
import JSONPretty from "react-json-pretty";
import '../css/json_theme.css';
import CopyButton from './copy_button';

function OutputWindow({ status_code = 0, output_str = '{}' }) {

  if (status_code === 0) {
    return null;
  }

  return (
    <Card className="w-full">
    <div className="flex justify-between items-center flex-wrap">
      <h2 className="text-lg font-semibold dark:text-white">Response</h2>
      <div style={{ display: 'flex', gap: '8px' }}> {/* Adjusted part */}
        <CopyButton textToCopy={output_str} />
        <Button color="gray" size="xs">
          {status_code === 200 ? '🟢' : '🔴'} {status_code}
        </Button>
      </div>
    </div>
    <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
      <pre className="text-xs md:text-sm font-mono dark:text-white whitespace-pre-wrap">
        <JSONPretty id="json-pretty" data={output_str} />
      </pre>
    </div>
  </Card>
  );
}

export default OutputWindow;