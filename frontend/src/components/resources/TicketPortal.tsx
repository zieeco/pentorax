'use client';

/**
 * TicketPortal — mission-critical escalation nexus
 * Precision-engineered interface for technical ticket generation.
 * Adheres to 150-line rule.
 */
import { ChevronRight, Loader2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitTicket } from '@/hooks/core-hooks';

const categories = [
  'Inverter Performance',
  'Battery Discharge Level',
  'App Connectivity',
  'Hardware Install',
];

export function TicketPortal() {
  const [form, setForm] = useState({
    subject: '',
    category: categories[0],
    description: '',
    customer_name: '',
    customer_email: '',
  });
  const { mutate: submit, isPending } = useSubmitTicket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(form, {
      onSuccess: () => {
        toast.success('Service Ticket Generated', {
          description: 'Escalation protocol initiated. Response within 24h.',
        });
        setForm({
          subject: '',
          category: categories[0],
          description: '',
          customer_name: '',
          customer_email: '',
        });
      },
      onError: () =>
        toast.error('Escalation Failed', {
          description: 'Neural link unstable. Please retry later.',
        }),
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-[3rem] bg-gray-900 p-12 text-white shadow-2xl">
      <div className="bg-primary/20 group-hover:bg-primary/30 absolute top-0 right-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-all duration-1000" />

      <div className="relative z-10">
        <div className="mb-12 flex items-center gap-6">
          <div className="rounded-2xl bg-white/10 p-4 shadow-inner">
            <MessageSquare className="text-secondary h-8 w-8" />
          </div>
          <div>
            <h3 className="text-3xl leading-none font-black tracking-tighter lowercase italic">
              Technician <span className="text-primary not-italic">Portal.</span>
            </h3>
            <p className="mt-2 text-sm font-medium text-white/40 lowercase">
              Escalate complex anomalies to lab engineers.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black tracking-widest text-white/30 uppercase">
                Category Protocol
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="h-14 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-black tracking-widest uppercase italic transition-all outline-none focus:bg-white/10"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-gray-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black tracking-widest text-white/30 uppercase">
                Asset Identity
              </label>
              <Input
                value={form.customer_name}
                required
                placeholder="Full name..."
                onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
                className="h-14 rounded-xl border-white/10 bg-white/5 font-medium text-white italic focus:bg-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black tracking-widest text-white/30 uppercase">
                Digital Link
              </label>
              <Input
                type="email"
                value={form.customer_email}
                required
                placeholder="nexus@domain.com"
                onChange={(e) => setForm((f) => ({ ...f, customer_email: e.target.value }))}
                className="h-14 rounded-xl border-white/10 bg-white/5 font-medium text-white italic focus:bg-white/10"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black tracking-widest text-white/30 uppercase">
                Subject Vector
              </label>
              <Input
                value={form.subject}
                required
                placeholder="Brief description..."
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="h-14 rounded-xl border-white/10 bg-white/5 font-medium text-white italic focus:bg-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black tracking-widest text-white/30 uppercase">
                Fault Payload
              </label>
              <Textarea
                rows={6}
                value={form.description}
                required
                placeholder="Describe the anomaly..."
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="resize-none rounded-2xl border-white/10 bg-white/5 p-6 font-medium text-white italic focus:bg-white/10"
              />
            </div>
          </div>
          <div className="pt-6 md:col-span-2">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-primary group h-20 w-full rounded-[2.5rem] font-black tracking-widest text-white uppercase italic shadow-2xl transition-all hover:bg-white hover:text-gray-900"
            >
              {isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <span className="flex items-center gap-4">
                  Generate Ticket{' '}
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
              )}
            </Button>
            <p className="mt-6 text-center text-[9px] font-black tracking-[0.3em] text-white/20 uppercase italic">
              Standard Response Window: &lt; 24 Working Hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
