import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Né pour impacter</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              "Né pour impacter", ce n'est pas juste un podcast.
              Ce n'est pas juste un événement. C'est une réponse.
              Une vision. Une nécessité.
            </p>
          </div>

          {/* Middle Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">LIENS RAPIDES</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Lève toit et bâtit
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Nos 5 piliers essentiels
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">SUIVEZ-NOUS</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Florian - tout droits réserver
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;