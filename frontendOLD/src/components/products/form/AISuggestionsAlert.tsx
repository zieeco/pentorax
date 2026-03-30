/**
 * AISuggestionsAlert - Display AI-generated specifications with accept/reject options
 */
import { useState } from 'react';
import { Sparkles, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProductSpecification } from '@/types/product';

interface AISuggestionsAlertProps {
  specifications: ProductSpecification[];
  isLoading: boolean;
  onAccept: (specs: ProductSpecification[]) => void;
  onReject: () => void;
}

export function AISuggestionsAlert({
  specifications,
  isLoading,
  onAccept,
  onReject,
}: AISuggestionsAlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <Loader2 className="h-5 w-5 text-blue-600 animate-spin flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <p className="text-sm font-semibold text-gray-900">
              AI is analyzing your image...
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Extracting specifications automatically
          </p>
        </div>
      </div>
    );
  }

  if (!specifications || specifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-2">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900">
              AI Suggestions Ready!
            </h4>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
              {specifications.length} specs found
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            AI analyzed your product image and found these specifications
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? 'Hide' : 'Preview'}
        </button>
      </div>

      {/* Preview List */}
      {isExpanded && (
        <div className="bg-white rounded-md p-3 space-y-2 border border-blue-100">
          <p className="text-xs font-semibold text-gray-700 mb-2">Preview:</p>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <span className="font-semibold text-gray-700 min-w-[120px]">
                  {spec.key}:
                </span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => onAccept(specifications)}
          size="sm"
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Check className="h-4 w-4 mr-1.5" />
          Accept All
        </Button>
        <Button
          type="button"
          onClick={onReject}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <X className="h-4 w-4 mr-1.5" />
          Reject
        </Button>
      </div>
    </div>
  );
}
