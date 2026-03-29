'use client';

/**
 * ProductSpecificationsModal - Modal dialog for managing product specifications
 * Ported from Vite to Next.js
 */
import { ArrowDown, ArrowUp, ListTree, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductSpecificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  specifications: any[];
  onSpecificationsChange: (specs: any[]) => void;
}

export function ProductSpecificationsModal({
  isOpen,
  onClose,
  specifications,
  onSpecificationsChange,
}: ProductSpecificationsModalProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    const newSpec = { key: newKey.trim(), value: newValue.trim(), position: specifications.length };
    onSpecificationsChange([...specifications, newSpec]);
    setNewKey('');
    setNewValue('');
  };

  const handleUpdate = (idx: number, field: 'key' | 'value', text: string) => {
    const updated = [...specifications];
    updated[idx] = { ...updated[idx], [field]: text };
    onSpecificationsChange(updated);
  };

  const handleDelete = (idx: number) => {
    const updated = specifications
      .filter((_, i) => i !== idx)
      .map((spec, i) => ({ ...spec, position: i }));
    onSpecificationsChange(updated);
  };

  const handleMove = (idx: number, dir: 'up' | 'down') => {
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === specifications.length - 1))
      return;
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    const updated = [...specifications];
    [updated[idx], updated[targetIdx]] = [updated[targetIdx], updated[idx]];
    updated[idx].position = idx;
    updated[targetIdx].position = targetIdx;
    onSpecificationsChange(updated);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl gap-0 overflow-y-auto rounded-[2.5rem] border-gray-100 p-0 shadow-2xl">
        <DialogHeader className="border-b border-gray-100 bg-gray-50/30 p-8">
          <DialogTitle className="flex items-center gap-3 text-2xl font-black text-gray-900">
            <ListTree className="text-primary h-8 w-8" />
            Product Specifications
          </DialogTitle>
          <DialogDescription className="font-medium text-gray-500">
            Add technical parameters and performance details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 p-8">
          <div className="space-y-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 p-8">
            <h4 className="text-xs font-black tracking-wider text-gray-900 uppercase">
              Add New Parameter
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  Attribute Name
                </Label>
                <Input
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="e.g., Efficiency"
                  className="h-12 rounded-xl border-gray-100 bg-white font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  Attribute Value
                </Label>
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="e.g., 22.5%"
                  className="h-12 rounded-xl border-gray-100 bg-white font-bold"
                />
              </div>
            </div>
            <Button
              onClick={handleAdd}
              disabled={!newKey.trim() || !newValue.trim()}
              className="shadow-primary/20 h-12 w-full gap-2 rounded-xl font-black uppercase shadow-lg"
            >
              <Plus className="h-4 w-4" /> Add Parameter
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="px-1 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Active Specifications ({specifications.length})
            </h4>
            <div className="grid gap-3">
              {specifications.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-gray-100 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
                >
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black">
                    #{i + 1}
                  </div>
                  <div className="grid min-w-0 flex-1 grid-cols-2 gap-4">
                    <Input
                      value={spec.key}
                      onChange={(e) => handleUpdate(i, 'key', e.target.value)}
                      className="h-10 rounded-xl border-none bg-gray-50/50 font-bold"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) => handleUpdate(i, 'value', e.target.value)}
                      className="h-10 rounded-xl border-none bg-gray-50/50 font-bold"
                    />
                  </div>
                  <div className="flex shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMove(i, 'up')}
                      disabled={i === 0}
                      className="rounded-lg"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMove(i, 'down')}
                      disabled={i === specifications.length - 1}
                      className="rounded-lg"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(i)}
                    className="hover:bg-destructive/10 hover:text-destructive h-10 w-10 shrink-0 rounded-xl text-gray-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 bg-gray-50/50 p-6">
          <Button onClick={onClose} className="rounded-xl px-8 font-bold">
            Save Specs
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
