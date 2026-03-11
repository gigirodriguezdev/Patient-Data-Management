import { PatientCard } from '../PatientCard/PatientCard';
import { cn } from '@/utils/cn';
import type { Patient } from '@/domain/patient.types';
import styles from './PatientList.module.css';

export interface PatientListProps {
  patients: Patient[];
  onEdit?: (patient: Patient) => void;
  className?: string;
}

export function PatientList({
  patients,
  onEdit,
  className,
}: PatientListProps) {
  return (
    <ul
      className={cn(styles.list, className)}
      role="list"
      aria-label="Patients"
    >
      {patients.map((patient, index) => (
        <li
          key={patient.id}
          className={styles.listItem}
          style={{ animationDelay: `${index * 45}ms` }}
        >
          <PatientCard patient={patient} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
}
