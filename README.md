# Projet YourList - Damien Fontes

Lancer l'application :
Ce mettre dans le dossier : YourList/
-> docker-compose up --build
-> 127.0.0.1:5000

Logs pour se connecter en tant qu'admin : 

login : "Admin"
password : "Adminadmin."


Si jamais ça ne marche pas : 
- le fichier config pour ce connecter à la base de donnée se trouve dans :
app/src/backend/mysql/config.py

- le fichier de création de la base de donnée se trouve dans  :
app/src/backend/mysql/init.sql