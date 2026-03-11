import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageInput, Button, FormField, Input, Textarea } from '@/components';
import { patientFormSchema } from '@/domain/patientForm.schema';
import type { PatientFormValues } from '@/domain/patient.types';
import styles from './PatientForm.module.css';

export type PatientFormMode = 'create' | 'edit';

export interface PatientFormProps {
  mode: PatientFormMode;
  defaultValues?: Partial<PatientFormValues>;
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

export function PatientForm({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
      avatar: '',
      description: '',
      website: '',
    },
  });

  const avatarValue = useWatch({
    control,
    name: 'avatar',
  });

  const handleAvatarChange = (dataUrl: string) => {
    clearErrors('avatar');
    setValue('avatar', dataUrl);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormField
        id="name"
        label="Name"
        error={errors.name?.message}
        required
      >
        <Input
          id="name"
          type="text"
          hasError={!!errors.name}
          {...register('name')}
        />
      </FormField>

      <FormField
        id="avatar"
        label="Avatar"
        error={errors.avatar?.message}
        required
      >
        <ImageInput
          id="avatar"
          value={avatarValue}
          onChange={handleAvatarChange}
          onError={(message) => setError('avatar', { message })}
          hasError={!!errors.avatar}
          aria-describedby={errors.avatar ? 'avatar-error' : undefined}
        />
      </FormField>

      <FormField
        id="description"
        label="Description"
        error={errors.description?.message}
        required
      >
        <Textarea
          id="description"
          rows={4}
          hasError={!!errors.description}
          {...register('description')}
        />
      </FormField>

      <FormField
        id="website"
        label="Website"
        error={errors.website?.message}
        required
      >
        <Input
          id="website"
          type="text"
          placeholder="https://..."
          hasError={!!errors.website}
          {...register('website')}
        />
      </FormField>

      <div className={styles.actions}>
        <Button type="button" variant="minimalMuted" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="minimal">
          {mode === 'create' ? 'Add New Patient' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
