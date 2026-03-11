import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  hasError?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(styles.root, hasError && styles.error, className)}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
