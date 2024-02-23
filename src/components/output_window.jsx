'use client';

import { Card, Button } from 'flowbite-react';
import { FaRegClipboard } from "react-icons/fa";

function OutputWindow() {
  return (
    <Card className="w-full">
    <div className="flex justify-between items-center">
  <h2 className="text-lg font-semibold dark:text-white">Response</h2>
  <Button.Group>
    <Button color="gray" size="xs"><FaRegClipboard className="mr-2 h-3 w-3" />Copy</Button>
    <Button color="gray" size="xs">🔴 400</Button>
  </Button.Group>
</div>
      <pre className="text-xs md:text-sm font-mono dark:text-white">
        {JSON.stringify({ message: "Your JSON output here" }, null, 2)}
      </pre>
    </Card>
  );
}

export default OutputWindow;
