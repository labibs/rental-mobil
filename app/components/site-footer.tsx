import Link from "next/link";
import { Car, MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="site-footer-inner">
        <div>
          <Link href="/" className="site-brand light">
            <span>
              <Car size={20} />
            </span>
            <b>Mitra<em>.</em>Mobil</b>
          </Link>
          <p>
            Rental, jual beli, dan titip mobil terpercaya di Cilacap dan
            sekitarnya. Armada terawat, harga transparan, proses cepat.
          </p>
        </div>
        <div>
          <h4>Layanan</h4>
          <Link href="/?mode=sewa#katalog">Sewa Mobil</Link>
          <Link href="/?mode=beli#katalog">Beli Mobil Baru</Link>
          <Link href="/?mode=bekas#katalog">Mobil Bekas</Link>
          <Link href="/titip-mobil">Titip Sewa &amp; Titip Jual</Link>
        </div>
        <div>
          <h4>Kontak</h4>
          <span>
            <MapPin size={15} />
            Jl. Gatot Subroto No. 88, Cilacap
          </span>
          <a
            href="https://wa.me/6282177826596"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-link"
          >
            <Phone size={15} />
            0821-7782-6596
          </a>
          <span>
            <MessageCircle size={15} />
            WhatsApp 08.00 – 21.00 WIB
          </span>
        </div>
      </div>
      <p className="site-footer-copy">© 2026 Mitra.Mobil. Semua hak dilindungi.</p>
    </footer>
  );
}
