import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { themeInitScript } from "@/components/sites/drocol/theme-toggle";
import { DESKTOP_VIEW_WIDTH, VIEW_COOKIE, decideView } from "@/components/sites/drocol/view-mode-config";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Drocol | Confidence in Your Security",
  description:
    "Drocol Technologies Limited provides enterprise cybersecurity solutions for Nigerian organizations. Real-time threat detection, attack path analysis, and developer-ready APIs.",
};

async function viewForRequest() {
  const choice = (await cookies()).get(VIEW_COOKIE)?.value;
  const ua = (await headers()).get("user-agent") ?? "";
  return decideView(ua, choice);
}

// Phones get the desktop design fitted to the screen (no initial-scale, so
// the browser zooms out to show the full width). Real desktop browsers
// ignore the viewport tag.
export async function generateViewport(): Promise<Viewport> {
  const { desktop } = await viewForRequest();
  return desktop
    ? { width: DESKTOP_VIEW_WIDTH, initialScale: undefined }
    : { width: "device-width", initialScale: 1 };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { desktop, phone } = await viewForRequest();
  // Larger text when a phone shows the desktop design (see globals.css).
  const phoneDesktop = desktop && phone ? " phone-desktop" : "";
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased${phoneDesktop}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-primary text-primary">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
