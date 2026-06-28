import { Radio, Camera, Video, Scissors, Share2, Headphones } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP = {
  broadcast: Radio,
  camera: Camera,
  record: Video,
  edit: Scissors,
  multicast: Share2,
  support: Headphones,
} as const;

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-turquoise text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Nos solutions
          </span>
          <h2 className="section-title mt-3 text-balance">
            Nos solutions de <span className="gradient-text">diffusion</span>
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base lg:text-lg">
            De la captation à la diffusion, nous couvrons l&apos;intégralité de votre
            chaîne de production événementielle.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <div
                key={service.title}
                className="group glass-card p-8 transition-all duration-500 hover:border-turquoise/30 hover:shadow-glow hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-turquoise/20 to-premium/20 border border-white/10 transition-all group-hover:from-turquoise/30 group-hover:to-premium/30">
                  <Icon className="h-7 w-7 text-turquoise" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/50 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
