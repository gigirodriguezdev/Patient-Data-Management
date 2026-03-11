import { cn } from '@/utils/cn';
import effects from '@/styles/effects.module.css';

export interface HeartbeatDividerProps {
  className?: string;
}

export function HeartbeatDivider({ className }: HeartbeatDividerProps) {
  return (
    <div className={cn(effects.heartbeatDivider, className)} aria-hidden>
      <span className={effects.heartbeatMover}>
        <span className={effects.heartbeatEraser} />
        <svg
          className={effects.heartbeatRunner}
          viewBox="0 0 200 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <path
            className={effects.heartbeatPath}
            d="M 40 30 L 62 30 L 72 22 L 78 38 L 84 30 L 98 30 L 110 8 L 122 52 L 134 30 L 150 30 L 160 24 L 166 36 L 172 30 L 190 30"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />
        </svg>
      </span>
    </div>
  );
}

