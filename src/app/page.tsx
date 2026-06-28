import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { WhyChoose } from "@/components/WhyChoose";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Contact } from "@/components/Contact";

const Gallery = dynamic(
  () => import("@/components/Gallery").then((mod) => mod.Gallery),
  {
    loading: () => (
      <section className="section-padding">
        <div className="container-custom h-64 animate-pulse rounded-2xl bg-white/5" />
      </section>
    ),
  }
);

const ReservationForm = dynamic(
  () => import("@/components/ReservationForm").then((mod) => mod.ReservationForm),
  {
    loading: () => (
      <section className="section-padding bg-night-900/30">
        <div className="container-custom max-w-4xl mx-auto h-96 animate-pulse rounded-2xl bg-white/5" />
      </section>
    ),
  }
);

const FAQ = dynamic(() => import("@/components/FAQ").then((mod) => mod.FAQ), {
  loading: () => (
    <section className="section-padding bg-night-900/30">
      <div className="container-custom max-w-3xl mx-auto space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    </section>
  ),
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <Stats />
      <Services />
      <Pricing />
      <WhyChoose />
      <ProcessSteps />
      <Gallery />
      <ReservationForm />
      <FAQ />
      <Contact />
    </>
  );
}
