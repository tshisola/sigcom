import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSteps() {
  return (
    <section id="processus" className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-premium-light text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Processus
          </span>
          <h2 className="section-title mt-3 text-balance">
            Processus de <span className="gradient-text">réservation</span>
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base lg:text-lg">
            De la demande à la diffusion live, un accompagnement simple et professionnel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROCESS_STEPS.map((item, i) => (
            <div key={item.step} className="relative glass-card p-5 sm:p-6">
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-turquoise/30" />
              )}
              <span className="text-2xl sm:text-3xl font-bold text-turquoise/40">{item.step}</span>
              <h3 className="text-base sm:text-lg font-semibold mt-3 mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
