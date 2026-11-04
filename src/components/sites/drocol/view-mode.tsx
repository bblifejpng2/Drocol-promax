"use client";

import { useEffect, useSyncExternalStore } from "react";
import { DESKTOP_VIEW_WIDTH, VIEW_COOKIE } from "./view-mode-config";

/**
 * Desktop view on phones.
 *
 * The server (see generateViewport in app/layout.tsx) sends a 1280px-wide
 * viewport when either:
 *  - the visitor chose "View desktop version" (cookie `drocol-view=desktop`), or
 *  - the browser identifies as a desktop. Real desktop browsers ignore the
 *    viewport tag, but phones using their browser's "Desktop site" option
 *    send a desktop identity and obey it — so they get the full desktop
 *    layout, zoomed to fit the screen.
 * A `drocol-view=mobile` cookie always wins, so visitors can switch back.
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

  // Desktop view on a phone: make sure the whole 1280px page fits the
  // screen (most phones do this already; some open it zoomed in).
  useEffect(() => {
    if (view !== "desktop") return;
    const meta = document.querySelector('meta[name="viewport"]');
    const scale = Math.round((Math.min(screen.width, window.outerWidth || screen.width) / DESKTOP_VIEW_WIDTH) * 1000) / 1000;
    if (meta && scale > 0 && scale < 1) {
      meta.setAttribute("content", `width=${DESKTOP_VIEW_WIDTH}, initial-scale=${scale}, minimum-scale=${scale}`);
    }
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
