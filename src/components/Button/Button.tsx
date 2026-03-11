import { cn } from '@/utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'minimal' | 'minimalMuted';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  'aria-busy'?: boolean;
  'aria-disabled'?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  'aria-busy': ariaBusy,
  'aria-disabled': ariaDisabled,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.root, styles[variant], className)}
      disabled={disabled}
      onClick={onClick}
      aria-busy={ariaBusy}
      aria-disabled={ariaDisabled}
    >
      {children}
    </button>
  );
}
