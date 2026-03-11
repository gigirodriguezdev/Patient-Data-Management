/**
 * Patients API service. Fetches and parses patient data.
 * Only the service layer reads VITE_PATIENTS_API_URL.
 */

import { z } from 'zod';
import type { Patient } from '@/domain/patient.types';

/**
 * API response item from MockAPI. Avatar can be string or malformed (e.g. {}).
 */
const apiPatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z
    .union([z.string(), z.record(z.string(), z.unknown())])
    .transform((v) => (typeof v === 'string' ? v : '')),
  description: z.string(),
  website: z.string(),
  createdAt: z.string(),
});

const apiPatientsResponseSchema = z.array(apiPatientSchema);

type ApiPatient = z.infer<typeof apiPatientSchema>;

function mapApiPatientToDomain(item: ApiPatient): Patient {
  return {
    id: item.id,
    name: item.name,
    avatar: item.avatar,
    description: item.description,
    website: item.website,
    createdAt: item.createdAt,
  };
}

const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_PATIENTS_API_URL;
  if (typeof url !== 'string' || url.trim() === '') {
    throw new Error('VITE_PATIENTS_API_URL is not set or invalid');
  }
  return url.trim();
};

/**
 * Fetches and returns the list of patients. Parses and validates the response.
 * Uses AbortSignal for cancellation. Throws on network or parse errors.
 */
export async function getPatients(signal?: AbortSignal): Promise<Patient[]> {
  const url = getBaseUrl();
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Patients API error: ${response.status} ${response.statusText}`);
  }

  const raw: unknown = await response.json();
  const parsed = apiPatientsResponseSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error('Invalid patients API response format');
  }

  return parsed.data.map(mapApiPatientToDomain);
}
