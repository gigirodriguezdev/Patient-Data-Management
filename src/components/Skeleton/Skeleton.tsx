import { cn } from '@/utils/cn';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'line' | 'avatar' | 'card';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  lines?: number;
  className?: string;
}

export function Skeleton({
  variant = 'line',
  lines = 1,
  className,
}: SkeletonProps) {
  if (variant === 'avatar') {
    return <div className={cn(styles.root, styles.avatar, className)} />;
  }

  if (variant === 'card') {
    return (
      <div className={cn(styles.root, styles.card, className)}>
        <div className={cn(styles.root, styles.avatar)} />
        <div className={cn(styles.root, styles.line)} />
        <div className={cn(styles.root, styles.line)} />
        <div className={cn(styles.root, styles.line)} />
      </div>
    );
  }

  return (
    <div className={className}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cn(styles.root, styles.line)}
        />
      ))}
    </div>
  );
}
