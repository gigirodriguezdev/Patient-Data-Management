import { cn } from '@/utils/cn';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
