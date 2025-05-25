import { useMemo } from 'react';
import { useTable } from 'react-table';

function flattenJSON(obj, prefix = '', res = {}) {
  for (const key in obj) {
    const propName = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenJSON(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

function TableRenderer({ data }) {
  const columns = useMemo(() => {
    const keys = [...new Set(data.flatMap(Object.keys))];
    return keys.map(key => ({
      Header: key,
      accessor: key
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full text-xs md:text-sm text-left font-mono text-black dark:text-white border">
      <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border-t border-gray-300 dark:border-gray-600">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="px-4 py-2 border border-gray-300 dark:border-gray-600 break-words">
                  {String(cell.value ?? '')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function FlattenedJsonTableTab({ parsedData }) {
  const flattened = Array.isArray(parsedData)
    ? parsedData.map(item => flattenJSON(item))
    : [flattenJSON(parsedData)];

  return (
    <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
      <TableRenderer data={flattened} />
    </div>
  );
}

export default FlattenedJsonTableTab;
