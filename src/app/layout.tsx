import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { themeInitScript } from "@/components/sites/drocol/theme-toggle";
import { DESKTOP_VIEW_WIDTH, VIEW_COOKIE } from "@/components/sites/drocol/view-mode-config";

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

// Phones get the full desktop layout when the visitor asked for it (cookie)
// or their browser's "Desktop site" mode is on (desktop user agent). Real
// desktop browsers ignore the viewport tag, so this never affects them.
export async function generateViewport(): Promise<Viewport> {
  const choice = (await cookies()).get(VIEW_COOKIE)?.value;
  const ua = (await headers()).get("user-agent") ?? "";
  const mobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const desktop = choice === "desktop" || (choice !== "mobile" && ua !== "" && !mobileUA);
  // No initial-scale for desktop: phones then fit the whole 1280px page on screen.
  return desktop
    ? { width: DESKTOP_VIEW_WIDTH, initialScale: undefined }
    : { width: "device-width", initialScale: 1 };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-primary text-primary">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
