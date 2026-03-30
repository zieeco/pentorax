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
    <div className="border-border bg-card mt-6 overflow-hidden rounded-[2.5rem] border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b-border/50 bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-16 text-center">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => onSelectAll(!!checked)}
                className="rounded-md border-gray-300"
              />
            </TableHead>
            <TableHead className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              Status
            </TableHead>
            <TableHead className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              Product
            </TableHead>
            <TableHead className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              Subscriber
            </TableHead>
            <TableHead className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              Availability
            </TableHead>
            <TableHead className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              Date
            </TableHead>
            <TableHead className="text-muted-foreground pr-8 text-right text-[10px] font-black tracking-widest uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow
              key={notification.id}
              className="border-b-border/50 hover:bg-muted/30 transition-colors"
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
                  <div className="border-border bg-muted/20 relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border">
                    {notification.product_image ? (
                      <Image
                        src={notification.product_image}
                        alt={notification.product_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-muted text-muted-foreground/40 flex h-full w-full items-center justify-center text-[10px] italic">
                        No Img
                      </div>
                    )}
                  </div>
                  <span className="text-foreground line-clamp-1 font-bold">
                    {notification.product_name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[200px] truncate text-sm font-medium">
                {notification.email}
              </TableCell>
              <TableCell>
                {notification.product_in_stock ? (
                  <Badge className="bg-secondary/10 text-secondary flex w-fit items-center gap-1.5 rounded-full border-none px-3 py-1 text-[10px] font-bold">
                    <div className="bg-secondary h-1.5 w-1.5 animate-pulse rounded-full" />{' '}
                    Available
                  </Badge>
                ) : (
                  <Badge className="bg-muted text-muted-foreground flex w-fit items-center gap-1.5 rounded-full border-none px-3 py-1 text-[10px] font-bold">
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" /> Out of Stock
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs font-medium">
                {format(new Date(notification.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="pr-8 text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenEmail(notification.id)}
                    className="hover:text-primary text-muted-foreground h-8 w-8 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  {!notification.is_read ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkRead(notification.id)}
                      className="text-muted-foreground hover:text-secondary h-8 w-8"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkUnread(notification.id)}
                      className="text-muted-foreground hover:text-accent h-8 w-8"
                    >
                      <Circle className="h-4 w-4" />
                    </Button>
                  )}
                  {!notification.is_archived ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onArchive(notification.id)}
                      className="text-muted-foreground hover:text-destructive h-8 w-8"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUnarchive(notification.id)}
                      className="text-muted-foreground hover:text-primary h-8 w-8"
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
