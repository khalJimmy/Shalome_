/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ClientSection } from './components/ClientSection';
import { EventsSection } from './components/EventsSection';
import { DiagnosticsSection } from './components/DiagnosticsSection';
import { AddonsSection } from './components/AddonsSection';
import { CompetitorSyncSection } from './components/CompetitorSyncSection';
import { ContractInvoice } from './components/ContractInvoice';
import { SavedQuotesModal } from './components/SavedQuotesModal';
import { StickyFooter } from './components/StickyFooter';

import { QuoteData, CeremonyEvent } from './types';
import { DISTRICT_ZONES } from './data/constants';
import { calculateQuoteBreakdown } from './utils/calculations';
import {
  getStoredTheme,
  setStoredTheme,
  loadActiveDraft,
  saveActiveDraft,
  loadSavedQuotes,
  saveQuoteToList,
  deleteSavedQuote,
  generateNewQuote,
} from './utils/storage';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme());

  // Active quote data
  const [quote, setQuote] = useState<QuoteData>(() => loadActiveDraft());

  // Saved quotes library
  const [savedQuotes, setSavedQuotes] = useState<QuoteData[]>(() => loadSavedQuotes());

  // UI state
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    setStoredTheme(theme);
  }, [theme]);

  // Auto-save draft changes to localStorage
  useEffect(() => {
    saveActiveDraft(quote);
  }, [quote]);

  // Calculate live numbers
  const calculation = useMemo(() => calculateQuoteBreakdown(quote), [quote]);

  const currentZone = useMemo(
    () => DISTRICT_ZONES.find((z) => z.id === quote.zoneId) || DISTRICT_ZONES[0],
    [quote.zoneId]
  );

  // Handler: Toggle Theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Handler: Save current quote to library
  const handleSaveQuote = () => {
    const updatedList = saveQuoteToList(quote);
    setSavedQuotes(updatedList);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  // Handler: New Quote
  const handleNewQuote = () => {
    if (quote.clientName.trim()) {
      saveQuoteToList(quote);
    }
    const fresh = generateNewQuote();
    setQuote(fresh);
    saveActiveDraft(fresh);
  };

  // Handler: Select quote from saved list
  const handleSelectQuote = (selected: QuoteData) => {
    setQuote(selected);
    saveActiveDraft(selected);
  };

  // Handler: Duplicate quote
  const handleDuplicateQuote = (itemToDuplicate: QuoteData) => {
    const dup: QuoteData = {
      ...itemToDuplicate,
      id: 'quote-' + Date.now(),
      invoiceNumber: itemToDuplicate.invoiceNumber + '-COPY',
      clientName: itemToDuplicate.clientName ? `${itemToDuplicate.clientName} (Copy)` : 'Copy',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = saveQuoteToList(dup);
    setSavedQuotes(updated);
    setQuote(dup);
  };

  // Handler: Delete quote
  const handleDeleteQuote = (idToDelete: string) => {
    const updated = deleteSavedQuote(idToDelete);
    setSavedQuotes(updated);
    if (quote.id === idToDelete && updated.length > 0) {
      setQuote(updated[0]);
    }
  };

  // Handler: Import quotes JSON backup
  const handleImportQuotes = (imported: QuoteData[]) => {
    localStorage.setItem('ashikha_saved_quotes_list', JSON.stringify(imported));
    setSavedQuotes(imported);
    if (imported.length > 0) {
      setQuote(imported[0]);
    }
    alert(`Successfully imported ${imported.length} quotes!`);
  };

  // Section II Event handlers
  const handleToggleEvent = (eventId: string, enabled: boolean) => {
    setQuote((prev) => ({
      ...prev,
      events: prev.events.map((ev) => (ev.id === eventId ? { ...ev, enabled } : ev)),
    }));
  };

  const handleChangeEventDate = (eventId: string, date: string) => {
    setQuote((prev) => ({
      ...prev,
      events: prev.events.map((ev) => (ev.id === eventId ? { ...ev, date } : ev)),
    }));
  };

  const handleChangeEventTime = (eventId: string, time: string) => {
    setQuote((prev) => ({
      ...prev,
      events: prev.events.map((ev) => (ev.id === eventId ? { ...ev, time } : ev)),
    }));
  };

  const handleAddCustomEvent = (name: string, date: string, price: number) => {
    const newEvent: CeremonyEvent = {
      id: 'custom-' + Date.now(),
      name,
      enabled: true,
      date,
      time: '10:00',
      basePrice: price,
      isCustom: true,
    };
    setQuote((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const handleRemoveCustomEvent = (eventId: string) => {
    setQuote((prev) => ({
      ...prev,
      events: prev.events.filter((ev) => ev.id !== eventId),
    }));
  };

  // Section IV Add-on handlers
  const handleToggleAddon = (id: string, enabled: boolean) => {
    setQuote((prev) => ({
      ...prev,
      addOns: prev.addOns.map((ad) => (ad.id === id ? { ...ad, enabled } : ad)),
    }));
  };

  // Section V Competitor Sync
  const handleSyncRate = (competitor: string, tier: string, rate: number) => {
    setQuote((prev) => ({
      ...prev,
      syncedCompetitorRate: { competitor, tier, rate },
    }));
  };

  const handleResetRate = () => {
    setQuote((prev) => ({
      ...prev,
      syncedCompetitorRate: null,
    }));
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 dark:bg-[#0C0A09] dark:text-stone-100 transition-colors duration-200 pb-28 pt-4 px-3 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <Header
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSavedModal={() => setIsSavedModalOpen(true)}
          onNewQuote={handleNewQuote}
          savedCount={savedQuotes.length}
          invoiceNumber={quote.invoiceNumber}
        />

        {/* Section 01: Client & District Logistics */}
        <ClientSection
          clientName={quote.clientName}
          clientPhone={quote.clientPhone}
          weddingDate={quote.weddingDate}
          venueLocation={quote.venueLocation}
          notes={quote.notes}
          zoneId={quote.zoneId}
          onChangeClientName={(val) => setQuote((p) => ({ ...p, clientName: val }))}
          onChangeClientPhone={(val) => setQuote((p) => ({ ...p, clientPhone: val }))}
          onChangeWeddingDate={(val) => setQuote((p) => ({ ...p, weddingDate: val }))}
          onChangeVenueLocation={(val) => setQuote((p) => ({ ...p, venueLocation: val }))}
          onChangeNotes={(val) => setQuote((p) => ({ ...p, notes: val }))}
          onChangeZoneId={(val) => setQuote((p) => ({ ...p, zoneId: val }))}
        />

        {/* Section 02: Complexion Studio & Diagnostics */}
        <DiagnosticsSection
          skinTypePrice={quote.skinTypePrice}
          correctionPrice={quote.correctionPrice}
          hairProfilePrice={quote.hairProfilePrice}
          hairExtensionPrice={quote.hairExtensionPrice}
          undertoneId={quote.undertoneId}
          finishPreference={quote.finishPreference}
          eyeStyle={quote.eyeStyle}
          onChangeSkinTypePrice={(val) => setQuote((p) => ({ ...p, skinTypePrice: val }))}
          onChangeCorrectionPrice={(val) => setQuote((p) => ({ ...p, correctionPrice: val }))}
          onChangeHairProfilePrice={(val) => setQuote((p) => ({ ...p, hairProfilePrice: val }))}
          onChangeHairExtensionPrice={(val) => setQuote((p) => ({ ...p, hairExtensionPrice: val }))}
          onChangeUndertoneId={(val) => setQuote((p) => ({ ...p, undertoneId: val }))}
          onChangeFinishPreference={(val) => setQuote((p) => ({ ...p, finishPreference: val }))}
          onChangeEyeStyle={(val) => setQuote((p) => ({ ...p, eyeStyle: val }))}
        />

        {/* Section 03: Ceremony Schedule & Call Times */}
        <EventsSection
          events={quote.events}
          districtZone={currentZone}
          syncedRate={quote.syncedCompetitorRate}
          onToggleEvent={handleToggleEvent}
          onChangeEventDate={handleChangeEventDate}
          onChangeEventTime={handleChangeEventTime}
          onAddCustomEvent={handleAddCustomEvent}
          onRemoveCustomEvent={handleRemoveCustomEvent}
        />

        {/* Section 04: Bridal Artistry Enhancements & Negotiation */}
        <AddonsSection
          addOns={quote.addOns}
          guestCount={quote.guestCount}
          discountPercent={quote.discountPercent}
          advancePaid={quote.advancePaid}
          onToggleAddon={handleToggleAddon}
          onChangeGuestCount={(val) => setQuote((p) => ({ ...p, guestCount: val }))}
          onChangeDiscountPercent={(val) => setQuote((p) => ({ ...p, discountPercent: val }))}
          onChangeAdvancePaid={(val) => setQuote((p) => ({ ...p, advancePaid: val }))}
        />

        {/* Section 05: Market Benchmarking & Competitor Sync */}
        <CompetitorSyncSection
          syncedRate={quote.syncedCompetitorRate}
          onSyncRate={handleSyncRate}
          onResetRate={handleResetRate}
        />

        {/* Section 06: Official Rate Contract Invoice */}
        <ContractInvoice
          quote={quote}
          calculation={calculation}
          currentZone={currentZone}
        />
      </div>

      {/* Sticky Bottom Summary & Export Bar */}
      <StickyFooter
        calculation={calculation}
        discountPercent={quote.discountPercent}
        savedToast={savedToast}
        onSaveQuote={handleSaveQuote}
        onPrint={() => {
          handleSaveQuote();
          window.print();
        }}
      />

      {/* Saved Quotes Modal */}
      <SavedQuotesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        quotes={savedQuotes}
        activeQuoteId={quote.id}
        onSelectQuote={handleSelectQuote}
        onDuplicateQuote={handleDuplicateQuote}
        onDeleteQuote={handleDeleteQuote}
        onImportQuotes={handleImportQuotes}
      />
    </div>
  );
}
