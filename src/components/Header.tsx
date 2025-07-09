import React, { useState } from 'react';
import { Menu, X, Calendar, Users, MessageSquare, Play, CreditCard, LogIn, LogOut } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: User | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange, user, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', id: 'home', icon: Calendar },
    { name: 'Tickets', id: 'tickets', icon: Users },
    { name: 'Contact', id: 'contact', icon: MessageSquare },
    { name: 'Live', id: 'live', icon: Play },
  ];

  const userNavigation = user ? [
    { name: 'Abonnement', id: 'subscription', icon: CreditCard },
  ] : [
    { name: 'Connexion', id: 'auth', icon: LogIn },
  ];

  const allNavigation = [...navigation, ...userNavigation];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Summit Entrepreneur 2025
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {allNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
            
            {user && (
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="space-y-2">
              {allNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              
              {user && (
                <button
                  onClick={() => {
                    onSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;