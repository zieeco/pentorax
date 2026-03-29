'use client';

/**
 * ContactForm — mission-critical inquiry nexus
 * Precision-engineered form for lead capture and consultation protocols.
 * Adheres to 150-line rule.
 */
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitContact } from '@/hooks/core-hooks';

const sectors = [
  'Residential Solar',
  'Commercial Scale',
  'Industrial Power',
  'Product Distribution',
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: sectors[0],
    message: '',
  });
  const { mutate: submit, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(form, {
      onSuccess: () => {
        toast.success('Inquiry Protocol Initialized', {
          description: 'Target acquired. We will contact you shortly.',
        });
        setForm({ name: '', email: '', phone: '', subject: sectors[0], message: '' });
      },
      onError: () =>
        toast.error('Transmission Failed', {
          description: 'Neural link unstable. Please retry or call directly.',
        }),
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-[3rem] border border-gray-100 bg-white p-12 shadow-2xl shadow-gray-200/40">
      <div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 rounded-bl-[4rem] transition-all duration-700 group-hover:h-40 group-hover:w-40" />
      <h2 className="mb-10 text-3xl leading-none font-black tracking-tighter lowercase italic">
        Send <span className="text-primary not-italic">Inquiry.</span>
      </h2>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <Label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Asset Name
            </Label>
            <Input
              name="name"
              value={form.name}
              required
              placeholder="Identify yourself..."
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-medium italic transition-all focus:bg-white"
            />
          </div>
          <div className="space-y-3">
            <Label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Digital Address
            </Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              required
              placeholder="nexus@domain.com"
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-medium italic transition-all focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
            Sector Architecture
          </Label>
          <Select
            value={form.subject}
            onValueChange={(value) => setForm((f) => ({ ...f, subject: value }))}
          >
            <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 px-5 text-sm font-black tracking-widest uppercase italic shadow-none transition-all focus:bg-white">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-gray-100 p-2">
              {sectors.map((s) => (
                <SelectItem key={s} value={s} className="rounded-xl py-3 font-bold italic">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
            Transmission Payload
          </Label>
          <Textarea
            rows={6}
            name="message"
            value={form.message}
            required
            placeholder="Describe your infra requirements..."
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="resize-none rounded-[2rem] border-gray-100 bg-gray-50 p-6 font-medium italic transition-all focus:bg-white"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="hover:bg-primary group h-20 w-full rounded-[2rem] bg-gray-900 font-black tracking-[0.2em] text-white uppercase shadow-2xl transition-all disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <span className="flex items-center gap-4 italic">
              Initialize Link{' '}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
