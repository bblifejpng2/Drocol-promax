import Link from "next/link";
import { footerNav, footerServices } from "./data";
import { DrocolLogo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="divide-y divide-accent/30 border-y border-accent/30">
        <div className="flex divide-x divide-accent/30">
          {/* Logo / Brand */}
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <DrocolLogo
                className="justify-center mb-2"
                markClassName="h-12 w-auto"
                wordClassName="h-8 w-auto"
              />
              <p className="text-sm text-white/60">Drocol Technologies</p>
              <p className="text-xs text-white/40">Lagos · Nigeria</p>
            </div>
          </div>

          {/* Solutions */}
          <div className="hidden flex-1 p-6 text-center lg:block">
            <p className="mb-3 text-white">Solutions</p>
            <div className="flex flex-col gap-1">
              {footerServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="hidden flex-1 p-6 text-center lg:block">
            <p className="mb-3 text-white">Company</p>
            <div className="flex flex-col gap-1">
              {footerNav.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex-1 p-6 lg:text-center">
            <div className="flex flex-col gap-1">
              <a
                href="mailto:help@drocol.com"
                className="text-sm text-white/70 transition-colors hover:text-accent"
              >
                help@drocol.com
              </a>
              <Link
                href="/contact"
                className="text-sm text-white/70 transition-colors hover:text-accent"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
