import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { usePatients } from '@/hooks/usePatients';
import type { Patient, PatientFormValues } from '@/domain/patient.types';
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
  PatientFormModal,
  PatientList,
  PatientsToolbar,
} from '@/components';
import styles from './PatientsPage.module.css';

function filterPatientsByName(patients: Patient[], query: string): Patient[] {
  const q = query.trim().toLowerCase();
  if (!q) return patients;
  return patients.filter((p) => p.name.toLowerCase().includes(q));
}

export function PatientsPage() {
  const queryClient = useQueryClient();
  const { patients, isLoading, isError, error, isEmpty, refetch, queryKey } = usePatients();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = filterPatientsByName(patients, searchQuery);

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormMode('edit');
    setFormModalOpen(true);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setFormMode('create');
    setFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSubmitPatient = (values: PatientFormValues) => {
    try {
      const now = new Date().toISOString();
      if (formMode === 'create') {
        const newPatient: Patient = {
          ...values,
          id: `local-${Date.now()}`,
          createdAt: now,
          modifiedAt: now,
        };
        queryClient.setQueryData<Patient[]>(queryKey, (prev) => [...(prev ?? []), newPatient]);
        toast.success('Patient added successfully');
        handleCloseFormModal();
      } else if (selectedPatient) {
        const updated: Patient = {
          ...selectedPatient,
          ...values,
          modifiedAt: now,
        };
        queryClient.setQueryData<Patient[]>(queryKey, (prev) =>
          prev?.map((p) => (p.id === selectedPatient.id ? updated : p)) ?? [],
        );
        toast.success('Patient updated successfully');
        handleCloseFormModal();
      } else {
        toast.error('Cannot update: patient no longer selected.');
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      toast.error(message);
    }
  };

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  if (isLoading) {
    return <LoadingState title="Loading patients" />;
  }

  if (isError) {
    return <ErrorState message={errorMessage} onRetry={() => refetch()} />;
  }

  if (isEmpty) {
    return (
      <>
        <EmptyState
          title="No patients yet"
          description="Add your first patient to get started."
        >
          <Button
            variant="minimal"
            onClick={handleAddPatient}
            className={styles.emptyStateCta}
          >
            Add New Patient
          </Button>
        </EmptyState>
        <PatientFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseFormModal}
          mode={formMode}
          patient={selectedPatient}
          onSubmit={handleSubmitPatient}
        />
      </>
    );
  }

  return (
    <>
      <section className={styles.pageShell}>
        <header className={styles.pageHeader}>
          <PatientsToolbar
            onAddPatient={handleAddPatient}
            totalCount={patients.length}
            filteredCount={filteredPatients.length}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={(value) => setSearchQuery(value)}
          />
        </header>
        <section className={styles.listViewport}>
          <PatientList
            patients={filteredPatients}
            onEdit={handleEditPatient}
          />
        </section>
      </section>
      <PatientFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        mode={formMode}
        patient={selectedPatient}
        onSubmit={handleSubmitPatient}
      />
    </>
  );
}
