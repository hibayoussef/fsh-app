import { useEffect } from "react";
import Checkbox from "../form/input/Checkbox";
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
  data: T[] | undefined;
  isLoading?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (
    selected: Set<number> | ((prev: Set<number>) => Set<number>)
  ) => void;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading = false,
  selectedRows,
  onSelectionChange,
}: DataTableProps<T>) {
  useEffect(() => {
    if (!data && onSelectionChange) {
      onSelectionChange(new Set());
    }
  }, [data, onSelectionChange]);

  const toggleSelectAll = () => {
    if (data && onSelectionChange && selectedRows) {
      if (selectedRows.size === data.length) {
        onSelectionChange(new Set());
      } else {
        onSelectionChange(new Set(data.map((_, index) => index)));
      }
    }
  };

  const toggleRowSelection = (index: number) => {
    if (onSelectionChange)
      onSelectionChange((prev: Set<number>) => {
        const newSelection = new Set(prev);
        if (newSelection.has(index)) {
          newSelection.delete(index);
        } else {
          newSelection.add(index);
        }
        return newSelection;
      });
  };

  return (
    <div className="overflow-hidden bg-white">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-[#F8FAFC] border-b border-[#64748b57] dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-start">
                <Checkbox
                  onChange={toggleSelectAll}
                  checked={data ? selectedRows?.size === data.length : false}
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.key as string}
                  isHeader
                  className="px-5 py-3 text-label font-semibold text-start text-[14px] dark:text-gray-400"
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-[#64748b57] dark:divide-white/[0.05]">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-3/4"></div>
                    </TableCell>
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex} className="px-4 py-3">
                        <div className="h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-3/4"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((row, rowIndex: any) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="px-4 py-3">
                      <Checkbox
                        checked={selectedRows?.has(rowIndex)!}
                        onChange={() => toggleRowSelection(rowIndex)}
                      />
                    </TableCell>
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
