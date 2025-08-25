import { Card, Button } from 'flowbite-react';
import { Tabs } from 'flowbite-react';
import { BsTable } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import CopyButton from './copy_button';
import RawJsonTab from './response_window/json_view';
import JsonGridView from './response_window/json_grid_view';
import '../css/json_theme.css';

function OutputWindow({ status_code = 0, output_str = '{}' }) {
  if (status_code === 0) return null;

  let parsedData;
  try {
    parsedData = JSON.parse(output_str);
  } catch {
    parsedData = output_str;
  }

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold text-black dark:text-white">Response</h2>
        <div className="flex gap-2">
          <CopyButton textToCopy={output_str} />
          <Button color="gray" size="xs">
            {status_code === 200 ? '🟢' : '🔴'} {status_code}
          </Button>
        </div>
      </div>

      <Tabs aria-label="Default tabs" style="default">
        <Tabs.Item active title="Raw JSON" icon={VscJson}>
          <RawJsonTab parsedData={parsedData} />
        </Tabs.Item>
        <Tabs.Item title="JSON Grid" icon={BsTable}>
          <JsonGridView parsedData={parsedData} />
        </Tabs.Item>
      </Tabs>
    </Card>
  );
}

export default OutputWindow;
