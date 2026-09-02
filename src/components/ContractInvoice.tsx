import React, { useState } from 'react';
import { FileText, Printer, Share2, Copy, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { QuoteData, QuoteCalculation, DistrictZone } from '../types';
import { UNDERTONE_OPTIONS } from '../data/constants';

interface ContractInvoiceProps {
  quote: QuoteData;
  calculation: QuoteCalculation;
  currentZone: DistrictZone;
}

export const ContractInvoice: React.FC<ContractInvoiceProps> = ({
  quote,
  calculation,
  currentZone,
}) => {
  const [copied, setCopied] = useState(false);

  const undertoneInfo =
    UNDERTONE_OPTIONS.find((u) => u.id === quote.undertoneId) || UNDERTONE_OPTIONS[0];

  const handleCopyText = () => {
    const formatted = `
ASHIKHA BRIDAL ARTISTRY - CLIENT CONTRACT ESTIMATE
--------------------------------------------------
Invoice Reference: ${quote.invoiceNumber}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
Client Name: ${quote.clientName || 'Valued Client'}
Phone: ${quote.clientPhone || 'N/A'}
District / Logistics: ${currentZone.name}
Venue / Location: ${quote.venueLocation || 'N/A'}

COMPLEXION & STYLING SPECIFICATIONS:
- Undertone Swatch: ${undertoneInfo.name} (${undertoneInfo.hex})
- Foundation Finish: ${quote.finishPreference || 'Dewy Glass-Skin'}
- Eye Architecture: ${quote.eyeStyle || 'Royal Kohl & Gold'}

SCHEDULED CEREMONIES & SERVICES:
${calculation.lineItems.map((item) => `- ${item.description}: ₹${item.totalPrice.toLocaleString('en-IN')}`).join('\n')}

COMMERCIAL SUMMARY:
Gross Subtotal: ₹${calculation.subtotal.toLocaleString('en-IN')}
Negotiated Discount (${quote.discountPercent}%): -₹${calculation.discountAmount.toLocaleString('en-IN')}
Final Contract Total: ₹${calculation.finalTotal.toLocaleString('en-IN')}
Advance Received: -₹${calculation.advancePaid.toLocaleString('en-IN')}
Balance Due at Muhurtham: ₹${calculation.balanceDue.toLocaleString('en-IN')}

Special Notes: ${quote.notes || 'None'}
Terms: All bookings secured with advance deposit. Sanitized luxury makeup & hair gear guaranteed.
    `.trim();

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = `Hello ${quote.clientName || 'Bride'}! ✨ Here is your official bridal quotation from Ashikha Bridal Artistry (Ref: ${quote.invoiceNumber}):\n\nTotal Contract Amount: ₹${calculation.finalTotal.toLocaleString('en-IN')}\nAdvance Token: ₹${calculation.advancePaid.toLocaleString('en-IN')}\nBalance Due: ₹${calculation.balanceDue.toLocaleString('en-IN')}\n\nLooking forward to styling your auspicious wedding ceremonies in ${currentZone.name.split(':')[0]}!`;
    const cleanPhone = (quote.clientPhone || '').replace(/[^0-9]/g, '');
    const url = cleanPhone
      ? `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="contractSection"
      className="bg-white dark:bg-[#151312] rounded-2xl p-5 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/90 dark:border-stone-800/90 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-6 border-b border-stone-100 dark:border-stone-800/80 gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono font-medium">
            06
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              Official Rate Contract Invoice
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
              Verified commercial contract agreement with client, zone logistics, and itemized audit
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto no-print">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium border border-stone-200/80 dark:border-stone-700/80 transition-colors"
            title="Copy formatted contract text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium border border-stone-200/80 dark:border-stone-700/80 transition-colors"
            title="Share quote to client via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-medium tracking-wide shadow-xs transition-colors"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Contract</span>
          </button>
        </div>
      </div>

      {/* Official Invoice Sheet */}
      <div className="p-5 sm:p-7 rounded-xl bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800">
        {/* Header strip */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 mb-5 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div>
            <span className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 tracking-tight block">
              ASHIKHA BRIDAL ARTISTRY & STUDIO
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-0.5">
              Nagercoil & Kanyakumari District • Luxury Bridal Specialist
            </p>
            <div className="mt-3 text-xs space-y-0.5 text-stone-700 dark:text-stone-300">
              <p>
                <span className="text-stone-400 dark:text-stone-500">Client:</span>{' '}
                <strong className="font-medium text-stone-900 dark:text-stone-100">
                  {quote.clientName || 'Valued Bride'}
                </strong>
              </p>
              <p>
                <span className="text-stone-400 dark:text-stone-500">Phone:</span> {quote.clientPhone || 'N/A'}
              </p>
              {quote.venueLocation && (
                <p>
                  <span className="text-stone-400 dark:text-stone-500">Venue:</span> {quote.venueLocation}
                </p>
              )}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[10px] font-mono tracking-wider uppercase">
              Confirmed Estimate
            </span>
            <p className="text-xs font-mono text-stone-800 dark:text-stone-200 mt-2">
              Ref: {quote.invoiceNumber}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {currentZone.name.split(':')[0]}
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Complexion & Consultation Tag Strip */}
        <div className="mb-5 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: undertoneInfo.hex }}
            />
            <span className="text-stone-600 dark:text-stone-400">Undertone:</span>
            <span className="font-medium text-stone-900 dark:text-stone-100">{undertoneInfo.name}</span>
          </div>
          <div className="text-stone-600 dark:text-stone-400">
            Finish: <span className="font-medium text-stone-900 dark:text-stone-100">{quote.finishPreference || 'Dewy Glass-Skin'}</span>
          </div>
          <div className="text-stone-600 dark:text-stone-400">
            Eye Look: <span className="font-medium text-stone-900 dark:text-stone-100">{quote.eyeStyle || 'Royal Kohl'}</span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px]">
                  Service Description
                </th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px] text-center w-16">
                  Qty
                </th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px] text-right w-28">
                  Amount (₹)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {calculation.lineItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/30">
                  <td className="py-2.5 px-3 text-stone-800 dark:text-stone-200">
                    {item.description}
                  </td>
                  <td className="py-2.5 px-3 text-center text-stone-500 dark:text-stone-400 font-mono">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-stone-900 dark:text-stone-100 font-mono">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* Gross Subtotal */}
              <tr className="border-t border-stone-200 dark:border-stone-800 text-xs sm:text-sm">
                <td colSpan={2} className="py-2.5 px-3 text-right text-stone-500 dark:text-stone-400">
                  Gross Subtotal:
                </td>
                <td className="py-2.5 px-3 text-right text-stone-900 dark:text-stone-100 font-mono">
                  ₹{calculation.subtotal.toLocaleString('en-IN')}
                </td>
              </tr>

              {/* Negotiated Discount */}
              {calculation.discountAmount > 0 && (
                <tr className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-mono">
                  <td colSpan={2} className="py-2 px-3 text-right">
                    Bundle Discount ({quote.discountPercent}%):
                  </td>
                  <td className="py-2 px-3 text-right">
                    -₹{calculation.discountAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              )}

              {/* Final Negotiated Contract Total */}
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 font-medium text-sm sm:text-base">
                <td colSpan={2} className="py-3 px-3 text-right font-serif">
                  Final Negotiated Contract Total:
                </td>
                <td className="py-3 px-3 text-right font-serif font-semibold text-base sm:text-lg">
                  ₹{calculation.finalTotal.toLocaleString('en-IN')}
                </td>
              </tr>

              {/* Advance Paid */}
              {calculation.advancePaid > 0 && (
                <tr className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-mono">
                  <td colSpan={2} className="py-2 px-3 text-right">
                    Advance Token Received:
                  </td>
                  <td className="py-2 px-3 text-right">
                    -₹{calculation.advancePaid.toLocaleString('en-IN')}
                  </td>
                </tr>
              )}

              {/* Balance Due */}
              <tr className="border-t border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100">
                <td colSpan={2} className="py-2.5 px-3 text-right uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400">
                  Balance Due at Muhurtham Completion:
                </td>
                <td className="py-2.5 px-3 text-right font-serif text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100">
                  ₹{calculation.balanceDue.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
          <div className="flex items-center gap-1.5 uppercase tracking-wider text-stone-700 dark:text-stone-300 font-medium mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
            <span>Studio Protocol & Bridal Guarantees</span>
          </div>
          <ul className="list-disc pl-4 space-y-0.5 font-light">
            <li>Advance token of ₹{calculation.advancePaid || 5000} reserves artist date & muhurtham slot exclusively.</li>
            <li>Early morning muhurtham calls before 5:00 AM require dedicated dressing room electrical ports.</li>
            <li>All formulations used are non-comedogenic, cruelty-free, HD bridal certified.</li>
            <li>Kanchipuram silk saree box pleating, pinning, and temple jewelry installation included for the bride.</li>
          </ul>
        </div>

        {/* Signature lines */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-8 text-center text-xs text-stone-500 dark:text-stone-400">
          <div>
            <div className="h-9 border-b border-stone-300 dark:border-stone-700 mb-1.5" />
            <p className="font-medium text-stone-800 dark:text-stone-200">Authorized Client Signature</p>
            <p className="text-[10px] font-light">({quote.clientName || 'Bride / Family Representative'})</p>
          </div>
          <div>
            <div className="h-9 border-b border-stone-300 dark:border-stone-700 mb-1.5 flex items-end justify-center pb-1">
              <span className="font-serif italic text-xs tracking-wide text-stone-900 dark:text-stone-100">Ashikha MUA</span>
            </div>
            <p className="font-medium text-stone-800 dark:text-stone-200">Lead Bridal Artist & Founder</p>
            <p className="text-[10px] font-light">(Ashikha Bridal Artistry, Nagercoil)</p>
          </div>
        </div>
      </div>
    </section>
  );
};
