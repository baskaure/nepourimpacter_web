# 🔧 Guide de débogage - Problèmes de paiement

## ✅ Étapes de résolution

### 1. Vérifiez les Edge Functions dans Supabase

Allez dans votre dashboard Supabase → Edge Functions et vérifiez que vous avez :
- ✅ `stripe-checkout` 
- ✅ `stripe-webhook`

Si elles n'existent pas, vous devez les déployer.

### 2. Variables d'environnement dans Supabase

Dans Settings → Edge Functions, ajoutez :
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook
```

### 3. Créez les produits tickets dans Stripe

Dans votre dashboard Stripe, créez ces produits :

**Produit 1 : Accès Standard**
- Prix : 89.00 EUR
- Type : One-time payment
- Price ID à noter : `price_ticket_basic`

**Produit 2 : Premium**  
- Prix : 189.00 EUR
- Type : One-time payment
- Price ID à noter : `price_ticket_premium`

**Produit 3 : VIP**
- Prix : 349.00 EUR  
- Type : One-time payment
- Price ID à noter : `price_ticket_vip`

**Produit 4 : Entreprise**
- Prix : 599.00 EUR
- Type : One-time payment  
- Price ID à noter : `price_ticket_enterprise`

### 4. Mettez à jour les Price IDs

Remplacez les Price IDs dans `src/stripe-config.ts` avec les vrais IDs de Stripe.

### 5. Configurez le webhook Stripe

URL : `https://olyswpmpvtyqwthxyfhq.supabase.co/functions/v1/stripe-webhook`

Événements :
- `checkout.session.completed`
- `payment_intent.succeeded`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### 6. Test de débogage

Ouvrez la console du navigateur (F12) et essayez :

1. **Test abonnement** : Allez sur la page abonnement
2. **Test ticket** : Essayez d'acheter un ticket
3. **Vérifiez les erreurs** dans la console

## 🚨 Erreurs communes

### "Failed to fetch"
- ✅ Vérifiez que les Edge Functions sont déployées
- ✅ Vérifiez les variables d'environnement
- ✅ Vérifiez l'URL Supabase dans .env.local

### "Price not found"  
- ✅ Créez les produits dans Stripe
- ✅ Mettez à jour les Price IDs dans le code

### "Unauthorized"
- ✅ Connectez-vous avant d'essayer de payer
- ✅ Vérifiez que l'auth Supabase fonctionne

## 📞 Prochaines étapes

1. **Déployez les Edge Functions** si elles n'existent pas
2. **Créez les produits Stripe** pour les tickets  
3. **Configurez le webhook** Stripe
4. **Testez les paiements** étape par étape

Dites-moi quelle étape pose problème et je vous aiderai !