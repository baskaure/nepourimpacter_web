import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validation côté client
      if (!formData.name.trim() || !formData.firstName.trim() || !formData.phone.trim() || !formData.message.trim()) {
        throw new Error('Tous les champs sont requis');
      }

      // Appel à l'Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.name}`,
          email: 'contact@nepourimpacter.com', // Email par défaut
          subject: 'Nouveau message de contact',
          message: `Nom: ${formData.name}\nPrénom: ${formData.firstName}\nTéléphone: ${formData.phone}\n\nMessage:\n${formData.message}`
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', firstName: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi du message');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Contactez-nous
        </h2>
        
        <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
          Une expérience unique vous attend. Contactez-nous pour prendre une place.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Informations Pratiques</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-1">Adresse</h4>
                  <p className="text-gray-400">9 rue Neuve,</p>
                  <p className="text-gray-400">69002 Lyon, France</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">Horaires</h4>
                  <p className="text-gray-400">Lundi - Vendredi: 10h00 - 20h00</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">WhatsApp</h4>
                  <p className="text-gray-400">06 40 46 54 31</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <p className="text-gray-400">contact@florian.restaurant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Contact background" 
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            {/* Form */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8">
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
                  <p className="text-green-300 font-medium flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    ✓ Message envoyé avec succès !
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-300 font-medium">❌ {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
                    placeholder="Nom"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
                    placeholder="Prénom"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
                    placeholder="Téléphone"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors resize-none"
                    placeholder="Sexe"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 text-white transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Envoi...</span>
                    </div>
                  ) : (
                    'Envoyer'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;