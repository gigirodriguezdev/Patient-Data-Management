import { useState } from 'react';
import { User } from 'lucide-react';
import {
  MAX_AVATAR_SIZE_BYTES,
  ACCEPTED_AVATAR_TYPES,
  ACCEPTED_AVATAR_ACCEPT,
} from '@/domain/patientForm.schema';
import styles from './ImageInput.module.css';

function Preview({ value }: { value: string }) {
  const [loadError, setLoadError] = useState(false);
  const showPlaceholder = !value || loadError;

  if (showPlaceholder) {
    return (
      <div className={styles.placeholder} aria-hidden>
        <User size={32} className={styles.placeholderIcon} />
      </div>
    );
  }
  return (
    <div className={styles.previewImage}>
      <img
        src={value}
        alt=""
        className={styles.image}
        onError={() => setLoadError(true)}
      />
    </div>
  );
}

export interface ImageInputProps {
  id: string;
  value: string;
  onChange: (dataUrl: string) => void;
  onError: (message: string) => void;
  hasError?: boolean;
  'aria-describedby'?: string;
}

export function ImageInput({
  id,
  value,
  onChange,
  onError,
  hasError = false,
  'aria-describedby': ariaDescribedby,
}: ImageInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (
      !ACCEPTED_AVATAR_TYPES.includes(
        file.type as (typeof ACCEPTED_AVATAR_TYPES)[number],
      )
    ) {
      onError('File must be an image (JPEG, PNG, GIF or WebP)');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      onError('File must be 2MB or smaller');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') onChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.root}>
      <div className={styles.preview}>
        <Preview key={value} value={value} />
      </div>
      <input
        id={id}
        type="file"
        accept={ACCEPTED_AVATAR_ACCEPT}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedby}
        className={styles.fileInput}
        onChange={handleChange}
      />
    </div>
  );
}
