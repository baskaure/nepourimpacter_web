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
          className="w-full h-full object-cover opacity-60 object-[center_10%]"
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
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-auto mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 leading-tight">
          NÉ POUR IMPACTER
        </h1>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-8 tracking-wide">
          LE GALA DES ENTREPRENEUR
        </h2>

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