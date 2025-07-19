import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import EventSection from './components/EventSection';
import PillarsSection from './components/PillarsSection';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthPage from './components/auth/AuthPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import TicketsPage from './components/TicketsPage';
import { useAuth } from './hooks/useAuth';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  // Check URL params pour success/cancel uniquement au mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const confirmed = urlParams.get('confirmed');

    if (confirmed === 'true') {
      setActiveSection('auth');
      window.history.replaceState({}, '', window.location.pathname);
    }

    const sectionFromUrl = urlParams.get('section');
    if (sectionFromUrl === 'success' || sectionFromUrl === 'cancel') {
      setActiveSection(sectionFromUrl);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (section === 'home') navigate('/');
    else if (section === 'auth') navigate('/auth');
    else if (section === 'tickets') navigate('/tickets');
  };

  const handleSignOut = async () => {
    await signOut();
    handleSectionChange('home');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  // Gestion success/cancel qui ne sont pas des routes
  if (activeSection === 'success') {
    return <SuccessPage onBackToHome={() => handleSectionChange('home')} />;
  }
  if (activeSection === 'cancel') {
    return <CancelPage onBackToHome={() => handleSectionChange('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
        onSignOut={handleSignOut}
      />

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero onSectionChange={handleSectionChange} />
              <EventSection />
              <Gallery />
              <PillarsSection />
              <Contact />
            </>
          } />

          <Route path="/auth" element={
            <AuthPage onSuccess={() => handleSectionChange('home')} />
          } />

          {/* Page tickets accessible sans login */}
          <Route path="/tickets" element={<TicketsPage />} />

          <Route path="*" element={
            <>
              <Hero onSectionChange={handleSectionChange} />
              <EventSection />
              <Gallery />
              <PillarsSection />
              <Contact />
            </>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
