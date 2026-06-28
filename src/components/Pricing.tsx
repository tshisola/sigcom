import { Check, Star, Clock, Camera, Sparkles } from "lucide-react";
import { PACKS, EXTRA_SERVICES, CUSTOM_PACK, CUSTOM_PRODUCTION_TEXT } from "@/lib/constants";

export function Pricing() {
  return (
    <section id="tarifs" className="section-padding bg-night-900/30 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Tarifs
          </span>
          <h2 className="section-title mt-3 text-balance">
            Packs de <span className="gradient-text">base</span>
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base lg:text-lg text-balance">
            Nos packs sont des points de départ. Le dispositif final dépend du type
            d&apos;événement, de la taille du lieu, du niveau de production et de votre budget.
            Tous les packs incluent 2 heures de diffusion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative glass-card p-6 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                pack.popular
                  ? "border-turquoise/40 shadow-glow ring-1 ring-turquoise/20 lg:scale-[1.02]"
                  : "hover:border-white/20"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold to-gold-dark px-3 sm:px-4 py-1 text-xs font-bold text-night-950">
                    <Star className="h-3 w-3" />
                    Populaire
                  </span>
                </div>
              )}

              <div className="mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">{pack.name}</h3>
                <p className="text-white/50 text-xs sm:text-sm mt-2">{pack.description}</p>
              </div>

              <div className="mb-5 sm:mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-turquoise">{pack.price}</span>
                  <span className="text-white/50 text-sm">USD</span>
                </div>
                <p className="text-xs text-white/40 mt-1">À partir de</p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs sm:text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Camera className="h-4 w-4 text-turquoise shrink-0" />
                    {pack.cameras} caméra{pack.cameras > 1 ? "s" : ""} min.
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-turquoise shrink-0" />
                    {pack.hours}h incluses
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                    <Check className="h-4 w-4 text-turquoise shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`?pack=${pack.id}#reservation`}
                className={`w-full text-center min-h-12 flex items-center justify-center ${
                  pack.popular ? "btn-gold" : "btn-secondary"
                }`}
              >
                Choisir ce pack
              </a>
            </div>
          ))}
        </div>

        {/* Production sur mesure */}
        <div
          id="sur-mesure"
          className="glass-card p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border-premium/30 bg-gradient-to-br from-premium/10 via-night-900/50 to-turquoise/5"
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-premium/40 bg-premium/10 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-premium-light mb-4">
                <Sparkles className="h-4 w-4" />
                {CUSTOM_PRODUCTION_TEXT.title}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-balance">
                {CUSTOM_PRODUCTION_TEXT.title}
              </h3>
              {CUSTOM_PRODUCTION_TEXT.paragraphs.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-white/60 leading-relaxed mb-4 text-balance">
                  {p}
                </p>
              ))}
              <a
                href={`?pack=${CUSTOM_PACK.id}#reservation`}
                className="btn-gold w-full sm:w-auto min-h-12 inline-flex mt-2"
              >
                Demander un devis personnalisé
              </a>
            </div>
            <div className="lg:w-80 shrink-0">
              <ul className="space-y-3">
                {CUSTOM_PACK.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8 lg:p-10">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Options supplémentaires</h3>
          <p className="text-white/50 text-sm sm:text-base mb-6 sm:mb-8">
            Personnalisez votre prestation avec nos services additionnels.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {EXTRA_SERVICES.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 transition-colors hover:border-turquoise/30"
              >
                <h4 className="font-medium text-xs sm:text-sm mb-2">{service.name}</h4>
                <div className="flex items-baseline gap-1 flex-wrap">
                  {"note" in service && service.note && (
                    <span className="text-xs text-white/40">{service.note}</span>
                  )}
                  <span className="text-base sm:text-lg font-bold text-gold">
                    {service.price > 0 ? `${service.price}` : ""}
                  </span>
                  <span className="text-xs text-white/50">{service.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
