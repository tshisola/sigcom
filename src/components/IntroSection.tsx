import { SITE, INTRO_TEXT } from "@/lib/constants";

export function IntroSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="glass-card p-6 sm:p-8 lg:p-12 max-w-5xl mx-auto text-center">
          <span className="text-turquoise text-xs sm:text-sm font-semibold tracking-wider uppercase">
            À propos de SIGCOM
          </span>
          <h2 className="section-title mt-3 text-balance">
            Votre partenaire <span className="gradient-text">diffusion en direct</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed text-balance max-w-4xl mx-auto">
            {INTRO_TEXT}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="?pack=sur-mesure#reservation" className="btn-gold w-full sm:w-auto min-h-12">
              Demander un devis personnalisé
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Bonjour SIGCOM, je souhaite discuter de mon projet de diffusion en direct.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto min-h-12"
            >
              Réserver sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
