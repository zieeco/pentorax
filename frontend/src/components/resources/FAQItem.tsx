'use client';

/**
 * FAQItem — mission-critical knowledge atom
 * Precision-engineered accordion for FAQ interaction.
 * Adheres to 150-line rule.
 */
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-8 text-left transition-all duration-300 group-hover:bg-gray-50/50"
      >
        <span className="text-lg leading-tight font-black tracking-tighter text-gray-900 lowercase italic">
          {question}
        </span>
        <div
          className={`flex h-8 w-8 scale-90 items-center justify-center rounded-full bg-gray-50 transition-all duration-500 group-hover:scale-100 ${isOpen ? 'bg-primary rotate-180 text-white' : 'group-hover:text-primary text-gray-400'}`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] px-4 py-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="max-w-3xl leading-relaxed font-medium tracking-tight text-gray-500 lowercase">
          {answer}
        </p>
      </div>
    </div>
  );
}
