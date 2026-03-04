function DataTable({ columns, data, emptyText = 'No records found.', caption }) {
  const title = caption || 'Records';

  return (
    <div className="kenya-panel kenya-card surface-animate overflow-hidden rounded-lg shadow-soft dark:border dark:border-zinc-600">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-xs font-medium text-slate-500 dark:border-zinc-700 dark:text-slate-300">
        <span>{title}</span>
        <span>
          {data.length} item{data.length === 1 ? '' : 's'}
        </span>
      </div>
      <div className="max-h-[28rem] overflow-auto">
        <table className="min-w-full text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="sticky top-0 z-10 border-b border-zinc-700 bg-kenyaBlack text-xs uppercase tracking-wide text-white">
            <tr>
              {columns.map((column) => (
                <th key={column.accessor} scope="col" className="px-4 py-3 font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 dark:text-slate-300">
                  {emptyText}
                </td>
              </tr>
            )}
            {data.map((row, index) => (
              <tr
                key={`${index}-${row.id || row.candidate || row.name}`}
                className="border-t border-slate-100 odd:bg-white even:bg-slate-50/30 hover:bg-emerald-50/40 dark:border-zinc-700 dark:odd:bg-zinc-800 dark:even:bg-zinc-900/80 dark:hover:bg-emerald-900/30"
              >
                {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-3 text-slate-700 dark:text-slate-100">
                    {column.cell ? column.cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;


