import { Plus } from 'lucide-react';
import { Button, Title, Subtitle, SearchInput } from '@/components';
import { cn } from '@/utils/cn';
import styles from './PatientsToolbar.module.css';

export interface PatientsToolbarProps {
  onAddPatient: () => void;
  totalCount: number;
  filteredCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export function PatientsToolbar({
  onAddPatient,
  totalCount,
  filteredCount,
  searchValue,
  onSearchChange,
  onSearch,
  className,
}: PatientsToolbarProps) {
  return (
    <div className={cn(styles.toolbar, className)} role="toolbar" aria-label="Patient records actions">
      <div className={styles.titleBlock}>
        <Title>
          <span className={styles.titleRow}>
            <span>Patient Records</span>
            <span className={styles.stethoIconWrap} aria-hidden>
              <svg
                className={styles.stethoscope}
                viewBox="0 0 56 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <circle cx="12" cy="8" r="4" fill="currentColor" />
                <path
                  d="M 16 10 C 6 14 4 28 22 32"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="44" cy="8" r="4" fill="currentColor" />
                <path
                  d="M 40 10 C 50 14 52 28 34 32"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 28 32 L 28 60"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="28"
                  cy="66"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  fill="none"
                />
                <circle cx="28" cy="66" r="3.5" fill="currentColor" />
              </svg>
            </span>
          </span>
        </Title>
      </div>
      <div className={styles.ctaCell}>
        <Button type="button" variant="minimal" onClick={onAddPatient}>
          <Plus size={18} aria-hidden /> Add New Patient
        </Button>
      </div>
      <div className={styles.countCell}>
        <Subtitle>
          {filteredCount} of {totalCount} Patients
        </Subtitle>
      </div>
      <div className={styles.searchCell}>
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onSearch={onSearch}
          placeholder="Search by name…"
        />
      </div>
    </div>
  );
}
