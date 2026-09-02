import React, { useState } from 'react';
import { CalendarDays, Plus, Trash2, Clock, Sparkles, X } from 'lucide-react';
import { CeremonyEvent, DistrictZone } from '../types';

interface EventsSectionProps {
  events: CeremonyEvent[];
  districtZone: DistrictZone;
  syncedRate: { competitor: string; tier: string; rate: number } | null;
  onToggleEvent: (eventId: string, enabled: boolean) => void;
  onChangeEventDate: (eventId: string, date: string) => void;
  onChangeEventTime: (eventId: string, time: string) => void;
  onAddCustomEvent: (name: string, date: string, price: number) => void;
  onRemoveCustomEvent: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  districtZone,
  syncedRate,
  onToggleEvent,
  onChangeEventDate,
  onChangeEventTime,
  onAddCustomEvent,
  onRemoveCustomEvent,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDate, setCustomDate] = useState('2026-11-26');
  const [customPrice, setCustomPrice] = useState(5000);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onAddCustomEvent(customName.trim(), customDate, Number(customPrice) || 0);
    setCustomName('');
    setShowAddModal(false);
  };

  const activeCount = events.filter((e) => e.enabled).length;

  return (
    <section className="bg-white dark:bg-[#151312] rounded-2xl p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/90 dark:border-stone-800/90 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-5 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono font-medium">
            03
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              Ceremony Schedule & Call Times
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
              Select ceremonies, configure dates, ready-by times, and zone logistics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            {activeCount} of {events.length} Selected
          </span>
          <button
            type="button"
            onClick={() => setShowAddModal(!showAddModal)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium border border-stone-200/80 dark:border-stone-700/80 transition-colors"
          >
            {showAddModal ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{showAddModal ? 'Close' : 'Add Custom Event'}</span>
          </button>
        </div>
      </div>

      {showAddModal && (
        <form
          onSubmit={handleAddSubmit}
          className="mb-5 p-4 rounded-xl bg-stone-50/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 flex flex-wrap items-end gap-3"
        >
          <div className="flex-1 min-w-[180px]">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Ceremony Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Haldi / Poolside Mehendi"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="w-36">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Event Date
            </label>
            <input
              type="date"
              required
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="w-28">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Base Fee (₹)
            </label>
            <input
              type="number"
              min={0}
              step={500}
              required
              value={customPrice}
              onChange={(e) => setCustomPrice(Number(e.target.value))}
              className="w-full px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-medium text-xs transition-colors"
            >
              Add Event
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Ceremonies List */}
      <div className="flex flex-col gap-2.5">
        {events.map((ev) => {
          const isWedding = ev.id === 'evWedding';
          const weddingBase = syncedRate ? syncedRate.rate : ev.basePrice;
          const calculatedRate = isWedding
            ? Math.round(weddingBase * districtZone.multiplier)
            : ev.basePrice;

          return (
            <div
              key={ev.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                ev.enabled
                  ? 'bg-stone-50/60 dark:bg-stone-900/40 border-stone-300/80 dark:border-stone-700/80 shadow-2xs'
                  : 'bg-white dark:bg-stone-900/20 border-stone-200/60 dark:border-stone-800/60 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={ev.id}
                  checked={ev.enabled}
                  onChange={(e) => onToggleEvent(ev.id, e.target.checked)}
                  className="w-4 h-4 rounded accent-stone-900 dark:accent-stone-200 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label
                      htmlFor={ev.id}
                      className="font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100 cursor-pointer"
                    >
                      {ev.name}
                    </label>

                    {isWedding && syncedRate && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[10px] font-mono border border-stone-300/60 dark:border-stone-700/60">
                        <Sparkles className="w-2.5 h-2.5 text-[#B46B55]" />
                        {syncedRate.competitor} Synced (₹{syncedRate.rate.toLocaleString('en-IN')})
                      </span>
                    )}

                    {isWedding && districtZone.multiplier !== 1 && (
                      <span className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-mono">
                        {districtZone.multiplier}x Zone Factor
                      </span>
                    )}
                  </div>

                  {ev.isCustom && (
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">
                      Custom Requested Event
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center flex-wrap">
                <div className="flex items-center gap-1 bg-white dark:bg-stone-900 px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-800">
                  <input
                    type="date"
                    value={ev.date}
                    disabled={!ev.enabled}
                    onChange={(e) => onChangeEventDate(ev.id, e.target.value)}
                    className="text-xs bg-transparent text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-white dark:bg-stone-900 px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-800">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <input
                    type="time"
                    value={ev.time || '06:00'}
                    disabled={!ev.enabled}
                    onChange={(e) => onChangeEventTime(ev.id, e.target.value)}
                    className="text-xs bg-transparent text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div className="text-right min-w-[85px]">
                  <span className="font-serif font-medium text-sm sm:text-base text-stone-900 dark:text-stone-100">
                    ₹{calculatedRate.toLocaleString('en-IN')}
                  </span>
                </div>

                {ev.isCustom && (
                  <button
                    type="button"
                    onClick={() => onRemoveCustomEvent(ev.id)}
                    className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                    title="Remove custom event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
