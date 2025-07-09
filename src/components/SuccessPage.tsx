import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

interface SuccessPageProps {
  onBackToHome: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onBackToHome }) => {
  const { refetch } = useSubscription();

  useEffect(() => {
    // Refetch subscription data after successful payment
    const timer = setTimeout(() => {
      refetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [refetch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Paiement réussi !</h2>
          <p className="text-gray-600">
            Votre paiement a été traité avec succès. Vous devriez recevoir un email de confirmation sous peu.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            Votre abonnement est maintenant actif. Vous pouvez accéder à toutes les fonctionnalités premium.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour à l'accueil</span>
        </button>
      </div>
    </section>
  );
};

export default SuccessPage;