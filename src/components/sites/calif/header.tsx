"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "./data";
import { DrocolLogo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-secondary fixed w-full z-50 transition-colors">
      <nav className="px-4 py-2.5 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link href="/" aria-label="Drocol home">
            <DrocolLogo />
          </Link>
          <div className="flex items-center gap-2 lg:order-2">
            <ThemeToggle />
            <Link
              href="/book"
              className="hidden h-10 items-center rounded-full bg-gradient-to-r from-accent to-accent-dark px-5 font-medium text-white sm:inline-flex"
            >
              Book a test
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center p-2 text-white lg:hidden ml-1"
              aria-label="Open main menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`w-full items-center justify-between lg:flex lg:order-1 lg:w-auto ${
              menuOpen ? "flex" : "hidden"
            }`}
            id="menu"
          >
            <ul className="mt-4 flex flex-col text-xl font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-2 pl-3 pr-4 text-white hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="sm:hidden">
                <Link
                  href="/book"
                  className="block py-2 pl-3 pr-4 text-accent transition-colors hover:text-white"
                >
                  Book a test
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
