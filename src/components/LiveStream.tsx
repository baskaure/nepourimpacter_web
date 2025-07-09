import React, { useState, useEffect } from 'react';
import { Play, Lock, Users, Clock } from 'lucide-react';

interface LiveStreamProps {
  hasLiveAccess: boolean;
  isLive: boolean;
  viewerCount: number;
}

const LiveStream: React.FC<LiveStreamProps> = ({ hasLiveAccess, isLive, viewerCount }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!hasLiveAccess) {
    return (
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-800 rounded-2xl p-12">
            <div className="mb-8">
              <div className="bg-gray-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Lock className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Accès Live Privé</h2>
              <p className="text-gray-400 text-lg">
                Cette section est réservée aux détenteurs des formules Premium et VIP
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-2">Profitez du live exclusif !</h3>
              <p className="mb-4">
                Discussions privées avec les intervenants, Q&A exclusives, et contenus bonus
              </p>
              <p className="text-sm">
                Réservez votre place Premium ou VIP pour accéder au live
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Stream Exclusif</h2>
          <p className="text-gray-400 text-lg">
            Contenu premium réservé aux membres VIP et Premium
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl overflow-hidden">
          {/* Live Status Bar */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {isLive ? (
                    <>
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="font-semibold">EN DIRECT</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 text-gray-300" />
                      <span className="font-semibold">Prochainement</span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-300" />
                  <span>{viewerCount.toLocaleString()} spectateurs</span>
                </div>
              </div>
              <div className="text-sm">
                {currentTime.toLocaleTimeString('fr-FR')}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            {isLive ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-red-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Stream en cours</h3>
                  <p className="text-gray-400">
                    Cliquez sur play pour rejoindre le live
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-700 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Le live commencera bientôt</h3>
                  <p className="text-gray-400">
                    15 Mars 2025 - 9h00
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="p-6 border-t border-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Chat en direct</h3>
                <div className="bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                        M
                      </div>
                      <div>
                        <p className="text-sm font-medium">Marie Dubois</p>
                        <p className="text-gray-400 text-sm">Excellent contenu, merci !</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">
                        J
                      </div>
                      <div>
                        <p className="text-sm font-medium">Jean Martin</p>
                        <p className="text-gray-400 text-sm">Très inspirant ! 🚀</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <input
                    type="text"
                    placeholder="Tapez votre message..."
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Programme Live</h3>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Keynote d'ouverture</h4>
                      <span className="text-sm text-gray-400">9h00 - 9h30</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      "L'avenir de l'entrepreneuriat digital"
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Table ronde exclusive</h4>
                      <span className="text-sm text-gray-400">10h00 - 11h00</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      "Lever des fonds en 2025"
                    </p>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Q&A avec les experts</h4>
                      <span className="text-sm text-gray-400">11h30 - 12h30</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Session exclusive membres premium
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStream;