'use client';

/**
 * Forgot Password Page — form with extensive interaction (150-line exception)
 * Mirrors frontend/src/pages/auth/ForgotPasswordPage.tsx
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ForgotPasswordLeftPane } from '@/components/auth/ForgotPasswordLeftPane';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, isLoading } = useAuthStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await forgotPassword(values.email);
    if (!error) router.push('/auth/confirmation?type=info');
  };

  return (
    <div className="font-quicksand flex h-screen flex-col overflow-hidden bg-white lg:flex-row">
      <ForgotPasswordLeftPane />

      {/* Right Pane — Form */}
      <div className="flex h-screen flex-1 flex-col">
        <div className="flex justify-end p-6">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1.5 rounded-xl font-bold text-gray-700"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>En</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-[400px]">
            <h1 className="mb-3 text-center text-[2.5rem] font-black tracking-tight text-gray-900">
              Forgot password?
            </h1>
            <p className="mb-8 text-center font-medium text-gray-500">
              Enter your email and we&apos;ll send you a recovery link.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: any }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Registered Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          className="focus:border-primary h-auto rounded-xl border-transparent bg-gray-50 px-4 py-3.5 font-bold shadow-sm focus:bg-white"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="hover:bg-primary h-auto w-full rounded-xl bg-gray-900 py-4 text-lg font-bold text-white shadow-xl active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Recovery Link'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-primary text-sm font-bold hover:underline">
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
