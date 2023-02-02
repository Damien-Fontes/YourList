CREATE DATABASE yourlist;
CREATE USER yourlistU;
GRANT ALL PRIVILEGES ON *.* TO yourlistU;  
\u yourlist

CREATE TABLE Utilisateur (id BIGINT PRIMARY KEY AUTO_INCREMENT, login VARCHAR(50), password VARCHAR(64), nom VARCHAR(50), prenom VARCHAR(50), entreprise VARCHAR(64)); 
CREATE TABLE Playlist (id BIGINT PRIMARY KEY AUTO_INCREMENT, nomPlaylist VARCHAR(30), createur VARCHAR(64));
CREATE TABLE Possede (idUtilisateur BIGINT, idPlaylist BIGINT, PRIMARY KEY(idUtilisateur,idPlaylist));
CREATE TABLE Video (id BIGINT PRIMARY KEY AUTO_INCREMENT, titre VARCHAR(50), lien VARCHAR(128), duree BIGINT, site VARCHAR(50));
CREATE TABLE Contient (idVideo BIGINT, idPlaylist BIGINT, PRIMARY KEY(idVideo, idPlaylist));
CREATE TABLE Pub (id BIGINT PRIMARY KEY AUTO_INCREMENT, titre VARCHAR(50), contenu VARCHAR(50), Clics BIGINT, moyenPaiement VARCHAR(50), idUtilisateur BIGINT);