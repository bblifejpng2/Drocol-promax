"use client";

import { useEffect, useSyncExternalStore } from "react";
import { DESKTOP_VIEW_WIDTH, VIEW_COOKIE } from "./view-mode-config";

/**
 * Phone layout switch. Phones show the desktop design by default (see
 * view-mode-config.ts and app/layout.tsx); this footer link lets visitors
 * switch to the compact phone layout and back. The choice is a cookie the
 * server reads, so it applies before the page draws.
 */

type View = "desktop" | "mobile" | null;

const subscribe = () => () => {};

/** Phones and small tablets only; null on laptops/desktops (no switch shown). */
function getView(): View {
  const touch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  const small = Math.min(screen.width, screen.height) < 768;
  if (!touch || !small) return null;
  const content = document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "";
  return content.includes(`width=${DESKTOP_VIEW_WIDTH}`) ? "desktop" : "mobile";
}

export function ViewModeToggle({ className = "" }: { className?: string }) {
  const view = useSyncExternalStore<View>(subscribe, getView, () => null);

  // Desktop view on a phone: make sure the whole desktop-width page fits the
  // screen (most phones do this already; some open it zoomed in).
  useEffect(() => {
    if (view !== "desktop") return;
    const meta = document.querySelector('meta[name="viewport"]');
    const scale = Math.round((Math.min(screen.width, window.outerWidth || screen.width) / DESKTOP_VIEW_WIDTH) * 1000) / 1000;
    if (meta && scale > 0 && scale < 1) {
      meta.setAttribute("content", `width=${DESKTOP_VIEW_WIDTH}, initial-scale=${scale}, minimum-scale=${scale}`);
    }
    // Phones using their browser's "Desktop site" mode aren't recognised by
    // the server; give them the larger text too.
    document.documentElement.classList.add("phone-desktop");
  }, [view]);

  if (!view) return null;

  const switchView = () => {
    const next = view === "desktop" ? "mobile" : "desktop";
    document.cookie = `${VIEW_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={switchView}
      className={`text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-accent ${className}`}
    >
      {view === "desktop" ? "Switch to mobile version" : "View desktop version"}
    </button>
  );
}
