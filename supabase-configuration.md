# 🔧 Configuration Supabase - Instructions complètes

## 1. Variables d'environnement dans Supabase

### Allez dans votre dashboard Supabase :
👉 https://supabase.com/dashboard/project/olyswpmpvtyqwthxyfhq

### Naviguez vers : Settings → Edge Functions → Environment Variables

### Ajoutez ces variables :

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=whsec_m2IrCLrY8UtsvPSUWrfidu06fMMcMkPD
```

## 2. Vérification des Edge Functions

### Dans Edge Functions, vous devriez voir :
- ✅ `stripe-checkout` (déjà présente dans votre code)
- ✅ `stripe-webhook` (déjà présente dans votre code)

Si elles n'apparaissent pas dans le dashboard, c'est normal - elles sont dans votre code local.

## 3. Configuration du webhook Stripe

### Dans votre dashboard Stripe :
👉 https://dashboard.stripe.com/webhooks

### Créez un nouveau webhook avec :
**URL :** `https://olyswpmpvtyqwthxyfhq.supabase.co/functions/v1/stripe-webhook`

**Événements à sélectionner :**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated` 
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `payment_intent.succeeded`

## 4. Créer les produits tickets dans Stripe

### Dans Stripe Dashboard → Products, créez :

**1. Accès Standard**
- Nom : "Accès Standard"
- Prix : 89.00 EUR
- Type : One-time payment
- Copiez le Price ID généré

**2. Premium**
- Nom : "Premium" 
- Prix : 189.00 EUR
- Type : One-time payment
- Copiez le Price ID généré

**3. VIP**
- Nom : "VIP"
- Prix : 349.00 EUR
- Type : One-time payment
- Copiez le Price ID généré

**4. Entreprise**
- Nom : "Entreprise"
- Prix : 599.00 EUR
- Type : One-time payment
- Copiez le Price ID généré

## 5. Après avoir créé les produits

Donnez-moi les 4 Price IDs générés par Stripe (ils commencent par `price_`) et je mettrai à jour le code !

## ✅ Checklist de vérification

- [ ] Variables d'environnement ajoutées dans Supabase
- [ ] Webhook configuré dans Stripe avec la bonne URL
- [ ] 4 produits tickets créés dans Stripe
- [ ] Price IDs récupérés et prêts à être intégrés

Une fois ces étapes terminées, les paiements fonctionneront parfaitement !