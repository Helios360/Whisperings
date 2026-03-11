Les routes sont dispo dans Whisperings-Collection

Pour demarrer le serveur il suffit de:
    - Se rendre sur le dossier "Server"
    - et lancer le server avec "node server.js"

La base de donnée est db.json (C'est un gouffre de performances cela dit)

En conclusion :
cd Server
touch db.json
echo "[]" > db.json
npm install
node server.js

Le server se lance automatiquement en http://0.0.0.0:3000