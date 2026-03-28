'use client';

/**
 * Reset Password Page — form with extensive interaction (150-line exception)
 * Mirrors frontend/src/pages/auth/ResetPasswordPage.tsx
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ResetPasswordLeftPane } from '@/components/auth/ResetPasswordLeftPane';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useAuthStore } from '@/stores/auth';

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword, isLoading } = useAuthStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await updatePassword(values.password);
    if (!error) router.push('/auth/confirmation?type=recovery');
  };

  return (
    <div className="font-quicksand flex h-screen flex-col overflow-hidden bg-white lg:flex-row">
      <ResetPasswordLeftPane />

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
            <h1 className="mb-8 text-center text-[2.5rem] font-black tracking-tight text-gray-900">
              Set new password
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••"
                          className="focus:border-primary h-auto rounded-xl border-transparent bg-gray-50 px-4 py-3.5 font-bold shadow-sm focus:bg-white"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••"
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
                  className="bg-primary mt-2 h-auto w-full rounded-xl py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-700 active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
