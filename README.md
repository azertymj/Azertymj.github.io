# Portfolio Personnel 🚀

Un portfolio moderne et responsive développé avec HTML, CSS et JavaScript.

## 🌟 Caractéristiques

- Design moderne et minimaliste
- Entièrement responsive (mobile, tablette, desktop)
- Animations fluides
- Mode sombre natif
- Navigation intuitive
- Sections organisées :
  - 🏠 Accueil
  - 📂 Projets
  - 💼 Expérience
  - 🛠️ Outils
  - 📧 Contact

## 🛠️ Technologies Utilisées

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (Vanilla)
- Font Awesome pour les icônes
- Google Fonts (Space Grotesk)

## 📱 Compatibilité

Le site est optimisé pour :
- Mobile (à partir de 360px)
- Tablettes
- Desktop
- Grands écrans (jusqu'à 1920px)

## 🚀 Installation

1. Clonez le repository
```bash
git clone https://github.com/Azertymj/portfolio.git
```

2. Ouvrez le dossier
```bash
cd portfolio
```

3. Ouvrez `index.html` dans votre navigateur ou utilisez un serveur local
```bash
# Si vous avez Python installé
python -m http.server 8000
# Si vous avez Node.js installé
npx serve
```

## 📂 Structure du Projet

```
portfolio/
│
├── index.html              # Page principale
├── assets/
│   ├── site.css            # Styles et animations partagés
│   ├── site.js             # Comportements partagés (nav, 3D, reveal, formulaire...)
│   ├── Moi.jpg              # Photo de profil
│   └── cv.pdf               # CV téléchargeable
├── projects/                # Une page détaillée par projet (URL propre : /projects/<slug>/)
│   ├── knetworking/
│   ├── viamyli/
│   ├── elevage-gabon/
│   ├── esictech/
│   ├── deriv-game/
│   ├── siges/
│   └── olatano-gizuwa/
└── README.md
```

Chaque page utilise des chemins relatifs, ce qui permet un déploiement identique à la racine
(`azertymj.github.io`) ou dans un sous-dossier (`azertymj.github.io/portfolio`), sans configuration
serveur supplémentaire (GitHub Pages ne supporte pas `.htaccess`).

## ✨ Personnalisation

1. **Couleurs** : Modifiez les variables `tailwind.config` dans chaque page (`colors`)
2. **Styles/animations partagés** : `assets/site.css` et `assets/site.js`
3. **Contenu** : Mettez à jour les informations dans `index.html`
4. **Nouveau projet** : Dupliquez un dossier de `projects/`, adaptez le contenu, puis ajoutez une
   carte dans la section Projets de `index.html`

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :
- hendrixmarvinmwouabo@gmail.com
- [Votre LinkedIn]
