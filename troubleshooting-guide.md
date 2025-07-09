# 🚨 Guide de résolution des problèmes de paiement

## Problème actuel : "Failed to fetch"

### Cause probable :
Les Edge Functions ne sont pas encore déployées dans votre projet Supabase.

## 🔧 Solutions étape par étape :

### Option 1 : Vérification rapide
1. Allez sur : https://supabase.com/dashboard/project/olyswpmpvtyqwthxyfhq/functions
2. Vérifiez si vous voyez `stripe-checkout` et `stripe-webhook`
3. Si elles n'y sont pas, passez à l'Option 2

### Option 2 : Test direct de l'Edge Function
Testez si l'Edge Function répond :
```bash
curl -X POST https://olyswpmpvtyqwthxyfhq.supabase.co/functions/v1/stripe-checkout \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

Si vous obtenez une erreur 404, les fonctions ne sont pas déployées.

### Option 3 : Déploiement des Edge Functions
Les Edge Functions doivent être déployées via Supabase CLI :

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter à votre projet
supabase login
supabase link --project-ref olyswpmpvtyqwthxyfhq

# Déployer les fonctions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
```

## 🔍 Diagnostic des erreurs

### Si vous voyez "Failed to fetch" :
- ✅ Edge Functions pas déployées
- ✅ Variables d'environnement manquantes
- ✅ URL incorrecte

### Si vous voyez "Unauthorized" :
- ✅ Problème d'authentification Supabase
- ✅ Token expiré

### Si vous voyez "Price not found" :
- ✅ Produits pas créés dans Stripe
- ✅ Price IDs incorrects dans le code

## 📞 Prochaines actions

1. **Vérifiez d'abord** si les Edge Functions sont visibles dans le dashboard
2. **Si non**, vous devez les déployer avec Supabase CLI
3. **Ensuite**, configurez les variables d'environnement
4. **Enfin**, créez les produits dans Stripe

Dites-moi ce que vous voyez dans votre dashboard Supabase → Edge Functions !