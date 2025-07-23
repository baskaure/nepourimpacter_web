import React, { useState, useEffect, useRef } from 'react';
import { Check, Calendar, MapPin, CreditCard, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import Hero from './Hero';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  priceId: string;
}

const PricingSection: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ticketsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll automatiquement vers la section tickets si on arrive avec ?section=tickets ou #tickets
    if (
      window.location.search.includes('section=tickets') ||
      window.location.hash === '#tickets'
    ) {
      ticketsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const pricingTiers: PricingTier[] = [
    {
      id: 'etudiant',
      name: 'ETUDIANT',
      price: 49,
      period: 'mois',
      features: [
        'Accès illimité à la salle',
        'Équipements de base',
        '1 cours collectif par semaine',
        'Vestiaires et douches',
      ],
      priceId: 'price_student',
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      price: 79,
      period: 'mois',
      popular: true,
      features: [
        "Tout l'abonnement Essentiel",
        'Accès illimité aux cours',
        '1 session avec coach',
        'Analyse corporelle',
      ],
      priceId: 'price_1RihCFBAcftivNNIHC1V6qtZ',
    },
    {
      id: 'standard',
      name: 'STANDARD',
      price: 129,
      period: 'mois',
      features: [
        "Tout l'abonnement Premium",
        '4 sessions avec coach',
        'Programme nutritionnel',
        "Accès prioritaire aux équipements",
      ],
      priceId: 'price_standard',
    },
  ];

  const handlePurchase = async (tier: PricingTier) => {
    if (!user) {
      setError('Vous devez être connecté pour effectuer un achat');
      return;
    }

    setLoading(tier.id);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Session expirée, veuillez vous reconnecter');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price_id: tier.priceId,
            mode: 'subscription',
            success_url: `${window.location.origin}?section=success`,
            cancel_url: `${window.location.origin}?section=cancel`,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Erreur lors de la création de la session de paiement'
        );
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('URL de redirection manquante');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du processus de paiement');
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Hero />

      <section id="tickets" ref={ticketsRef} className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Date Badge */}
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold text-sm tracking-wide">
              27 septembre 2025 • Lyon
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Choisissez votre expérience
          </h2>

          <p className="text-gray-400 text-center text-lg mb-16 max-w-3xl mx-auto">
            Des formules flexibles adaptées à vos besoins et objectifs, sans engagement à long
            terme.
          </p>

          {error && (
            <div className="mb-8 max-w-2xl mx-auto p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-[#212121] rounded-lg p-6 ${
                  tier.popular ? 'ring-2 ring-yellow-400 transform scale-105' : 'hover:bg-gray-750'
                } transition-all duration-200`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      POPULAIRE
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-white font-bold text-xl mb-4">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{tier.price}€</span>
                    <span className="text-gray-400">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(tier)}
                  disabled={loading === tier.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    tier.popular
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                      : 'bg-[#2c2c2c] hover:bg-[#3d3d3d] text-white'
                  } ${
                    loading === tier.id ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
                  }`}
                >
                  {loading === tier.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                      <span>Redirection...</span>
                    </div>
                  ) : (
                    'CHOISIR CE FORMAT'
                  )}
                </button>
              </div>
            ))}
          </div>

                    {/* Informations importantes */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-3">
                <Calendar className="w-8 h-8 text-yellow-400" />
                <h4 className="font-semibold text-white">Date et lieu</h4>
                <p className="text-gray-300 text-sm">29 juin 2025 à Lyon, France</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <MapPin className="w-8 h-8 text-yellow-400" />
                <h4 className="font-semibold text-white">Lieu</h4>
                <p className="text-gray-300 text-sm">123 Avenue des Entrepreneurs, 69000 Lyon, France</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <CreditCard className="w-8 h-8 text-yellow-400" />
                <h4 className="font-semibold text-white">Paiement sécurisé</h4>
                <p className="text-gray-300 text-sm">Transactions protégées par Stripe</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <Mail className="w-8 h-8 text-yellow-400" />
                <h4 className="font-semibold text-white">Support</h4>
                <p className="text-gray-300 text-sm">contact@nepourimpacter.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;