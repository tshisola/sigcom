"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Calculator,
  Lightbulb,
  ClipboardList,
} from "lucide-react";
import {
  PACKS,
  ALL_PACKS,
  EXTRA_SERVICES,
  EVENT_TYPES,
  BUDGET_OPTIONS,
  PARTICIPANT_RANGES,
  CAMERA_OPTIONS,
  CUSTOM_PACK,
} from "@/lib/constants";
import {
  calculateEstimate,
  buildQuoteRecommendation,
  recommendPack,
  getPackLabel,
  getBudgetMessage,
} from "@/lib/utils";
import type { ReservationFormData, ReservationResponse } from "@/types/reservation";

const INITIAL_FORM: ReservationFormData = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  date: "",
  time: "",
  location: "",
  pack: "",
  duration: "2",
  extraServices: [],
  message: "",
  participants: "",
  camerasRequested: "",
  budget: "",
  streamFacebook: false,
  streamYouTube: false,
  streamTikTok: false,
  giantScreen: false,
  needRecording: false,
  needEditing: false,
  needBackupInternet: false,
  needExtraTechnicians: false,
};

function ReservationFormInner() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<ReservationFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReservationResponse | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    const packParam = searchParams.get("pack");
    if (packParam && ALL_PACKS.some((p) => p.id === packParam)) {
      setForm((prev) => ({ ...prev, pack: packParam }));
    }
    setInitialized(true);
  }, [searchParams, initialized]);

  const recommendation = useMemo(
    () => buildQuoteRecommendation(form),
    [form]
  );

  const estimate = form.pack && form.pack !== CUSTOM_PACK.id ? calculateEstimate(form) : 0;

  const updateField = <K extends keyof ReservationFormData>(
    key: K,
    value: ReservationFormData[K]
  ) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "camerasRequested" && typeof value === "string" && value) {
        const cameras = value === "6+" ? 6 : parseInt(value, 10);
        if (cameras && !prev.pack) {
          next.pack = recommendPack(cameras);
        }
      }
      return next;
    });
    setResult(null);
  };

  const toggleExtra = (id: string) => {
    setForm((prev) => ({
      ...prev,
      extraServices: prev.extraServices.includes(id)
        ? prev.extraServices.filter((s) => s !== id)
        : [...prev.extraServices, id],
    }));
    setResult(null);
  };

  const applyRecommendation = () => {
    if (recommendation) {
      updateField("pack", recommendation.packId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: ReservationResponse = await res.json();
      setResult(data);
      if (data.success) {
        setSubmittedName(form.name);
        setForm(INITIAL_FORM);
      }
    } catch {
      setResult({
        success: false,
        message: "Erreur de connexion. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="section-padding bg-night-900/30 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <span className="text-turquoise text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Réservation
          </span>
          <h2 className="section-title mt-3 text-balance">
            Réservez votre <span className="gradient-text">diffusion</span>
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base lg:text-lg">
            Configurez votre diffusion et recevez une proposition adaptée à votre événement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          {result?.success ? (
            <div className="glass-card p-6 sm:p-10 text-center">
              <CheckCircle2 className="h-14 sm:h-16 w-14 sm:w-16 text-turquoise mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Demande envoyée avec succès !</h3>
              <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8 max-w-md mx-auto">
                Merci {submittedName}. Notre équipe SIGCOM analysera votre demande et vous
                contactera rapidement. Vous pouvez aussi confirmer sur WhatsApp.
              </p>
              {result.whatsappUrl && (
                <a
                  href={result.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex min-h-12 w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  Confirmer sur WhatsApp
                </a>
              )}
              <button
                onClick={() => setResult(null)}
                className="block mx-auto mt-4 text-sm text-white/50 hover:text-turquoise transition-colors min-h-12"
              >
                Faire une nouvelle réservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 lg:p-10 w-full">
              {result && !result.success && (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 text-sm">
                  {result.message}
                </div>
              )}

              {/* Coordonnées */}
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-turquoise/20 text-turquoise text-xs flex items-center justify-center">1</span>
                Vos coordonnées
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="label-field" htmlFor="name">Nom complet *</label>
                  <input id="name" type="text" required className="input-field min-h-12" placeholder="Votre nom" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
                </div>
                <div>
                  <label className="label-field" htmlFor="phone">Téléphone *</label>
                  <input id="phone" type="tel" required className="input-field min-h-12" placeholder="+243 861 420 70" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="label-field" htmlFor="email">Email *</label>
                  <input id="email" type="email" required className="input-field min-h-12" placeholder="votre@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                </div>
              </div>

              <hr className="my-6 sm:my-8 border-white/10" />

              {/* Événement */}
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-turquoise/20 text-turquoise text-xs flex items-center justify-center">2</span>
                Votre événement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="label-field" htmlFor="eventType">Type d&apos;événement *</label>
                  <select id="eventType" required className="input-field min-h-12" value={form.eventType} onChange={(e) => updateField("eventType", e.target.value)}>
                    <option value="">Sélectionner...</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="participants">Nombre estimé de participants</label>
                  <select id="participants" className="input-field min-h-12" value={form.participants} onChange={(e) => updateField("participants", e.target.value)}>
                    <option value="">Sélectionner...</option>
                    {PARTICIPANT_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-field" htmlFor="location">Lieu de l&apos;événement *</label>
                  <input id="location" type="text" required className="input-field min-h-12" placeholder="Adresse ou nom du lieu" value={form.location} onChange={(e) => updateField("location", e.target.value)} />
                </div>
                <div>
                  <label className="label-field" htmlFor="date">Date *</label>
                  <input id="date" type="date" required className="input-field min-h-12" value={form.date} onChange={(e) => updateField("date", e.target.value)} />
                </div>
                <div>
                  <label className="label-field" htmlFor="time">Heure *</label>
                  <input id="time" type="time" required className="input-field min-h-12" value={form.time} onChange={(e) => updateField("time", e.target.value)} />
                </div>
              </div>

              <hr className="my-6 sm:my-8 border-white/10" />

              {/* Configuration */}
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-premium/30 text-premium-light text-xs flex items-center justify-center">3</span>
                Configuration de votre diffusion
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="label-field" htmlFor="duration">Durée de la diffusion (heures) *</label>
                  <input id="duration" type="number" min="2" max="24" required className="input-field min-h-12" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} />
                  <p className="mt-1 text-xs text-white/40">Heures supp. : 40 USD/h au-delà des 2h incluses</p>
                </div>
                <div>
                  <label className="label-field" htmlFor="camerasRequested">Nombre de caméras souhaité *</label>
                  <select id="camerasRequested" required className="input-field min-h-12" value={form.camerasRequested} onChange={(e) => updateField("camerasRequested", e.target.value)}>
                    <option value="">Sélectionner...</option>
                    {CAMERA_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c} caméra{c !== "1" ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-field" htmlFor="budget">Budget estimatif *</label>
                  <select id="budget" required className="input-field min-h-12" value={form.budget} onChange={(e) => updateField("budget", e.target.value)}>
                    <option value="">Sélectionner votre budget...</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-field" htmlFor="pack">Formule *</label>
                  <select id="pack" required className="input-field min-h-12" value={form.pack} onChange={(e) => updateField("pack", e.target.value)}>
                    <option value="">Choisir une formule...</option>
                    {ALL_PACKS.map((pack) => (
                      <option key={pack.id} value={pack.id}>
                        {pack.name}
                        {"price" in pack && pack.price > 0 ? ` — ${pack.price} USD` : " — Sur devis"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recommandation intelligente */}
              {recommendation && (
                <div className="mt-6 rounded-xl border border-turquoise/30 bg-turquoise/5 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-turquoise shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base text-turquoise mb-1">
                        Recommandation : {recommendation.packName}
                      </p>
                      {recommendation.budgetMessage && (
                        <p className="text-xs sm:text-sm text-white/60 mb-3">{recommendation.budgetMessage}</p>
                      )}
                      {form.pack !== recommendation.packId && (
                        <button type="button" onClick={applyRecommendation} className="text-xs sm:text-sm text-gold hover:underline">
                          Appliquer cette recommandation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {form.budget && !recommendation && (
                <p className="mt-4 text-sm text-white/50">{getBudgetMessage(form.budget)}</p>
              )}

              {/* Plateformes & besoins */}
              <div className="mt-6">
                <label className="label-field">Plateformes de diffusion</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: "streamFacebook" as const, label: "Facebook" },
                    { key: "streamYouTube" as const, label: "YouTube" },
                    { key: "streamTikTok" as const, label: "TikTok" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 cursor-pointer min-h-12 has-[:checked]:border-turquoise/50 has-[:checked]:bg-turquoise/5">
                      <input type="checkbox" checked={form[key]} onChange={(e) => updateField(key, e.target.checked)} className="h-4 w-4 rounded text-turquoise" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="label-field">Besoins techniques</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "giantScreen" as const, label: "Projection écran géant" },
                    { key: "needRecording" as const, label: "Enregistrement vidéo" },
                    { key: "needEditing" as const, label: "Montage après événement" },
                    { key: "needBackupInternet" as const, label: "Internet de secours" },
                    { key: "needExtraTechnicians" as const, label: "Techniciens supplémentaires" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 cursor-pointer min-h-12 has-[:checked]:border-turquoise/50 has-[:checked]:bg-turquoise/5">
                      <input type="checkbox" checked={form[key]} onChange={(e) => updateField(key, e.target.checked)} className="h-4 w-4 rounded text-turquoise" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="label-field">Autres services</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRA_SERVICES.filter((s) => !["extra-hour", "recording", "editing", "backup-internet"].includes(s.id)).map((service) => (
                    <label key={service.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 cursor-pointer min-h-12 has-[:checked]:border-turquoise/50 has-[:checked]:bg-turquoise/5">
                      <input type="checkbox" checked={form.extraServices.includes(service.id)} onChange={() => toggleExtra(service.id)} className="h-4 w-4 rounded text-turquoise" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium">{service.name}</span>
                        <span className="block text-xs text-gold">
                          {service.price > 0 ? `+${service.price} USD` : service.unit}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="label-field" htmlFor="message">Message ou besoin particulier</label>
                <textarea id="message" rows={4} className="input-field resize-none w-full" placeholder="Décrivez votre événement, contraintes techniques, attentes..." value={form.message} onChange={(e) => updateField("message", e.target.value)} />
              </div>

              {/* Résumé automatique */}
              {(form.pack || form.camerasRequested) && (
                <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="h-5 w-5 text-gold" />
                    <span className="font-semibold text-sm sm:text-base">Résumé de votre demande</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-white/70">
                    {form.eventType && <li>Événement : {form.eventType}</li>}
                    {form.date && form.time && <li>Date : {form.date} à {form.time}</li>}
                    {form.location && <li>Lieu : {form.location}</li>}
                    {form.camerasRequested && <li>Caméras : {form.camerasRequested}</li>}
                    {form.pack && <li>Formule : {getPackLabel(form.pack)}</li>}
                    {form.budget && <li>Budget : {BUDGET_OPTIONS.find((b) => b.id === form.budget)?.label}</li>}
                    {(form.streamFacebook || form.streamYouTube || form.streamTikTok) && (
                      <li>
                        Diffusion : {[form.streamFacebook && "Facebook", form.streamYouTube && "YouTube", form.streamTikTok && "TikTok"].filter(Boolean).join(", ")}
                      </li>
                    )}
                    {recommendation?.budgetMessage && <li className="text-gold/80">{recommendation.budgetMessage}</li>}
                  </ul>
                  {form.pack && form.pack !== CUSTOM_PACK.id && estimate > 0 && (
                    <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gold/20">
                      <Calculator className="h-4 w-4 text-gold" />
                      <span className="text-sm text-white/60">Estimation indicative :</span>
                      <span className="font-bold text-gold">~{estimate} USD</span>
                      <span className="text-xs text-white/40">(hors déplacement)</span>
                    </div>
                  )}
                  {form.pack === CUSTOM_PACK.id && (
                    <p className="mt-3 text-sm text-gold">Tarif sur devis après analyse technique</p>
                  )}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full mt-6 sm:mt-8 min-h-14 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Envoi en cours...</>
                ) : (
                  <><Send className="h-5 w-5" /> Envoyer ma demande de réservation</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function ReservationForm() {
  return (
    <Suspense fallback={
      <section className="section-padding bg-night-900/30">
        <div className="container-custom max-w-4xl mx-auto h-96 animate-pulse rounded-2xl bg-white/5" />
      </section>
    }>
      <ReservationFormInner />
    </Suspense>
  );
}
