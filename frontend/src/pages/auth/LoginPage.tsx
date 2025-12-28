import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { getRoleBasedRedirect } from '@/utils/authHelpers';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Globe, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Logo from '@/assets/images/pentorax.jpeg';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const PentoraxLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <img src={Logo} alt="Pentorax Logo" className="h-8 w-8 object-contain rounded-lg" />
    <span className="font-sand text-xl font-extrabold text-gray-900">PentoraX</span>
  </div>
);

const FloatingBadge: React.FC<{ name: string; className?: string; style?: React.CSSProperties }> = ({ name, className, style }) => (
  <div className={`px-4 py-2 bg-black text-white rounded-full font-bold text-xs shadow-xl ${className}`} style={style}>
    <span>{name}</span>
  </div>
);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, isLoading, role } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { data, error } = await signIn(values.email, values.password);
    if (!error && data) {
      // Get the role from the auth store after successful login
      const userRole = useAuthStore.getState().role;
      const redirectPath = getRoleBasedRedirect(userRole);
      navigate(redirectPath);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white font-sand overflow-hidden">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-[50%] relative bg-[#f0f4ff] overflow-hidden flex-col">
        <div className="p-6">
          <Link to="/"><PentoraxLogo /></Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <FloatingBadge name="Solar Power" className="absolute top-[22%] left-[18%] animate-float" />
          <FloatingBadge name="Clean Energy" className="absolute top-[20%] left-[35%] animate-float" style={{ animationDelay: '1s' }} />
          
          <div className="relative w-full max-w-md mb-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px] -z-10"></div>
            <div className="relative bg-white/40 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80" 
                alt="Solar Future" 
                className="w-full h-[280px] object-cover rounded-[1.5rem] shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-700"
              />
              <div className="absolute -bottom-3 -right-3 bg-primary p-4 rounded-2xl shadow-2xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center max-w-lg">
            <h2 className="text-[2.8rem] font-black text-gray-900 leading-[1.05] mb-4 tracking-tight">
              Sweet energy and even <br />
              <span className="bg-white px-3 py-1 rounded-xl shadow-sm border border-gray-100">sweeter savings</span>
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Made for remote teams and sustainable households everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="p-6 flex items-center justify-between lg:justify-end space-x-6">
          <div className="lg:hidden"><PentoraxLogo /></div>
          <div className="flex items-center space-x-4">
            <Link to="/support" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors hidden sm:inline">Contact support</Link>
            <button className="flex items-center space-x-1.5 border border-gray-200 px-3 py-1.5 rounded-xl text-sm font-bold text-gray-700 bg-white shadow-sm">
              <Globe className="h-3.5 w-3.5" />
              <span>En</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-[420px]">
            <h1 className="text-[2.2rem] font-black text-center text-gray-900 mb-8 tracking-tight">Welcome back</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Email</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Mail className="h-4.5 w-4.5 text-gray-300 group-focus-within:text-primary transition-colors" />
                          </div>
                          <Input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary font-bold text-gray-900 shadow-sm h-auto"
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
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Password</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Lock className="h-4.5 w-4.5 text-gray-300 group-focus-within:text-primary transition-colors" />
                          </div>
                          <Input
                            type="password"
                            placeholder="••••••••••••••••"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary font-bold text-gray-900 shadow-sm h-auto"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-left px-1">
                  <Link to="/auth/forgot-password" className="text-sm font-bold text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 bg-gray-900 text-white rounded-[1.25rem] font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-black/5 active:scale-[0.98] h-auto mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center text-sm">
              <p className="font-medium text-gray-500">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="font-bold text-primary hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
