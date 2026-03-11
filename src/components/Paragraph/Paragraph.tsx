import { cn } from '@/utils/cn';
import styles from './Paragraph.module.css';

export interface ParagraphProps {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
}

/**
 * Body text. Use for descriptions and paragraphs.
 */
export function Paragraph({ children, muted, className }: ParagraphProps) {
  return (
    <p className={cn(styles.root, muted && styles.muted, className)}>{children}</p>
  );
}
