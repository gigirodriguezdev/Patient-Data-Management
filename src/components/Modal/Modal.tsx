import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { IconButton } from '../IconButton/IconButton';
import styles from './Modal.module.css';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const CLOSE_DURATION_MS = 250;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titleId?: string;
  descriptionId?: string;
  'aria-label'?: string;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  titleId,
  descriptionId,
  'aria-label': ariaLabel,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRafRef = useRef<number | null>(null);
  const enterRafRef = useRef<number | null>(null);
  const closeRafRef = useRef<number | null>(null);
  const wasOpenRef = useRef(false);

  const isVisible = isOpen || isClosing;

  // Prevent page scroll behind the modal.
  useEffect(() => {
    if (!isVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    wasOpenRef.current = true;
    openRafRef.current = requestAnimationFrame(() => {
      setIsClosing(false);
      setIsEntering(false);
      enterRafRef.current = requestAnimationFrame(() => setIsEntering(true));
    });
    return () => {
      if (openRafRef.current !== null) cancelAnimationFrame(openRafRef.current);
      if (enterRafRef.current !== null) cancelAnimationFrame(enterRafRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    closeRafRef.current = requestAnimationFrame(() => setIsClosing(true));
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, CLOSE_DURATION_MS);
    return () => {
      if (closeRafRef.current !== null) cancelAnimationFrame(closeRafRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    });
    return () => cancelAnimationFrame(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && previousActiveElement.current?.focus) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isVisible) return null;

  const dialogContent = (
    <div
      className={styles.root}
      role="presentation"
      data-state={isOpen && isEntering ? 'open' : 'closed'}
    >
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-label={ariaLabel}
        className={cn(styles.dialog, className)}
      >
        <IconButton
          aria-label="Close dialog"
          onClick={onClose}
          className={styles.closeButton}
        >
          <X size={20} aria-hidden />
        </IconButton>
        {children}
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
