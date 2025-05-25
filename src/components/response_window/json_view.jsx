import JSONPretty from 'react-json-pretty';

function RawJsonTab({ parsedData }) {
  return (
    <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
      <pre className="text-xs md:text-sm font-mono text-black dark:text-white whitespace-pre-wrap">
        <JSONPretty id="json-pretty" data={parsedData} />
      </pre>
    </div>
  );
}

export default RawJsonTab;
