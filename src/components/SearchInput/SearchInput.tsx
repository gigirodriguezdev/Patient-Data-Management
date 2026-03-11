import { useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components';
import { cn } from '@/utils/cn';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * Search input with icon. Enter calls onSearch when provided; parent can filter live via onChange.
 */
export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Search by name…',
  className,
  'aria-label': ariaLabel = 'Search by patient name',
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value.trim());
    inputRef.current?.blur();
  };

  return (
    <form className={cn(styles.wrap, className)} onSubmit={handleSubmit} role="search">
      <span className={styles.icon} aria-hidden>
        <Search size={18} />
      </span>
      <Input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch?.(value.trim());
          }
        }}
        placeholder={placeholder}
        className={styles.input}
        aria-label={ariaLabel}
        autoComplete="off"
      />
    </form>
  );
}
