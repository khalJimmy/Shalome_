import React, { useState } from 'react';
import { X, Search, Calendar, MapPin, Trash2, Copy, ArrowRight, Download, Upload, FolderOpen } from 'lucide-react';
import { QuoteData } from '../types';

interface SavedQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: QuoteData[];
  activeQuoteId: string;
  onSelectQuote: (quote: QuoteData) => void;
  onDuplicateQuote: (quote: QuoteData) => void;
  onDeleteQuote: (quoteId: string) => void;
  onImportQuotes: (importedQuotes: QuoteData[]) => void;
}

export const SavedQuotesModal: React.FC<SavedQuotesModalProps> = ({
  isOpen,
  onClose,
  quotes,
  activeQuoteId,
  onSelectQuote,
  onDuplicateQuote,
  onDeleteQuote,
  onImportQuotes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredQuotes = quotes.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      (q.clientName && q.clientName.toLowerCase().includes(term)) ||
      (q.invoiceNumber && q.invoiceNumber.toLowerCase().includes(term)) ||
      (q.venueLocation && q.venueLocation.toLowerCase().includes(term)) ||
      (q.clientPhone && q.clientPhone.includes(term))
    );
  });

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(quotes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ashikha_mua_quotes_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportQuotes(parsed);
          }
        } catch {
          alert('Invalid JSON quote backup file');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#151312] rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-medium text-stone-900 dark:text-stone-100">
                Bridal Contracts & Quotes Archive
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
                Stored in browser local storage ({quotes.length} total records)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search and Backup toolbar */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by bride name, invoice ref, or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-800 dark:focus:border-stone-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80"
              title="Backup quotes to JSON"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Backup</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-stone-500" />
              <span>Restore</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>

        {/* Quotes List */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-stone-100 dark:divide-stone-800/60">
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-10 text-xs text-stone-400 dark:text-stone-500 font-light">
              No quotes found matching your search.
            </div>
          ) : (
            filteredQuotes.map((q) => {
              const isActive = q.id === activeQuoteId;

              return (
                <div
                  key={q.id}
                  className={`py-3 px-3 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-stone-100/80 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700'
                      : 'hover:bg-stone-50/70 dark:hover:bg-stone-900/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif font-medium text-sm sm:text-base text-stone-900 dark:text-stone-100">
                        {q.clientName || 'Untitled Bride'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                        {q.invoiceNumber}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                          Active Draft
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-1 flex-wrap font-light">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {q.weddingDate || 'No date'}
                      </span>
                      {q.venueLocation && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {q.venueLocation}
                        </span>
                      )}
                      {q.discountPercent > 0 && (
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                          Discount: {q.discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => onDuplicateQuote(q)}
                      className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                      title="Duplicate Quote"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {quotes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteQuote(q.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-stone-400 hover:text-red-600 transition-colors"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onSelectQuote(q);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-medium transition-colors"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
