import React from 'react';
import { Sparkles, Scissors, Check, Palette, Eye, ShieldCheck, Heart } from 'lucide-react';
import {
  SKIN_TYPE_OPTIONS,
  CORRECTION_OPTIONS,
  HAIR_PROFILE_OPTIONS,
  HAIR_EXTENSION_OPTIONS,
  UNDERTONE_OPTIONS,
  MAKEUP_FINISH_OPTIONS,
  EYE_STYLE_OPTIONS,
} from '../data/constants';

interface DiagnosticsSectionProps {
  skinTypePrice: number;
  correctionPrice: number;
  hairProfilePrice: number;
  hairExtensionPrice: number;
  undertoneId?: string;
  finishPreference?: string;
  eyeStyle?: string;
  onChangeSkinTypePrice: (price: number) => void;
  onChangeCorrectionPrice: (price: number) => void;
  onChangeHairProfilePrice: (price: number) => void;
  onChangeHairExtensionPrice: (price: number) => void;
  onChangeUndertoneId?: (id: string) => void;
  onChangeFinishPreference?: (val: string) => void;
  onChangeEyeStyle?: (val: string) => void;
}

export const DiagnosticsSection: React.FC<DiagnosticsSectionProps> = ({
  skinTypePrice,
  correctionPrice,
  hairProfilePrice,
  hairExtensionPrice,
  undertoneId = 'warm-gold',
  finishPreference = 'Dewy Glass-Skin',
  eyeStyle = 'Royal Kohl & Gold Cut-Crease',
  onChangeSkinTypePrice,
  onChangeCorrectionPrice,
  onChangeHairProfilePrice,
  onChangeHairExtensionPrice,
  onChangeUndertoneId,
  onChangeFinishPreference,
  onChangeEyeStyle,
}) => {
  const diagnosticTotal =
    skinTypePrice + correctionPrice + hairProfilePrice + hairExtensionPrice;

  const currentUndertone =
    UNDERTONE_OPTIONS.find((u) => u.id === undertoneId) || UNDERTONE_OPTIONS[0];

  return (
    <section className="bg-white dark:bg-[#151312] rounded-2xl p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/90 dark:border-stone-800/90 transition-colors">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-6 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono font-medium">
            02
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              Complexion Studio & Diagnostics
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
              Undertone swatch analysis, dermatological base prep, and bridal hair architecture
            </p>
          </div>
        </div>

        {diagnosticTotal > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono self-start sm:self-auto border border-stone-200/80 dark:border-stone-700/80">
            <Sparkles className="w-3 h-3 text-[#B46B55]" />
            <span>Diagnostics Adjuster: +₹{diagnosticTotal.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      {/* MUA UX 1: Interactive Undertone Swatch Palette */}
      <div className="mb-7 p-4 sm:p-5 rounded-xl bg-stone-50/70 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3.5 gap-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-stone-600 dark:text-stone-300" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Bridal Complexion & Undertone Swatches
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-serif italic">
            Selected: <strong className="text-stone-800 dark:text-stone-200 font-normal">{currentUndertone.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {UNDERTONE_OPTIONS.map((shade) => {
            const isSelected = shade.id === undertoneId;
            return (
              <button
                key={shade.id}
                type="button"
                onClick={() => onChangeUndertoneId && onChangeUndertoneId(shade.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col items-center sm:items-start gap-2 ${
                  isSelected
                    ? 'border-stone-900 dark:border-stone-200 bg-white dark:bg-stone-800 shadow-xs ring-1 ring-stone-900 dark:ring-stone-200'
                    : 'border-stone-200/90 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/30 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className="w-7 h-7 rounded-full shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: shade.hex }}
                  />
                  {isSelected && <Check className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />}
                </div>
                <div>
                  <div className="text-xs font-medium text-stone-900 dark:text-stone-100">
                    {shade.name}
                  </div>
                  <div className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">
                    {shade.hex}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-2.5 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-light">
          {currentUndertone.description}
        </p>
      </div>

      {/* MUA UX 2: Makeup Finish & Eye Style Spec Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        {/* Makeup Finish */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Foundation Finish Texture
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MAKEUP_FINISH_OPTIONS.map((fin) => {
              const isSelected = finishPreference === fin.name;
              return (
                <button
                  key={fin.id}
                  type="button"
                  onClick={() => onChangeFinishPreference && onChangeFinishPreference(fin.name)}
                  className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <div className="font-medium flex items-center justify-between">
                    <span>{fin.name}</span>
                    <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-current/10 font-mono">
                      {fin.badge}
                    </span>
                  </div>
                  <div className="text-[10px] opacity-75 mt-1 truncate">
                    {fin.note}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Eye Look Style */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Eye & Lash Architecture Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {EYE_STYLE_OPTIONS.map((eye) => {
              const isSelected = eyeStyle === eye.name;
              return (
                <button
                  key={eye.id}
                  type="button"
                  onClick={() => onChangeEyeStyle && onChangeEyeStyle(eye.name)}
                  className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <div className="font-medium truncate">{eye.name}</div>
                  <div className="text-[10px] opacity-75 mt-1 truncate">
                    {eye.note}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MUA UX 3: Diagnostics Matrix: 4 Tactile Segmented Grids */}
      <div className="space-y-5">
        {/* 1. Skin Type & Barrier Prep */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Skin Barrier Preparation & Priming
            </label>
            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              +{skinTypePrice === 0 ? 'Included' : `₹${skinTypePrice.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SKIN_TYPE_OPTIONS.map((opt) => {
              const isSelected = skinTypePrice === opt.price;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeSkinTypePrice(opt.price)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between text-xs ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'border-stone-200/90 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-medium">{opt.name.split('(')[0]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                  </div>
                  <div className="mt-2 text-[10px] opacity-70 leading-snug">
                    {opt.description}
                  </div>
                  <div className="mt-2 text-[10px] font-mono font-medium opacity-90">
                    {opt.price === 0 ? 'Base Included' : `+₹${opt.price}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Blemish & Pigmentation Correction Level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Color Neutralization & Hyperpigmentation Camouflage
            </label>
            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              +{correctionPrice === 0 ? 'Standard' : `₹${correctionPrice.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CORRECTION_OPTIONS.map((opt) => {
              const isSelected = correctionPrice === opt.price;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeCorrectionPrice(opt.price)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between text-xs ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'border-stone-200/90 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-medium">{opt.name.split('(')[0]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                  </div>
                  <div className="mt-2 text-[10px] opacity-70 leading-snug">
                    {opt.description}
                  </div>
                  <div className="mt-2 text-[10px] font-mono font-medium opacity-90">
                    {opt.price === 0 ? 'Standard Base' : `+₹${opt.price}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Hair Density & Structural Styling */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Hair Density & Architectural Updo Structuring
            </label>
            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              +{hairProfilePrice === 0 ? 'Standard' : `₹${hairProfilePrice.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {HAIR_PROFILE_OPTIONS.map((opt) => {
              const isSelected = hairProfilePrice === opt.price;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeHairProfilePrice(opt.price)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between text-xs ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'border-stone-200/90 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-medium">{opt.name.split('(')[0]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                  </div>
                  <div className="mt-2 text-[10px] opacity-70 leading-snug">
                    {opt.description}
                  </div>
                  <div className="mt-2 text-[10px] font-mono font-medium opacity-90">
                    {opt.price === 0 ? 'Standard Included' : `+₹${opt.price}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Hair Enhancements & Extensions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Hair Extensions & Volume Enhancement
            </label>
            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              +{hairExtensionPrice === 0 ? 'Standard' : `₹${hairExtensionPrice.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {HAIR_EXTENSION_OPTIONS.map((opt) => {
              const isSelected = hairExtensionPrice === opt.price;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeHairExtensionPrice(opt.price)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between text-xs ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'border-stone-200/90 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-medium">{opt.name.split('(')[0]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                  </div>
                  <div className="mt-2 text-[10px] opacity-70 leading-snug">
                    {opt.description}
                  </div>
                  <div className="mt-2 text-[10px] font-mono font-medium opacity-90">
                    {opt.price === 0 ? 'Standard Included' : `+₹${opt.price}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
