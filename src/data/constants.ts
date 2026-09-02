import {
  DistrictZone,
  CeremonyEvent,
  DiagnosticOption,
  AddOnItem,
  CompetitorTier,
  QuoteData,
  SkinUndertoneOption,
} from '../types';

export const UNDERTONE_OPTIONS: SkinUndertoneOption[] = [
  {
    id: 'warm-gold',
    name: 'Warm Golden',
    hex: '#E4B584',
    description: 'Yellow/golden undertone with sunlit warmth; ideal for gold bridal jewellery.',
  },
  {
    id: 'cool-rose',
    name: 'Cool Rose',
    hex: '#E8B6A8',
    description: 'Soft pink/rosy undertone; pairs beautifully with diamond/platinum sets.',
  },
  {
    id: 'neutral-sand',
    name: 'Neutral Sand',
    hex: '#DFC0A4',
    description: 'Balanced peach & cream undertone; universal natural base adaptability.',
  },
  {
    id: 'olive-bronze',
    name: 'Olive Bronze',
    hex: '#B9946C',
    description: 'Subtle greenish-caramel undertone; prevents ashy or greyish oxidation.',
  },
  {
    id: 'rich-almond',
    name: 'Rich Almond',
    hex: '#8E5A3C',
    description: 'Deep warm espresso undertone with luminous high-dimension radiance.',
  },
];

export const MAKEUP_FINISH_OPTIONS = [
  { id: 'dewy-glass', name: 'Dewy Glass-Skin', badge: 'HD Glow', note: 'Hydrating micro-film with liquid pearl glow' },
  { id: 'velvet-matte', name: 'Ultra-HD Velvet Matte', badge: 'Waterproof', note: 'Transfer-resistant 18-hour sebum control' },
  { id: 'luminous-satin', name: 'Luminous Satin', badge: 'Soft Focus', note: 'Airbrushed poreless texture under 4K video' },
  { id: 'editorial-royal', name: 'Editorial Royal High-Glam', badge: 'Flash-Proof', note: 'Maximum pigment density for heavy stage lighting' },
];

export const EYE_STYLE_OPTIONS = [
  { id: 'royal-kohl', name: 'Royal Kohl & Gold Cut-Crease', note: 'Intense smoked liner with 24K gold lid accent' },
  { id: 'champagne-shimmer', name: 'Soft Champagne Shimmer', note: 'Subtle romantic shimmer with fluttery flared lashes' },
  { id: 'rose-smokey', name: 'Dusty Rose & Mauve Smokey', note: 'Soft dimensional gradient for reception glamour' },
  { id: 'clean-winged', name: 'Minimalist Clean Wing & Mink Lashes', note: 'Crisp precision flick with natural airy lash lift' },
];

export const DISTRICT_ZONES: DistrictZone[] = [
  {
    id: 'zone-a',
    name: 'Zone A: Nagercoil Town (1.0x)',
    travelFee: 0,
    multiplier: 1.0,
    description: 'Local base zone with no additional logistics surcharge',
  },
  {
    id: 'zone-b',
    name: 'Zone B: Suchindram / Kottar (+₹600 | 1.05x)',
    travelFee: 600,
    multiplier: 1.05,
    description: 'Suburban perimeter radius within 12km',
  },
  {
    id: 'zone-c',
    name: 'Zone C: Thuckalay / Marthandam (+₹1,200 | 1.12x)',
    travelFee: 1200,
    multiplier: 1.12,
    description: 'Extended district transit with morning kit mobilization',
  },
  {
    id: 'zone-d',
    name: 'Zone D: Kanyakumari / Outstation (+₹2,000 | 1.25x)',
    travelFee: 2000,
    multiplier: 1.25,
    description: 'Coastal border & outstation VIP priority travel',
  },
];

export const DEFAULT_EVENTS: CeremonyEvent[] = [
  {
    id: 'evEngagement',
    name: 'Engagement / Sangeet Ceremony',
    enabled: true,
    date: '2026-11-24',
    time: '18:00',
    basePrice: 6500,
  },
  {
    id: 'evWedding',
    name: 'Wedding Day Muhurtham (Glossy Skin)',
    enabled: true,
    date: '2026-11-25',
    time: '05:30',
    basePrice: 8000,
  },
  {
    id: 'evReception',
    name: 'Reception Evening Glam',
    enabled: true,
    date: '2026-11-25',
    time: '19:00',
    basePrice: 7500,
  },
];

export const SKIN_TYPE_OPTIONS: DiagnosticOption[] = [
  { id: 'skin-0', name: 'Normal / Balanced Skin (+₹0)', price: 0, description: 'Standard primer and barrier shield' },
  { id: 'skin-400a', name: 'Dry / Flaky (Deep Hydration Prep +₹400)', price: 400, description: 'Squalane micro-infusion & moisture lock' },
  { id: 'skin-400b', name: 'Oily / Acne-Prone (Mattifying Barrier +₹400)', price: 400, description: 'Sebum-control pore tightening film' },
  { id: 'skin-600', name: 'Sensitive / Reactive Skin (Hypoallergenic +₹600)', price: 600, description: 'Calming cica & dermatological calming serums' },
];

