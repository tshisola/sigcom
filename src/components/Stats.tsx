import { Calendar, Users, Award, Zap } from "lucide-react";

const STATS = [
  { icon: Calendar, value: "100+", label: "Événements couverts" },
  { icon: Users, value: "50+", label: "Clients satisfaits" },
  { icon: Award, value: "5+", label: "Années d'expérience" },
  { icon: Zap, value: "24/7", label: "Support technique" },
];

export function Stats() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="glass-card grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center p-6 lg:p-8 text-center">
              <stat.icon className="h-6 w-6 text-turquoise mb-3" />
              <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs lg:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
