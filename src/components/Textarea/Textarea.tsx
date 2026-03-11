import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  hasError?: boolean;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(styles.root, hasError && styles.error, className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
