import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { HiSelector, HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi';

function flattenJSON(obj, prefix = '', res = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const propName = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object') {
      if (Array.isArray(value)) {
        value.forEach((item, idx) =>
          flattenJSON(item, `${propName}[${idx}]`, res)
        );
      } else {
        flattenJSON(value, propName, res);
      }
    } else {
      res[propName] = value;
    }
  }
  return res;
}

function TableRenderer({ data }) {
  const sortTypes = useMemo(() => ({
    alphanumeric: (a, b, id) => {
      const x = String(a.values[id] ?? '').toLowerCase();
      const y = String(b.values[id] ?? '').toLowerCase();
      return x > y ? 1 : x < y ? -1 : 0;
    },
    bool: (a, b, id) => {
      return (a.values[id] === true ? 1 : 0) - (b.values[id] === true ? 1 : 0);
    },
  }), []);

  const columns = useMemo(() => {
    const keys = Array.from(new Set(data.flatMap(Object.keys)));
    return keys.map(key => ({
      Header: key,
      accessor: row => row[key],
      id: key,
      sortType: data.every(r => typeof r[key] === 'boolean') ? 'bool' : 'alphanumeric',
    }));
  }, [data]);

  const { headerGroups, rows, prepareRow } = useTable(
    { columns, data, sortTypes },
    useSortBy
  );

  return (
    <div className="space-y-2">
      <table className="min-w-full text-xs md:text-sm font-mono text-black dark:text-white border">
        <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0">
          {headerGroups.map(hg => {
            const { key, ...restHg } = hg.getHeaderGroupProps();
            return (
              <tr key={key} {...restHg}>
                {hg.headers.map(col => {
                  const { key: thKey, ...restTh } = col.getHeaderProps(col.getSortByToggleProps());
                  return (
                    <th
                      key={thKey}
                      {...restTh}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 cursor-pointer select-none"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{col.render('Header')}</span>
                        {col.isSorted
                          ? col.isSortedDesc
                            ? <HiArrowSmDown className="w-4 h-4"/>
                            : <HiArrowSmUp className="w-4 h-4"/>
                          : <HiSelector className="w-4 h-4 text-gray-400"/>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {rows.map(row => {
            prepareRow(row);
            const { key: trKey, ...restTr } = row.getRowProps();
            return (
              <tr key={trKey} {...restTr} className="border-t border-gray-300 dark:border-gray-600">
                {row.cells.map(cell => {
                  const { key: tdKey, ...restTd } = cell.getCellProps();
                  return (
                    <td
                      key={tdKey}
                      {...restTd}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 break-words"
                    >
                      {String(cell.value ?? '')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function FlattenedJsonTableTab({ parsedData }) {
  const flattened = Array.isArray(parsedData)
    ? parsedData.map(item => flattenJSON(item))
    : [flattenJSON(parsedData)];

  return (
    <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
      <TableRenderer data={flattened} />
    </div>
  );
}
