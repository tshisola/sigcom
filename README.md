# SIGCOM — Site Web de Diffusion en Direct

Site web professionnel pour **SIGCOM**, service de diffusion en direct et production vidéo événementielle en République Démocratique du Congo.

**URL de production :** [https://proxmox-ha-verdick.xyz](https://proxmox-ha-verdick.xyz)

## Stack technique

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Resend** (envoi d'emails)
- **Lucide React** (icônes)
- Déploiement **Vercel**

## Fonctionnalités

- Design premium responsive (bleu nuit, turquoise, violet, doré)
- Section Services, Tarifs, Galerie, FAQ, Contact
- Formulaire de réservation complet avec estimation automatique
- Envoi d'email structuré via API Resend
- Bouton WhatsApp flottant avec message prérempli
- Lien WhatsApp généré après soumission du formulaire
- SEO optimisé (metadata, Open Graph, Twitter Cards)

## Démarrage rapide

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### En cas d'erreur ChunkLoadError

```powershell
# PowerShell (Windows)
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
npm install
npm run dev
```

Ou utilisez le script intégré :

```bash
npm run clean
npm run dev
```

Alternative avec Turbopack (plus rapide en dev) :

```bash
npm run dev:turbo
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Clé API Resend ([resend.com](https://resend.com)) |
| `RESEND_FROM` | Email expéditeur (domaine vérifié chez Resend) |
| `RESERVATION_EMAIL` | Email de réception des réservations |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp (format international sans +) |

Exemple :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=SIGCOM <contact@proxmox-ha-verdick.xyz>
RESERVATION_EMAIL=verdickkaj274@gmail.com
NEXT_PUBLIC_SITE_URL=https://proxmox-ha-verdick.xyz
NEXT_PUBLIC_WHATSAPP_NUMBER=243861432070
```

## Configuration Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier votre domaine (`proxmox-ha-verdick.xyz`)
3. Générer une clé API
4. Configurer `RESEND_FROM` avec un email du domaine vérifié

> En développement sans clé API, le formulaire fonctionne mais l'email n'est pas envoyé (un avertissement est loggé côté serveur).

## Tarifs intégrés

| Pack | Caméras | Durée | Prix |
|---|---|---|---|
| Essentiel | 1 | 2h | 100 USD |
| Standard | 2 | 2h | 200 USD |
| Premium | 3 | 2h | 270 USD |

**Options :** heure supplémentaire (40 USD), enregistrement Full HD (30 USD), montage résumé (50 USD), multidiffusion (30 USD), affiche événementielle (25 USD), internet de secours (35 USD), déplacement hors zone (sur devis).

## Déploiement Vercel

1. Pousser le code sur GitHub
2. Importer le projet sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement dans les paramètres du projet
4. Configurer le domaine personnalisé `proxmox-ha-verdick.xyz`
5. Déployer

```bash
npm run build   # Vérifier le build localement
```

## Structure du projet

```
src/
├── app/
│   ├── api/reservation/route.ts   # API envoi email
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Contact.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Pricing.tsx
│   ├── ReservationForm.tsx
│   ├── Services.tsx
│   ├── Stats.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── constants.ts
│   └── utils.ts
└── types/
    └── reservation.ts
public/
└── photos/                        # Galerie d'images
```

## Contact SIGCOM

- **Email :** verdickkaj274@gmail.com
- **WhatsApp :** +243 861 432 070
- **Site :** https://proxmox-ha-verdick.xyz
