// Shared by the server (app/layout.tsx) and the footer switch.
//
// Phones show the desktop design by default, laid out at DESKTOP_VIEW_WIDTH
// and fitted to the screen, with larger text (html.phone-desktop in
// globals.css). Visitors can switch to the compact phone layout instead;
// that choice is stored in the VIEW_COOKIE cookie.
export const VIEW_COOKIE = "drocol-view";

/** Narrowest width that still shows the full desktop design (Tailwind `lg`). */
export const DESKTOP_VIEW_WIDTH = 1024;

export type ViewDecision = { desktop: boolean; phone: boolean };

export function decideView(userAgent: string, choice: string | undefined): ViewDecision {
  const phone = /iPhone|iPod|Android.+Mobile|Mobile.+Android|Windows Phone|Mobi/i.test(userAgent);
  const mobileOrTablet = phone || /Android|iPad/i.test(userAgent);
  const desktopUA = userAgent !== "" && !mobileOrTablet;
  // Desktop design unless the visitor picked the phone layout. Real desktop
  // browsers ignore the viewport tag; desktop-UA phones ("Desktop site")
  // and normal phones both get the desktop design.
  const desktop = choice === "desktop" || (choice !== "mobile" && (phone || desktopUA));
  return { desktop, phone };
}
