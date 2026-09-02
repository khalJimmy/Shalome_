import React from 'react';
import { TrendingUp, RefreshCw, Check, Zap, Info } from 'lucide-react';
import { COMPETITOR_DATA } from '../data/constants';

interface CompetitorSyncSectionProps {
  syncedRate: { competitor: string; tier: string; rate: number } | null;
  onSyncRate: (competitor: string, tier: string, rate: number) => void;
  onResetRate: () => void;
}

export const CompetitorSyncSection: React.FC<CompetitorSyncSectionProps> = ({
  syncedRate,
  onSyncRate,
  onResetRate,
}) => {
  return (
    <section className="bg-white dark:bg-[#151312] rounded-2xl p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/90 dark:border-stone-800/90 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-5 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono font-medium">
            05
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              Market Benchmarking & Competitor Sync
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
              Live competitor pricing in Nagercoil & Kanyakumari. Tap any rate to sync baseline directly.
            </p>
          </div>
        </div>

        {syncedRate && (
          <button
            type="button"
            onClick={onResetRate}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium border border-stone-200/80 dark:border-stone-700/80 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline (₹8,000)</span>
          </button>
        )}
      </div>

      {syncedRate && (
        <div className="mb-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
            <Zap className="w-4 h-4 text-[#B46B55]" />
            <span>
              Currently synced with <strong>{syncedRate.competitor}</strong> for <strong>{syncedRate.tier}</strong> at{' '}
              <strong className="font-mono">₹{syncedRate.rate.toLocaleString('en-IN')}</strong> base.
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 bg-stone-200/70 dark:bg-stone-800 px-2 py-0.5 rounded">
            Active Baseline
          </span>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-stone-200/80 dark:border-stone-800">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 text-stone-600 dark:text-stone-400">
              <th className="py-2.5 px-3.5 font-medium uppercase tracking-wider text-[10px]">Package Tier</th>
              <th className="py-2.5 px-3.5 font-medium uppercase tracking-wider text-[10px]">Ashikha Std</th>
              <th className="py-2.5 px-3.5 font-medium uppercase tracking-wider text-[10px]">Anusha (NGL)</th>
              <th className="py-2.5 px-3.5 font-medium uppercase tracking-wider text-[10px]">Prabha (KK)</th>
              <th className="py-2.5 px-3.5 font-medium uppercase tracking-wider text-[10px]">Shruti (TKLY)</th>
              <th className="py-2.5 px-3.5 font-medium uppercase tracking-wider text-[10px]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 bg-white dark:bg-[#151312]">
            {COMPETITOR_DATA.map((tier) => {
              const isTierSynced = syncedRate?.tier === tier.tierName;

              return (
                <tr
                  key={tier.id}
                  className="hover:bg-stone-50/50 dark:hover:bg-stone-900/30 transition-colors"
                >
                  <td className="py-2.5 px-3.5 font-medium text-stone-900 dark:text-stone-100">
                    {tier.tierName}
                  </td>
                  <td className="py-2.5 px-3.5 font-serif font-medium text-stone-900 dark:text-stone-100">
                    ₹{tier.ourStandard.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-700 dark:text-stone-300 font-mono text-xs">
                        ₹{tier.anushaRate.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSyncRate('Anusha', tier.tierName, tier.anushaRate)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                          isTierSynced && syncedRate.competitor === 'Anusha'
                            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                            : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                        title={`Sync Anusha's ${tier.tierName} rate`}
                      >
                        {isTierSynced && syncedRate.competitor === 'Anusha' ? 'Synced' : 'Sync'}
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-700 dark:text-stone-300 font-mono text-xs">
                        ₹{tier.prabhaRate.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSyncRate('Prabha', tier.tierName, tier.prabhaRate)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                          isTierSynced && syncedRate.competitor === 'Prabha'
                            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                            : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                        title={`Sync Prabha's ${tier.tierName} rate`}
                      >
                        {isTierSynced && syncedRate.competitor === 'Prabha' ? 'Synced' : 'Sync'}
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-700 dark:text-stone-300 font-mono text-xs">
                        ₹{tier.shrutiRate.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSyncRate('Shruti', tier.tierName, tier.shrutiRate)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                          isTierSynced && syncedRate.competitor === 'Shruti'
                            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                            : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                        title={`Sync Shruti's ${tier.tierName} rate`}
                      >
                        {isTierSynced && syncedRate.competitor === 'Shruti' ? 'Synced' : 'Sync'}
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Live Matchable
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span>
          Syncing updates the baseline rate for the Wedding Day ceremony before applying the selected district multiplier factor.
        </span>
      </div>
    </section>
  );
};
