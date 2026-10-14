import React, { useState } from 'react';
import { ProfileProvider } from './context/ProfileContext';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { ContactCard } from './components/ContactCard';
import { BoundariesList } from './components/BoundariesList';
import { EmergencyModal } from './components/EmergencyModal';
import { ProfileEditor } from './components/ProfileEditor';
import { FullSheetModal } from './components/FullSheetModal';
import { ToastContainer } from './components/ToastContainer';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

function MainApp() {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isFullSheetOpen, setIsFullSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-white">
      <ToastContainer />

      {/* Top Navigation */}
      <Header onOpenEditor={() => setIsEditorOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-16">
        {/* Profile Hero for Valco */}
        <ProfileHero onOpenEmergency={() => setIsEmergencyOpen(true)} />

        {/* How to Reach Me: Discord & Telegram */}
        <ContactCard />

        {/* Boundaries & Limits: In Public vs In Scene, with 'See the full list here' */}
        <BoundariesList onOpenFullSheet={() => setIsFullSheetOpen(true)} />

        {/* Footer */}
        <Footer
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenEditor={() => setIsEditorOpen(true)}
        />
      </main>

      {/* Mobile Ergonomic Thumb Zone Navigation */}
      <BottomNav onOpenEmergency={() => setIsEmergencyOpen(true)} />

      {/* Interactive Sheets & Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <ProfileEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Full BDSM Checklist Sheet Modal */}
      <FullSheetModal
        isOpen={isFullSheetOpen}
        onClose={() => setIsFullSheetOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <MainApp />
    </ProfileProvider>
  );
}
