import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  key?: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key as string}
                  isHeader
                  className="px-5 py-3 text-label font-semibold text-gray-500 text-start text-[14px] dark:text-gray-400"
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key as string}
                    className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key!] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
