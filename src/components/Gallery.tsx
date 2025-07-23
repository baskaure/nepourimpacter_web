import React from 'react';
import { Camera, Users, Mic, Trophy } from 'lucide-react';
import image1 from './media/image00001.jpeg';
import image2 from './media/image00002.jpeg';
import image3 from './media/image00003.jpeg';
import image4 from './media/image00004.jpeg';
import image5 from './media/image00005.jpeg';
import image6 from './media/image00006.jpeg';
import image7 from './media/image00007.jpeg';
import image8 from './media/image00008.jpeg';
import image9 from './media/image00009.jpeg';
import image10 from './media/image00010.jpeg';
import image11 from './media/image00011.jpeg';
import image12 from './media/image00012.jpeg';
import image13 from './media/image00013.jpeg';
import image14 from './media/image00014.jpeg';
import image15 from './media/image00015.jpeg';
import image16 from './media/image00016.jpeg';
import image17 from './media/image00017.jpeg';

const Gallery: React.FC = () => {
  const galleryImages = [
    {
      id: 1,
      src: image9,
      alt: "Conférence entrepreneuriat",
      category: "Conférences"
    },
    {
      id: 2,
      src: image4,
      alt: "Networking entrepreneurs",
      category: "Networking"
    },
    {
      id: 3,
      src: image5,
      alt: "Présentation business",
      category: "Présentations"
    },
    {
      id: 4,
      src: image6,
      alt: "Workshop innovation",
      category: "Workshops"
    },
    {
      id: 5,
      src: image15,
      alt: "Table ronde experts",
      category: "Tables rondes"
    },
    {
      id: 6,
      src: image17,
      alt: "Moment convivial",
      category: "Moments conviviaux"
    }
  ];

  const categories = [
    { name: "Conférences", icon: Mic, color: "bg-blue-500" },
    { name: "Networking", icon: Users, color: "bg-green-500" },
    { name: "Présentations", icon: Camera, color: "bg-purple-500" },
    { name: "Workshops", icon: Trophy, color: "bg-yellow-500" }
  ];

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galerie Photos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez l'atmosphère unique de nos événements précédents et plongez dans l'univers de l'entrepreneuriat
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className={`p-1 rounded-full ${category.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-white text-sm">{category.name}</span>
              </div>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-white font-medium">{image.alt}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Rejoignez la prochaine édition !
            </h3>
            <p className="text-black/80 mb-6">
              Vivez ces moments exceptionnels et créez votre propre histoire entrepreneuriale
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Réserver ma place
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;