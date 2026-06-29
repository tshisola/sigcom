export const SITE = {
  name: "SIGCOM",
  tagline: "Diffusion en direct professionnelle",
  description:
    "SIGCOM accompagne les entreprises, organisations, églises, écoles, artistes et particuliers dans la diffusion en direct de leurs événements avec une solution adaptée à chaque besoin.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://proxmox-ha-verdick.xyz",
  email: "verdickkaj274@gmail.com",
  phone: "+243 861 432 070",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "243861432070",
} as const;

export const INTRO_TEXT =
  "SIGCOM accompagne les entreprises, organisations, églises, écoles, artistes et particuliers dans la diffusion en direct de leurs événements avec une solution adaptée à chaque besoin. Nos services couvrent les petites productions comme les grands événements nécessitant plusieurs caméras, une équipe technique, une régie vidéo, un habillage graphique, une multidiffusion et un accompagnement professionnel.";

export const CUSTOM_PACK = {
  id: "sur-mesure",
  name: "Production sur mesure",
  cameras: 0,
  hours: 0,
  price: 0,
  description:
    "Solution personnalisée pour grands événements, entreprises et productions professionnelles.",
  features: [
    "Nombre de caméras adapté à l'événement",
    "Équipe technique complète",
    "Régie vidéo professionnelle",
    "Habillage graphique personnalisé",
    "Multidiffusion multi-plateformes",
    "Devis après analyse technique",
  ],
  popular: false,
  custom: true as const,
};

