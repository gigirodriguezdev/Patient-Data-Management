import { cn } from '@/utils/cn';
import styles from './Subtitle.module.css';

export interface SubtitleProps {
  children: React.ReactNode;
  as?: 'span' | 'p' | 'h2' | 'h3';
  variant?: 'default' | 'heading';
  className?: string;
}

/**
 * Small title / secondary heading. Default muted; use variant="heading" for card titles.
 */
export function Subtitle({
  children,
  as: Component = 'span',
  variant = 'default',
  className,
}: SubtitleProps) {
  return (
    <Component
      className={cn(styles.root, variant === 'heading' && styles.heading, className)}
    >
      {children}
    </Component>
  );
}
