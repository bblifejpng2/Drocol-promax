import type { PartnerId } from "./data";

type MarkProps = { className?: string };

/** Chow Deck — a bowl with rising steam, black and white */
function ChowDeckMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-white" />
      <path
        d="M15 9.5c-1.5 1.8 1.5 3.2 0 5M20 8.5c-1.5 1.8 1.5 3.2 0 5M25 9.5c-1.5 1.8 1.5 3.2 0 5"
        fill="none"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M8 19h24a12 12 0 0 1-24 0Z" className="fill-primary" />
      <rect x="14" y="30.5" width="12" height="2.5" rx="1.25" className="fill-primary" />
    </svg>
  );
}

/** Redream Solutions — a looping arrow forming an "R" cycle, black and white */
function RedreamMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-white" />
      <path
        d="M28.5 15.5A10 10 0 1 0 30 21"
        fill="none"
        className="stroke-primary"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M24 13.5 30.5 12l-1 6.6Z" className="fill-primary" strokeLinejoin="round" />
      <circle cx="20" cy="20.5" r="3" className="fill-primary" />
    </svg>
  );
}

/** Paystacks — three offset coin bars stacked, black and white */
function PaystacksMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-white" />
      <rect x="9" y="25" width="22" height="5" rx="2.5" className="fill-primary" />
      <rect x="12" y="17.5" width="20" height="5" rx="2.5" className="fill-primary" fillOpacity="0.85" />
      <rect x="8" y="10" width="18" height="5" rx="2.5" className="fill-primary" fillOpacity="0.7" />
    </svg>
  );
}

const marks: Record<PartnerId, (props: MarkProps) => React.JSX.Element> = {
  chowdeck: ChowDeckMark,
  redream: RedreamMark,
  paystacks: PaystacksMark,
};

export function PartnerMark({ id, className }: { id: PartnerId; className?: string }) {
  const Mark = marks[id];
  return <Mark className={className} />;
}
