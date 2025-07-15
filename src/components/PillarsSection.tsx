import React from 'react';
import { Eye, DollarSign, TrendingUp, BookOpen, Brain } from 'lucide-react';

const PillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Vision',
      description: 'Développer une vision claire et inspirante pour votre avenir entrepreneurial'
    },
    {
      icon: DollarSign,
      title: 'Éducation financière',
      description: 'Maîtriser les fondamentaux financiers pour bâtir une richesse durable'
    },
    {
      icon: TrendingUp,
      title: 'Entrepreneuriat',
      description: 'Acquérir les clés pour créer et développer votre entreprise avec succès'
    },
    {
      icon: BookOpen,
      title: 'Développement personnel',
      description: 'Cultiver un mindset de gagnant et développer votre potentiel'
    },
    {
      icon: Brain,
      title: 'Gestion & transmission',
      description: 'Apprendre à gérer, faire croître et transmettre votre patrimoine'
    }
  ];

  return (
    <section className="py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Nos 5 Piliers Essentiels
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-[#212121] rounded-lg p-8 hover:bg-gray-800 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="bg-gray-800 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-yellow-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;