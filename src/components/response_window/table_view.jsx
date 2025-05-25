import { useMemo } from 'react';
import {
  useTable,
  useSortBy
} from 'react-table';
import { HiSelector, HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi';

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
  const sortTypes = useMemo(() => ({
    alphanumeric: (rowA, rowB, columnId) => {
      const a = String(rowA.values[columnId] ?? '').toLowerCase();
      const b = String(rowB.values[columnId] ?? '').toLowerCase();
      return a > b ? 1 : a < b ? -1 : 0;
    },
    bool: (rowA, rowB, columnId) => {
      const a = rowA.values[columnId] === true ? 1 : 0;
      const b = rowB.values[columnId] === true ? 1 : 0;
      return a - b;
    }
  }), []);

  const columns = useMemo(() => {
    const keys = [...new Set(data.flatMap(Object.keys))];
    return keys.map(key => {
      const isBool = data.every(row => typeof row[key] === 'boolean');
      return {
        Header: key,
        accessor: key,
        sortType: isBool ? 'bool' : 'alphanumeric'
      };
    });
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    { columns, data, sortTypes },
    useSortBy
  );

  return (
    <div className="space-y-2">
      <table {...getTableProps()} className="min-w-full text-xs md:text-sm text-left font-mono text-black dark:text-white border">
        <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.render('Header')}</span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <HiArrowSmDown className="w-4 h-4" />
                      ) : (
                        <HiArrowSmUp className="w-4 h-4" />
                      )
                    ) : (
                      <HiSelector className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
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
    </div>
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
