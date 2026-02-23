import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe, ChevronDown, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const PentoraxLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <img src="/pentorax.jpeg" alt="Pentorax Logo" className="h-8 w-8 object-contain rounded-lg" />
    <span className="font-sand text-xl font-extrabold text-gray-900">PentoraX</span>
  </div>
);

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { updatePassword, isLoading } = useAuthStore();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const { error } = await updatePassword(values.password);

    if (!error) {
      // Toast is shown by auth store
      navigate('/auth/confirmation?type=recovery');
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white font-sand overflow-hidden">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-[50%] relative bg-[#f0fff4] overflow-hidden flex-col">
        <div className="p-6">
          <Link to="/"><PentoraxLogo /></Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="relative w-full max-w-sm mb-8">
            <div className="absolute inset-0 bg-green-500/5 rounded-full blur-[80px] -z-10"></div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-green-50 flex items-center justify-center rotate-3">
              <div className="bg-green-50 p-6 rounded-full">
                <ShieldCheck className="h-20 w-20 text-green-600" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-[3.2rem] font-black text-gray-900 leading-tight mb-3">You're almost there.</h2>
            <p className="text-base text-gray-500 font-medium">Create a strong, memorable password to regain access.</p>
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
            <h1 className="text-[2.5rem] font-black text-center text-gray-900 mb-8 tracking-tight">Set new password</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">New Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="••••••••" className="px-4 py-3.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto" disabled={isLoading} {...field} />
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
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="••••••••" className="px-4 py-3.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl active:scale-[0.98] mt-2 h-auto" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
