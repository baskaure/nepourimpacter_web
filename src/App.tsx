import React, { useState, useEffect } from 'react';
import { Star, Crown, Zap, Users, LogOut } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import TicketOffers from './components/TicketOffers';
import Contact from './components/Contact';
import LiveStream from './components/LiveStream';
import Dashboard from './components/Dashboard';
import AuthPage from './components/auth/AuthPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import SubscriptionCard from './components/subscription/SubscriptionCard';
import { useAuth } from './hooks/useAuth';
import { useSubscription } from './hooks/useSubscription';

// Check URL parameters for success/cancel redirects
const urlParams = new URLSearchParams(window.location.search);
const sectionFromUrl = urlParams.get('section');

interface Ticket {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  icon: React.ElementType;
  color: string;
  popular?: boolean;
  features: string[];
  remainingSeats: number;
  totalSeats: number;
  description: string;
  liveAccess?: boolean;
}

function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { getActiveProduct } = useSubscription();
  const [activeSection, setActiveSection] = useState(sectionFromUrl || 'home');
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'basic',
      name: 'Accès Standard',
      price: 89,
      originalPrice: 120,
      icon: Users,
      color: 'bg-gray-500',
      features: [
        'Accès à toutes les conférences',
        'Matériel de l\'événement',
        'Pause café et déjeuner',
        'Certificat de participation'
      ],
      remainingSeats: 180,
      totalSeats: 200,
      description: 'L\'essentiel pour découvrir l\'événement',
      liveAccess: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 189,
      originalPrice: 250,
      icon: Star,
      color: 'bg-blue-500',
      popular: true,
      features: [
        'Tout ce qui est inclus dans Standard',
        'Accès aux ateliers exclusifs',
        'Networking privilégié',
        'Goodies premium',
        'Accès au live stream privé'
      ],
      remainingSeats: 85,
      totalSeats: 150,
      description: 'L\'expérience complète avec accès live',
      liveAccess: true
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 349,
      originalPrice: 450,
      icon: Crown,
      color: 'bg-purple-500',
      features: [
        'Tout ce qui est inclus dans Premium',
        'Rencontres privées avec les speakers',
        'Dîner VIP exclusif',
        'Accès backstage',
        'Enregistrements des sessions',
        'Support prioritaire'
      ],
      remainingSeats: 28,
      totalSeats: 100,
      description: 'L\'expérience ultime avec privilèges exclusifs',
      liveAccess: true
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      price: 599,
      icon: Zap,
      color: 'bg-indigo-500',
      features: [
        'Tout ce qui est inclus dans VIP',
        'Table dédiée (10 personnes)',
        'Branding personnalisé',
        'Présentation d\'entreprise',
        'Lead generation tools',
        'Support dédié'
      ],
      remainingSeats: 15,
      totalSeats: 50,
      description: 'Solution complète pour les équipes',
      liveAccess: true
    }
  ]);

  const [purchasedTickets, setPurchasedTickets] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);

  // Calculate totals
  const totalSeats = tickets.reduce((sum, ticket) => sum + ticket.totalSeats, 0);
  const remainingSeats = tickets.reduce((sum, ticket) => sum + ticket.remainingSeats, 0);
  const ticketsSold = totalSeats - remainingSeats;
  const totalRevenue = tickets.reduce((sum, ticket) => {
    const sold = ticket.totalSeats - ticket.remainingSeats;
    return sum + (sold * ticket.price);
  }, 0);

  // Check if user has live access
  const hasLiveAccess = purchasedTickets.some(ticketId => 
    tickets.find(ticket => ticket.id === ticketId)?.liveAccess
  );

  // Simulate live viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePurchase = (ticketId: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, remainingSeats: ticket.remainingSeats - 1 }
          : ticket
      )
    );
    setPurchasedTickets(prev => [...prev, ticketId]);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Clean URL parameters when navigating
    if (sectionFromUrl) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const handleGetTickets = () => {
    setActiveSection('tickets');
  };

  const handleSignOut = async () => {
    await signOut();
    setActiveSection('home');
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not logged in and trying to access protected sections
  if (!user && (activeSection === 'subscription' || activeSection === 'success' || activeSection === 'cancel')) {
    return <AuthPage onSuccess={() => setActiveSection('home')} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onGetTickets={handleGetTickets} />;
      case 'tickets':
        return (
          <div>
            <Dashboard 
              totalSeats={totalSeats}
              remainingSeats={remainingSeats}
              totalRevenue={totalRevenue}
              ticketsSold={ticketsSold}
            />
            <TicketOffers 
              tickets={tickets} 
              onPurchase={handlePurchase}
            />
          </div>
        );
      case 'contact':
        return <Contact />;
      case 'live':
        return (
          <LiveStream 
            hasLiveAccess={hasLiveAccess}
            isLive={isLive}
            viewerCount={viewerCount}
          />
        );
      case 'subscription':
        return user ? <SubscriptionCard /> : <AuthPage onSuccess={() => setActiveSection('subscription')} />;
      case 'auth':
        return <AuthPage onSuccess={() => setActiveSection('home')} />;
      case 'success':
        return <SuccessPage onBackToHome={() => setActiveSection('home')} />;
      case 'cancel':
        return <CancelPage onBackToHome={() => setActiveSection('home')} />;
      default:
        return <Hero onGetTickets={handleGetTickets} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
        onSignOut={handleSignOut}
      />
      
      {/* User Status Bar */}
      {user && (
        <div className="bg-blue-50 border-b border-blue-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-800">Connecté en tant que: {user.email}</span>
              {getActiveProduct() && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {getActiveProduct()?.name}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      
      <main>
        {renderSection()}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Summit Entrepreneur 2025</h3>
              <p className="text-gray-400 text-sm">
                L'événement incontournable de l'entrepreneuriat français
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Programme</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intervenants</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Conditions générales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de remboursement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Suivez-nous</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Summit Entrepreneur. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;