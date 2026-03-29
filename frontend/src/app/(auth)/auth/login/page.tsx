'use client';

/**
 * Login Page — 2-pane layout (form with extensive interaction — 150-line exception applies)
 * Mirrors frontend/src/pages/auth/LoginPage.tsx
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Globe, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginLeftPane } from '@/components/auth/LoginLeftPane';
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
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useAuthStore } from '@/stores/auth';
import { getRoleBasedRedirect } from '@/utils/authHelpers';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { data, error } = await signIn(values.email, values.password);
    if (!error && data) {
      const userRole = useAuthStore.getState().role;
      router.push(getRoleBasedRedirect(userRole));
    }
  };

  return (
    <div className="font-quicksand flex h-screen flex-col overflow-hidden bg-white lg:flex-row">
      <LoginLeftPane />

      {/* Right Pane — Form */}
      <div className="flex h-screen flex-1 flex-col">
        <div className="flex items-center justify-between space-x-6 p-6 lg:justify-end">
          <div className="font-quicksand text-xl font-extrabold lg:hidden">PentoraX</div>
          <div className="flex items-center space-x-4">
            <Link
              href="/support"
              className="hover:text-primary hidden text-sm font-bold text-gray-900 transition-colors sm:inline"
            >
              Contact support
            </Link>
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
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-[420px]">
            <h1 className="mb-8 text-center text-[2.2rem] font-black tracking-tight text-gray-900">
              Welcome back
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: any }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Mail className="group-focus-within:text-primary h-4 w-4 text-gray-300 transition-colors" />
                          </div>
                          <Input
                            type="email"
                            placeholder="name@company.com"
                            className="focus:border-primary h-auto rounded-[1.25rem] border-transparent bg-gray-50 py-3.5 pr-4 pl-11 font-bold text-gray-900 shadow-sm focus:bg-white"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: { field: any }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••••••••••"
                          className="focus:border-primary h-auto rounded-[1.25rem] border-transparent bg-gray-50 py-3.5 font-bold text-gray-900 shadow-sm focus:bg-white"
                          disabled={isLoading}
                          leftIcon={
                            <Lock className="group-focus-within:text-primary h-4 w-4 text-gray-300 transition-colors" />
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="px-1 text-left">
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary text-sm font-bold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="hover:bg-primary mt-2 h-auto w-full rounded-[1.25rem] bg-gray-900 py-4 text-lg font-bold text-white shadow-xl shadow-black/5 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </form>
            </Form>
            <div className="mt-8 text-center text-sm">
              <p className="font-medium text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-primary font-bold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
