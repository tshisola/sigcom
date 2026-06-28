export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  pack: string;
  duration: string;
  extraServices: string[];
  message: string;
  participants: string;
  camerasRequested: string;
  budget: string;
  streamFacebook: boolean;
  streamYouTube: boolean;
  streamTikTok: boolean;
  giantScreen: boolean;
  needRecording: boolean;
  needEditing: boolean;
  needBackupInternet: boolean;
  needExtraTechnicians: boolean;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  whatsappUrl?: string;
}

export interface QuoteRecommendation {
  packId: string;
  packName: string;
  budgetMessage: string;
  summary: string[];
}
