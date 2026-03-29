/**
 * SignupLeftPane — Decorative left panel for the signup page
 */
import Image from 'next/image';
import { AuthLogo } from '@/components/auth/AuthLogo';

export function SignupLeftPane() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-[#f0f9ff] lg:flex lg:w-[50%]">
      <div className="p-6">
        <AuthLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <div className="relative mb-8 w-full max-w-md">
          <div className="bg-primary/10 absolute inset-0 -z-10 rounded-full blur-[80px]" />
          <Image
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
            alt="Solar Field"
            width={1000}
            height={320}
            className="h-[320px] w-full rotate-2 rounded-[2.5rem] border-4 border-white object-cover shadow-2xl transition-transform duration-700 hover:rotate-0"
          />
        </div>
        <div className="max-w-lg text-center">
          <h2 className="mb-4 text-[2.6rem] leading-[1.1] font-black text-gray-900">
            Power your home, <br />
            <span className="text-primary decoration-primary/20 underline underline-offset-8">
              scale your business
            </span>
          </h2>
          <p className="text-base font-medium text-gray-500">
            Join thousands transitioning to clean, sustainable energy.
          </p>
        </div>
      </div>
    </div>
  );
}
