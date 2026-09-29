"use client";

import { MessageCircle } from "lucide-react";
import { shareCarMessage, waLink } from "../lib/whatsapp";

type Props = {
  carId: string;
  name: string;
  priceLabel: string;
  variant?: "icon" | "full";
};

export function ShareButton({ carId, name, priceLabel, variant = "icon" }: Props) {
  function share() {
    const url = `${window.location.origin}/cars/${carId}`;
    window.open(waLink(null, shareCarMessage(name, priceLabel, url)), "_blank", "noopener");
  }

  return (
    <button
      type="button"
      className={`share-button ${variant}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        share();
      }}
      title="Bagikan ke WhatsApp"
      aria-label={`Bagikan ${name} ke WhatsApp`}
      data-testid={`share-${carId}`}
    >
      <MessageCircle size={variant === "icon" ? 16 : 18} />
      {variant === "full" && "Bagikan ke WhatsApp"}
    </button>
  );
}
