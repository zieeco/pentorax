import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';

export interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  leftIcon?: React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, leftIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="group relative w-full">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5">
            {leftIcon}
          </div>
        )}
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', leftIcon && 'pl-11', className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="hover:text-primary absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-gray-400 transition-colors focus:outline-none"
        >
          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
