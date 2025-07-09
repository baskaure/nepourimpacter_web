import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';

interface CancelPageProps {
  onBackToHome: () => void;
}

const CancelPage: React.FC<CancelPageProps> = ({ onBackToHome }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Paiement annulé</h2>
          <p className="text-gray-600">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            Vous pouvez réessayer à tout moment. Si vous rencontrez des difficultés, n'hésitez pas à nous contacter.
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

export default CancelPage;