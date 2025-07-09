export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SdzAA8fF5VlbdR',
    priceId: 'price_1RihCFBAcftivNNIHC1V6qtZ',
    name: 'tyest',
    description: '',
    mode: 'subscription',
    price: 5.00,
    currency: 'EUR'
  },
  // Ticket products (you'll need to create these in Stripe)
  {
    id: 'ticket_basic',
    priceId: 'price_ticket_basic', // À créer dans Stripe
    name: 'Accès Standard',
    description: 'L\'essentiel pour découvrir l\'événement',
    mode: 'payment',
    price: 89.00,
    currency: 'EUR'
  },
  {
    id: 'ticket_premium',
    priceId: 'price_ticket_premium', // À créer dans Stripe
    name: 'Premium',
    description: 'L\'expérience complète avec accès live',
    mode: 'payment',
    price: 189.00,
    currency: 'EUR'
  },
  {
    id: 'ticket_vip',
    priceId: 'price_ticket_vip', // À créer dans Stripe
    name: 'VIP',
    description: 'L\'expérience ultime avec privilèges exclusifs',
    mode: 'payment',
    price: 349.00,
    currency: 'EUR'
  },
  {
    id: 'ticket_enterprise',
    priceId: 'price_ticket_enterprise', // À créer dans Stripe
    name: 'Entreprise',
    description: 'Solution complète pour les équipes',
    mode: 'payment',
    price: 599.00,
    currency: 'EUR'
  }
];

export function getProductById(id: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.id === id);
}

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}