export const PACKS = [
  {
    id: "essentiel",
    name: "Pack Essentiel",
    cameras: 1,
    hours: 2,
    price: 100,
    description: "Point de départ idéal pour petits événements et conférences intimes.",
    features: [
      "À partir de 1 caméra professionnelle",
      "2 heures de diffusion incluses",
      "Diffusion en direct HD",
      "Technicien dédié",
      "Support technique",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Pack Standard",
    cameras: 2,
    hours: 2,
    price: 200,
    description: "Formule équilibrée pour événements de taille moyenne.",
    features: [
      "À partir de 2 caméras professionnelles",
      "2 heures de diffusion incluses",
      "Angles multiples",
      "Mixage vidéo en direct",
      "Technicien senior",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Pack Premium",
    cameras: 3,
    hours: 2,
    price: 270,
    description: "Excellence pour événements exigeants et productions premium.",
    features: [
      "À partir de 3 caméras professionnelles",
      "2 heures de diffusion incluses",
      "Couverture complète",
      "Réalisateur expérimenté",
      "Graphiques personnalisés",
      "Support VIP",
    ],
    popular: false,
  },
] as const;

export const ALL_PACKS = [...PACKS, CUSTOM_PACK];

export const CUSTOM_PRODUCTION_TEXT = {
  title: "Production sur mesure",
  paragraphs: [
    "Chez SIGCOM, chaque événement est unique. Le nombre de caméras n'est pas limité à trois. Pour les entreprises, conférences, concerts, cérémonies officielles, grands événements religieux, formations ou productions professionnelles, nous pouvons déployer plusieurs caméras selon les besoins techniques, la taille de la salle, le nombre d'intervenants, les angles de prise de vue souhaités et le budget disponible.",
    "Le tarif final est établi après analyse de l'événement, du lieu, de la durée, du nombre de caméras, du personnel technique nécessaire, de la connexion internet, de l'habillage graphique, de la multidiffusion et des services supplémentaires demandés.",
  ],
};

export const BUDGET_OPTIONS = [
  {
    id: "low",
    label: "Moins de 150 USD",
    message: "Nous pouvons adapter une solution économique selon vos priorités.",
  },
  {
    id: "medium",
    label: "150 – 400 USD",
    message: "Nous pouvons proposer une production équilibrée avec bonne qualité vidéo.",
  },
  {
    id: "high",
    label: "Plus de 400 USD",
    message:
      "Nous pouvons proposer une production avancée avec plusieurs caméras, habillage graphique et multidiffusion.",
  },
] as const;

export const PARTICIPANT_RANGES = [
  "Moins de 50",
  "50 – 200",
  "200 – 500",
  "500 – 1 000",
  "Plus de 1 000",
] as const;

export const CAMERA_OPTIONS = ["1", "2", "3", "4", "5", "6+"] as const;

export const EXTRA_SERVICES = [
  { id: "extra-hour", name: "Heure supplémentaire", price: 40, unit: "USD/heure", note: "À partir de" },
  { id: "recording", name: "Enregistrement vidéo Full HD", price: 30, unit: "USD" },
  { id: "editing", name: "Montage résumé", price: 50, unit: "USD" },
  { id: "multicast", name: "Multidiffusion", price: 30, unit: "USD" },
  { id: "poster", name: "Affiche événementielle", price: 25, unit: "USD" },
  { id: "backup-internet", name: "Internet de secours", price: 35, unit: "USD" },
  { id: "travel", name: "Déplacement hors zone", price: 0, unit: "Sur devis", note: "Selon distance" },
] as const;

export const SERVICES = [
  {
    icon: "broadcast",
    title: "Diffusion en direct",
    description:
      "Streaming professionnel multi-plateformes — Facebook, YouTube, TikTok, Zoom — avec qualité broadcast.",
  },
  {
    icon: "camera",
    title: "Production multi-caméras",
    description:
      "De 1 à plusieurs caméras selon votre événement : conférences, concerts, cérémonies, formations et plus.",
  },
  {
    icon: "record",
    title: "Enregistrement Full HD",
    description:
      "Archivez chaque moment en haute définition pour un partage ultérieur et une valorisation durable.",
  },
  {
    icon: "edit",
    title: "Montage & post-production",
    description:
      "Montages résumés professionnels pour relayer votre événement sur tous vos canaux digitaux.",
  },
  {
    icon: "multicast",
    title: "Multidiffusion",
    description:
      "Diffusez simultanément sur plusieurs plateformes avec une régie adaptée à votre audience.",
  },
  {
    icon: "support",
    title: "Accompagnement technique",
    description:
      "Équipe expérimentée, internet de secours, régie vidéo et support complet sur le terrain.",
  },
] as const;

export const EVENT_TYPES = [
  "Entreprise / Corporate",
  "Conférence",
  "Séminaire",
  "Concert",
  "Mariage",
  "Église / Cérémonie religieuse",
  "Cérémonie officielle",
  "Salon professionnel",
  "Formation",
  "Événement sportif",
  "Événement public",
  "Événement privé",
  "Autre",
] as const;

export const WHY_CHOOSE = [
  {
    icon: "expertise",
    title: "Expertise terrain",
    description: "Équipe expérimentée sur conférences, concerts, mariages, églises et événements corporate.",
  },
  {
    icon: "flexible",
    title: "Solutions flexibles",
    description: "Packs de base ou production sur mesure — nous adaptons le dispositif à votre événement.",
  },
  {
    icon: "quality",
    title: "Qualité broadcast",
    description: "Matériel professionnel, régie vidéo, habillage graphique et diffusion multi-plateformes.",
  },
  {
    icon: "support",
    title: "Accompagnement complet",
    description: "De la préparation à la diffusion live, avec support technique et internet de secours.",
  },
] as const;

export const PROCESS_STEPS = [
  { step: "01", title: "Demande de devis", description: "Remplissez le formulaire ou contactez-nous sur WhatsApp." },
  { step: "02", title: "Analyse technique", description: "Nous étudions le lieu, la durée, les caméras et vos besoins." },
  { step: "03", title: "Proposition personnalisée", description: "Vous recevez une offre adaptée à votre budget et objectifs." },
  { step: "04", title: "Production & diffusion", description: "Notre équipe assure la captation et la diffusion en direct." },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Le nombre de caméras est-il limité à 3 ?",
    answer:
      "Non. Les packs Essentiel, Standard et Premium sont des points de départ (1, 2 ou 3 caméras). Pour les grands événements, nous proposons une production sur mesure avec autant de caméras que nécessaire selon la salle, les intervenants et le budget.",
  },
  {
    question: "Quelle est la zone de couverture de SIGCOM ?",
    answer:
      "SIGCOM intervient principalement à Kinshasa et ses environs. Pour les déplacements hors zone, un supplément est appliqué selon la distance.",
  },
  {
    question: "Combien de temps à l'avance dois-je réserver ?",
    answer:
      "Nous recommandons une réservation au moins 7 jours avant votre événement. Pour les demandes urgentes, contactez-nous via WhatsApp.",
  },
  {
    question: "Quelles plateformes de diffusion sont supportées ?",
    answer:
      "Facebook Live, YouTube, TikTok, LinkedIn Live, Zoom, Microsoft Teams et toute plateforme via notre service de multidiffusion.",
  },
  {
    question: "Comment est calculé le tarif final ?",
    answer:
      "Le tarif dépend du type d'événement, du lieu, de la durée, du nombre de caméras, du personnel technique, de la connexion internet, de l'habillage graphique et des options choisies. Un devis personnalisé est établi après analyse.",
  },
  {
    question: "Proposez-vous une solution pour petit budget ?",
    answer:
      "Oui. Nous adaptons la prestation selon vos priorités : nombre de caméras, durée, options. Contactez-nous pour une solution économique.",
  },
] as const;

export const GALLERY_IMAGES = [
  { src: "/photos/DSC03821.png", alt: "Vidéaste SIGCOM en action avec caméra stabilisée" },
  { src: "/photos/DSC03819.png", alt: "Équipe SIGCOM professionnelle sur le terrain" },
  { src: "/photos/DSC03823.png", alt: "Opérateur caméra SIGCOM en plein tournage" },
  { src: "/photos/live-streaming.png", alt: "Caméra broadcast en direct sur scène" },
  { src: "/photos/cameraman-sunset.png", alt: "Caméraman silhouette au coucher du soleil" },
  { src: "/photos/multi-camera.png", alt: "Setup multi-caméras événementiel" },
  { src: "/photos/DSC03783.png", alt: "Couverture événement corporate SIGCOM" },
] as const;
