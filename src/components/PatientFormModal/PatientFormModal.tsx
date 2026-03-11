import { Modal } from '../Modal/Modal';
import { PatientForm } from '../PatientForm/PatientForm';
import { HeartbeatDivider, Title } from '@/components';
import { patientToFormValues } from '@/domain/patient.types';
import type { Patient } from '@/domain/patient.types';
import type { PatientFormValues } from '@/domain/patient.types';
import type { PatientFormMode } from '../PatientForm/PatientForm';
import effects from '@/styles/effects.module.css';
import styles from './PatientFormModal.module.css';

export interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: PatientFormMode;
  patient?: Patient | null;
  onSubmit: (values: PatientFormValues) => void;
}

export function PatientFormModal({
  isOpen,
  onClose,
  mode,
  patient,
  onSubmit,
}: PatientFormModalProps) {
  const defaultValues =
    mode === 'edit' && patient ? patientToFormValues(patient) : undefined;
  const titleText = mode === 'create' ? 'Add New Patient' : 'Edit Existing Patient';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      aria-label={mode === 'create' ? 'Add New Patient' : 'Edit patient'}
      className={`${effects.heartbeatAutoLoop} ${effects.heartbeatBounceTarget} ${styles.dialogCompact}`}
    >
      <div className={styles.root} key={`${mode}-${patient?.id ?? 'new'}`}>
        <header className={styles.header}>
          <Title as="h2" className={styles.title}>
            {titleText}
          </Title>
          <HeartbeatDivider className={styles.dividerSlot} />
        </header>

        <PatientForm
          mode={mode}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </Modal>
  );
}
