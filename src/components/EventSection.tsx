import React from 'react';
import VideoPlayer from './VideoPlayer';
import npi from './media/NPI.mp4';
import poster from './media/poster.jpg';

const EventSection: React.FC = () => {
  return (
    <section id="event-section" className="py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Date Badge */}
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold text-sm tracking-wide">
            28 juin 2025 • Lyon
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16">
          Lève-toi et Bâtis
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              L'événement du 28 juin à Lyon est une étape clé de ce mouvement. Une occasion unique de se rassembler, d'apprendre et de repartir avec des outils concrets pour les éveillés.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Ce n'est pas seulement plus juste recommencer du contenu, mais devenir le contenu.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Rejoindre une communauté d'entrepreneurs qui transforment leurs visions en réalité et impactent positivement le monde.
            </p>
          </div>

          {/* Right Content - Video Player */}
          <div className="relative">
            <VideoPlayer
                src={npi}
              poster={poster}
              className="aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;