"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Car,
  Home,
  KeyRound,
  LayoutDashboard,
  Menu,
  Plus,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home, testId: "nav-home" },
  { href: "/?mode=sewa#katalog", label: "Sewa Mobil", icon: KeyRound, testId: "nav-sewa" },
  { href: "/?mode=beli#katalog", label: "Beli Mobil", icon: ShoppingBag, testId: "nav-beli" },
  { href: "/titip-mobil", label: "Titip Mobil", icon: Tag, testId: "nav-titip" },
];

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-header ${tone} ${open ? "menu-open" : ""}`}
        data-testid="site-header"
      >
        <div className="site-header-inner">
          <Link
            href="/"
            className="site-brand"
            data-testid="site-brand"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo-mitra.mobil.png"
              alt="Mitra.Mobil"
              className="site-brand-logo"
              width={120}
              height={36}
            />
          </Link>

          <nav
            className={`site-nav ${open ? "open" : ""}`}
            data-testid="site-nav"
          >
            <div className="site-nav-mobile-title mobile-only">
              <span>Menu Navigasi</span>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  href={link.href}
                  key={link.label}
                  data-testid={link.testId}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={18} className="mobile-only text-blue-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <Link
              href="/admin"
              className="site-nav-admin"
              data-testid="nav-admin"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={17} />
              <span>Admin</span>
            </Link>

            <Link
              href="/titip-mobil"
              className="site-cta mobile-only"
              data-testid="titip-mobil-menu-link-mobile"
              onClick={() => setOpen(false)}
            >
              <Plus size={16} />
              <span>Titip Mobil Sekarang</span>
            </Link>
          </nav>

          <div className="site-header-actions">
            <Link
              href="/titip-mobil"
              className="site-cta desktop-only"
              data-testid="titip-mobil-menu-link"
            >
              <Plus size={16} />
              <span>Titip Mobil</span>
            </Link>

            <button
              type="button"
              className={`site-burger ${open ? "active" : ""}`}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              onClick={() => setOpen((current) => !current)}
              data-testid="mobile-menu-button"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay ditempatkan di belakang header (z-index 40) */}
      {open && (
        <div
          className="site-nav-backdrop mobile-only"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}


