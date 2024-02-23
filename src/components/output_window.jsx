import { Card, Button } from 'flowbite-react';
import { FaRegClipboard } from "react-icons/fa";
import JSONPretty from "react-json-pretty";
import 'react-json-pretty/themes/1337.css';

function OutputWindow() {
  return (
    <Card className="w-full"> {/* Removed overflow-auto */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold dark:text-white">Response</h2>
        <Button.Group>
          <Button color="gray" size="xs"><FaRegClipboard className="mr-2 h-3 w-3" />Copy</Button>
          <Button color="gray" size="xs">🔴 400</Button>
        </Button.Group>
      </div>
      <div className="overflow-auto" style={{ maxHeight: '58vh' }}> {/* Scrollable container for JSON */}
        <pre className="text-xs md:text-sm font-mono dark:text-white whitespace-pre-wrap">
        <JSONPretty id="json-pretty" data={JSON.stringify({ message: "Your JSON output here Your JSON output hereYour" }, null, 2)}/>
        </pre>
      </div>
    </Card>
  );
}

export default OutputWindow;
