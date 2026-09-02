export interface DistrictZone {
  id: string;
  name: string;
  travelFee: number;
  multiplier: number;
  description?: string;
}

export interface CeremonyEvent {
  id: string;
  name: string;
  enabled: boolean;
  date: string;
  time?: string;
  basePrice: number;
  isCustom?: boolean;
}

export interface DiagnosticOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  enabled: boolean;
  category?: 'enhancement' | 'logistics' | 'accessory';
}

export interface SkinUndertoneOption {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export interface CompetitorTier {
  id: string;
  tierName: string;
  anushaRate: number;
  prabhaRate: number;
  shrutiRate: number;
  ourStandard: number;
}

export interface QuoteData {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
  clientPhone: string;
  weddingDate: string;
  venueLocation: string;
  notes: string;
  zoneId: string;
  undertoneId?: string;
  finishPreference?: string;
  eyeStyle?: string;
  events: CeremonyEvent[];
  skinTypePrice: number;
  correctionPrice: number;
  hairProfilePrice: number;
  hairExtensionPrice: number;
  addOns: AddOnItem[];
  guestCount: number;
  discountPercent: number;
  advancePaid: number;
  syncedCompetitorRate: {
    competitor: string;
    tier: string;
    rate: number;
  } | null;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  category: 'kit' | 'event' | 'diagnostic' | 'addon' | 'guest' | 'travel';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface QuoteCalculation {
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  advancePaid: number;
  balanceDue: number;
  zoneMultiplierApplied: number;
  travelFeeApplied: number;
}
