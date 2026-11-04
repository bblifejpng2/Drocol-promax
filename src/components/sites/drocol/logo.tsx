import { cn } from "@/lib/utils";

const ORANGE = "#F7861E";

export function DrocolMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="7 3.5 86 83"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <mask id="drocol-mark-hole">
          <rect width="100" height="92" fill="#fff" />
          {/* Large open center, as in the reference */}
          <path
            d="M50 19 L67 30 L50 41 L33 30 Z"
            fill="#000"
            stroke="#000"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      {/* Top layer: rounded diamond with a cut-out center */}
      <path
        d="M50 7.5 L87 30 L50 52.5 L13 30 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        mask="url(#drocol-mark-hole)"
      />
      {/* Orange core */}
      <path
        d="M50 26 L56 30 L50 34 L44 30 Z"
        fill={ORANGE}
        stroke={ORANGE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Stacked layers */}
      <path
        d="M11 41 Q11 44.5 14 46.3 L50 68 L86 46.3 Q89 44.5 89 41 M11 55.5 Q11 59 14 60.8 L50 82.5 L86 60.8 Q89 59 89 55.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DrocolWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 138 36"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Drocol"
    >
      <g fill="none" stroke="currentColor" strokeWidth="5">
        {/* D */}
        <path d="M2.5 3.5 H13 A12 12 0 0 1 25 15.5 V20.5 A12 12 0 0 1 13 32.5 H2.5 Z" />
        {/* r */}
        <path d="M33.5 35 V22.5 A7 7 0 0 1 40.5 15.5 H47" />
        {/* o */}
        <rect x="52.5" y="15.5" width="21" height="17" rx="7" />
        {/* c */}
        <path d="M101 15.5 H88 A7 7 0 0 0 81 22.5 V25.5 A7 7 0 0 0 88 32.5 H101" />
        {/* o */}
        <rect x="106.5" y="15.5" width="21" height="17" rx="7" />
        {/* l */}
        <path d="M134.5 1 V35" />
      </g>
      <rect x="114" y="21" width="6" height="6" rx="1.5" fill={ORANGE} />
    </svg>
  );
}

export function DrocolLogo({
  className,
  markClassName = "h-11 w-auto",
  wordClassName = "h-7 w-auto",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3 text-white", className)}>
      <DrocolMark className={markClassName} />
      <DrocolWordmark className={wordClassName} />
    </span>
  );
}
