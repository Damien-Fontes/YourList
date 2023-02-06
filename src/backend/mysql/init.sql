CREATE DATABASE yourlist;
CREATE USER yourlistU;
GRANT ALL PRIVILEGES ON *.* TO yourlistU;  
\u yourlist

CREATE TABLE utilisateur (id BIGINT PRIMARY KEY AUTO_INCREMENT, login VARCHAR(50), password VARCHAR(64), nom VARCHAR(50), prenom VARCHAR(50), entreprise VARCHAR(64), compteEntreprise TINYINT(1), email VARCHAR(50)); 
CREATE TABLE playlist (id BIGINT PRIMARY KEY AUTO_INCREMENT, nomPlaylist VARCHAR(30), thumbnail VARCHAR(128), createur VARCHAR(64));
CREATE TABLE possede (idUtilisateur BIGINT, idPlaylist BIGINT, PRIMARY KEY(idUtilisateur,idPlaylist));
CREATE TABLE video (id BIGINT PRIMARY KEY AUTO_INCREMENT, titre VARCHAR(300), lien VARCHAR(128), duree DECIMAL(10,0), site VARCHAR(50), thumbnail VARCHAR(128), vues BIGINT);
CREATE TABLE contient (idVideo BIGINT, idPlaylist BIGINT, PRIMARY KEY(idVideo, idPlaylist));
CREATE TABLE pub (id BIGINT PRIMARY KEY AUTO_INCREMENT, titre VARCHAR(50), clics BIGINT, moyenPaiement VARCHAR(50), extension VARCHAR(10), format VARCHAR(15), url VARCHAR(128), idUtilisateur BIGINT);

INSERT INTO utilisateur (login,password,nom,prenom,entreprise,compteEntreprise,email) VALUES ('root','4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2','Doe','John',NULL,0,'root@gmail.com');
INSERT INTO utilisateur (login,password,nom,prenom,entreprise,compteEntreprise,email) VALUES ('rootE','4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2','Doe','John','Polytech',1,'root@gmail.com');