/**
 * Domain types for Patient and form values.
 * Single source of truth for the patient entity.
 */

export interface Patient {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  website?: string;
  createdAt: string;
  modifiedAt?: string;
}

/**
 * Values used when creating or editing a patient in the form.
 * No id/createdAt/modifiedAt when creating; they are set by the container.
 */
export interface PatientFormValues {
  name: string;
  avatar: string;
  description: string;
  website: string;
}

export function patientToFormValues(patient: Patient): PatientFormValues {
  return {
    name: patient.name,
    avatar: patient.avatar ?? '',
    description: patient.description ?? '',
    website: patient.website ?? '',
  };
}
