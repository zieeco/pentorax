'use client';

import { TableCell, TableRow } from '@/components/ui/table';

export function InventorySkeleton() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <TableRow key={i}>
            <TableCell className="px-8 py-5">
              <div className="bg-muted h-4 w-48 animate-pulse rounded-lg" />
            </TableCell>
            <TableCell className="px-6 py-5">
              <div className="bg-muted h-4 w-16 animate-pulse rounded-lg" />
            </TableCell>
            <TableCell className="px-6 py-5">
              <div className="bg-muted h-4 w-24 animate-pulse rounded-lg" />
            </TableCell>
            <TableCell className="px-6 py-5 text-center">
              <div className="bg-muted mx-auto h-8 w-8 animate-pulse rounded-lg" />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
