import { cn } from '@/utils/cn';
import { Subtitle, Paragraph } from '@/components';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(styles.root, className)}>
      <Subtitle as="h2" variant="heading" className={styles.title}>
        {title}
      </Subtitle>
      {description && (
        <Paragraph className={styles.description}>{description}</Paragraph>
      )}
      {children}
    </div>
  );
}
