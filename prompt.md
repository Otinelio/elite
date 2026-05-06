━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT DE DESIGN — ELITE PIZZA BURGER
Street Food Nocturne · Braise & Asphalte · Lomé, Togo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Construis un site web complet en React + TypeScript + Tailwind CSS pour Elite Pizza Burger,
fast-food situé Boulevard de la Kara, feu rouge Université IAEC / Tokoin Doumasséssé, Lomé, Togo.
WhatsApp : +22893015679 · Horaires : Tous les jours 11h00 – 22h00 · Devise : FCFA
Stack : React Router v6 · localStorage uniquement · lucide-react · Google Fonts · Zéro backend · Zéro Supabase

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— VISION GLOBALE —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le visiteur arrive et il ne voit pas un site — il voit une scène. Le Boulevard de la Kara à 19h,
l'enseigne qui s'allume, l'odeur de viande grillée qui traverse l'asphalte encore chaud. Le fond
est charbon, pas noir — charbon chaud, comme une braise qui ne s'est pas encore éteinte. Et dans
ce noir, le mot ELITE s'impose. Massif. Orange. Sans excuses. Pas de photo de burger générique
en fond d'écran. Pas de chef souriant avec une veste blanche. Pas de "Bienvenue chez nous."
Juste la marque, dense, assurée, taillée pour durer. En scrollant, les plats arrivent comme des
affiches arrachées d'un mur de Lomé — cadrées serré, lumineuses, contrastées, vivantes. Le jeune
de l'IAEC qui commande après les cours comprend immédiatement : c'est rapide, c'est son endroit,
c'est fait pour lui. La navigation est verticale à gauche sur desktop — discrète comme un guide
dans une rue que tu connais déjà. Ce site n'essaie pas d'être beau. Il est vrai.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— ARCHITECTURE GLOBALE —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGES DE L'APPLICATION :

━ PUBLIC (navigation principale) ━
/ → Home : hero, marquee, plats vedettes, CTA, infos pratiques
/menu → Menu : catalogue complet, panier, commande WhatsApp
/about → À propos : histoire, valeurs, adresse
/contact → Contact : carte, horaires, liens WhatsApp et Instagram

━ ACCÈS RESTREINT (aucun lien dans la navigation publique) ━
/admin → Dashboard admin : protégé par mot de passe
/menu/scan → Menu sur place : navigation TOTALEMENT ISOLÉE (logo + panier uniquement)
/cuisine → Interface cuisine : commandes temps réel, gestion des statuts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— RÈGLE CRITIQUE : /menu/scan EST UN MONDE ISOLÉ —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

La page /menu/scan utilise un Layout DISTINCT du reste du site.
Ce layout ne contient AUCUNE sidebar, AUCUNE bottom bar, AUCUN lien de navigation.

Header /menu/scan (seul élément de navigation autorisé) :
Fond #111111 + backdrop-filter blur(8px) · border-bottom: 1px solid rgba(244,130,31,0.15)
Hauteur : 56px · Deux éléments uniquement :
GAUCHE : Logo "E" en Syne 800 · 28px · couleur #F4821F dans un cercle 38px fond rgba(244,130,31,0.1)
suivi de "ELITE" Syne 800 · 20px · #F4821F
DROITE : icône ShoppingCart 22px · badge compteur orange · fond #F4821F · Inter 11px blanc
Aucun lien. Aucun menu. Aucune icône de navigation. Aucun accès vers les autres pages.
Implémentation : <ScanLayout> séparé de <MainLayout>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— NAVIGATION PRINCIPALE (pages publiques uniquement) —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAVIGATION DESKTOP (sidebar verticale gauche fixe, desktop >= 768px) :
Structure : position fixed · left:0 · top:0 · height:100vh · width:72px · z-index:50
Fond : rgba(15,15,15,0.95) + backdrop-filter: blur(16px)
Border-right : 1px solid rgba(244,130,31,0.10)

En haut : logo "E" Syne 800 · 30px · #F4821F · dans un cercle 42px fond rgba(244,130,31,0.08)
4 icônes de navigation empilées · centrées · espacement 48px
Icônes 22px · inactif: #8B8680 · actif: #F4821F
Label sous chaque icône : Syne 700 · 8px · MAJUSCULES · tracking 0.1em · #8B8680

Hover : fond circulaire rgba(244,130,31,0.08) · border-radius 8px · scale(1.04) · 180ms ease
Route active : icône #F4821F + barre verticale 2px solid #F4821F position absolute gauche

Bas de sidebar : icône MessageCircle 22px · couleur #25D366 (WhatsApp) · hover scale(1.1) · 150ms

NAVIGATION MOBILE (bottom bar fixe, < 768px) :
Height 64px · fond #111111 · border-top: 1px solid rgba(244,130,31,0.12)
4 onglets : Home / UtensilsCrossed / Info / MapPin · icônes 22px
Actif : icône #F4821F + point 4px orange centré sous l'icône
Inactif : icône #8B8680 · tap: scale(0.92) · 100ms
padding-bottom: env(safe-area-inset-bottom)

Contenu principal :
Desktop : margin-left: 72px
Mobile : margin-left: 0 · padding-bottom: 80px

