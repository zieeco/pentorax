'use client';

/**
 * AISuggestionsAlert - Display AI-generated specifications with accept/reject options
 * Ported from Vite to Next.js
 */
import { Check, ChevronDown, ChevronUp, Loader2, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AISuggestionsAlertProps {
  specifications: any[];
  isLoading: boolean;
  onAccept: (specs: any[]) => void;
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
      <div className="from-brand-indigo/5 to-primary/5 border-brand-indigo/10 flex animate-pulse items-center gap-4 rounded-[1.5rem] border bg-gradient-to-r p-5">
        <div className="bg-brand-indigo/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Loader2 className="text-brand-indigo h-5 w-5 animate-spin" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-black tracking-wider text-gray-900 uppercase">
            AI is analyzing...
          </p>
          <p className="mt-0.5 text-[10px] font-bold text-gray-500 uppercase">
            Extracting smart specifications
          </p>
        </div>
      </div>
    );
  }

  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="border-brand-indigo/20 shadow-brand-indigo/5 group relative space-y-4 overflow-hidden rounded-[2rem] border bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-xl">
      <div className="bg-brand-indigo/5 absolute -top-6 -right-6 h-32 w-32 rounded-full blur-3xl transition-transform group-hover:scale-125" />

      <div className="flex items-start gap-4">
        <div className="bg-brand-indigo shadow-brand-indigo/20 flex-shrink-0 rounded-2xl p-3 shadow-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black tracking-wider text-gray-900 uppercase">
              AI Suggestions
            </h4>
            <span className="bg-brand-indigo/10 text-brand-indigo rounded-full px-2 py-0.5 text-[10px] font-black uppercase">
              {specifications.length} Found
            </span>
          </div>
          <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase">
            Smart specs extracted from image
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand-indigo hover:bg-brand-indigo/5 h-auto gap-1 rounded-lg p-2 text-[10px] font-black uppercase"
        >
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {isExpanded ? 'Hide' : 'View'}
        </Button>
      </div>

      {isExpanded && (
        <div className="border-brand-indigo/10 custom-scrollbar max-h-60 space-y-3 overflow-y-auto rounded-2xl border bg-white/80 p-4 backdrop-blur-sm">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-4 border-b border-gray-50 py-2 last:border-0"
            >
              <span className="shrink-0 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                {spec.key}
              </span>
              <span className="text-right text-xs font-bold text-gray-700">{spec.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={() => onAccept(specifications)}
          className="bg-brand-indigo hover:bg-brand-indigo/90 shadow-brand-indigo/20 h-10 flex-1 gap-2 rounded-xl text-[10px] font-black uppercase shadow-lg"
        >
          <Check className="h-3.5 w-3.5" />
          Accept All
        </Button>
        <Button
          type="button"
          onClick={onReject}
          variant="ghost"
          className="h-10 flex-1 gap-2 rounded-xl text-[10px] font-black text-gray-400 uppercase hover:text-gray-900"
        >
          <X className="h-3.5 w-3.5" />
          Dismiss
        </Button>
      </div>
    </div>
  );
}
