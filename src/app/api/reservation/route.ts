import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EXTRA_SERVICES, SITE, BUDGET_OPTIONS, CUSTOM_PACK } from "@/lib/constants";
import {
  buildWhatsAppMessage,
  calculateEstimate,
  getWhatsAppUrl,
  getPackLabel,
  getStreamingPlatforms,
  getConfigServices,
} from "@/lib/utils";
import type { ReservationFormData } from "@/types/reservation";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding: 6px 0; color: #ffffff99; vertical-align: top;">${label}</td><td style="padding: 6px 0;"><strong>${value}</strong></td></tr>`;
}

function buildEmailHtml(data: ReservationFormData, estimate: number): string {
  const packName = getPackLabel(data.pack);
  const budget = BUDGET_OPTIONS.find((b) => b.id === data.budget);
  const platforms = getStreamingPlatforms(data);
  const services = getConfigServices(data);
  const extras = data.extraServices
    .map((id) => EXTRA_SERVICES.find((s) => s.id === id)?.name)
    .filter(Boolean);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #0a0f1e; color: #ffffff; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #1a2540; border-radius: 16px; overflow: hidden; border: 1px solid #00d4aa33;">
    <div style="background: linear-gradient(135deg, #00d4aa, #7c3aed); padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: #0a0f1e; font-size: 24px;">🎬 Nouvelle Réservation SIGCOM</h1>
    </div>
    <div style="padding: 24px;">
      <h2 style="color: #00d4aa; border-bottom: 1px solid #ffffff22; padding-bottom: 8px;">Informations client</h2>
      <table style="width: 100%; margin-bottom: 20px;">
        ${row("Nom", data.name)}
        ${row("Téléphone", data.phone)}
        ${row("Email", data.email)}
      </table>

      <h2 style="color: #00d4aa; border-bottom: 1px solid #ffffff22; padding-bottom: 8px;">Événement</h2>
      <table style="width: 100%; margin-bottom: 20px;">
        ${row("Type", data.eventType)}
        ${row("Participants", data.participants)}
        ${row("Date", data.date)}
        ${row("Heure", data.time)}
        ${row("Lieu", data.location)}
      </table>

      <h2 style="color: #00d4aa; border-bottom: 1px solid #ffffff22; padding-bottom: 8px;">Configuration diffusion</h2>
      <table style="width: 100%; margin-bottom: 20px;">
        ${row("Formule", packName)}
        ${row("Durée", `${data.duration} heure(s)`)}
        ${row("Caméras souhaitées", data.camerasRequested)}
        ${row("Budget estimé", budget?.label ?? "")}
        ${platforms.length > 0 ? row("Plateformes", platforms.join(", ")) : ""}
        ${services.length > 0 ? row("Services", services.join(", ")) : ""}
        ${extras.length > 0 ? row("Options", extras.join(", ")) : ""}
        ${row("Estimation", data.pack === CUSTOM_PACK.id ? "Sur devis" : `~${estimate} USD`)}
      </table>

      ${data.message ? `<h2 style="color: #00d4aa; border-bottom: 1px solid #ffffff22; padding-bottom: 8px;">Message</h2><p style="color: #ffffffcc; line-height: 1.6;">${data.message}</p>` : ""}
    </div>
    <div style="padding: 16px 24px; background: #0a0f1e; text-align: center; color: #ffffff66; font-size: 12px;">
      Envoyé depuis ${SITE.url} — ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Kinshasa" })}
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const data: ReservationFormData = await request.json();

    if (
      !data.name ||
      !data.phone ||
      !data.email ||
      !data.pack ||
      !data.date ||
      !data.time ||
      !data.location ||
      !data.camerasRequested ||
      !data.budget
    ) {
      return NextResponse.json(
        { success: false, message: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const estimate = calculateEstimate(data);
    const whatsappMessage = buildWhatsAppMessage(data);
    const whatsappUrl = getWhatsAppUrl(whatsappMessage);

    const reservationEmail = process.env.RESERVATION_EMAIL || SITE.email;
    const fromEmail = process.env.RESEND_FROM || "SIGCOM <onboarding@resend.dev>";

    const resend = getResend();

    if (resend) {
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: reservationEmail,
        replyTo: data.email,
        subject: `🎬 Réservation — ${data.name} — ${data.eventType} — ${data.camerasRequested} caméra(s)`,
        html: buildEmailHtml(data, estimate),
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { success: false, message: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
          { status: 500 }
        );
      }
    } else {
      console.warn("RESEND_API_KEY not configured — email skipped");
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a été transmise à notre équipe. Nous vous contacterons rapidement.",
      whatsappUrl,
    });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
