import React, { useState } from 'react';
import { Crown, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { stripeProducts } from '../../stripe-config';
import { supabase } from '../../lib/supabase';

const SubscriptionCard: React.FC = () => {
  const { subscription, loading, getActiveProduct, isActive } = useSubscription();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, mode: 'payment' | 'subscription') => {
    setCheckoutLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Vous devez être connecté pour effectuer un achat');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          price_id: priceId,
          mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      });

      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response headers:', response.headers);
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('URL de redirection manquante');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          setError('Impossible de contacter le serveur de paiement. Vérifiez que les Edge Functions sont configurées dans Supabase.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Erreur lors du processus de paiement');
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const activeProduct = getActiveProduct();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Crown className="h-6 w-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-bold text-gray-900">Mon Abonnement</h3>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {isActive() && activeProduct ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-800">{activeProduct.name}</h4>
                <p className="text-green-600 text-sm">Abonnement actif</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-800">{activeProduct.price.toFixed(2)} {activeProduct.currency}</p>
                <p className="text-green-600 text-sm">par mois</p>
              </div>
            </div>
          </div>

          {subscription?.current_period_end && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Renouvellement le {new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR')}
              </span>
            </div>
          )}

          {subscription?.payment_method_brand && subscription?.payment_method_last4 && (
            <div className="flex items-center text-sm text-gray-600">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>
                {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">Aucun abonnement actif</p>
          
          <div className="space-y-3">
            {stripeProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <span className="font-bold text-blue-600">
                    {product.price.toFixed(2)} {product.currency}
                    {product.mode === 'subscription' && <span className="text-sm font-normal">/mois</span>}
                  </span>
                </div>
                
                {product.description && (
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                )}
                
                <button
                  onClick={() => handleSubscribe(product.priceId, product.mode)}
                  disabled={checkoutLoading}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    checkoutLoading
                      ? 'bg-blue-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {checkoutLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Redirection...</span>
                    </div>
                  ) : (
                    product.mode === 'subscription' ? 'S\'abonner' : 'Acheter'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;