'use client';

/**
 * ProcessStep — Single step card in the Process section
 * Extracted for 150-line rule compliance
 */
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white transition-all duration-500 ${isHovered ? 'scale-110 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg' : 'bg-gray-400 shadow-md'}`}
        >
          {step}
        </div>
        {!isLast && (
          <div
            className={`ml-4 h-0.5 flex-1 transition-all duration-700 ${isHovered ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-300'}`}
          />
        )}
      </div>

      {/* Card */}
      <div
        className={`relative flex-1 overflow-hidden shadow-lg transition-all duration-500 ${isHovered ? '-translate-y-2 shadow-2xl shadow-blue-500/10' : ''}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div
          className={`absolute inset-0 transition-all duration-500 ${isHovered ? 'bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-cyan-900/85' : 'bg-gradient-to-br from-gray-900/75 via-gray-800/70 to-gray-900/75'}`}
        />

        <div className="relative z-10 p-6 text-white">
          <div className="mb-4 flex items-end justify-between">
            <div />
            <div className="flex items-center text-sm text-white/80">
              <Clock className="mr-1 h-4 w-4" />
              {duration}
            </div>
          </div>
          <h3
            className={`mb-3 text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-cyan-200' : 'text-white'}`}
          >
            {title}
          </h3>
          <p className="mb-4 leading-relaxed text-white/90">{description}</p>

          <div
            className={`space-y-2 overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {details.map((d, i) => (
              <div key={i} className="flex items-start text-sm text-white/90">
                <CheckCircle className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-cyan-300" />
                {d}
              </div>
            ))}
          </div>

          <div
            className={`mt-4 border-t border-white/20 pt-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center p-0 text-cyan-200 hover:bg-transparent hover:text-cyan-100"
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
