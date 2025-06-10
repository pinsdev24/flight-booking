import * as React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-3',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'inline-block animate-spin rounded-full border-solid border-current border-t-transparent',
          sizeClasses[size],
          className
        )}
        style={{ 
          borderTopColor: 'transparent' 
        }}
        aria-label="Loading"
        role="status"
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
