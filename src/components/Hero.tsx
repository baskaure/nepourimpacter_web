import React from 'react';
import { ChevronDown } from 'lucide-react';
import npi from './media/NPI.mp4';

const Hero: React.FC = () => {
  const scrollToNext = () => {
    const element = document.getElementById('event-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-[#121212] flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 object-[center_10%]"
          style={{ pointerEvents: 'none' }}
        >
          <source 
            src={npi}
            type="video/mp4" 
          />
          {/* Fallback image si la vidéo ne charge pas */}
          <img 
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Background fallback" 
            className="w-full h-full object-cover opacity-40"
          />
        </video>
        <div className="absolute inset-0 bg-[#121212]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Né pour impacter
        </h1>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl text-yellow-400 font-semibold mb-8 tracking-wide">
          LE GALA DES ENTREPRENEUR
        </h2>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
            "Né pour impacter", ce n'est pas juste un podcast.
            Ce n'est pas juste un événement. C'est une réponse.
            Une vision. Une nécessité.
          </p>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            À l'heure où tout va vite, où les distractions sont partout,
            il est urgent de revenir à l'essentiel : nous pouvons d'agir,
            il est urgent de revenir à l'essentiel : nous pouvons d'agir,
            de créer, d'impacter.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToPricing}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            EN SAVOIR PLUS
          </button>
          
          <button 
            onClick={scrollToPricing}
            className="bg-transparent border-2 border-gray-400 hover:border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-white/10"
          >
            RÉSERVER SA PLACE
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-yellow-400 transition-colors duration-200 animate-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;