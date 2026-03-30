/**
 * ProductSpecificationsSection - Manage product specifications
 * Allows adding, editing, reordering, and deleting key-value specifications
 */
import { useState } from 'react';
import { Plus, X, ArrowUp, ArrowDown, ListTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ProductSpecification } from '@/types/product';

interface ProductSpecificationsSectionProps {
  specifications: ProductSpecification[];
  onSpecificationsChange: (specs: ProductSpecification[]) => void;
}

export function ProductSpecificationsSection({
  specifications,
  onSpecificationsChange,
}: ProductSpecificationsSectionProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    if (!newKey.trim() || !newValue.trim()) return;

    const newSpec: ProductSpecification = {
      key: newKey.trim(),
      value: newValue.trim(),
      position: specifications.length,
    };

    onSpecificationsChange([...specifications, newSpec]);
    setNewKey('');
    setNewValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleUpdate = (index: number, field: 'key' | 'value', newText: string) => {
    const updated = [...specifications];
    updated[index] = { ...updated[index], [field]: newText };
    onSpecificationsChange(updated);
  };

  const handleDelete = (index: number) => {
    const updated = specifications.filter((_, i) => i !== index);
    // Reindex positions
    const reindexed = updated.map((spec, i) => ({ ...spec, position: i }));
    onSpecificationsChange(reindexed);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...specifications];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    // Update positions
    updated[index - 1].position = index - 1;
    updated[index].position = index;
    onSpecificationsChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === specifications.length - 1) return;
    const updated = [...specifications];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    // Update positions
    updated[index].position = index;
    updated[index + 1].position = index + 1;
    onSpecificationsChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ListTree className="h-5 w-5 text-primary" />
          Specifications
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add technical specifications and product details
        </p>
      </div>

      {/* Add New Specification */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="spec-key" className="text-xs">
              Specification Name
            </Label>
            <Input
              id="spec-key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Power Output"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="spec-value" className="text-xs">
              Value
            </Label>
            <Input
              id="spec-value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 400W"
              className="mt-1"
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          disabled={!newKey.trim() || !newValue.trim()}
          size="sm"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Specification
        </Button>
      </div>

      {/* Specifications List */}
      {specifications.length > 0 ? (
        <div className="space-y-2">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              {/* Position Badge */}
              <div className="flex-shrink-0">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                  #{index + 1}
                </span>
              </div>

              {/* Key Input */}
              <div className="flex-1 min-w-0">
                <Input
                  value={spec.key}
                  onChange={(e) => handleUpdate(index, 'key', e.target.value)}
                  placeholder="Specification name"
                  className="font-medium"
                />
              </div>

              {/* Value Input */}
              <div className="flex-1 min-w-0">
                <Input
                  value={spec.value}
                  onChange={(e) => handleUpdate(index, 'value', e.target.value)}
                  placeholder="Value"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === specifications.length - 1}
                  className="h-8 w-8 p-0"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(index)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <ListTree className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm">No specifications yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Add technical details and product specifications
          </p>
        </div>
      )}
    </div>
  );
}
