"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const DEFAULT_MESSAGE =
  "Bonjour SIGCOM, je souhaite obtenir des informations sur vos services de diffusion en direct.";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 touch-manipulation"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Contacter SIGCOM sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]" />
      </span>
    </a>
  );
}
