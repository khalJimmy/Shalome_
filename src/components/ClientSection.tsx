import React from 'react';
import { User, Phone, Calendar, MapPin, Compass, FileText, Check } from 'lucide-react';
import { DISTRICT_ZONES } from '../data/constants';

interface ClientSectionProps {
  clientName: string;
  clientPhone: string;
  weddingDate: string;
  venueLocation: string;
  notes: string;
  zoneId: string;
  onChangeClientName: (val: string) => void;
  onChangeClientPhone: (val: string) => void;
  onChangeWeddingDate: (val: string) => void;
  onChangeVenueLocation: (val: string) => void;
  onChangeNotes: (val: string) => void;
  onChangeZoneId: (val: string) => void;
}

export const ClientSection: React.FC<ClientSectionProps> = ({
  clientName,
  clientPhone,
  weddingDate,
  venueLocation,
  notes,
  zoneId,
  onChangeClientName,
  onChangeClientPhone,
  onChangeWeddingDate,
  onChangeVenueLocation,
  onChangeNotes,
  onChangeZoneId,
}) => {
  const currentZone = DISTRICT_ZONES.find((z) => z.id === zoneId) || DISTRICT_ZONES[0];

  return (
    <section className="bg-white dark:bg-[#151312] rounded-2xl p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/90 dark:border-stone-800/90 transition-colors">
      <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-stone-100 dark:border-stone-800/80">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono font-medium">
            01
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              Client & District Travel Radius
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
              Bride identity, primary muhurtham date, and district logistics factor
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4">
        <div>
          <label htmlFor="clientName" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              Bride / Client Name
            </span>
          </label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => onChangeClientName(e.target.value)}
            placeholder="e.g. Priya Suresh"
            className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 focus:bg-white dark:focus:bg-stone-900 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="clientPhone" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              Contact Phone (WhatsApp)
            </span>
          </label>
          <input
            id="clientPhone"
            type="text"
            value={clientPhone}
            onChange={(e) => onChangeClientPhone(e.target.value)}
            placeholder="e.g. +91 94431 12345"
            className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 focus:bg-white dark:focus:bg-stone-900 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5">
        <div>
          <label htmlFor="eventDate" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              Primary Wedding Date
            </span>
          </label>
          <input
            id="eventDate"
            type="date"
            value={weddingDate}
            onChange={(e) => onChangeWeddingDate(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 focus:bg-white dark:focus:bg-stone-900 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="venueLocation" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              Mandapam / Venue Location
            </span>
          </label>
          <input
            id="venueLocation"
            type="text"
            value={venueLocation}
            onChange={(e) => onChangeVenueLocation(e.target.value)}
            placeholder="e.g. Shri Ram Mahal, Nagercoil"
            className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 focus:bg-white dark:focus:bg-stone-900 transition-colors"
          />
        </div>
      </div>

      {/* Tactile District Radius Selector */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-stone-400" />
              District Logistics & Travel Zone
            </span>
          </label>
          <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
            {currentZone.multiplier}x Multiplier applied
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {DISTRICT_ZONES.map((zone) => {
            const isSelected = zone.id === zoneId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => onChangeZoneId(zone.id)}
                className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between min-h-[82px] ${
                  isSelected
                    ? 'border-stone-900 dark:border-stone-300 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-medium leading-snug">
                    {zone.name.split(':')[0]}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-current/10">
                  <span className="text-[10px] font-mono tracking-tight opacity-80">
                    {zone.multiplier}x Multiplier
                  </span>
                  <span className="text-[10px] font-medium opacity-90">
                    {zone.travelFee === 0 ? 'Free Base' : `+₹${zone.travelFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Style Notes */}
      <div>
        <label htmlFor="clientNotes" className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            Bridal Consultation Notes & Special Instructions
          </span>
        </label>
        <input
          id="clientNotes"
          type="text"
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder="e.g. Temple jewelry setting, delicate glass skin, waterproof veil fixation"
          className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 focus:bg-white dark:focus:bg-stone-900 transition-colors"
        />
      </div>
    </section>
  );
};
