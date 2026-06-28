import { Award, Layers, Sparkles, Headphones } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/constants";

const ICON_MAP = {
  expertise: Award,
  flexible: Layers,
  quality: Sparkles,
  support: Headphones,
} as const;

export function WhyChoose() {
  return (
    <section id="pourquoi" className="section-padding bg-night-900/30 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Pourquoi SIGCOM
          </span>
          <h2 className="section-title mt-3 text-balance">
            Pourquoi choisir <span className="gradient-text">SIGCOM</span>
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base lg:text-lg">
            Une équipe professionnelle, des solutions adaptées à chaque type d&apos;événement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_CHOOSE.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <div
                key={item.title}
                className="glass-card p-5 sm:p-6 lg:p-8 hover:border-turquoise/30 transition-colors"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-turquoise/20 to-premium/20 border border-white/10">
                  <Icon className="h-6 w-6 text-turquoise" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
