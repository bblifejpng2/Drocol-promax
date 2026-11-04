import Link from "next/link";
import { contactItems, footerNav, footerServices } from "./data";
import { DrocolLogo } from "./logo";

export function Footer() {
  const [general, support] = contactItems;

  return (
    <footer className="border-y border-accent/30 bg-secondary">
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-accent/30">
        {/* Logo / Brand */}
        <div className="col-span-2 flex items-center justify-center border-b border-accent/30 p-6 lg:col-span-1 lg:border-b-0">
          <div className="text-center">
            <DrocolLogo
              className="mb-2 justify-center"
              markClassName="h-12 w-auto"
              wordClassName="h-8 w-auto"
            />
            <p className="text-sm text-white/60">Drocol Technologies</p>
            <p className="text-xs text-white/40">Lagos · Nigeria</p>
          </div>
        </div>

        {/* Solutions */}
        <div className="p-6 lg:text-center">
          <p className="mb-3 text-white">Solutions</p>
          <div className="flex flex-col gap-1">
            {footerServices.map((s) => (
              <Link key={s.href} href={s.href} className="text-sm text-white/70 transition-colors hover:text-accent">
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="p-6 lg:text-center">
          <p className="mb-3 text-white">Company</p>
          <div className="flex flex-col gap-1">
            {footerNav.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-white/70 transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="col-span-2 border-t border-accent/30 p-6 lg:col-span-1 lg:border-t-0 lg:text-center">
          <p className="mb-3 text-white">Contact</p>
          <div className="flex flex-col gap-1">
            {general.href && (
              <a href={general.href} className="text-sm text-white/70 transition-colors hover:text-accent">
                {general.value}
              </a>
            )}
            {support.href && (
              <a href={support.href} className="text-sm text-white/70 transition-colors hover:text-accent">
                {support.value} (24/7)
              </a>
            )}
            <Link href="/contact" className="text-sm text-white/70 transition-colors hover:text-accent">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
