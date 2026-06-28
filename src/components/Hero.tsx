import Image from "next/image";
import { Play, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Bonjour SIGCOM, je souhaite réserver une diffusion en direct."
)}`;

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/photos/live-streaming.png"
          alt="Production vidéo professionnelle SIGCOM"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/90 to-night-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950/40" />
      </div>

      <div className="absolute top-1/4 left-1/4 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-premium/20 blur-[100px] sm:blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-turquoise/15 blur-[80px] sm:blur-[100px] animate-pulse-glow" />

      <div className="container-custom relative z-10 section-padding !pt-24 sm:!pt-32 lg:!pt-40 w-full">
        <div className="max-w-3xl w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/30 bg-turquoise/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-turquoise mb-4 sm:mb-6">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Diffusion en direct professionnelle
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance">
            Capturez{" "}
            <span className="gradient-text">l&apos;excellence</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            en direct
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-white/60 max-w-xl leading-relaxed">
            SIGCOM accompagne entreprises, églises, conférences et grands événements
            avec une production adaptée — de 1 caméra à une régie multi-caméras complète.
          </p>

          {/* Mobile-first CTAs */}
          <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:hidden">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full min-h-12 text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              Réserver sur WhatsApp
            </a>
            <a href="?pack=sur-mesure#reservation" className="btn-gold w-full min-h-12 text-sm">
              Demander un devis
            </a>
            <a href="#tarifs" className="btn-secondary w-full min-h-12 text-sm">
              Voir les packs
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="mt-10 hidden sm:flex flex-row gap-4">
            <a href="#reservation" className="btn-primary text-base min-h-12">
              Réserver maintenant
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="?pack=sur-mesure#reservation" className="btn-gold text-base min-h-12">
              Devis personnalisé
            </a>
            <a href="#tarifs" className="btn-secondary text-base min-h-12">
              <Play className="h-5 w-5" />
              Nos formules
            </a>
          </div>

          {/* Stats — desktop emphasis */}
          <div className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
            {[
              { value: "100+", label: "Événements" },
              { value: "Multi", label: "Caméras" },
              { value: "HD", label: "Broadcast" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-turquoise">{stat.value}</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-turquoise animate-pulse" />
        </div>
      </div>
    </section>
  );
}
