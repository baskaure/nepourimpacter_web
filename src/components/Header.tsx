import React, { useState } from 'react';
import { Trophy, Menu, X, User, LogOut } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import logo from './media/logo.png';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: SupabaseUser | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange, user, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'ACCUEIL', id: 'home' },
    { name: 'TICKET', id: 'tickets' },
    { name: 'CONNEXION', id: 'auth' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'tickets') {
      const element = document.getElementById('pricing');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'auth' && !user) {
      onSectionChange('auth');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src={logo} alt="Logo" className="h-8 w-7" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium tracking-wide"
              >
                {item.name}
              </button>
            ))}
            
            {user && (
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>DÉCONNEXION</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-yellow-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
              
              {user && (
                <button
                  onClick={() => {
                    onSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                >
                  DÉCONNEXION
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