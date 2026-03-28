'use client';

import { format } from 'date-fns';
import { Archive, ArchiveRestore, CheckCircle, Circle, Mail } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface NotificationTableProps {
  notifications: any[];
  selectedIds: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  onOpenEmail: (id: string) => void;
}

export function NotificationTable({
  notifications,
  selectedIds,
  onSelectRow,
  onSelectAll,
  isAllSelected,
  isSomeSelected,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onUnarchive,
  onOpenEmail,
}: NotificationTableProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-100 bg-gray-50/80 hover:bg-gray-50/80">
            <TableHead className="w-16 text-center">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => onSelectAll(!!checked)}
                className="rounded-md border-gray-300"
              />
            </TableHead>
            <TableHead className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Status
            </TableHead>
            <TableHead className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Product
            </TableHead>
            <TableHead className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Subscriber
            </TableHead>
            <TableHead className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Availability
            </TableHead>
            <TableHead className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Date
            </TableHead>
            <TableHead className="pr-8 text-right text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow
              key={notification.id}
              className="border-b-gray-50 transition-colors hover:bg-gray-50/30"
            >
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedIds.includes(notification.id)}
                  onCheckedChange={(checked) => onSelectRow(notification.id, !!checked)}
                  className="rounded-md border-gray-300"
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {!notification.is_read && (
                    <Badge className="bg-primary rounded-lg px-2 py-0.5 text-[9px] font-black text-white">
                      NEW
                    </Badge>
                  )}
                  {notification.is_notified && (
                    <Badge
                      variant="secondary"
                      className="rounded-lg px-2 py-0.5 text-[9px] font-black"
                    >
                      NOTIFIED
                    </Badge>
                  )}
                  {notification.is_archived && (
                    <Badge
                      variant="outline"
                      className="rounded-lg px-2 py-0.5 text-[9px] font-black opacity-50"
                    >
                      ARCHIVED
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    {notification.product_image ? (
                      <Image
                        src={notification.product_image}
                        alt={notification.product_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-[10px] text-gray-400 italic">
                        No Img
                      </div>
                    )}
                  </div>
                  <span className="line-clamp-1 font-bold text-gray-900">
                    {notification.product_name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-sm font-medium text-gray-600">
                {notification.email}
              </TableCell>
              <TableCell>
                {notification.product_in_stock ? (
                  <Badge className="flex w-fit items-center gap-1.5 rounded-full border-none bg-green-500/10 px-3 py-1 text-[10px] font-bold text-green-700">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />{' '}
                    Available
                  </Badge>
                ) : (
                  <Badge className="flex w-fit items-center gap-1.5 rounded-full border-none bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Out of Stock
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-xs font-medium text-gray-400">
                {format(new Date(notification.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="pr-8 text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenEmail(notification.id)}
                    className="hover:text-primary h-8 w-8 text-gray-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  {!notification.is_read ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkRead(notification.id)}
                      className="h-8 w-8 text-gray-400 hover:text-green-600"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkUnread(notification.id)}
                      className="h-8 w-8 text-gray-400 hover:text-yellow-600"
                    >
                      <Circle className="h-4 w-4" />
                    </Button>
                  )}
                  {!notification.is_archived ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onArchive(notification.id)}
                      className="h-8 w-8 text-gray-400 hover:text-rose-600"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUnarchive(notification.id)}
                      className="h-8 w-8 text-gray-400 hover:text-indigo-600"
                    >
                      <ArchiveRestore className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
