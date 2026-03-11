import { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Avatar.module.css';

export interface AvatarProps {
  /** Image URL or data URL. When empty or invalid, placeholder is shown. */
  src?: string;
  alt?: string;
  size?: 'md' | 'lg';
  className?: string;
}

/**
 * Shows a user avatar image or a default placeholder (e.g. when src is empty or the image fails to load).
 * Encapsulates empty-state and onError handling.
 */
export function Avatar({ src, alt = '', size = 'md', className }: AvatarProps) {
  const [loadError, setLoadError] = useState(false);
  const hasValidSrc = Boolean(src?.trim());
  const showPlaceholder = !hasValidSrc || loadError;
  const sizeClass = size === 'lg' ? styles.sizeLg : styles.sizeMd;

  if (showPlaceholder) {
    return (
      <div
        className={cn(styles.placeholder, sizeClass, className)}
        aria-hidden
      >
        <User size={size === 'lg' ? 40 : 32} className={styles.placeholderIcon} aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(styles.image, sizeClass, className)}
      width={size === 'lg' ? 80 : 64}
      height={size === 'lg' ? 80 : 64}
      onError={() => setLoadError(true)}
    />
  );
}
