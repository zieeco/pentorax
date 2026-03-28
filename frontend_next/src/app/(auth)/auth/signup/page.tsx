'use client';

/**
 * Signup Page — 2-pane layout (form with extensive interaction — 150-line exception applies)
 * Mirrors frontend/src/pages/auth/SignupPage.tsx
 * User type toggle uses shadcn ToggleGroup
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, ChevronDown, Globe, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignupLeftPane } from '@/components/auth/SignupLeftPane';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAuthStore } from '@/stores/auth';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isLoading } = useAuthStore();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', terms: false },
  });

  const onSubmit = async (values: SignupFormValues) => {
    const fullName = `${values.firstName} ${values.lastName}`;
    const { data, error } = await signUp(values.email, values.password, fullName);
    if (!error && data) router.push('/auth/confirmation?type=signup');
  };

  return (
    <div className="font-quicksand flex h-screen flex-col overflow-hidden bg-white lg:flex-row">
      <SignupLeftPane />

      {/* Right Pane — Form */}
      <div className="flex h-screen flex-1 flex-col">
        <div className="flex items-center justify-end p-6">
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
        <div className="flex flex-1 items-center justify-center overflow-y-auto px-6">
          <div className="my-6 w-full max-w-[480px] rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] lg:p-8">
            <h1 className="mb-6 text-center text-[2.2rem] font-black tracking-tight text-gray-900">
              Create account
            </h1>

            <ToggleGroup
              type="single"
              defaultValue="individual"
              className="mb-6 w-full rounded-xl bg-gray-50 p-1"
            >
              <ToggleGroupItem
                value="individual"
                className="data-[state=on]:text-primary flex flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-bold text-gray-400 data-[state=on]:bg-white data-[state=on]:shadow-md"
              >
                <UserCircle className="h-4 w-4" /> Individual
              </ToggleGroupItem>
              <ToggleGroupItem
                value="business"
                className="data-[state=on]:text-primary flex flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-bold text-gray-400 data-[state=on]:bg-white data-[state=on]:shadow-md"
              >
                <Building2 className="h-4 w-4" /> Business
              </ToggleGroupItem>
            </ToggleGroup>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }: { field: any }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="focus:border-primary h-auto rounded-xl border-transparent bg-gray-50 px-3.5 py-3 font-bold shadow-sm focus:bg-white"
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
                    name="lastName"
                    render={({ field }: { field: any }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="focus:border-primary h-auto rounded-xl border-transparent bg-gray-50 px-3.5 py-3 font-bold shadow-sm focus:bg-white"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: any }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Work Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          className="focus:border-primary h-auto rounded-xl border-transparent bg-gray-50 px-3.5 py-3 font-bold shadow-sm focus:bg-white"
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
                  name="password"
                  render={({ field }: { field: any }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Create Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Min. 8 characters"
                          className="focus:border-primary h-auto rounded-xl border-transparent bg-gray-50 px-3.5 py-3 font-bold shadow-sm focus:bg-white"
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
                  name="terms"
                  render={({ field }: { field: any }) => (
                    <FormItem className="flex items-start space-y-0 px-1 pt-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 h-4 w-4"
                        />
                      </FormControl>
                      <FormLabel className="ml-2.5 cursor-pointer text-xs leading-snug font-medium text-gray-500">
                        I agree to the <span className="font-bold text-gray-900">Terms</span> and{' '}
                        <span className="font-bold text-gray-900">Privacy Policy</span>.
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-primary shadow-primary/10 mt-3 h-auto w-full rounded-xl py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-700 active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Start My Energy Journey'}
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center text-sm">
              <span className="font-medium text-gray-500">Already have an account? </span>
              <Link href="/auth/login" className="text-primary font-bold hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
