/**
 * Feature hook for patients list. Wraps TanStack Query; exposes data and loading/error states.
 */

import { useQuery } from '@tanstack/react-query';
import type { Patient } from '@/domain/patient.types';
import { getPatients } from '@/services/patients.service';

const PATIENTS_QUERY_KEY = ['patients'] as const;

const EMPTY_PATIENTS: Patient[] = [];

export function usePatients() {
  const query = useQuery({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: ({ signal }) => getPatients(signal),
  });

  return {
    patients: query.data ?? EMPTY_PATIENTS,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isEmpty: Array.isArray(query.data) && query.data.length === 0,
    queryKey: PATIENTS_QUERY_KEY,
  };
}
