import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe, ChevronDown, UserCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Loader2 } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const PentoraxLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <img src="/pentorax.jpeg" alt="Pentorax Logo" className="h-8 w-8 object-contain rounded-lg" />
    <span className="font-sand text-xl font-extrabold text-gray-900">PentoraX</span>
  </div>
);

const FloatingBadge: React.FC<{ name: string; className?: string; style?: React.CSSProperties }> = ({ name, className, style }) => (
  <div className={`px-4 py-2 bg-black text-white rounded-full font-bold text-xs shadow-xl ${className}`} style={style}>
    <span>{name}</span>
  </div>
);

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuthStore();
  const [userType, setUserType] = useState<'individual' | 'business'>('individual');

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', terms: false },
  });

  const onSubmit = async (values: SignupFormValues) => {
    const fullName = `${values.firstName} ${values.lastName}`;
    const { data, error } = await signUp(values.email, values.password, fullName);

    if (!error && data) {
      // Toast is shown by auth store
      navigate('/auth/confirmation?type=signup');
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white font-sand overflow-hidden">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-[50%] relative bg-[#f0f9ff] overflow-hidden flex-col">
        <div className="p-6">
          <Link to="/"><PentoraxLogo /></Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <FloatingBadge name="5k+ Users" className="absolute top-[22%] left-[22%] animate-float" />
          <FloatingBadge name="24/7 Power" className="absolute top-[20%] right-[18%] animate-float" style={{ animationDelay: '1.5s' }} />
          
          <div className="relative w-full max-w-md mb-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px] -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80" 
              alt="Solar Field" 
              className="w-full h-[320px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-700"
            />
          </div>

          <div className="text-center max-w-lg">
            <h2 className="text-[2.6rem] font-black text-gray-900 leading-[1.1] mb-4">
              Power your home, <br />
              <span className="text-primary underline decoration-primary/20 underline-offset-8">scale your business</span>
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Join thousands transitioning to clean, sustainable energy.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="p-6 flex items-center justify-between lg:justify-end space-x-4">
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

        <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
          <div className="w-full max-w-[480px] bg-white rounded-2xl p-6 lg:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-gray-100 my-6">
            <h1 className="text-[2.2rem] font-black text-center text-gray-900 mb-6 tracking-tight">Create account</h1>
            
            {/* User Type Toggle */}
            <div className="flex p-1 bg-gray-50 rounded-xl mb-6">
              <button 
                type="button"
                onClick={() => setUserType('individual')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg font-bold transition-all text-sm ${userType === 'individual' ? 'bg-white shadow-md text-primary' : 'text-gray-400'}`}
              >
                <UserCircle className="h-4 w-4 mr-1.5" /> Individual
              </button>
              <button 
                type="button"
                onClick={() => setUserType('business')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg font-bold transition-all text-sm ${userType === 'business' ? 'bg-white shadow-md text-primary' : 'text-gray-400'}`}
              >
                <Building2 className="h-4 w-4 mr-1.5" /> Business
              </button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" className="px-3.5 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto" disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" className="px-3.5 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto" disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Work Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@company.com" className="px-3.5 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto" disabled={isLoading} {...field} />
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
                      <FormLabel className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-widest">Create Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Min. 8 characters" className="px-3.5 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary font-bold shadow-sm h-auto" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start px-1 pt-1 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 h-4 w-4" />
                      </FormControl>
                      <FormLabel className="ml-2.5 text-xs font-medium text-gray-500 leading-snug cursor-pointer">
                        I agree to the <span className="text-gray-900 font-bold hover:underline">Terms</span> and <span className="text-gray-900 font-bold hover:underline">Privacy Policy</span>.
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-primary/10 active:scale-[0.98] mt-3 h-auto" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Start My Energy Journey'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="font-medium text-gray-500">Already have an account? </span>
              <Link to="/auth/login" className="font-bold text-primary hover:underline">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
