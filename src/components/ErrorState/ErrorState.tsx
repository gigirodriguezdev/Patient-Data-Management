import { Button } from '../Button/Button';
import { cn } from '@/utils/cn';
import styles from './ErrorState.module.css';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn(styles.root, className)} role="alert">
      <p className={styles.message}>
        Error loading patients: {message}
      </p>
      {onRetry && (
        <div className={styles.actions}>
          <Button type="button" variant="minimal" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}
