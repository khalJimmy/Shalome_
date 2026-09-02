import React from 'react';
import { Printer, Save, Check } from 'lucide-react';
import { QuoteCalculation } from '../types';

interface StickyFooterProps {
  calculation: QuoteCalculation;
  discountPercent: number;
  savedToast: boolean;
  onSaveQuote: () => void;
  onPrint: () => void;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({
  calculation,
  discountPercent,
  savedToast,
  onSaveQuote,
  onPrint,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-900/95 dark:bg-[#11100F]/95 backdrop-blur-md text-stone-100 py-3 px-4 sm:px-8 border-t border-stone-800/90 z-40 flex items-center justify-between gap-4 sticky-footer-bar">
      <div className="flex items-center gap-4 sm:gap-6">
        <div>
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">
            Contract Total
          </div>
          <div className="text-lg sm:text-xl font-serif font-medium leading-tight mt-0.5 text-stone-100">
            ₹{calculation.finalTotal.toLocaleString('en-IN')}
          </div>
        </div>

        {discountPercent > 0 && (
          <div className="hidden sm:block text-xs border-l border-stone-800 pl-4 text-stone-400">
            <div>Gross: ₹{calculation.subtotal.toLocaleString('en-IN')}</div>
            <div className="text-amber-400 font-light">
              Bundle ({discountPercent}%): -₹{calculation.discountAmount.toLocaleString('en-IN')}
            </div>
          </div>
        )}

        {calculation.advancePaid > 0 && (
          <div className="hidden md:block text-xs border-l border-stone-800 pl-4 text-stone-400">
            <div>Advance: ₹{calculation.advancePaid.toLocaleString('en-IN')}</div>
            <div className="text-emerald-400 font-light">
              Balance: ₹{calculation.balanceDue.toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onSaveQuote}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors border border-stone-700/80"
          title="Save to local storage"
        >
          {savedToast ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Saved</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden xs:inline">Save Draft</span>
              <span className="xs:hidden">Save</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg bg-white hover:bg-stone-100 dark:bg-stone-100 dark:hover:bg-white text-stone-900 text-xs font-medium tracking-wide transition-colors shadow-2xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Export Contract</span>
        </button>
      </div>
    </div>
  );
};
