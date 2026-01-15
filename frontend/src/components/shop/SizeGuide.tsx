/**
 * SizeGuide component - Display product size/specification charts in a modal
 * @module components/shop
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { SizeGuideData } from '@/data/sizeGuides';
import { AlertCircle } from 'lucide-react';

interface SizeGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SizeGuideData;
}

export function SizeGuide({ open, onOpenChange, data }: SizeGuideProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{data.title}</DialogTitle>
          {data.description && (
            <DialogDescription className="text-base">
              {data.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-6">
          {/* Size Chart Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  {data.chart.headers.map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.chart.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      {row.label}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-gray-300 px-4 py-3 text-gray-700"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes Section */}
          {data.notes && data.notes.length > 0 && (
            <div className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    {data.notes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            .size-guide-table {
              page-break-inside: avoid;
            }
            .size-guide-table th,
            .size-guide-table td {
              padding: 8px;
              font-size: 12px;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
