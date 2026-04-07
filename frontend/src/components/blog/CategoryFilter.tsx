'use client';

/**
 * CategoryFilter — mission-critical narrative navigation
 * Precision-engineered filter for blog categorization.
 * Adheres to 150-line rule.
 */
import { Button } from '@/components/ui/button';
import { useBlogCategories } from '@/hooks/blog-hooks';

interface CategoryFilterProps {
  selected: string | undefined;
  onSelect: (slug: string | undefined) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { data: categories = [] } = useBlogCategories();

  if (categories.length === 0) return null;

  return (
    <div className="border-border mb-16 flex flex-wrap justify-center gap-4 border-y py-8">
      <Button
        onClick={() => onSelect(undefined)}
        variant={!selected ? 'default' : 'ghost'}
        className={`h-12 rounded-full px-8 text-xs font-black tracking-widest uppercase italic transition-all ${!selected ? 'bg-primary text-primary-foreground shadow-xl' : 'text-muted-foreground hover:bg-muted'}`}
      >
        All Asset Logs.
      </Button>
      {categories.map((c) => (
        <Button
          key={c.id}
          onClick={() => onSelect(c.slug)}
          variant={selected === c.slug ? 'default' : 'ghost'}
          className={`h-12 rounded-full px-8 text-xs font-black tracking-widest uppercase italic transition-all ${selected === c.slug ? 'bg-primary text-primary-foreground shadow-xl' : 'text-muted-foreground hover:bg-muted'}`}
        >
          {c.name}.
        </Button>
      ))}
    </div>
  );
}
