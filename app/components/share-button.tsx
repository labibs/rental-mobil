"use client";

import { useState } from "react";
import { shareCarMessage, waLink } from "../lib/whatsapp";

type Props = {
  carId: string;
  name: string;
  priceLabel: string;
  variant?: "icon" | "full";
};

export function ShareButton({ carId, name, priceLabel, variant = "icon" }: Props) {
  const [copied, setCopied] = useState(false);

  function share() {
    const url = `${window.location.origin}/cars/${carId}`;
    const text = shareCarMessage(name, priceLabel, url);
    window.open(waLink(null, text), "_blank", "noopener,noreferrer");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <button
      type="button"
      className={`wa-share-btn ${variant === "icon" ? "wa-share-btn-icon" : "wa-share-btn-full"}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        share();
      }}
      title="Bagikan ke WhatsApp"
      aria-label={`Bagikan ${name} ke WhatsApp`}
      data-testid={`share-${carId}`}
    >
      {/* Official WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        width={variant === "icon" ? "18" : "17"}
        height={variant === "icon" ? "18" : "17"}
        fill="currentColor"
        className="shrink-0"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.352.226-.653.075-1.52-.76-2.508-1.357-3.498-3.056-.263-.452.263-.42.753-1.4.08-.16.04-.3-.02-.45-.06-.15-.678-1.632-.93-2.235-.245-.589-.494-.509-.678-.518-.176-.01-.377-.01-.578-.01-.201 0-.527.075-.803.376-.276.3-1.054 1.03-1.054 2.512 0 1.482 1.08 2.914 1.23 3.115.15.2 2.125 3.245 5.148 4.551 1.764.762 2.457.818 3.344.686.541-.08 1.78-.727 2.03-1.429.251-.702.251-1.304.176-1.429-.075-.125-.276-.2-.577-.35zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.94.56 3.75 1.53 5.28L2 22l4.9-1.57c1.47.88 3.18 1.39 5.14 1.39 5.5 0 9.96-4.46 9.96-9.96C22 6.46 17.54 2 12.04 2z" />
      </svg>
      {variant === "full" && (
        <span className="font-semibold tracking-tight">
          {copied ? "Membuka WhatsApp..." : "Bagikan ke WhatsApp"}
        </span>
      )}
    </button>
  );
}
