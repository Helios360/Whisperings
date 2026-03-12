# 🌿 Whisperings Collection

Projet combinant un **frontend Vite** et un **backend Node.js Express**.  
Les routes du projet sont disponibles dans le dossier **`Whisperings-Collection`**.

***

## 🚀 Démarrage du serveur

Pour lancer le serveur localement :

```bash
cd Server
node server.js
```

Le serveur se lance automatiquement sur :  
👉 [http://0.0.0.0:3000](http://0.0.0.0:3000)

***

## 🗃️ Base de données

Le projet utilise une base légère au format **JSON**, nommée `db.json`.  
> ⚠️ Attention : ce système est pratique pour le développement, mais très lent en production.

### Initialisation rapide

```bash
cd Server
touch db.json
echo "[]" > db.json
npm install
node server.js
```

### test rapide

```bash
npm test
```

***

## 💡 Démarrage complet du projet (post-setup)

Une fois la configuration faite, tu peux relancer le projet complet avec :

```bash
node Server/server.js && npm run dev
```

***

## 🧱 Structure du projet

Voici la structure principale de l’application :

```
WHISPERINGS
│
├── Whisperings
│   ├── dist/            # Frontend (build Vite)
│   │   ├── assets/
│   │   └── index.html   # Page principale
│
└── Server
    ├── server.js        # Serveur backend principal
    └── db.json          # Base de données locale
```

- **`server.js`** sert le dossier `../Whisperings/dist/`  
- Il détecte automatiquement **`index.html`** comme *homepage root*

***

## 💬 Notes

- Préfère utiliser un vrai système de base de données (type SQLite ou MongoDB) pour améliorer les performances si le projet évolue.
- Le dossier **`Whisperings/dist`** contient le build final du frontend, prêt à être servi par le backend Node.js.
