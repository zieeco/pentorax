'use client';

/**
 * SendEmailDialog - Dialog for sending custom emails to subscribers
 * Refined for Next.js 15 Premium Dashboard
 */
import { Loader2, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { stockNotificationsApi } from '@/services';

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (subject: string, message: string, useAI?: boolean) => void;
  recipientCount: number;
  isLoading?: boolean;
  notificationId?: string | null;
  notificationIds?: string[];
}

export function SendEmailDialog({
  open,
  onOpenChange,
  onSend,
  recipientCount,
  isLoading = false,
  notificationId = null,
  notificationIds = [],
}: SendEmailDialogProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useAIBulk, setUseAIBulk] = useState(false);

  const isBulk = recipientCount > 1;

  useEffect(() => {
    if (!open) {
      setSubject('');
      setMessage('');
      setUseAIBulk(false);
    }
  }, [open]);

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    try {
      const response = await stockNotificationsApi.generateEmail(
        notificationId || undefined,
        notificationIds.length > 0 ? notificationIds : undefined
      );
      setSubject(response.data.subject);
      setMessage(response.data.message);
      toast.success('AI Template Ready');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Generation Failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = () => {
    if (isBulk && useAIBulk) {
      onSend('', '', true);
    } else if (subject.trim() && message.trim()) {
      onSend(subject, message, false);
    }
  };

  const canSend = useAIBulk || (subject.trim() && message.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border gap-0 overflow-hidden rounded-[2.5rem] p-0 shadow-2xl sm:max-w-[700px]">
        <DialogHeader className="border-border/50 bg-muted/20 border-b p-8">
          <DialogTitle className="text-foreground flex items-center gap-3 text-2xl font-black">
            <Send className="text-primary h-6 w-6" />
            Communication Hub
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Mailing {recipientCount} customer{recipientCount !== 1 ? 's' : ''} regarding stock
            interest
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-8">
          <div className="flex items-center justify-between">
            {isBulk && (
              <div className="bg-brand-indigo/5 border-brand-indigo/10 flex items-center space-x-3 rounded-2xl border px-4 py-2">
                <Checkbox
                  id="use-ai-bulk"
                  checked={useAIBulk}
                  onCheckedChange={(checked) => setUseAIBulk(!!checked)}
                  disabled={isLoading || isGenerating}
                />
                <Label
                  htmlFor="use-ai-bulk"
                  className="text-brand-indigo flex cursor-pointer items-center gap-2 text-xs font-black tracking-wider uppercase"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Hyper-Personalized AI
                </Label>
              </div>
            )}

            {!useAIBulk && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateWithAI}
                disabled={isGenerating || isLoading}
                className="ml-auto h-10 gap-2 rounded-xl border-gray-100 bg-white px-4 font-bold shadow-sm"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="text-primary h-4 w-4" />
                )}
                {isGenerating ? 'Drafting...' : 'AI Draft'}
              </Button>
            )}
          </div>
          {useAIBulk ? (
            <div className="bg-brand-indigo/5 border-brand-indigo/10 animate-in zoom-in-95 space-y-2 rounded-[1.5rem] border p-6 duration-300">
              <p className="text-brand-indigo flex items-center gap-2 text-sm font-black tracking-wider uppercase">
                <Sparkles className="h-4 w-4" />
                AI Personalization Enabled
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                PentoraX AI will analyze each subscriber&apos;s profile and interest history to
                craft unique, high-conversion messages. No manual input required.
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in space-y-5 duration-500">
              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-muted-foreground ml-1 text-[10px] font-black tracking-[0.2em] uppercase"
                >
                  Email Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Draft a compelling subject line..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isLoading || isGenerating}
                  className="border-border bg-muted/20 focus-visible:border-primary h-12 rounded-xl px-5 font-bold focus:bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-muted-foreground ml-1 text-[10px] font-black tracking-[0.2em] uppercase"
                >
                  Message Content
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
                  disabled={isLoading || isGenerating}
                  className="border-border bg-muted/20 focus-visible:border-primary resize-none rounded-[1.5rem] p-5 font-medium focus:bg-transparent"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="bg-muted/10 border-border gap-3 border-t p-6">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || isGenerating}
            className="h-12 rounded-xl px-8 font-bold"
          >
            Discard
          </Button>
          <Button
            onClick={handleSend}
            disabled={!canSend || isLoading || isGenerating}
            className="shadow-primary/20 bg-primary hover:bg-primary/90 h-12 gap-2 rounded-xl px-10 text-[11px] font-black tracking-widest uppercase shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <Send className="h-4 w-4 text-white" />
            )}
            {isLoading
              ? 'Transmitting...'
              : useAIBulk
                ? `Deploy ${recipientCount} AI Emails`
                : 'Broadcast Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