NE JAMAIS ajouter de lien vers /admin, /menu/scan, /cuisine dans la navigation publique.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— DIRECTION ESTHÉTIQUE —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom de la direction : "Éditorial Urbain Nocturne · Enseigne de Rue · Braise sur Asphalte"

Ce que ce site N'EST PAS :

- Pas fond crème avec typographie en tampon : trop artisanal, pas le bon signal
- Pas hero plein écran avec photo de plat floue en fond et bouton CTA centré : cliché #1 du fast-food web
- Pas dark mode générique avec cartes grises et orange flashy sans caractère : cliché #2

Ce que ce site EST :

- Un journal de rue nocturne de Lomé — gros titres massifs, compositions asymétriques, photos cadrées
  comme des instantanés de night market
- L'énergie d'une enseigne qui s'allume sur le Boulevard de la Kara à 18h : orange braise sur fond charbon
- Un magazine de street food éditorial revu par un graphiste de Lomé : typographie affiche contemporaine,
  photos brutes, grille intentionnellement cassée

Comportement de la grille : asymétrique et éditorial — les éléments se décalent intentionnellement,
comme des affiches collées à des hauteurs différentes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— PALETTE —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Rôle              | Description                          | HEX     | Règle d'usage                                |
| ----------------- | ------------------------------------ | ------- | -------------------------------------------- |
| Fond Charbon      | Asphalte chaud, jamais le noir froid | #111111 | Background principal de toutes les pages     |
| Fond Surface      | Card, section alternée, plus chaud   | #1C1C1C | Cards, sections, sidebar                     |
| Orange Braise     | La flamme du logo, le signal fort    | #F4821F | CTA, prix, badges, hover — MAX 20% visible   |
| Orange Sombre     | Braise en veille, hover foncé        | #D96E0A | Hover des boutons primaires orange           |
| Blanc Lumière     | Éclat propre sur fond sombre         | #F0EDE8 | Texte principal, noms de plats, titres       |
| Gris Fumée        | Texte secondaire, silence            | #8B8680 | Descriptions, sous-titres, labels            |
| Rouge Alerte      | Signal d'urgence uniquement          | #C0392B | Badge Indisponible, erreurs admin uniquement |
| Vert Confirmation | Signal positif uniquement            | #27AE60 | Validation commande cuisine uniquement       |

