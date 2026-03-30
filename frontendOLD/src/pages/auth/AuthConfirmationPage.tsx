import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Info, ArrowRight, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ConfirmationType = 'signup' | 'recovery' | 'email-verified' | 'info';

interface ConfirmationContent {
  title: string;
  message: string;
  type: 'success' | 'info';
  bgColor: string;
  iconBgColor: string;
  headline: string;
}

const PentoraxLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <img src="/pentorax.jpeg" alt="Pentorax Logo" className="h-8 w-8 object-contain rounded-lg" />
    <span className="font-sand text-xl font-extrabold text-gray-900">PentoraX</span>
  </div>
);

const getConfirmationContent = (type: ConfirmationType): ConfirmationContent => {
  switch (type) {
    case 'signup':
      return {
        title: 'Account Created Successfully!',
        message: "We've sent a verification link to your email. Please check your inbox and verify your account to start managing your solar assets.",
        type: 'success',
        bgColor: 'bg-[#f0fff4]',
        iconBgColor: 'bg-green-500/5',
        headline: 'Great news!',
      };
    case 'email-verified':
      return {
        title: 'Email Verified!',
        message: 'Your email has been successfully verified. You can now log in and start your energy journey with PentoraX.',
        type: 'success',
        bgColor: 'bg-[#f0fff4]',
        iconBgColor: 'bg-green-500/5',
        headline: 'Great news!',
      };
    case 'recovery':
      return {
        title: 'Password Updated Successfully!',
        message: 'Your password has been successfully reset. You can now log in with your new credentials and continue managing your energy assets.',
        type: 'success',
        bgColor: 'bg-[#f0fff4]',
        iconBgColor: 'bg-green-500/5',
        headline: 'Great news!',
      };
    case 'info':
    default:
      return {
        title: 'Check Your Email',
        message: "We've sent you an email with further instructions. Please check your inbox and follow the link provided.",
        type: 'info',
        bgColor: 'bg-[#eff6ff]',
        iconBgColor: 'bg-primary/5',
        headline: 'Heads up.',
      };
  }
};

const AuthConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<ConfirmationContent>(getConfirmationContent('info'));

  useEffect(() => {
    const type = (searchParams.get('type') as ConfirmationType) || 'info';
    setContent(getConfirmationContent(type));
  }, [searchParams]);

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white font-sand overflow-hidden">
      {/* Left Pane */}
      <div className={`hidden lg:flex lg:w-[50%] relative ${content.bgColor} overflow-hidden flex-col`}>
        <div className="p-6">
          <Link to="/">
            <PentoraxLogo />
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="relative w-full max-w-sm mb-8">
            <div className={`absolute inset-0 ${content.iconBgColor} rounded-full blur-[80px] -z-10`}></div>
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-50 flex items-center justify-center animate-float">
              {content.type === 'success' ? (
                <CheckCircle2 className="h-20 w-20 text-green-500" />
              ) : (
                <Info className="h-20 w-20 text-primary" />
              )}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-[3.2rem] font-black text-gray-900 leading-tight mb-3">
              {content.headline}
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Everything is set for your next energy milestone.
            </p>
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
          <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 lg:p-10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 text-center">
            <h1 className="text-[2.2rem] font-black text-gray-900 mb-4 tracking-tight">
              {content.title}
            </h1>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              {content.message}
            </p>

            <Button
              onClick={() => navigate('/auth/login')}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-xl active:scale-[0.98] h-auto group"
            >
              Continue to Sign In
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="mt-6">
              <Link
                to="/"
                className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthConfirmationPage;
