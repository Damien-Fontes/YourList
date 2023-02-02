import mysql.connector
import sys

sys.path.append('./src/backend/mysql/')
from connexion import *
from config import *

def getListPlaylist(idUtilisateur):
    request = "SELECT playlist.id, playlist.nomPlaylist, playlist.createur FROM playlist, possede, utilisateur WHERE utilisateur.id = idUtilisateur AND playlist.id = idPlaylist AND utilisateur.id = %s "
    params = [idUtilisateur]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return resultats

                
def createPlaylist(nom, nomCreateur):
    request = "INSERT INTO playlist (nomPlaylist, createur) VALUES (%s, %s)"
    params = [nom, nomCreateur]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()
            
    request = "SELECT MAX(id) FROM playlist WHERE nomPlaylist = %s AND createur = %s"
    params = [nom, nomCreateur]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                return(idL)