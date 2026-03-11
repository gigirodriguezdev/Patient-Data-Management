import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Pencil, Globe } from 'lucide-react';
import { Avatar, Card, HeartbeatDivider, IconButton, Paragraph } from '@/components';
import type { Patient } from '@/domain/patient.types';
import styles from './PatientCard.module.css';
import effects from '@/styles/effects.module.css';

function formatWebsiteForDisplay(url: string): string {
  const withoutProtocol = url.replace(/^https?:\/\//i, '').trim();
  if (!withoutProtocol) return url;
  return withoutProtocol.startsWith('www.')
    ? withoutProtocol
    : `www.${withoutProtocol}`;
}

export interface PatientCardProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
}

export function PatientCard({ patient, onEdit }: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasMore = (patient.description?.length ?? 0) > 0 || !!patient.website;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (!expanded || !cardRef.current) return;
    const el = cardRef.current;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [expanded]);

  const displayWebsite = patient.website
    ? formatWebsiteForDisplay(patient.website)
    : '';

  return (
    <div ref={cardRef}>
      <div className={`${styles.cardWrap} ${effects.heartbeatCard}`}>
        <Card className={`${styles.root} ${effects.heartbeatBounceTarget}`}>
          <div className={styles.layout}>
            {/* Row 1: avatar | name + website | actions */}
            <div className={styles.avatarWrap}>
              <Avatar
                key={patient.avatar}
                src={patient.avatar}
                size="lg"
                className={styles.avatarInCard}
              />
            </div>

            <div className={styles.content}>
              <h2 className={styles.name}>{patient.name}</h2>
              {patient.website ? (
                <a
                  href={patient.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.website}
                >
                  <Globe size={14} className={styles.websiteIcon} aria-hidden />
                  {displayWebsite}
                </a>
              ) : null}
            </div>

            <div className={styles.actions}>
              {onEdit && (
                <IconButton
                  type="button"
                  aria-label="Edit patient"
                  onClick={() => onEdit(patient)}
                  className={styles.editBtn}
                >
                  <Pencil size={18} aria-hidden />
                </IconButton>
              )}
              {hasMore && (
                <IconButton
                  type="button"
                  aria-label={expanded ? 'Collapse details' : 'View more details'}
                  aria-expanded={expanded}
                  onClick={handleToggle}
                  className={styles.expandBtn}
                >
                  <ChevronDown size={20} aria-hidden />
                </IconButton>
              )}
            </div>

            <HeartbeatDivider className={styles.heartbeatSlot} />

            {/* Row 2: paragraph below avatar + content */}
            {patient.description ? (
              <div className={styles.descriptionRow}>
                <div
                  className={styles.previewWrap}
                  data-expanded={expanded}
                  aria-hidden={!expanded && !patient.description}
                >
                  <Paragraph muted className={styles.description}>
                    {patient.description}
                  </Paragraph>
                </div>
                {expanded ? (
                  <div className={styles.expandedBlock} aria-hidden={false}>
                    <Paragraph muted className={styles.descriptionFull}>
                      {patient.description}
                    </Paragraph>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
