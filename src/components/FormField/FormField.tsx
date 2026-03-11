import { cn } from '@/utils/cn';
import styles from './FormField.module.css';

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function FormField({
  id,
  label,
  error,
  children,
  required,
  className,
}: FormFieldProps) {
  return (
    <div className={cn(styles.root, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && ' *'}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