Déclarer dans tailwind.config.ts :
colors: {
'charbon': '#111111',
'surface': '#1C1C1C',
'braise': '#F4821F',
'braise-dark': '#D96E0A',
'lumiere': '#F0EDE8',
'fumee': '#8B8680',
'rouge-alerte': '#C0392B',
'vert-ok': '#27AE60',
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— TYPOGRAPHIE — (mise à niveau premium)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Importer depuis Google Fonts dans index.html :
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

FONT 1 : Syne (remplace Barlow Condensed)
Pourquoi : Syne est une typographie contemporaine conçue à Paris, initialement pour un collectif
d'artistes. Elle combine la force d'un display avec une élégance géométrique rare — chaque lettre
a du poids et de la personnalité sans être vulgaire. Le weight 800 crée l'impact d'une enseigne,
le 700 structure sans écraser. Utilisée sur des sites comme Figma Community et des studios de design
africains émergents. Elle transforme ce site de "fast-food dark" à "marque de street food premium".

Usages :

- Hero "ELITE PIZZA BURGER" : 108px desktop / 58px mobile · weight 800 · tracking -0.03em
- "ELITE" logo sidebar : 26px · weight 800 · color #F4821F
- Titres de section : 52px desktop / 34px mobile · weight 800 · color #F0EDE8
- Labels de catégories (nav menu) : 10px · weight 700 · MAJUSCULES · tracking 0.18em · color #8B8680
- Prix des plats : 20px · weight 700 · color #F4821F
- Boutons CTA : 12px · weight 700 · MAJUSCULES · tracking 0.12em
- Numéro de téléphone hero : 64px desktop / 36px mobile · weight 800 · color #111111

FONT 2 : DM Sans
Pourquoi : DM Sans est la référence du design éditorial contemporain — propre, modulaire, lisible
à toutes les tailles, avec une personnalité subtile dans ses courbes. Elle complète Syne sans
compétition. Légèrement humaniste, elle apporte de la chaleur là où Syne apporte de la force.
Idéale pour les descriptions, les textes longs, et toute la hiérarchie secondaire de l'interface.

Usages :

- Body text : 15px · weight 400 · line-height 1.8 · color #8B8680
- Noms des plats (cards) : 15px · weight 600 · color #F0EDE8
- Descriptions des plats : 13px · weight 400 · line-height 1.65 · color #8B8680
- Labels nav sidebar : 9px · weight 500 · MAJUSCULES · tracking 0.14em · color #8B8680
- Infos pratiques (adresse, horaires) : 14px · weight 400 · color #F0EDE8
- Admin (formulaires, tableaux) : 14px · weight 400 · color #1C1C1C sur fond clair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— SYSTÈME D'ICÔNES —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Librairie : lucide-react UNIQUEMENT · strokeWidth: 1.5 (élégant sur fond sombre)
ZÉRO emoji dans tout le site — ni dans l'interface, ni dans les boutons, ni dans les cards,
ni dans le footer, ni dans les placeholders. Tout passe par lucide-react.

Mapping complet :

Navigation sidebar desktop :
Home → Home · 22px · inactif #8B8680 · actif #F4821F
Menu → UtensilsCrossed · 22px · même règle
À propos → Info · 22px · même règle
Contact → MapPin · 22px · même règle
WhatsApp (bas) → MessageCircle · 22px · toujours #25D366

Navigation bottom bar mobile (4 onglets) :
Home, UtensilsCrossed, Info, MapPin — 22px · actif #F4821F · inactif #8B8680

Hero / CTA :
Voir le menu → ArrowRight · 18px
Commander WhatsApp→ MessageCircle · 18px · #25D366
Scroll indicator → ChevronDown · 24px · animation bounce

Infos pratiques / Contact :
Adresse → MapPin · 20px · #F4821F
Horaires → Clock · 20px · #F4821F
Téléphone → Phone · 20px · #F4821F
Instagram → Instagram · 20px · #F0EDE8 · hover #F4821F

Marquee :
Séparateurs → Dot · 14px · #F4821F (entre chaque item du marquee)

Features "Pourquoi Elite ?" :
Rapide → Zap · 36px · #F4821F
Accessible → Banknote · 36px · #F4821F
Savoureux → Flame · 36px · #F4821F
Livraison → Bike · 36px · #F4821F

Menu et panier :
CartFab → ShoppingCart · 24px
Ajouter → Plus · 16px
Enlever → Minus · 16px
Supprimer → Trash2 · 16px
Fermer → X · 20px
WhatsApp CTA→ MessageCircle · 18px · #25D366

Modal table /menu/scan :
Numéro table→ Hash · 40px · #F4821F

Admin :
Connexion → Lock · 20px
Déconnexion → LogOut · 18px
Modifier → Pencil · 16px
Supprimer → Trash2 · 16px
Sauvegarder → Save · 16px
Exporter → Copy · 16px
Toggle dispo→ Eye / EyeOff · 16px

Cuisine :
Commande reçue → Bell · 20px
En préparation → ChefHat · 20px
Prête → CheckCircle · 20px
Servie / Archivée → Archive · 20px
Refresh → RefreshCw · 18px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— ÉCRAN DE CHARGEMENT —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Concept : lettres qui s'allument une à une — comme une enseigne électrique qui démarre sur
le Boulevard de la Kara à la tombée de la nuit. Durée totale : 2.2 secondes. Fond #111111.

0ms : Fond charbon. Silence. Écran vide.
200ms : "E" apparaît · Syne 800 · 80px · color #F4821F · opacity 0→1 · 250ms ease-out.
Légère vibration : translateX(-1px)→(+1px)→(0) en 120ms — buzz électrique.
380ms : "L" s'allume · même animation · stagger 180ms.
560ms : "I" s'allume.
740ms : "T" s'allume.
920ms : "E" final s'allume.
1050ms : Sous "ELITE", barre fine #F4821F : width 0→80px · 280ms ease-out.
1400ms : "Fast Food · Lomé" · DM Sans 400 · 13px · #8B8680 · opacity 0→1 · 300ms.
1800ms : Tout s'efface · opacity 1→0 · 350ms ease-in · cubic-bezier(0.4,0,1,1).
2200ms : Le site apparaît — fond charbon déjà prêt, aucun flash blanc.

Pas de spinner. Pas de barre de progression. Pas de logo qui tourne.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— VOLET 1 : SITE VITRINE PUBLIC —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE / — HOME

Section Hero (100vh, fond #111111) :
Layout asymétrique : 55% gauche texte · 45% droite image. Pas de photo en background flou.

Colonne gauche : - Badge pill : fond rgba(244,130,31,0.10) · border 1px solid rgba(244,130,31,0.22) ·
DM Sans 500 · 11px · #F4821F · MAJUSCULES · "Feu rouge IAEC · Bd de la Kara · Lomé" - "ELITE" · Syne 800 · 108px desktop / 58px mobile · color #F0EDE8 - "PIZZA BURGER" · Syne 700 · 44px desktop / 26px mobile · color #F4821F - Tagline : DM Sans 400 · 16px · #8B8680 · italic · "Ici, la faim n'a aucune chance." - 2 CTA côte à côte :
· Primaire : fond #F4821F · texte #111111 · Syne 700 · 12px MAJUSCULES · "VOIR LE MENU"
· icône ArrowRight 16px · hover: fond #D96E0A · scale(1.02) · 200ms ease
· Secondaire : border 1px solid rgba(240,237,232,0.18) · texte #F0EDE8 · "COMMANDER"
· icône MessageCircle 16px #25D366 · hover: border-color #F4821F · 200ms ease - Scroll indicator : icône ChevronDown 24px #8B8680 · animation bounce 1.5s infinite · en bas gauche

Colonne droite : - Photo portrait 4:3 · border-radius 6px · filter contrast(1.1) saturate(1.1) - Cadre : border 1.5px solid rgba(244,130,31,0.25) - Badge flottant : position absolute coin bas-gauche · fond #F4821F · Syne 800 · 15px
"11h – 22h · 7J/7" · padding 8px 14px · border-radius 3px

Élément signature : le mot "ELITE" déborde intentionnellement, son dernier "E" passe
derrière la photo de droite. Casse la grille. Desktop uniquement.

Section Marquee (54px, fond #F4821F) :
Défilement CSS pur · animation 28s linear infinite
Syne 700 · 14px · blanc · MAJUSCULES · tracking 0.06em
Contenu (répété 3×) :
"BURGERS · PIZZAS · CHICKEN CROUSTILLANT · FRITES MAISON · SERVICE RAPIDE ·
BD DE LA KARA · 11H–22H · LIVRAISON DISPONIBLE · FAST FOOD LOMÉ ·"
Séparateurs : icône Dot 12px blanc entre chaque item (lucide-react)
Aucun emoji.

Section "Nos Plats" :
Titre : "NOS PLATS" · Syne 800 · 52px · #F0EDE8 · aligné gauche
Sous-titre : DM Sans 400 · 14px · #8B8680 · "Burgers · Pizzas · Chicken — simple, rapide, bon."
Grille 3 colonnes desktop / scroll horizontal mobile

Chaque card : - Fond #1C1C1C · border 1px solid rgba(244,130,31,0.08) · border-radius 10px · overflow hidden - Image 16:9 · filter contrast(1.08) saturate(1.1) - Badge catégorie position absolute haut-droite · fond rgba(244,130,31,0.88) ·
Syne 700 · 9px MAJUSCULES · blanc - Nom : DM Sans 600 · 16px · #F0EDE8 · padding 16px 16px 4px - Description : DM Sans 400 · 13px · #8B8680 · 2 lignes max · padding 0 16px - Prix : Syne 700 · 20px · #F4821F · padding 8px 16px - Bouton "AJOUTER" : pleine largeur · fond rgba(244,130,31,0.08) ·
border-top 1px solid rgba(244,130,31,0.12) · icône Plus 14px #F4821F ·
Syne 700 · 11px · #F4821F · padding 12px
Hover : fond #F4821F · texte #111111 · 180ms ease - Hover card : translateY(-6px) · box-shadow 0 16px 40px rgba(0,0,0,0.45) · 240ms ease

3 plats vedettes (depuis getRestaurantData().items) :

- Cheese Burger — 2 500 FCFA
- Pizza Margherita — 3 000 FCFA
- Bucket Chicken 6pcs — 3 500 FCFA

Section "Pourquoi Elite ?" (fond #0D0D0D) :
Grille 2×2 desktop / 1 colonne mobile
Chaque bloc : icône 36px #F4821F · titre Syne 800 · 22px · #F0EDE8 · texte DM Sans 14px #8B8680 - Zap "Rapide" — "Commandé, préparé, prêt. Pas de jargon." - Banknote "Accessible" — "De 2 000 à 5 000 FCFA. Fait pour les étudiants." - Flame "Savoureux" — "Recettes simples. Ingrédients frais. Résultat constant." - Bike "Livraison" — "Zone Bd de la Kara. Appelle ou commande via WhatsApp."

Section CTA Téléphone (fond #F4821F) :
"COMMANDE DIRECTE" · Syne 700 · 14px · #111111 · MAJUSCULES · centré
Numéro : Syne 800 · 64px desktop / 36px mobile · #111111 · "93 01 56 79"
Icône Phone 44px #111111 à gauche du numéro
Bouton : fond blanc · texte #F4821F · Syne 700 · 12px MAJUSCULES · "APPELER MAINTENANT"
href="tel:+22893015679"

Section Horaires & Adresse (fond #1C1C1C) :
Deux colonnes : - Clock 24px #F4821F + "Tous les jours · 11h00 – 22h00" · Syne 700 · 26px · #F0EDE8 - MapPin 24px #F4821F + "Bd de la Kara · Feu rouge IAEC · Tokoin Doumasséssé · Lomé"
· Syne 700 · 20px · #F0EDE8

---

PAGE /menu — MENU COMPLET

Header sticky :
Fond #111111 + blur(8px) · border-bottom 1px solid rgba(244,130,31,0.12) · height 56px
Gauche : "NOTRE MENU" · Syne 800 · 30px · #F0EDE8
Droite : ShoppingCart 22px + badge compteur orange · fond #F4821F · DM Sans 600 · 11px blanc

Navigation catégories (sticky sous le header) :
Scroll horizontal · fond #111111 · border-bottom 1px solid rgba(255,255,255,0.05)
Pills : transparent au repos · border 1px solid rgba(255,255,255,0.08) · border-radius 5px
Actif : fond #F4821F · texte #111111 · border transparent
Inactif : texte #8B8680 · hover texte #F0EDE8
Police : Syne 700 · 10px · MAJUSCULES · tracking 0.14em
Catégories : TOUS · BURGERS · PIZZAS · CHICKEN · ACCOMPAGNEMENTS · BOISSONS

Titre de chaque catégorie :
Syne 800 · 46px · #F0EDE8 · padding 32px 0 16px
Filet orange 1px dessous · width fit-content · margin-bottom 24px
Légère rotation : transform rotate(-0.4deg) — comme une étiquette de guichet
Élément signature menu : chaque titre de section incliné, comme collé de travers sur un mur

Grille articles (2 colonnes desktop / 1 mobile) :
Chaque item — layout horizontal : - Photo carrée 80px · border-radius 5px · filter contrast(1.06) - Centre : DM Sans 600 · 15px · #F0EDE8 · description DM Sans 400 · 13px · #8B8680 · 2 lignes max - Droite : prix Syne 700 · 20px · #F4821F · bouton Plus 32×32px rond #F4821F - Si indisponible : badge "INDISPONIBLE" · fond #C0392B · Syne 700 · 9px · blanc · bouton opacity 0.3 - Border-bottom : 1px solid rgba(255,255,255,0.05) - Hover fond : rgba(255,255,255,0.025) · 140ms

CartFab (panier flottant) :
Position fixed · bottom 24px · right 24px (desktop) · bottom 84px (mobile)
56×56px · fond #F4821F · border-radius 14px · ShoppingCart 24px blanc
Badge : fond #C0392B · DM Sans 700 · 11px · blanc · position absolute top:-8px right:-8px
Animation badge : scale 1→1.3→1 · 300ms spring · visible uniquement si panier non vide

CartDrawer (tiroir panier) :
Mobile : bottom sheet · translateY(100%→0) · 380ms cubic-bezier(0.32,0.72,0,1)
Desktop : drawer droit · 420px · translateX(420px→0) · 350ms cubic-bezier(0.32,0.72,0,1)
Fond #1C1C1C · border-left 1px solid rgba(244,130,31,0.12) · overlay rgba(0,0,0,0.65)

Header : "MA COMMANDE" · Syne 800 · 18px · #F0EDE8 + icône X droite
Articles : DM Sans 600 · 15px · Minus/Plus/Trash2 · prix Syne 700 · 18px · #F4821F
Sous-total : Syne 800 · 24px · #F4821F
Note cuisine : DM Sans 400 · 13px · placeholder "Note pour la cuisine..."
Bouton WhatsApp : fond #25D366 · pleine largeur · Syne 700 · 13px blanc MAJUSCULES
· MessageCircle 16px · hover fond #1EA452 · 150ms

État vide : ShoppingCart 48px opacity 0.12 centré + DM Sans italic 400 · 14px · #8B8680
"Rien encore... ajoute quelque chose !" — aucun emoji.

Persistance : localStorage["elite_cart"] · survit au rechargement.

Message WhatsApp formaté :
Commande — Elite Pizza Burger :

- 2x Cheese Burger — 5 000 FCFA
- 1x Pizza Margherita — 3 000 FCFA

Total : 8 000 FCFA

Note : sans oignons

Merci de confirmer ma commande.

wa.me/22893015679?text=[message encodé]
Prix formatés : new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'

---

PAGE /about — À PROPOS

Header : fond #F4821F · "NOTRE HISTOIRE" · Syne 800 · 68px · blanc

Layout 2 colonnes :
Gauche : photo restaurant · border 1.5px solid rgba(244,130,31,0.28) · border-radius 6px
Droite : texte DM Sans

Titre : "L'Elite depuis le premier jour" · Syne 800 · 38px · #F0EDE8
Texte DM Sans 400 · 15px · #8B8680 · line-height 1.8 :
"Sur le Boulevard de la Kara, à deux pas de l'IAEC, Elite Pizza Burger s'est imposé comme
le fast-food de référence du quartier. Pas de chichi — des burgers généreux, des pizzas simples
et des chicken croustillants à des prix que les étudiants et les jeunes actifs de Lomé peuvent
se permettre tous les jours. Ouvert 7 jours sur 7 de 11h à 22h, Elite c'est l'endroit où la faim
n'a aucune chance." [À ENRICHIR avec l'histoire réelle du fondateur]

Section Valeurs (3 colonnes) :
Icône 32px #F4821F · Syne 800 · 22px · #F0EDE8 · DM Sans 400 · 14px · #8B8680

- Flame "Saveur" — "Des recettes simples, perfectionnées. Le burger que tu reviens commander."
- Users "Communauté" — "Le spot du quartier IAEC. Pour les étudiants, les actifs, tout Lomé."
- Clock "Disponibilité" — "11h à 22h, 7 jours sur 7. Même le dimanche, même les jours fériés."

---

PAGE /contact — CONTACT

Layout 3 blocs pleine largeur empilés :

Bloc 1 — Fond #1C1C1C :
MapPin 32px #F4821F + "OÙ NOUS TROUVER" · Syne 800 · 34px · #F0EDE8
Adresse DM Sans 400 · 15px · #8B8680 :
"Boulevard de la Kara · Feu rouge Université IAEC / Adewui · Tokoin Doumasséssé · Lomé, Togo"
Bouton "OUVRIR DANS MAPS" · border 1px solid #F4821F · texte #F4821F

Bloc 2 — Fond #F4821F :
Phone 32px #111111 + "APPELEZ-NOUS" · Syne 800 · 34px · #111111
"+228 93 01 56 79" · Syne 800 · 54px · #111111
MessageCircle 22px + "WhatsApp disponible" · DM Sans 400 · 14px · #111111

Bloc 3 — Fond #111111 :
Clock 32px #F4821F + "HORAIRES" · Syne 800 · 34px · #F0EDE8
"Tous les jours · 11h00 – 22h00" · Syne 800 · 46px · #F4821F
Instagram 20px #F0EDE8 + "@elitechickenpizzaburgerlome" · DM Sans 400 · 14px · #F0EDE8

Google Maps embed : iframe pleine largeur · height 280px · border 0
Coordonnées : lat 6.16358, lng 1.21476

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— VOLET 2 : DASHBOARD ADMIN (/admin) —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADMIN_PASSWORD = "elite2025" — À CHANGER AVANT MISE EN LIGNE.
Auth : sessionStorage["elite_admin_auth"] = "true" si mot de passe correct.

Écran login (si non authentifié) :
Fond #111111 · card #1C1C1C · border 1px solid rgba(244,130,31,0.18) · border-radius 10px · max-width 380px
"ELITE" · Syne 800 · 32px · #F4821F + Lock 20px
Champ password : fond rgba(255,255,255,0.04) · border 1px solid rgba(255,255,255,0.1) · DM Sans 14px #F0EDE8
Bouton "ACCÉDER" : fond #F4821F · Syne 700 · 12px MAJUSCULES · pleine largeur
Erreur : DM Sans 13px #C0392B "Mot de passe incorrect."

Dashboard (si authentifié) :
Style distinct : fond #F8F9FA · look outil neutre et lisible · mobile-first
Bouton "Déconnexion" icône LogOut en haut à droite
4 onglets : MENU | CATÉGORIES | PARAMÈTRES | EXPORT

TAB 1 — MENU :
Liste des plats groupés par catégorie
Chaque plat : nom · prix · toggle Eye/EyeOff disponible · boutons Pencil + Trash2
Bouton "+ Ajouter un plat" → modal : nom, description, prix, catégorie, image URL, disponible
Données lues/écrites dans localStorage["elite_menu"]

TAB 2 — CATÉGORIES :
Liste catégories + nb de plats · Ajouter / Renommer / Supprimer
Flèches haut/bas pour réordonner

TAB 3 — PARAMÈTRES :
Nom · Tagline · WhatsApp · Adresse · Horaires · Instagram · Facebook
Toggle "Ouvert / Fermé" → si fermé : bannière rouge sur toutes les pages publiques
"RESTAURANT ACTUELLEMENT FERMÉ" · fond #C0392B · Syne 700 · texte blanc
Bouton "Sauvegarder" icône Save · fond #F4821F
localStorage["elite_restaurant_info"]

TAB 4 — EXPORT :
Bouton "Copier la config JSON" icône Copy
Bouton "Réinitialiser aux données par défaut" avec confirmation

MENU PAR DÉFAUT (initialiser si localStorage["elite_menu"] absent) :

BURGERS :
Cheese Burger · 2500 FCFA · available: true
Chicken Burger · 2500 FCFA · available: true
Double Burger · 3500 FCFA · available: true
Classic Burger · 2000 FCFA · available: true
BBQ Burger · 3000 FCFA · available: true

PIZZAS :
Margherita · 3000 FCFA · available: true
Chicken Spicy · 3500 FCFA · available: true
Pepperoni · 4000 FCFA · available: true
4 Fromages · 4500 FCFA · available: true
Végétarienne · 3000 FCFA · available: true

CHICKEN :
Bucket 6 pièces · 3500 FCFA · available: true
Bucket 12 pièces · 6000 FCFA · available: true
Wings x6 · 2500 FCFA · available: true
Chicken Box · 3000 FCFA · available: true
Tenders x5 · 2500 FCFA · available: true

ACCOMPAGNEMENTS :
Frites classiques · 1000 FCFA · available: true
Frites épicées · 1200 FCFA · available: true
Onion Rings · 1200 FCFA · available: true
Coleslaw · 800 FCFA · available: true

BOISSONS :
Coca-Cola · 600 FCFA · available: true
Fanta · 600 FCFA · available: true
Jus de fruits · 700 FCFA · available: true
Eau · 400 FCFA · available: true
Bissap · 800 FCFA · available: true

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— VOLET 3 : MENU SUR PLACE (/menu/scan) — MONDE ISOLÉ —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPOSANT : MenuPage(scanMode: boolean)
/menu → <MenuPage scanMode={false} /> dans <MainLayout>
/menu/scan → <MenuPage scanMode={true} /> dans <ScanLayout> (layout séparé, isolé)

<ScanLayout> — Règles strictes :
AUCUNE sidebar. AUCUNE bottom bar. AUCUN lien de navigation vers d'autres pages.
Seul élément de chrome : le header décrit ci-dessus (logo + panier).
Le visiteur sur /menu/scan ne peut PAS naviguer vers /, /menu, /about, /contact.
Il ne voit que : header minimal, modal de table (si nécessaire), puis le menu.

COMPORTEMENT /menu/scan :

1. Au chargement : lire localStorage["elite_table_number"]
2. Si vide → afficher TableModal bloquant plein écran
3. Client saisit son numéro de table (1 à 30) → valide
4. Stocker dans localStorage["elite_table_number"] → déverrouiller le menu
5. Aucune interaction possible avec le menu avant validation

TableModal — RÈGLES STRICTES :
Non-dismissable : pas de croix · overlay non-cliquable · pas d'Escape
Saisie TOUJOURS manuelle — ne pas lire ?table= dans l'URL
Fond #111111 · card #1C1C1C · max-width 400px · centré
Hash 40px #F4821F centré en haut
Titre : "Votre numéro de table ?" · Syne 800 · 30px · #F0EDE8
Sous-titre : DM Sans 400 · 14px · #8B8680 · "Entrez le numéro pour accéder au menu"
Input : height 52px · fond rgba(255,255,255,0.04) · border 2px solid rgba(244,130,31,0.28)
· Syne 700 · 24px · #F0EDE8 · centré · placeholder "ex : 7"
Input focus : border-color #F4821F · 200ms
Bouton "CONFIRMER" : fond #F4821F · Syne 700 · 13px MAJUSCULES · pleine largeur · 52px height
Désactivé si vide/invalide : opacity 0.35
Animation entrée modal : scale(0.96)→1 + opacity 0→1 · 280ms ease-out

Badge table (visible après validation) :
Position fixed · top 16px · right 24px · fond rgba(244,130,31,0.9)
Hash 14px + "Table 7" · Syne 700 · 13px · #111111

Menu identique à /menu MAIS :
Bouton panier → "ENVOYER EN CUISINE" (ChefHat 16px + MessageCircle 16px)
Action "Envoyer en cuisine" → crée commande dans localStorage["elite_orders"] :
{
id: `CMD-${Date.now()}`,
table: Number(localStorage["elite_table_number"]),
items: [...panier],
note: noteTexte,
status: "en_attente",
timestamp: new Date().toISOString(),
total: calculerTotal()
}
Animation succès : overlay #27AE60 opacity 0→0.85→0 · checkmark SVG · 1.5 secondes.
Puis vider le panier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— VOLET 4 : INTERFACE CUISINE (/cuisine) —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Accès direct sans mot de passe (tablette fixe derrière le comptoir).

Header :
"CUISINE ELITE" · Syne 800 · 34px · #F4821F
Badge "X en attente" fond #C0392B · pulsation CSS opacity 1→0.6→1 · 1s infinite
Horloge live (Date() mis à jour chaque seconde) · DM Sans 400 · 14px · #8B8680
RefreshCw 18px #8B8680 · clic : rechargement manuel

Auto-refresh : polling toutes les 8 secondes (useEffect + setInterval, cleanup dans return)
Bip sonore (Web Audio API) à chaque nouvelle commande détectée :
const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.connect(gain); gain.connect(ctx.destination);
osc.frequency.value = 880; gain.gain.value = 0.25;
osc.start(); setTimeout(() => osc.stop(), 180);
Entourer dans try/catch.

Tabs : TOUTES | EN ATTENTE | EN PRÉPARATION | PRÊTES | SERVIES

Carte commande :
En-tête : ID CMD-XXXXX + badge statut + heure (timeago)
"TABLE 7" · Syne 800 · 26px · #F4821F
Articles : nom + qté + sous-total · note cuisine · total Syne 700 · 20px · #F4821F
Boutons selon statut :
en_attente → "COMMENCER" · ChefHat · fond #F4821F · texte #111111
en_preparation → "PRÊTE" · CheckCircle · fond #27AE60 · texte blanc
prete → "SERVIE" · Archive · fond #8B8680 · texte blanc

Fond des cartes :
en_attente : border-left 3px solid #F4821F · fond rgba(244,130,31,0.04) · badge pulsant
en_preparation: fond rgba(244,130,31,0.07)
prete : fond rgba(39,174,96,0.07) · border-left 3px solid #27AE60
servie : fond rgba(255,255,255,0.02) · opacity 0.45

Accordéon archives (commandes "servie") :
"Archives" icône ChevronDown · clic pour ouvrir/fermer
Stats : X commandes servies · XX XXX FCFA estimés

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— ANIMATIONS SYSTÈME —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Entrées scroll (IntersectionObserver) :
translateY(22px)→0 · opacity 0→1 · 420ms · cubic-bezier(0.16,1,0.3,1)
Stagger 65ms entre éléments d'un même groupe

Transitions de pages : fade opacity 0→1 · 220ms ease

Micro-interactions cards :
hover translateY(-6px) + box-shadow 0 16px 40px rgba(0,0,0,0.5) · 220ms ease
Image : contrast(1.08)→contrast(1.14) · 220ms

Boutons CTA : hover scale(1.03) · active scale(0.96) · 120ms ease

Marquee : CSS pur · 28s linear infinite · pas de JS

CartFab badge : scale 1→1.35→1 · 320ms spring · au changement de compteur

TableModal : scale(0.95)→1 · opacity 0→1 · 280ms ease-out

Carte cuisine : fadeIn + slideInLeft 22px · 300ms ease

JAMAIS : parallax, curseur custom, bounce élastique, confettis, compteurs au scroll.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— IMAGES —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Traitement CSS global : filter contrast(1.08) saturate(1.1) — photos plus denses sur fond sombre.
Border-radius photos : 6px
Overlays : gradient from rgba(17,17,17,0) to rgba(17,17,17,0.68) depuis le bas sur hero cards.

Queries Unsplash (?w=800&q=80&fit=crop) :
Hero home : "gourmet smash burger sesame black background studio"
Cheese Burger : "classic cheeseburger lettuce tomato overhead natural light"
Pizza : "homemade pizza margherita mozzarella basil wooden board"
Chicken : "crispy fried chicken golden crunchy overhead light"
Section vedettes bg: "fast food restaurant neon signs night street"
À propos façade : "small restaurant exterior street west africa"
À propos cuisine : "fast food kitchen preparation burger grill action"
Contact : "food delivery scooter city night street"
Ambiance 1 : "burger fries cola overhead flat lay dark background"
Ambiance 2 : "pizza slice pull cheese close up overhead"
Ambiance 3 : "fried chicken bucket crispy golden close up"
Ambiance 4 : "young people eating fast food restaurant friends"
Ambiance 5 : "street food vendor night market west africa"
Ambiance 6 : "onion rings fries food photography dark background"

Utiliser balises <img> avec attribut alt descriptif. Pas d'images générées par IA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— FOOTER —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fond #0A0A0A · padding 60px · plus sombre que le charbon principal.
3 colonnes desktop / 1 colonne mobile :

Col 1 :
"ELITE" · Syne 800 · 54px · #F4821F
"PIZZA BURGER" · Syne 700 · 22px · #8B8680
DM Sans 400 · 13px · #8B8680 · "Fast-food de quartier · Lomé, Togo"

Col 2 — NAVIGATION :
Syne 700 · 10px · MAJUSCULES · tracking 0.16em · #8B8680 · "NAVIGATION"
Liens : DM Sans 400 · 14px · #F0EDE8 · hover #F4821F · 150ms
Home · Menu · À propos · Contact

Col 3 — CONTACT :
MapPin 16px + "Bd de la Kara · Lomé" · DM Sans 400 · 14px · #8B8680
Clock 16px + "11h00 – 22h00 · 7J/7" · DM Sans 400 · 14px · #8B8680
Phone 16px + "+228 93 01 56 79" · DM Sans 400 · 14px · #F0EDE8
Instagram 18px · #8B8680 · hover #F4821F · clic : instagram.com/elitechickenpizzaburgerlome

Ligne légale :
border-top 1px solid rgba(255,255,255,0.05) · padding-top 24px
DM Sans 400 · 11px · #8B8680 · "© 2025 Elite Pizza Burger · Lomé, Togo · Tous droits réservés."
Aucun emoji dans le footer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— ARCHITECTURE TECHNIQUE FINALE —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

React Router v6 · CartContext global · useLocalStorage hook · usePolling(fn, ms) hook

DEUX layouts distincts :
<MainLayout> → sidebar desktop + bottom bar mobile · margin-left 72px desktop · padding-bottom 80px mobile
<ScanLayout> → header minimal (logo + panier) uniquement · aucun lien de navigation · monde isolé

Routing :
/ · /menu · /about · /contact → <MainLayout>
/menu/scan → <ScanLayout>
/admin · /cuisine → layouts propres (pas de nav publique)

Fonction partagée getRestaurantData() :
Lit localStorage["elite_menu"] et localStorage["elite_restaurant_info"]
Si absent → retourne DEFAULT_DATA (menu hardcodé ci-dessus)
Utilisée par /menu, /menu/scan, /about, /contact et /admin

const ADMIN_PASSWORD = "elite2025" — À CHANGER AVANT MISE EN LIGNE.

Prix partout : new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'

Polling /cuisine : clearInterval dans useEffect return
Web Audio bip dans try/catch
Toutes animations : CSS transitions/transforms/keyframes — pas de lib externe.

Zéro backend · zéro API externe · zéro Supabase · tout dans localStorage.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMENT UTILISER CE PROMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Copie l'intégralité du brief ci-dessus
2. Ouvre Lovable (lovable.dev) → Nouveau projet
3. Colle dans le chat de l'agent et lance la génération
4. Si incomplet → générer volet par volet :
   · D'abord : site vitrine (/, /menu, /about, /contact) + navigation
   · Ensuite : /admin (login, dashboard, gestion menu)
   · Ensuite : /menu/scan (ScanLayout isolé + modal table)
   · Enfin : /cuisine (interface temps réel)
5. Vérifier /menu/scan : aucun lien vers d'autres pages, header minimal uniquement
6. Vérifier /admin en tapant l'URL directement
7. Tester /cuisine : les commandes de /menu/scan doivent y apparaître
8. Contrôler : AUCUN emoji dans toute l'interface — lucide-react uniquement

SYNCHRONISATION DES DONNÉES :
Les modifications admin ne sont visibles que sur le MÊME navigateur.
Pour déployer : "Exporter config" dans /admin → partager le JSON au développeur
qui met à jour DEFAULT_DATA dans le code.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS À CONFIRMER AVEC LE PROPRIÉTAIRE :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Histoire exacte : date de fondation, fondateur → enrichir /about
- Zone de livraison exacte couverte depuis le Bd de la Kara
- Lien Google Maps exact de l'établissement
- WhatsApp confirmé : +22893015679
- Prix du menu à valider (liste ci-dessus est une base)
- Photo réelle façade ou intérieur pour /about
- Mot de passe admin définitif (remplacer "elite2025")
- Instagram à vérifier : @elitechickenpizzaburgerlome ou @elitechicken_togo
