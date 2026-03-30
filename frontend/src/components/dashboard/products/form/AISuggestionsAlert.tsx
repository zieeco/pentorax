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
      <div className="from-accent/5 to-primary/5 border-accent/10 flex animate-pulse items-center gap-4 rounded-[1.5rem] border bg-gradient-to-r p-5">
        <div className="bg-accent/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Loader2 className="text-accent h-5 w-5 animate-spin" />
        </div>
        <div className="flex-1">
          <p className="text-foreground text-xs font-black tracking-wider uppercase">
            AI is analyzing...
          </p>
          <p className="text-muted-foreground mt-0.5 text-[10px] font-bold uppercase">
            Extracting smart specifications
          </p>
        </div>
      </div>
    );
  }

  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="border-accent/20 shadow-accent/5 group from-background to-muted/20 relative space-y-4 overflow-hidden rounded-[2rem] border bg-gradient-to-br p-6 shadow-xl">
      <div className="bg-accent/5 absolute -top-6 -right-6 h-32 w-32 rounded-full blur-3xl transition-transform group-hover:scale-125" />

      <div className="flex items-start gap-4">
        <div className="bg-accent shadow-accent/20 flex-shrink-0 rounded-2xl p-3 shadow-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-foreground text-sm font-black tracking-wider uppercase">
              AI Suggestions
            </h4>
            <span className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-[10px] font-black uppercase">
              {specifications.length} Found
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-[10px] font-bold uppercase">
            Smart specs extracted from image
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-accent hover:bg-accent/5 h-auto gap-1 rounded-lg p-2 text-[10px] font-black uppercase"
        >
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {isExpanded ? 'Hide' : 'View'}
        </Button>
      </div>

      {isExpanded && (
        <div className="border-accent/10 custom-scrollbar bg-card/80 max-h-60 space-y-3 overflow-y-auto rounded-2xl border p-4 backdrop-blur-sm">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="border-border/50 flex items-start justify-between gap-4 border-b py-2 last:border-0"
            >
              <span className="text-muted-foreground shrink-0 text-[10px] font-black tracking-widest uppercase">
                {spec.key}
              </span>
              <span className="text-foreground/80 text-right text-xs font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={() => onAccept(specifications)}
          className="bg-accent hover:bg-accent/90 shadow-accent/20 h-10 flex-1 gap-2 rounded-xl text-[10px] font-black uppercase shadow-lg"
        >
          <Check className="h-3.5 w-3.5" />
          Accept All
        </Button>
        <Button
          type="button"
          onClick={onReject}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-10 flex-1 gap-2 rounded-xl text-[10px] font-black uppercase"
        >
          <X className="h-3.5 w-3.5" />
          Dismiss
        </Button>
      </div>
    </div>
  );
}
