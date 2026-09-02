import React from 'react';
import { Sparkles, Moon, Sun, FolderOpen, Plus, FileText } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSavedModal: () => void;
  onNewQuote: () => void;
  savedCount: number;
  invoiceNumber: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenSavedModal,
  onNewQuote,
  savedCount,
  invoiceNumber,
}) => {
  return (
    <header className="bg-white dark:bg-[#141211] text-stone-900 dark:text-stone-100 p-6 sm:p-7 rounded-2xl border border-stone-200/90 dark:border-stone-800/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Atelier Brand identity */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 text-[10px] font-semibold tracking-widest uppercase border border-stone-200/60 dark:border-stone-700/60">
              <Sparkles className="w-3 h-3 text-[#B46B55]" />
              Atelier Ashikha • Bridal Studio
            </span>
            <span className="hidden sm:inline-block text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              Ref #{invoiceNumber}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100 tracking-tight font-medium">
            Ashikha MUA Rate Master
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-1 font-light max-w-2xl leading-relaxed">
            Minimal bridal rate engine, skin & hair diagnostics, district travel zones, and market benchmarking.
          </p>
        </div>

        {/* Action Controls & Dark Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            id="btnOpenSavedQuotes"
            onClick={onOpenSavedModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors border border-stone-200/80 dark:border-stone-700/80"
            title="Saved Quotes"
          >
            <FolderOpen className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span>Saved Quotes</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-[10px] font-semibold">
              {savedCount}
            </span>
          </button>

          <button
            type="button"
            id="btnNewQuote"
            onClick={onNewQuote}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1C1917] hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-medium transition-colors shadow-xs"
            title="Start New Quote"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Bride</span>
          </button>

          <button
            type="button"
            id="btnToggleTheme"
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors border border-stone-200/80 dark:border-stone-700/80"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-stone-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
