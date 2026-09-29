import { MessageCircle } from "lucide-react";
import { BUSINESS_WHATSAPP } from "../data/cars";
import { waLink } from "../lib/whatsapp";

export function WhatsappFab() {
  const href = waLink(
    BUSINESS_WHATSAPP,
    "Halo Mitra.Mobil, saya ingin bertanya tentang mobil yang tersedia.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Chat admin via WhatsApp"
      data-testid="whatsapp-fab"
    >
      <MessageCircle size={26} />
      <span className="wa-fab-label">Chat Admin</span>
    </a>
  );
}
