import { Card, Button } from 'flowbite-react';
import { FaRegClipboard } from "react-icons/fa";
import JSONPretty from "react-json-pretty";
import 'react-json-pretty/themes/1337.css';

function OutputWindow({ status_code = 0, output_str = '{}' }) {

  if (status_code === 0) {
    return null; // or return <></> for an empty fragment
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output_str).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold dark:text-white">Response</h2>
        <Button.Group>
          <Button color="gray" size="xs" onClick={copyToClipboard}><FaRegClipboard className="mr-2 h-3 w-3" />Copy</Button>
          <Button color="gray" size="xs">{status_code === 200 ? '🟢' : '🔴'} {status_code}</Button>
        </Button.Group>
      </div>
      <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
        <pre className="text-xs md:text-sm font-mono dark:text-white whitespace-pre-wrap">
          <JSONPretty id="json-pretty" data={output_str}/>
        </pre>
      </div>
    </Card>
  );
}

export default OutputWindow;