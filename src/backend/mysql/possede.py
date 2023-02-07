import mysql.connector
import sys

sys.path.append('./src/backend/mysql/')
from connexion import *
from config import *

#Créée une nouvelle ligne possede
#Entrée : idUtilisateur, idPlaylist               
def createPossede(idU, idP):
    request = "INSERT INTO possede (idUtilisateur, idPlaylist) VALUES (%s, %s)"
    params = [idU, idP]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

#Entrée : idUtilisateur, idPlaylist               
#Sortie : Ligne possede correspondant à (idUtilisateur,idPlaylist)
def verificationPossede(idU, idP):    
    request = "SELECT * FROM possede WHERE idUtilisateur = %s AND idPlaylist = %s"
    params = [idU, idP]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                return(idL)
     
#Supprime la ligne possede
#Entrée : idUtilisateur, idPlaylist               
def supprimerPossedeSQL(idPlaylist, idUtilisateur):
    request = ("DELETE FROM possede WHERE idPlaylist = %s AND idUtilisateur=%s")
    params = [idPlaylist, idUtilisateur]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()