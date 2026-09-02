import React from 'react';
import { Eye, Users, Percent, IndianRupee, Sparkles } from 'lucide-react';
import { AddOnItem } from '../types';
import { DISCOUNT_PRESETS } from '../data/constants';

interface AddonsSectionProps {
  addOns: AddOnItem[];
  guestCount: number;
  discountPercent: number;
  advancePaid: number;
  onToggleAddon: (id: string, enabled: boolean) => void;
  onChangeGuestCount: (count: number) => void;
  onChangeDiscountPercent: (percent: number) => void;
  onChangeAdvancePaid: (amount: number) => void;
}

export const AddonsSection: React.FC<AddonsSectionProps> = ({
  addOns,
  guestCount,
  discountPercent,
  advancePaid,
  onToggleAddon,
  onChangeGuestCount,
  onChangeDiscountPercent,
  onChangeAdvancePaid,
}) => {
  return (
    <section className="bg-white dark:bg-[#151312] rounded-2xl p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/90 dark:border-stone-800/90 transition-colors">
      <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-stone-100 dark:border-stone-800/80">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono font-medium">
            04
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              Bridal Artistry Enhancements & Negotiation
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
              Contact lenses, fresh jasmine jada, bridal drape assist, family makeups, and bundle discounts
            </p>
          </div>
        </div>
      </div>

      {/* Add-ons list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-6">
        {addOns.map((addon) => (
          <label
            key={addon.id}
            htmlFor={`addon-${addon.id}`}
            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              addon.enabled
                ? 'bg-stone-50/70 dark:bg-stone-900/50 border-stone-300 dark:border-stone-700 shadow-2xs'
                : 'bg-white dark:bg-stone-900/20 border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`addon-${addon.id}`}
                checked={addon.enabled}
                onChange={(e) => onToggleAddon(addon.id, e.target.checked)}
                className="w-4 h-4 rounded accent-stone-900 dark:accent-stone-200 cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-normal text-stone-800 dark:text-stone-200">
                {addon.name}
              </span>
            </div>
            <span className="font-serif font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100 whitespace-nowrap ml-2">
              +₹{addon.price.toLocaleString('en-IN')}
            </span>
          </label>
        ))}
      </div>

      {/* Family members & Negotiation parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-stone-100 dark:border-stone-800/80">
        {/* Guest Count */}
        <div>
          <label htmlFor="guestCountInput" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              Guest / Family Makeup Count
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="guestCountInput"
              type="number"
              min="0"
              max="20"
              value={guestCount}
              onChange={(e) => onChangeGuestCount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors"
            />
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 flex items-center justify-between font-mono">
            <span>₹3,500 / look (hair & drape)</span>
            {guestCount > 0 && (
              <span className="font-medium text-stone-900 dark:text-stone-100">
                = ₹{(guestCount * 3500).toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Bundle Negotiation Discount */}
        <div>
          <label htmlFor="discountSelect" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-stone-400" />
              Bundle Negotiation Discount
            </span>
          </label>
          <select
            id="discountSelect"
            value={discountPercent}
            onChange={(e) => onChangeDiscountPercent(Number(e.target.value))}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors"
          >
            {DISCOUNT_PRESETS.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1 font-light">
            Applied to the combined ceremony & diagnostics subtotal
          </p>
        </div>

        {/* Advance Token Received */}
        <div>
          <label htmlFor="advancePaidInput" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-stone-400" />
              Advance Deposit Received (₹)
            </span>
          </label>
          <input
            id="advancePaidInput"
            type="number"
            min="0"
            step="500"
            value={advancePaid}
            onChange={(e) => onChangeAdvancePaid(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="e.g. 5000"
            className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors"
          />
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1 font-light">
            Deducted from final ceremony balance
          </p>
        </div>
      </div>
    </section>
  );
};
