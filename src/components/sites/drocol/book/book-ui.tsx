"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { LEGAL_DOCS, type LegalDocId } from "./book-data";

export const inputClass =
  "w-full rounded-md border bg-primary px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-white/5";

export const btnPrimary =
  "inline-flex h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-dark px-7 font-medium text-white transition-opacity disabled:opacity-60";
export const btnLine =
  "inline-flex h-[44px] items-center justify-center rounded-full border border-white/20 px-6 font-medium text-white transition-colors hover:border-accent disabled:opacity-50";
export const linkBtn = "text-accent underline underline-offset-4 hover:text-white";

export function Field({
  label,
  htmlFor,
  hint,
  bad,
  optional,
  full,
  children,
}: {
  label: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  bad?: boolean;
  optional?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${full ? "sm:col-span-2" : ""} ${bad ? "[&_input]:border-red-400 [&_select]:border-red-400" : "[&_input]:border-white/15 [&_select]:border-white/15 [&_textarea]:border-white/15"}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
        {label} {optional && <span className="font-normal text-white/40">(optional)</span>}
      </label>
      {children}
      {hint && <span className="text-sm text-white/50">{hint}</span>}
    </div>
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className="flex max-h-[85vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-lg border border-white/10 bg-secondary p-6 lg:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white hover:border-accent">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LegalModal({
  doc,
  onChange,
  onClose,
}: {
  doc: LegalDocId;
  onChange: (doc: LegalDocId) => void;
  onClose: () => void;
}) {
  const current = LEGAL_DOCS[doc];
  return (
    <Modal title={current.title} onClose={onClose}>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(LEGAL_DOCS) as LegalDocId[]).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={id === doc}
            onClick={() => onChange(id)}
            className={`rounded-full border px-4 py-1.5 text-sm ${id === doc ? "border-accent bg-accent/15 text-white" : "border-white/15 text-white/60 hover:text-white"}`}
          >
            {LEGAL_DOCS[id].tab}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 text-white/70">
        {current.sections.map((s, i) => (
          <div key={i}>
            {s.heading && <h3 className="mb-1 font-semibold text-white">{s.heading}</h3>}
            {s.text && <p className="leading-relaxed">{s.text}</p>}
            {s.list && (
              <ul className="list-disc space-y-1 pl-5">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <p className="rounded-md border border-white/10 bg-primary p-4 text-sm text-white/60">
        Your full engagement agreement and authorisation letter are sent for signature before testing starts.
      </p>
    </Modal>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="status" className="fixed bottom-6 left-1/2 z-[70] max-w-[90vw] -translate-x-1/2 rounded-full border border-white/10 bg-secondary px-5 py-3 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}
