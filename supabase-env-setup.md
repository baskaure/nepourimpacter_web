# Configuration des variables d'environnement Supabase

## Dans votre dashboard Supabase (https://supabase.com/dashboard)

### 1. Allez dans "Edge Functions" → "Settings"

### 2. Ajoutez ces variables d'environnement :

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Configuration du webhook Stripe

Dans votre dashboard Stripe (https://dashboard.stripe.com/webhooks) :

**URL du webhook :**
```
https://olyswpmpvtyqwthxyfhq.supabase.co/functions/v1/stripe-webhook
```

**Événements à écouter :**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### 4. Récupérez le secret du webhook

Après avoir créé le webhook, copiez le "Signing secret" (commence par `whsec_`) et ajoutez-le comme `STRIPE_WEBHOOK_SECRET` dans Supabase.

## Pourquoi cette approche est meilleure :

✅ **Sécurité renforcée** : Intégration native avec l'auth Supabase
✅ **Performance optimisée** : Functions spécialisées plus rapides
✅ **Maintenance simplifiée** : Code déjà testé et fonctionnel
✅ **Synchronisation automatique** : Base de données mise à jour en temps réel
✅ **Gestion d'erreurs** : Système de retry et logging intégré