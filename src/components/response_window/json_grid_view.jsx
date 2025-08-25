import { useState, useEffect } from 'react';
import JSONGrid from '@redheadphone/react-json-grid';

const lightTheme = {
  bgColor: 'transparent',
  keyColor: '#ff5e5e',
  stringColor: '#168f46',
  booleanColor: '#6699cc',
  numberColor: '#fdb082',
  objectColor: '#9ca3af',
  indexColor: '#9ca3af',
  borderColor: '#d1d5db',
  cellBorderColor: '#d1d5db',
  tableHeaderBgColor: '#f9fafb',
  tableIconColor: '#6b7280',
  selectHighlightBgColor: '#f3f4f6',
};

const darkTheme = {
  bgColor: 'transparent',
  keyColor: '#ff5e5e',
  stringColor: '#168f46',
  booleanColor: '#6699cc',
  numberColor: '#fdb082',
  objectColor: '#9ca3af',
  indexColor: '#9ca3af',
  borderColor: '#4b5563',
  cellBorderColor: '#4b5563',
  tableHeaderBgColor: '#1f2937',
  tableIconColor: '#9ca3af',
  selectHighlightBgColor: '#374151',
};

export default function JsonGridView({ parsedData }) {
  const [activeTheme, setActiveTheme] = useState(lightTheme);

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setActiveTheme(isDarkMode ? darkTheme : lightTheme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="overflow-auto text-xs md:text-sm font-mono"
      style={{ maxHeight: '58vh' }}
    >
      <JSONGrid
        data={parsedData}
        customTheme={activeTheme}
        defaultExpandDepth={0}
      />
    </div>
  );
}