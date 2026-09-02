import { QuoteData } from '../types';
import { INITIAL_QUOTE } from '../data/constants';

const DRAFT_STORAGE_KEY = 'ashikha_active_quote_draft';
const SAVED_QUOTES_KEY = 'ashikha_saved_quotes_list';
const THEME_STORAGE_KEY = 'ashikha_theme_preference';

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.error('Failed to save theme to localStorage', err);
  }
}

export function loadActiveDraft(): QuoteData {
  try {
    const data = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.id && parsed.clientName !== undefined) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load active draft from localStorage', err);
  }
  return INITIAL_QUOTE;
}

export function saveActiveDraft(quote: QuoteData): void {
  try {
    const updated = {
      ...quote,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save active draft to localStorage', err);
  }
}

export function loadSavedQuotes(): QuoteData[] {
  try {
    const data = localStorage.getItem(SAVED_QUOTES_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load saved quotes from localStorage', err);
  }
  // If empty, initialize with the default sample quote
  return [INITIAL_QUOTE];
}

export function saveQuoteToList(quote: QuoteData): QuoteData[] {
  try {
    const existing = loadSavedQuotes();
    const index = existing.findIndex((q) => q.id === quote.id);
    let updatedList: QuoteData[];

    const quoteToSave: QuoteData = {
      ...quote,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      updatedList = [...existing];
      updatedList[index] = quoteToSave;
    } else {
      updatedList = [quoteToSave, ...existing];
    }

    localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(updatedList));
    return updatedList;
  } catch (err) {
    console.error('Failed to persist quote to list', err);
    return loadSavedQuotes();
  }
}

export function deleteSavedQuote(quoteId: string): QuoteData[] {
  try {
    const existing = loadSavedQuotes();
    const filtered = existing.filter((q) => q.id !== quoteId);
    localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete quote from list', err);
    return loadSavedQuotes();
  }
}

export function generateNewQuote(): QuoteData {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.floor(100 + Math.random() * 900);
  const nextInvoiceNo = `ASH-${dateStr}-${rand}`;

  return {
    ...INITIAL_QUOTE,
    id: 'quote-' + Date.now(),
    invoiceNumber: nextInvoiceNo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    clientName: '',
    clientPhone: '',
    notes: '',
    syncedCompetitorRate: null,
  };
}
