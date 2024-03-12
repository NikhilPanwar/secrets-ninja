import { Card, Button } from 'flowbite-react';
import { FaRegClipboard } from "react-icons/fa";
import 'react-json-pretty/themes/1337.css';
import { IoMdSend } from "react-icons/io";

function RequestWindow(curl = 'curl https://api.stripe.com/v1/balance -u sk_live_xxxx:') {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curl.curl).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold dark:text-white">Request</h2>
        {/* <Button.Group> */}
          <Button color="gray" size="xs" onClick={copyToClipboard}><FaRegClipboard className="mr-2 h-3 w-3" />Copy</Button>
          {/* <Button color="gray" size="xs"><IoMdSend className="mr-2 h-3 w-3" />Test</Button>
        </Button.Group> */}
      </div>
      <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
        <pre className="text-xs md:text-sm font-mono dark:text-white whitespace-pre-wrap">
          {curl.curl}
        </pre>
      </div>
    </Card>
  );
}

export default RequestWindow;