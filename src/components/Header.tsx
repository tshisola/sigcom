"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#services", label: "Solutions" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#sur-mesure", label: "Sur mesure" },
  { href: "#pourquoi", label: "Pourquoi" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reservation", label: "Réservation" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-night-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-turquoise to-premium">
            <Radio className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            SIG<span className="text-turquoise">COM</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-turquoise rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a href="#reservation" className="btn-primary ml-4 !py-2.5 !px-5 !text-sm">
            Réserver
          </a>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-night-950/95 backdrop-blur-xl border-b border-white/10">
          <nav className="container-custom px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-white/70 hover:text-turquoise hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservation"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-2 text-center !text-sm"
            >
              Réserver maintenant
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
