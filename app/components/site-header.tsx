"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, LayoutDashboard, Menu, Plus, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", testId: "nav-home" },
  { href: "/?mode=sewa#katalog", label: "Sewa Mobil", testId: "nav-sewa" },
  { href: "/?mode=beli#katalog", label: "Beli Mobil", testId: "nav-beli" },
  { href: "/titip-mobil", label: "Titip Mobil", testId: "nav-titip" },
];

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${tone}`} data-testid="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" data-testid="site-brand">
          <span>
            <Car size={20} />
          </span>
          <b>Mitra<em>.</em>Mobil</b>
        </Link>

        <nav className={`site-nav ${open ? "open" : ""}`} data-testid="site-nav">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              data-testid={link.testId}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="site-nav-admin"
            data-testid="nav-admin"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={15} />
            Admin
          </Link>
          <Link
            href="/titip-mobil"
            className="site-cta mobile-only"
            data-testid="titip-mobil-menu-link-mobile"
            onClick={() => setOpen(false)}
          >
            <Plus size={16} />
            Titip Mobil Sekarang
          </Link>
        </nav>

        <div className="site-header-actions">
          <Link
            href="/titip-mobil"
            className="site-cta desktop-only"
            data-testid="titip-mobil-menu-link"
          >
            <Plus size={16} />
            Titip Mobil
          </Link>
          <button
            type="button"
            className="site-burger"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            data-testid="mobile-menu-button"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
