import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

#Créer un objet contient
#Entrée : idVidéo et idPlaylist
def createContient(idV, idP):
    request = "INSERT INTO contient (idVideo, idPlaylist) VALUES (%s, %s)"
    params = [idV, idP]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

#Renvoi la ligne contient en fonction de l'idVidéo et de l'idPlaylist
#Entrée : idVidéo et idPlaylist
#Sortie : la ligne avec toutes les colonnes
def getContient(idV, idP):
    request = (
        "SELECT * FROM contient WHERE idVideo=%s AND idPlaylist=%s")
    params = [idV, idP]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)
  
#Renvoi les lignes contient en fonction de l'idPlaylist
#Entrée : idPlaylist
#Sortie : les lignes avec toutes les colonnes        
def getContientPlaylistByIdP(idP):
    request = ("SELECT * FROM contient WHERE idPlaylist=%s")
    params = [idP]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return(resultats)


#Entrée : idPlaylist
#Sortie : Compte le nombre de ligne appartenant à une idPlaylist     
def nbVideosPlaylist(idPlaylist):
    request = "SELECT COUNT(*) FROM contient WHERE idPlaylist = %s"
    params = [idPlaylist]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                return(idL)

#Entrée : idPlaylist
#Sortie : Les lignes contient d'une idPlaylist   
def getVideoByPlaylist(idPlaylist):
    request = "SELECT * FROM contient WHERE idPlaylist = %s"
    params = [idPlaylist]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return resultats

#Supprime une ligne contient
#Entrée : idVidéo et idPlaylist
def supprimerContient(idV, idP):
    request = ("DELETE FROM contient WHERE idVideo=%s AND idPlaylist=%s")
    params = [idV, idP]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()
            