import { cn } from '@/utils/cn';
import styles from './Title.module.css';

export interface TitleProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/**
 * Page or section title. Use for main headings like "Patient Records".
 */
export function Title({ children, as: Component = 'h1', className }: TitleProps) {
  return <Component className={cn(styles.root, className)}>{children}</Component>;
}
