import type { ReservationFormData, QuoteRecommendation } from "@/types/reservation";
import { PACKS, EXTRA_SERVICES, BUDGET_OPTIONS, CUSTOM_PACK } from "./constants";

export function formatPrice(amount: number): string {
  if (amount === 0) return "Sur devis";
  return `${amount} USD`;
}

export function getPackById(id: string) {
  if (id === CUSTOM_PACK.id) return CUSTOM_PACK;
  return PACKS.find((p) => p.id === id);
}

export function getPackLabel(id: string): string {
  return getPackById(id)?.name ?? id;
}

export function recommendPack(cameras: number): string {
  if (cameras >= 4) return CUSTOM_PACK.id;
  if (cameras === 3) return "premium";
  if (cameras === 2) return "standard";
  if (cameras === 1) return "essentiel";
  return "";
}

export function getBudgetMessage(budgetId: string): string {
  const budget = BUDGET_OPTIONS.find((b) => b.id === budgetId);
  return budget?.message ?? "";
}

export function getStreamingPlatforms(data: ReservationFormData): string[] {
  const platforms: string[] = [];
  if (data.streamFacebook) platforms.push("Facebook");
  if (data.streamYouTube) platforms.push("YouTube");
  if (data.streamTikTok) platforms.push("TikTok");
  return platforms;
}

export function getConfigServices(data: ReservationFormData): string[] {
  const services: string[] = [];
  if (data.giantScreen) services.push("Projection écran géant");
  if (data.needRecording) services.push("Enregistrement vidéo");
  if (data.needEditing) services.push("Montage après événement");
  if (data.needBackupInternet) services.push("Internet de secours");
  if (data.needExtraTechnicians) services.push("Techniciens supplémentaires");
  for (const id of data.extraServices) {
    const s = EXTRA_SERVICES.find((e) => e.id === id);
    if (s) services.push(s.name);
  }
  return services;
}

export function buildQuoteRecommendation(data: ReservationFormData): QuoteRecommendation | null {
  const cameras =
    data.camerasRequested === "6+"
      ? 6
      : parseInt(data.camerasRequested, 10);
  if (!cameras || !data.budget) return null;

  const packId = recommendPack(cameras);
  const pack = getPackById(packId);
  const budgetMessage = getBudgetMessage(data.budget);
  const platforms = getStreamingPlatforms(data);
  const services = getConfigServices(data);

  const summary = [
    `Formule recommandée : ${pack?.name ?? "À définir"}`,
    `Caméras souhaitées : ${cameras}`,
    data.participants ? `Participants estimés : ${data.participants}` : "",
    platforms.length > 0 ? `Diffusion : ${platforms.join(", ")}` : "",
    services.length > 0 ? `Services : ${services.join(", ")}` : "",
    budgetMessage,
  ].filter(Boolean);

  return {
    packId,
    packName: pack?.name ?? "",
    budgetMessage,
    summary,
  };
}

export function calculateEstimate(data: ReservationFormData): number {
  if (data.pack === CUSTOM_PACK.id) return 0;

  const pack = PACKS.find((p) => p.id === data.pack);
  let total = pack?.price ?? 0;

  const extraHours = Math.max(0, parseInt(data.duration, 10) - (pack?.hours ?? 2));
  if (extraHours > 0) total += extraHours * 40;

  if (data.needRecording) total += 30;
  if (data.needEditing) total += 50;
  if (data.needBackupInternet) total += 35;

  for (const serviceId of data.extraServices) {
    const service = EXTRA_SERVICES.find((s) => s.id === serviceId);
    if (service && service.price > 0) total += service.price;
  }

  return total;
}

export function buildWhatsAppMessage(data: ReservationFormData): string {
  const packName = getPackLabel(data.pack);
  const platforms = getStreamingPlatforms(data);
  const services = getConfigServices(data);
  const budget = BUDGET_OPTIONS.find((b) => b.id === data.budget);

  const lines = [
    "Bonjour SIGCOM, je souhaite réserver une diffusion en direct.",
    "",
    `*Nom :* ${data.name}`,
    `*Téléphone :* ${data.phone}`,
    `*Email :* ${data.email}`,
    `*Type d'événement :* ${data.eventType}`,
    `*Date :* ${data.date}`,
    `*Heure :* ${data.time}`,
    `*Lieu :* ${data.location}`,
    data.participants ? `*Participants :* ${data.participants}` : "",
    `*Nombre de caméras :* ${data.camerasRequested || "Non précisé"}`,
    `*Formule :* ${packName}`,
    budget ? `*Budget estimé :* ${budget.label}` : "",
    platforms.length > 0 ? `*Plateformes :* ${platforms.join(", ")}` : "",
    services.length > 0 ? `*Services supplémentaires :* ${services.join(", ")}` : "",
    data.message ? `\n*Message :*\n${data.message}` : "",
  ];

  return lines.filter((l) => l !== "").join("\n");
}

export function getWhatsAppUrl(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "243861432070";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
