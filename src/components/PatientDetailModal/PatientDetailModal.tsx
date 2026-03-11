import { Modal, Button } from '@/components';
import type { Patient } from '@/domain/patient.types';
import styles from './PatientDetailModal.module.css';

export interface PatientDetailModalProps {
  patient: Patient | null;
  onClose: () => void;
  onEdit?: (patient: Patient) => void;
}

export function PatientDetailModal({
  patient,
  onClose,
  onEdit,
}: PatientDetailModalProps) {
  if (!patient) return null;

  const titleId = 'patient-detail-title';

  return (
    <Modal
      isOpen={!!patient}
      onClose={onClose}
      titleId={titleId}
      aria-label="Patient details"
      className={styles.dialog}
    >
      <h2 id={titleId} className={styles.title}>
        {patient.name}
      </h2>
      <div className={styles.header}>
        {patient.avatar ? (
          <img
            src={patient.avatar}
            alt=""
            className={styles.avatar}
            width={80}
            height={80}
          />
        ) : (
          <div className={styles.avatar} aria-hidden />
        )}
      </div>
      {patient.description ? (
        <p className={styles.description}>{patient.description}</p>
      ) : null}
      {patient.website ? (
        <a
          href={patient.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.website}
        >
          {patient.website}
        </a>
      ) : null}
      {onEdit && (
        <div className={styles.actions}>
          <Button type="button" variant="minimal" onClick={() => onEdit(patient)}>
            Edit
          </Button>
        </div>
      )}
    </Modal>
  );
}
