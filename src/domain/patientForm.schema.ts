import { z } from 'zod';

/**
 * Avatar file validation (used in form before converting to data URL).
 * Kept next to schema for cohesion.
 */
export const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
export const ACCEPTED_AVATAR_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;
export const ACCEPTED_AVATAR_ACCEPT =
  'image/jpeg,image/png,image/gif,image/webp';

/**
 * Form validation schema. Used by React Hook Form via zodResolver.
 * Keeps validation rules outside the UI component.
 * Avatar is a string (URL or data URL) set from file upload in the form.
 */
export const patientFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be 50 characters or less'),
  avatar: z.string().min(1, 'Avatar is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be 1000 characters or less'),
  website: z
    .string()
    .min(1, 'Website is required')
    .refine(
      (val) => /^(https?:\/\/|www\.).+\..+/.test(val),
      'Website must be a valid URL (e.g. http://, https://, or www.)',
    ),
});

export type PatientFormSchemaValues = z.infer<typeof patientFormSchema>;
