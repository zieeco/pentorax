import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe, ChevronDown, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { ArrowLeft, Loader2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const PentoraxLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <img src="/pentorax.jpeg" alt="Pentorax Logo" className="h-8 w-8 object-contain rounded-lg" />
    <span className="font-sand text-xl font-extrabold text-gray-900">PentoraX</span>
  </div>
);

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading } = useAuthStore();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const { error } = await forgotPassword(values.email);

    if (!error) {
      // Toast is shown by auth store
      navigate('/auth/confirmation?type=info');
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white font-sand overflow-hidden">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-[50%] relative bg-[#fdf2f2] overflow-hidden flex-col">
        <div className="p-6">
          <Link to="/"><PentoraxLogo /></Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="relative w-full max-w-sm mb-8">
            <div className="absolute inset-0 bg-red-500/5 rounded-full blur-[80px] -z-10"></div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-red-50 flex items-center justify-center -rotate-2">
              <div className="bg-red-50 p-6 rounded-full">
                <LifeBuoy className="h-20 w-20 text-red-500 animate-spin-slow" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-[3.2rem] font-black text-gray-900 leading-tight mb-3">Security first.</h2>
            <p className="text-base text-gray-500 font-medium">Protecting your energy assets starts with a secure account.</p>
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="p-6 flex justify-end">
          <button className="flex items-center space-x-1.5 border border-gray-200 px-3 py-1.5 rounded-xl text-sm font-bold text-gray-700 bg-white shadow-sm">
            <Globe className="h-3.5 w-3.5" />
            <span>En</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-[400px]">
            <h1 className="text-[2.5rem] font-black text-center text-gray-900 mb-3 tracking-tight">Forgot password?</h1>
            <p className="text-center text-gray-500 font-medium mb-8">Enter your email and we'll send you a recovery link.</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Registered Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          className="px-4 py-3.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-primary shadow-xl active:scale-[0.98] h-auto" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Recovery Link'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-sm font-bold text-primary hover:underline">Back to log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
