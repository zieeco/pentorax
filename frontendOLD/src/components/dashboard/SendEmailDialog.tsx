/**
 * SendEmailDialog - Dialog for sending custom emails to subscribers
 */
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { stockNotificationsApi } from '@/services';
import { toast } from 'sonner';

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
  const [useAIBulk, setUseAIBulk] = useState(false); // For bulk personalized AI emails

  const isBulk = recipientCount > 1;

  // Reset form when dialog closes
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
      
      const { subject: aiSubject, message: aiMessage } = response.data;
      setSubject(aiSubject);
      setMessage(aiMessage);
      toast.success('Email template generated!');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to generate email');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = () => {
    if (isBulk && useAIBulk) {
      // Send with AI personalization for each user
      onSend('', '', true); // Empty subject/message, AI will generate per-user
    } else if (subject.trim() && message.trim()) {
      onSend(subject, message, false);
      setSubject('');
      setMessage('');
    }
  };

  const canSend = useAIBulk || (subject.trim() && message.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Send Custom Email</DialogTitle>
          <DialogDescription>
            Send {isBulk ? 'personalized ' : ''}email to {recipientCount} subscriber{recipientCount !== 1 ? 's' : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            {isBulk && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-ai-bulk"
                  checked={useAIBulk}
                  onCheckedChange={(checked) => setUseAIBulk(!!checked)}
                  disabled={isLoading || isGenerating}
                />
                <Label
                  htmlFor="use-ai-bulk"
                  className="text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  AI-Personalized for Each User
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
                className={`gap-2 ${isBulk ? '' : 'ml-auto'}`}
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Template'}
              </Button>
            )}
          </div>

          {useAIBulk && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-900">
                <Sparkles className="h-4 w-4 inline mr-2" />
                <strong>AI Mode:</strong> Each subscriber will receive a unique, personalized email based on their product and details. No template needed!
              </p>
            </div>
          )}

          {!useAIBulk && (
            <>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject {isBulk && <span className="text-xs text-gray-500">(You can use {'{product_name}'} and {'{customer_email}'})</span>}</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isLoading || isGenerating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message {isBulk && <span className="text-xs text-gray-500">(Placeholders available)</span>}</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message or click 'Generate Template' to create one..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={12}
                  disabled={isLoading || isGenerating}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!canSend || isLoading || isGenerating}
          >
            {isLoading ? 'Sending...' : useAIBulk ? `Send ${recipientCount} Personalized Emails` : 'Send Email'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
