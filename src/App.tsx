import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Clock, Users, Eye, DollarSign, TrendingUp, Brain, BookOpen, BarChart3, User, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventSection from './components/EventSection';
import PricingSection from './components/PricingSection';
import PillarsSection from './components/PillarsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthPage from './components/auth/AuthPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  // Check URL parameters for success/cancel redirects only once on mount
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const sectionFromUrl = urlParams.get('section');

  if (sectionFromUrl === 'auth') {
    setActiveSection('auth');
  } else if (sectionFromUrl === 'success' || sectionFromUrl === 'cancel') {
    setActiveSection(sectionFromUrl);
    window.history.replaceState({}, '', window.location.pathname);
  } else {
    setActiveSection('home');
  }
}, []);


  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleSignOut = async () => {
    await signOut();
    setActiveSection('home');
  };

  // Show loading screen while checking authentication
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

  // Show auth page if user is not logged in and trying to access protected sections
  if (!user && (activeSection === 'auth' || activeSection === 'success' || activeSection === 'cancel')) {
    if (activeSection === 'success') {
      return <SuccessPage onBackToHome={() => setActiveSection('home')} />;
    }
    if (activeSection === 'cancel') {
      return <CancelPage onBackToHome={() => setActiveSection('home')} />;
    }
    return <AuthPage onSuccess={() => setActiveSection('home')} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero />
            <EventSection />
            <PricingSection />
            <PillarsSection />
            <Contact />
          </>
        );
      case 'auth':
        return <AuthPage onSuccess={() => setActiveSection('home')} />;
      case 'success':
        return <SuccessPage onBackToHome={() => setActiveSection('home')} />;
      case 'cancel':
        return <CancelPage onBackToHome={() => setActiveSection('home')} />;
      default:
        return (
          <>
            <Hero />
            <EventSection />
            <PricingSection />
            <PillarsSection />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
        onSignOut={handleSignOut}
      />
      
      <main>
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
}

export default App;