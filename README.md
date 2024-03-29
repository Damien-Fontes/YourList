# Projet YourList - Damien Fontes

--------------------
Accès au code :
Le code se trouve sur le dépôt GitHub suivant : https://github.com/Damien-Fontes/YourList.
Pour y accéder : 
- Ouvrir un terminal
- Effectuer la commande : git clone https://github.com/Damien-Fontes/YourList.git

--------------------
Structures :
- Les documents à rendre se trouvent dans le dossier YourList/documentations/
- Les fichiers backend se trouvent dans les dossiers : 
    - YourList/ (pour le fichier app.py)
    - YourList/src/backend/
    - YourList/src/backend/mysql/

- Les fichiers frontend se trouvent dans les dossiers :
    - YourList/src/frontend/static/css/
    - YourList/src/frontend/static/js/
    - YourList/src/frontend/static/js/entreprise
    - YourList/src/frontend/templates/
    - YourList/src/frontend/templates/entreprise

- Les données se trouvent dans le dossier YourList/src/frontend/static/data/

--------------------
Installer et lancer l'application :
- Installer Docker Desktop 
- Ouvrir un terminal dans le dossier YourList/
- Effectuer la commande : docker-compose up --build ou sudo docker-compose up --build
- Une fois terminé, Flask et le serveur mysql sont lancés
- Se rendre sur une des urls suivantes : 
    - 127.0.0.1:5000/ pour utiliser l'application en tant que client.
    - 127.0.0.1:5000/connexionEntreprise/ pour utiliser l'application en tant qu'entreprise.

Identifiants pour se connecter : 
- login : "root"
- password : "root"

Identifiants pour se connecter en Entreprise : 
- login : "rootE"
- password : "root"

--------------------
Autres informations :
- Aucune publicités n'est présente au lancement de l'application.
Vous pouvez en rajouter dans la partie Entreprise : 127.0.0.1:5000/accueilEntreprise/
Des exemples de publicités (728x90 ou 320x50) à rajouter sont fournies dans le dossier : YourList/documentations/exemples_pub/ 

- Aucune playlist n'est présente au lancement de l'application.
Vous pouvez en créer dans la partie client : 127.0.0.1:5000/playlist/

Si jamais ça ne marche pas : 
- le fichier config pour ce connecter à la base de donnée se trouve dans : app/src/backend/mysql/config.py
- le fichier de création de la base de donnée se trouve dans  : app/src/backend/mysql/init.sql