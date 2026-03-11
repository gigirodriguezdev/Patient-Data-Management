import { cn } from '@/utils/cn';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  children: React.ReactNode;
  /** Required for accessibility when the button has no visible text. */
  'aria-label': string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-expanded'?: boolean;
}

/**
 * Button for icon-only actions. Use for edit, expand/collapse, close, etc.
 * Always provide aria-label for screen readers.
 */
export function IconButton({
  children,
  'aria-label': ariaLabel,
  type = 'button',
  onClick,
  disabled = false,
  className,
  'aria-expanded': ariaExpanded,
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.root, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {children}
    </button>
  );
}
