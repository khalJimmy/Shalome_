import { QuoteData, QuoteCalculation, InvoiceLineItem } from '../types';
import { DISTRICT_ZONES } from '../data/constants';

export function calculateQuoteBreakdown(quote: QuoteData): QuoteCalculation {
  const selectedZone = DISTRICT_ZONES.find((z) => z.id === quote.zoneId) || DISTRICT_ZONES[0];
  const zoneMult = selectedZone.multiplier;
  const zoneFee = selectedZone.travelFee;

  const lineItems: InvoiceLineItem[] = [];
  let subtotal = 0;

  // 1. Mandatory Kit Setup & Skin Barrier Prep
  lineItems.push({
    id: 'kit-setup',
    description: 'Professional Sanitized Kit Setup & Skin Barrier Prep',
    category: 'kit',
    quantity: 1,
    unitPrice: 1000,
    totalPrice: 1000,
  });
  subtotal += 1000;

  // 2. Multi-Events
  const weddingBaseRate = quote.syncedCompetitorRate ? quote.syncedCompetitorRate.rate : 8000;

  quote.events.forEach((ev) => {
    if (!ev.enabled) return;

    if (ev.id === 'evWedding') {
      const adjustedWedding = Math.round(weddingBaseRate * zoneMult);
      lineItems.push({
        id: ev.id,
        description: `${ev.name} (${ev.date}${ev.time ? ` @ ${ev.time}` : ''} | ${zoneMult}x Zone Factor${quote.syncedCompetitorRate ? ` [${quote.syncedCompetitorRate.competitor} Synced]` : ''})`,
        category: 'event',
        quantity: 1,
        unitPrice: adjustedWedding,
        totalPrice: adjustedWedding,
      });
      subtotal += adjustedWedding;
    } else {
      lineItems.push({
        id: ev.id,
        description: `${ev.name} (${ev.date}${ev.time ? ` @ ${ev.time}` : ''})`,
        category: 'event',
        quantity: 1,
        unitPrice: ev.basePrice,
        totalPrice: ev.basePrice,
      });
      subtotal += ev.basePrice;
    }
  });

  // 3. Skin Diagnostics
  if (quote.skinTypePrice > 0) {
    lineItems.push({
      id: 'skin-prep',
      description: 'Advanced Skin Diagnostics & Hydration Barrier Treatment',
      category: 'diagnostic',
      quantity: 1,
      unitPrice: quote.skinTypePrice,
      totalPrice: quote.skinTypePrice,
    });
    subtotal += quote.skinTypePrice;
  }

  if (quote.correctionPrice > 0) {
    lineItems.push({
      id: 'pigment-correction',
      description: 'HD Blemish / Hyperpigmentation Neutralization Complexity',
      category: 'diagnostic',
      quantity: 1,
      unitPrice: quote.correctionPrice,
      totalPrice: quote.correctionPrice,
    });
    subtotal += quote.correctionPrice;
  }

  // 4. Hair Diagnostics
  if (quote.hairProfilePrice > 0) {
    lineItems.push({
      id: 'hair-profile',
      description: 'Hair Density & Structural Architectural Padding Complexity',
      category: 'diagnostic',
      quantity: 1,
      unitPrice: quote.hairProfilePrice,
      totalPrice: quote.hairProfilePrice,
    });
    subtotal += quote.hairProfilePrice;
  }

  if (quote.hairExtensionPrice > 0) {
    lineItems.push({
      id: 'hair-extension',
      description: 'Extra Voluminous Clip-in Hair Extensions & Anchoring',
      category: 'diagnostic',
      quantity: 1,
      unitPrice: quote.hairExtensionPrice,
      totalPrice: quote.hairExtensionPrice,
    });
    subtotal += quote.hairExtensionPrice;
  }

  // 5. Add-ons
  quote.addOns.forEach((addon) => {
    if (addon.enabled) {
      lineItems.push({
        id: addon.id,
        description: addon.name,
        category: 'addon',
        quantity: 1,
        unitPrice: addon.price,
        totalPrice: addon.price,
      });
      subtotal += addon.price;
    }
  });

  // 6. Family / Guest Makeup
  if (quote.guestCount > 0) {
    const guestTotal = quote.guestCount * 3500;
    lineItems.push({
      id: 'guest-makeup',
      description: `Family Member / Guest Premium Makeup & Draping (${quote.guestCount} Look${quote.guestCount > 1 ? 's' : ''})`,
      category: 'guest',
      quantity: quote.guestCount,
      unitPrice: 3500,
      totalPrice: guestTotal,
    });
    subtotal += guestTotal;
  }

  // 7. Zone Logistics Travel Fee
  if (zoneFee > 0) {
    lineItems.push({
      id: 'zone-travel',
      description: `District On-Location Home Visit Logistics (${selectedZone.name.split(':')[0]})`,
      category: 'travel',
      quantity: 1,
      unitPrice: zoneFee,
      totalPrice: zoneFee,
    });
    subtotal += zoneFee;
  }

  // Discounts
  const discountPercent = Math.max(0, Math.min(100, quote.discountPercent || 0));
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const advancePaid = Math.max(0, quote.advancePaid || 0);
  const balanceDue = Math.max(0, finalTotal - advancePaid);

  return {
    lineItems,
    subtotal,
    discountAmount,
    finalTotal,
    advancePaid,
    balanceDue,
    zoneMultiplierApplied: zoneMult,
    travelFeeApplied: zoneFee,
  };
}

export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
