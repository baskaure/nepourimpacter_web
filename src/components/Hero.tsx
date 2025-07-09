import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface HeroProps {
  onGetTickets: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetTickets }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-24">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Summit Entrepreneur
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              2025
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Rejoignez les leaders de demain pour une journée d'inspiration, de networking et d'innovation entrepreneuriale
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-medium">27 septembre 2025</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-medium">10h - 18h</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-medium">Lyon, France</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-medium">150 Places</span>
            </div>
          </div>

          <button
            onClick={onGetTickets}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Réserver ma place
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;