export const CORRECTION_OPTIONS: DiagnosticOption[] = [
  { id: 'corr-0', name: 'Standard Coverage (+₹0)', price: 0, description: 'Natural lightweight skin tone blending' },
  { id: 'corr-800', name: 'Moderate Dark Circles / Blemishes (+₹800)', price: 800, description: 'Custom color neutralization with peach/orange pigments' },
  { id: 'corr-1500', name: 'Heavy Pigmentation / Acne Scars (+₹1,500)', price: 1500, description: 'High-definition micro-camouflaging waterproof sealant' },
];

export const HAIR_PROFILE_OPTIONS: DiagnosticOption[] = [
  { id: 'hair-0', name: 'Medium Length & Volume (+₹0)', price: 0, description: 'Classic structuring and hold' },
  { id: 'hair-600', name: 'Short Hair / Bob (Padding & Pinning +₹600)', price: 600, description: 'Architectural padding insertion for bridal updo' },
  { id: 'hair-1000', name: 'Long & Thick Hair (Heavy Structuring +₹1,000)', price: 1000, description: 'Reinforced dual-anchor grid for heavy South Indian bridal sets' },
];

export const HAIR_EXTENSION_OPTIONS: DiagnosticOption[] = [
  { id: 'ext-0', name: 'Standard Hairstyle with Extension (Included)', price: 0, description: 'Basic styling extension included in package' },
  { id: 'ext-800', name: 'Extra Voluminous Clip-in Extension (+₹800)', price: 800, description: 'Full 180g density volume booster' },
  { id: 'ext-1500', name: '100% Real Human Hair Weft (+₹1,500)', price: 1500, description: 'Heat-friendly natural movement wefts' },
];

export const DEFAULT_ADDONS: AddOnItem[] = [
  {
    id: 'addonLenses',
    name: 'Colored Lenses & Press-on Gel Nails',
    price: 1000,
    enabled: true,
    category: 'enhancement',
  },
  {
    id: 'addonJada',
    name: 'Fresh Malli Poo (Jasmine) & Antique Jada Setup',
    price: 500,
    enabled: true,
    category: 'accessory',
  },
  {
    id: 'addonEarly',
    name: 'Early Morning Muhurtham Surcharge (< 5:00 AM)',
    price: 1000,
    enabled: false,
    category: 'logistics',
  },
  {
    id: 'addonEyeLip',
    name: 'Luxury Collagen Eye Patches & Lip Plumping Mask',
    price: 450,
    enabled: false,
    category: 'enhancement',
  },
  {
    id: 'addonDraping',
    name: 'Silk Kanjivaram Box Pleating & Saree Draping Assist',
    price: 700,
    enabled: false,
    category: 'accessory',
  },
];

export const COMPETITOR_DATA: CompetitorTier[] = [
  {
    id: 'basic-bridal',
    tierName: 'Basic Bridal',
    anushaRate: 6000,
    prabhaRate: 7500,
    shrutiRate: 5000,
    ourStandard: 8000,
  },
  {
    id: 'glossy-skin',
    tierName: 'Glossy / Skin Finish',
    anushaRate: 12000,
    prabhaRate: 15000,
    shrutiRate: 10000,
    ourStandard: 12000,
  },
  {
    id: 'airbrush-long',
    tierName: 'Long Lasting / Airbrush',
    anushaRate: 18000,
    prabhaRate: 22000,
    shrutiRate: 14000,
    ourStandard: 18000,
  },
];

export const DISCOUNT_PRESETS = [
  { label: '0% (Standard Rate)', value: 0 },
  { label: '5% Early Bird', value: 5 },
  { label: '10% Special Bundle Negotiation', value: 10 },
  { label: '15% Festive Offer', value: 15 },
  { label: '20% VIP Referral', value: 20 },
];

export const INITIAL_QUOTE: QuoteData = {
  id: 'quote-default-1',
  invoiceNumber: 'ASH-2026-088',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  clientName: 'Priya Suresh',
  clientPhone: '+91 94431 12345',
  weddingDate: '2026-11-25',
  venueLocation: 'Shri Ram Mahal, Nagercoil',
  notes: 'Requires gold antique temple jewelry setting & waterproof glass skin finish.',
  zoneId: 'zone-a',
  undertoneId: 'warm-gold',
  finishPreference: 'Dewy Glass-Skin',
  eyeStyle: 'Royal Kohl & Gold Cut-Crease',
  events: DEFAULT_EVENTS,
  skinTypePrice: 0,
  correctionPrice: 0,
  hairProfilePrice: 0,
  hairExtensionPrice: 0,
  addOns: DEFAULT_ADDONS,
  guestCount: 1,
  discountPercent: 10,
  advancePaid: 5000,
  syncedCompetitorRate: null,
};
