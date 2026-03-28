'use client';

/**
 * WarrantyChecker — mission-critical asset verification
 * Precision-engineered interface for physical hardware warranty validation.
 * Adheres to 150-line rule.
 */
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCheckWarranty } from '@/hooks/core-hooks';

export function WarrantyChecker() {
  const [id, setId] = useState('');
  const { mutate: check, data, isPending, isSuccess, isError } = useCheckWarranty();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) check(id);
  };

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all duration-700 hover:shadow-2xl">
      <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-[4rem] bg-amber-50 transition-all duration-700 group-hover:h-40 group-hover:w-40" />
      <div className="relative z-10">
        <div className="mb-8 w-fit rounded-2xl bg-amber-50 p-4 shadow-inner">
          <ShieldCheck className="h-8 w-8 text-amber-600" />
        </div>
        <h3 className="mb-4 text-2xl leading-none font-black tracking-tighter lowercase italic">
          Warranty <span className="text-amber-600 not-italic">Shield.</span>
        </h3>
        <p className="mb-10 text-sm leading-relaxed font-medium tracking-tight text-gray-500 lowercase">
          Enter your System ID or Serial Number to verify coverage protocols.
        </p>

        <form onSubmit={handleCheck} className="space-y-6">
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="PX-992384"
            className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-black tracking-widest uppercase italic transition-all focus:bg-white"
          />
          <Button
            disabled={isPending}
            type="submit"
            className="h-16 w-full rounded-2xl bg-gray-900 font-black tracking-widest text-white uppercase shadow-xl transition-all hover:bg-amber-600"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Run Protocol'}
          </Button>
        </form>

        {isSuccess && data && (
          <div className="animate-in slide-in-from-top-4 mt-8 flex items-center gap-4 rounded-3xl border border-green-100 bg-green-50 p-6 shadow-sm">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-[10px] font-black tracking-widest text-green-800 uppercase">
                Coverage: Active
              </p>
              <p className="text-xs font-bold text-green-700 italic">
                {data.data?.warranty_status || 'System Integrity Valid'}
              </p>
            </div>
          </div>
        )}

        {isError && (
          <div className="animate-in slide-in-from-top-4 mt-8 flex items-center gap-4 rounded-3xl border border-red-100 bg-red-50 p-6">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <p className="text-[10px] font-black tracking-widest text-red-700 uppercase">
              ID Null or Void.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
