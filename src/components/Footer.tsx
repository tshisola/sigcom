import Link from "next/link";
import { Radio, Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night-900/50">
      <div className="container-custom section-padding !py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-turquoise to-premium">
                <Radio className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                SIG<span className="text-turquoise">COM</span>
              </span>
            </div>
            <p className="text-white/50 max-w-md leading-relaxed">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Solutions", href: "#services" },
                { label: "Tarifs", href: "#tarifs" },
                { label: "Sur mesure", href: "#sur-mesure" },
                { label: "Galerie", href: "#galerie" },
                { label: "Réservation", href: "#reservation" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/50 hover:text-turquoise transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-white/50 hover:text-turquoise transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-white/50 hover:text-turquoise transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                Kinshasa, RDC
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {year} {SITE.name}. Tous droits réservés.
          </p>
          <p className="text-white/30 text-xs">
            <Link href={SITE.url} className="hover:text-turquoise transition-colors">
              {SITE.url.replace("https://", "")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
