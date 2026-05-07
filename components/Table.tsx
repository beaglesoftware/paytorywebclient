import React from "react";

// Define the type for table rows (e.g., [string | number][])
type TableRow = readonly (string | number)[];

interface SimpleTableProps {
  headers: readonly string[];
  rows: TableRow[];
}

const SimpleTable: React.FC<SimpleTableProps> = ({ headers, rows }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 m-5">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Header */}
        <thead>
          <tr className="bg-blue-50 text-left text-sm font-medium text-gray-700 uppercase tracking-wide">
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 border-b border-gray-200 first:rounded-l-md last:rounded-r-md"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`hover:bg-blue-50 transition-colors ${
                index % 2 === 0 ? "bg-slate-50" : ""
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-100"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
