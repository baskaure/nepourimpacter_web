# 📧 Guide de configuration de la confirmation par email

## 🎯 Configuration dans Supabase

### 1. **Activez la confirmation par email**
Allez dans votre dashboard Supabase :
👉 https://supabase.com/dashboard/project/olyswpmpvtyqwthxyfhq/auth/settings

Dans **"Auth Settings"** :
- ✅ **Enable email confirmations** = `ON`
- ✅ **Confirm email** = `ON`

### 2. **Configurez l'URL de redirection**
Dans **"URL Configuration"** :
- **Site URL** : `https://nepourimpacter.netlify.app`
- **Redirect URLs** : Ajoutez `https://nepourimpacter.netlify.app/auth?confirmed=true`

### 3. **Personnalisez l'email de confirmation**
Dans **"Email Templates"** → **"Confirm signup"** :

**Sujet :**
```
Confirmez votre inscription - Né pour impacter
```

**Corps de l'email (HTML) :**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
  <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1f2937; font-size: 28px; margin: 0;">Né pour impacter</h1>
      <p style="color: #6b7280; font-size: 16px; margin: 10px 0 0 0;">Le Gala des Entrepreneurs</p>
    </div>

    <!-- Main Content -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">Bienvenue dans la communauté !</h2>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Merci de vous être inscrit pour <strong>Né pour impacter</strong>. 
        Vous êtes maintenant à un clic de rejoindre une communauté d'entrepreneurs passionnés.
      </p>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et activer votre compte :
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 40px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background-color: #fbbf24; color: #000; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.2s;">
        Confirmer mon compte
      </a>
    </div>

    <!-- Event Info -->
    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 30px 0;">
      <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 10px 0;">📅 Événement à venir</h3>
      <p style="color: #4b5563; font-size: 14px; margin: 0;">
        <strong>Date :</strong> 28 juin 2025<br>
        <strong>Lieu :</strong> Lyon, France<br>
        <strong>Thème :</strong> Lève-toi et Bâtis
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.
      </p>
      <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
        © 2025 Né pour impacter - Tous droits réservés
      </p>
    </div>
  </div>
</div>
```

## 🔄 **Nouveau flux d'inscription**

### Avant (problématique) :
1. Utilisateur s'inscrit
2. ❌ Redirection directe vers l'accueil
3. ❌ Pas de confirmation d'email
4. ❌ Confusion sur l'état du compte

### Maintenant (amélioré) :
1. ✅ Utilisateur s'inscrit
2. ✅ Message "Vérifiez votre email"
3. ✅ Email de confirmation personnalisé envoyé
4. ✅ Clic sur le lien → redirection vers login
5. ✅ Message de confirmation sur la page login
6. ✅ Connexion sécurisée

## 🧪 **Test du nouveau système**

### Test complet :
1. **Inscrivez-vous** avec un nouvel email
2. **Vérifiez** que vous voyez "Vérifiez votre email"
3. **Consultez** votre boîte email
4. **Cliquez** sur le lien de confirmation
5. **Vérifiez** la redirection vers login avec message de succès
6. **Connectez-vous** avec vos identifiants

## ⚙️ **Configuration technique**

### Variables d'environnement (déjà configurées) :
- `VITE_SUPABASE_URL` ✅
- `VITE_SUPABASE_ANON_KEY` ✅

### Paramètres Supabase à vérifier :
- Email confirmations : **ON**
- Site URL : **https://nepourimpacter.netlify.app**
- Redirect URLs : **https://nepourimpacter.netlify.app/auth?confirmed=true**

Une fois configuré dans Supabase, le système fonctionnera parfaitement !