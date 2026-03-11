import { cn } from '@/utils/cn';
import styles from './LoadingState.module.css';

export interface LoadingStateProps {
  /** Main heading (e.g. "Loading patients") */
  title?: string;
  /** Optional secondary text */
  message?: string;
  /** Custom content (icon, spinner); replaces default ECG when provided */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Reusable loading state: ECG animation, title, optional message.
 *
 * @example
 * <LoadingState />
 * @example
 * <LoadingState title="Saving..." message="Please wait" />
 * @example
 * <LoadingState title="Loading..."><Spinner /></LoadingState>
 */
export function LoadingState({
  title = 'Loading',
  message,
  children,
  className,
}: LoadingStateProps) {
  return (
    <div className={cn(styles.wrapper, className)} role="status" aria-live="polite" aria-label={title}>
      <div className={styles.content}>
        <div className={styles.iconWrap} aria-hidden>
          {children ?? (
            <svg
              className={styles.ecg}
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                className={styles.ecgPath}
                d="M 0 30 L 40 30 L 50 15 L 60 45 L 70 30 L 120 30 L 130 22 L 140 38 L 150 30 L 200 30"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <p className={styles.title}>{title}</p>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
