'use client';

/**
 * ProcessStep — Single step card in the Process section
 * Extracted for 150-line rule compliance
 */
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '../ui/card';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  details: string[];
  duration: string;
  backgroundImage: string;
  isLast?: boolean;
}

export function ProcessStep({
  step,
  title,
  description,
  details,
  duration,
  backgroundImage,
  isLast,
}: ProcessStepProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex h-full flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Step number + connector */}
      <div className="mb-6 flex items-center">
        <div
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-black transition-all duration-500 ${isHovered ? 'bg-primary text-primary-foreground scale-110 shadow-lg' : 'bg-muted-foreground/30 text-foreground shadow-md'}`}
        >
          {step}
        </div>
        {!isLast && (
          <div
            className={`ml-4 h-0.5 flex-1 transition-all duration-700 ${isHovered ? 'from-primary to-secondary bg-gradient-to-r' : 'bg-border'}`}
          />
        )}
      </div>

      {/* Card */}
      <Card
        className={`bg-card relative flex-1 overflow-hidden shadow-lg transition-all duration-500 ${isHovered ? 'shadow-primary/20 -translate-y-2 shadow-2xl' : ''}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div
          className={`absolute inset-0 transition-all duration-500 ${isHovered ? 'bg-brand-dark/90 via-brand-dark/80' : 'bg-black/80 via-black/70'} bg-gradient-to-br to-transparent`}
        />

        <div className="relative z-10 p-6 text-white text-shadow-sm">
          <div className="mb-4 flex items-end justify-between">
            <div />
            <div className="flex items-center text-[10px] font-black tracking-widest text-white/80">
              <Clock className="mr-1.5 h-3.5 w-3.5" />
              {duration}
            </div>
          </div>
          <h3
            className={`font-quicksand mb-3 text-xl font-black transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-white'}`}
          >
            {title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed font-medium text-white/90">{description}</p>

          <div
            className={`space-y-2 overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {details.map((d, i) => (
              <div key={i} className="flex items-start text-xs font-medium text-white/90">
                <CheckCircle className="text-secondary mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                {d}
              </div>
            ))}
          </div>

          <div
            className={`mt-4 border-t border-white/10 pt-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <Button
              variant="ghost"
              size="sm"
              className="font-quicksand text-primary hover:text-primary/80 flex items-center p-0 font-black tracking-widest hover:bg-transparent"
            >
              Learn More{' '}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
