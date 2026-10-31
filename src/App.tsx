import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Horses } from './components/Horses';
import { HorseModal } from './components/HorseModal';
import { EnquirySection } from './components/EnquirySection';
import { EnquiryModal } from './components/EnquiryModal';
import { Footer } from './components/Footer';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { initialSyndicateConfig, upcomingHorses } from './data/syndicateData';
import { Horse, SyndicateConfig, EnquirySubmission } from './types';

export default function App() {
  const [config, setConfig] = useState<SyndicateConfig>(() => {
    try {
      const saved = localStorage.getItem('elysian_config');
      return saved ? JSON.parse(saved) : initialSyndicateConfig;
    } catch {
      return initialSyndicateConfig;
    }
  });

  const [horses] = useState<Horse[]>(upcomingHorses);
  const [selectedHorseForModal, setSelectedHorseForModal] = useState<Horse | null>(null);

  // Enquiry modal state
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalHorseSelection, setModalHorseSelection] = useState<string>('General Syndicate Interest');

  // Customizer drawer state
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);

  // State to pass to on-page form if smooth scrolling is preferred
  const [onPagePreselectedHorse, setOnPagePreselectedHorse] = useState<string>('General Syndicate Interest');

  const handleOpenEnquiry = (horseName?: string) => {
    if (horseName) {
      setModalHorseSelection(horseName);
      setOnPagePreselectedHorse(horseName);
    } else {
      setModalHorseSelection('General Syndicate Interest');
    }
    setIsEnquiryModalOpen(true);
  };

  const handleViewHorse = (horseId: string) => {
    const found = horses.find((h) => h.id === horseId);
    if (found) {
      setSelectedHorseForModal(found);
    }
  };

  const handleSaveConfig = (newConfig: SyndicateConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('elysian_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmissionSuccess = (submission: EnquirySubmission) => {
    console.log('New enquiry logged for syndicate:', submission);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#161B18] flex flex-col font-sans selection:bg-[#ECE7D1] selection:text-[#161B18] relative">
      {/* Modern Logo Progress Loading Screen (minimum 2s duration) */}
      <LoadingScreen brandName={config.brandName} minDuration={2200} />

      {/* Modern Custom Cursor with Spring Dynamics */}
      <CustomCursor />

      {/* 1. Header / Navigation */}
      <Navbar
        brandName={config.brandName}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <main className="flex-1 w-full overflow-hidden">
        {/* 2. Hero Section */}
        <Hero
          onOpenEnquiry={handleOpenEnquiry}
          onViewHorse={handleViewHorse}
        />

        {/* 3. Introduction / About the Syndicate */}
        <About
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 4. The Syndicate Experience */}
        <Experience
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 5. Featured / Upcoming Horses */}
        <Horses
          horses={horses}
          onSelectHorse={(horse) => setSelectedHorseForModal(horse)}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 6. Final Enquiry Section */}
        <EnquirySection
          horses={horses}
          destinationEmail={config.contactEmail}
          preselectedHorse={onPagePreselectedHorse}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        config={config}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenConfig={() => setIsConfigDrawerOpen(true)}
      />

      {/* Interactive Horse Profile Inspection Modal */}
      <HorseModal
        horse={selectedHorseForModal}
        onClose={() => setSelectedHorseForModal(null)}
        onEnquire={(horseName) => {
          setSelectedHorseForModal(null);
          handleOpenEnquiry(horseName);
        }}
      />

      {/* Quick Enquiry Popup Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        horses={horses}
        destinationEmail={config.contactEmail}
        initialHorse={modalHorseSelection}
        onSubmissionSuccess={handleSubmissionSuccess}
      />

      {/* Syndicate Owner Customizer Drawer */}
      <CustomizerDrawer
        isOpen={isConfigDrawerOpen}
        onClose={() => setIsConfigDrawerOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
