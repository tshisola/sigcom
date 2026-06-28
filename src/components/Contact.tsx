import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Contact() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Bonjour SIGCOM, j'aimerais discuter de mon projet.")}`;

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            Contact
          </span>
          <h2 className="section-title mt-3">
            Parlons de votre <span className="gradient-text">projet</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          <a
            href={`mailto:${SITE.email}`}
            className="glass-card p-8 text-center group hover:border-turquoise/30 hover:shadow-glow transition-all duration-300"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-turquoise/10 mb-4 group-hover:bg-turquoise/20 transition-colors">
              <Mail className="h-6 w-6 text-turquoise" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-white/50 break-all">{SITE.email}</p>
          </a>

          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="glass-card p-8 text-center group hover:border-turquoise/30 hover:shadow-glow transition-all duration-300"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-premium/10 mb-4 group-hover:bg-premium/20 transition-colors">
              <Phone className="h-6 w-6 text-premium-light" />
            </div>
            <h3 className="font-semibold mb-2">Téléphone</h3>
            <p className="text-sm text-white/50">{SITE.phone}</p>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-8 text-center group hover:border-[#25D366]/30 hover:shadow-glow transition-all duration-300"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/10 mb-4 group-hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-white/50">{SITE.phone}</p>
          </a>

          <div className="glass-card p-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 mb-4">
              <MapPin className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-semibold mb-2">Localisation</h3>
            <p className="text-sm text-white/50">Kinshasa, RDC</p>
          </div>
        </div>
      </div>
    </section>
  );
}
