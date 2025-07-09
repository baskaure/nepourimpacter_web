import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface Ticket {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  icon: React.ElementType;
  color: string;
  popular?: boolean;
  features: string[];
  remainingSeats: number;
  totalSeats: number;
  description: string;
  liveAccess?: boolean;
}

interface TicketOffersProps {
  onPurchase: (ticketId: string) => void;
  tickets: Ticket[];
}

const TicketOffers: React.FC<TicketOffersProps> = ({ onPurchase, tickets }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePurchase = async (ticketId: string) => {
    if (!user) {
      setError('Vous devez être connecté pour acheter un ticket');
      return;
    }

    setSelectedTicket(ticketId);
    setError(null);

    try {
      const ticket = tickets.find(t => t.id === ticketId);
      if (!ticket) {
        throw new Error('Ticket non trouvé');
      }

      // Create a one-time payment for the ticket
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Session expirée, veuillez vous reconnecter');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: getTicketPriceId(ticketId),
          mode: 'payment',
          success_url: `${window.location.origin}?section=success`,
          cancel_url: `${window.location.origin}?section=cancel`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
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
      setSelectedTicket(null);
    }
  };

  // Helper function to get the correct Stripe price ID for each ticket
  const getTicketPriceId = (ticketId: string): string => {
    const priceIds: Record<string, string> = {
      'basic': 'price_ticket_basic', // À remplacer par le vrai Price ID de Stripe
      'premium': 'price_ticket_premium', // À remplacer par le vrai Price ID de Stripe
      'vip': 'price_ticket_vip', // À remplacer par le vrai Price ID de Stripe
      'enterprise': 'price_ticket_enterprise' // À remplacer par le vrai Price ID de Stripe
    };
    return priceIds[ticketId] || ticketId;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre expérience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos différentes formules adaptées à vos besoins et votre budget
          </p>
        </div>

        {error && (
          <div className="mb-8 max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tickets.map((ticket) => {
            const Icon = ticket.icon;
            const seatPercentage = (ticket.remainingSeats / ticket.totalSeats) * 100;
            
            return (
              <div
                key={ticket.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  ticket.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {ticket.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Le plus populaire
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${ticket.color}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    {ticket.liveAccess && (
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                        Live inclus
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{ticket.name}</h3>
                  <p className="text-gray-600 mb-4">{ticket.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">€{ticket.price}</span>
                      {ticket.originalPrice && (
                        <span className="ml-2 text-lg text-gray-500 line-through">
                          €{ticket.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Places restantes</span>
                      <span className="text-sm font-medium text-gray-900">
                        {ticket.remainingSeats}/{ticket.totalSeats}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          seatPercentage > 50 ? 'bg-green-500' : 
                          seatPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${seatPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {ticket.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(ticket.id)}
                    disabled={ticket.remainingSeats === 0 || selectedTicket === ticket.id}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      ticket.remainingSeats === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : selectedTicket === ticket.id
                        ? 'bg-blue-400 text-white cursor-wait flex items-center justify-center space-x-2'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                    }`}
                  >
                    {ticket.remainingSeats === 0
                      ? 'Complet'
                      : selectedTicket === ticket.id
                      ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Redirection...</span>
                          </>
                        )
                      : 'Réserver maintenant'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TicketOffers;