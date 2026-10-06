"use client";

import { useState } from "react";
import { BUSINESS_WHATSAPP } from "../data/cars";
import { waLink } from "../lib/whatsapp";

export function WhatsappFab() {
  const [hovered, setHovered] = useState(false);

  const href = waLink(
    BUSINESS_WHATSAPP,
    "Halo Mitra.Mobil, saya ingin bertanya tentang mobil yang tersedia.",
  );

  return (
    <div className="wa-fab-wrapper" aria-label="Hubungi Admin via WhatsApp">
      {/* Tooltip bubble */}
      <div className={`wa-fab-tooltip ${hovered ? "wa-fab-tooltip--visible" : ""}`}>
        <span>💬 Chat Admin</span>
        <div className="wa-fab-tooltip-arrow" />
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Chat admin via WhatsApp"
        data-testid="whatsapp-fab"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Ripple rings */}
        <span className="wa-fab-ring wa-fab-ring--1" />
        <span className="wa-fab-ring wa-fab-ring--2" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path
            d="M22.5 9.5A8.9 8.9 0 0 0 16 7a8.95 8.95 0 0 0-7.75 13.44L7 25l4.7-1.23A8.95 8.95 0 0 0 25 16c0-2.39-.93-4.64-2.5-6.5Zm-6.5 13.72a7.42 7.42 0 0 1-3.79-1.04l-.27-.16-2.79.73.75-2.72-.18-.28A7.44 7.44 0 0 1 16 8.56a7.44 7.44 0 0 1 0 14.88Zm4.08-5.57c-.22-.11-1.32-.65-1.52-.73-.2-.07-.35-.11-.5.11-.15.22-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.1-.66-.59-1.1-1.32-1.23-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.14.04-.27-.02-.39-.06-.11-.5-1.22-.69-1.67-.18-.43-.37-.37-.5-.38h-.43c-.15 0-.39.06-.59.27-.2.22-.78.76-.78 1.85 0 1.1.8 2.15.91 2.3.11.15 1.57 2.4 3.8 3.37.53.23.95.36 1.27.46.53.17 1.02.14 1.4.09.43-.06 1.32-.54 1.51-1.07.18-.52.18-.97.13-1.07-.06-.1-.21-.16-.43-.27Z"
            fill="#fff"
          />
        </svg>
      </a>
    </div>
  );
}
