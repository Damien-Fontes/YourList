import mysql.connector
import sys

sys.path.append('./src/backend/mysql/')
from connexion import *
from config import *
                
def createPossede(idU, idP):
    request = "INSERT INTO possede (idUtilisateur, idPlaylist) VALUES (%s, %s)"
    params = [idU, idP]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

def verificationPossede(idU, idP):    
    request = "SELECT * FROM possede WHERE idUtilisateur = %s AND idPlaylist = %s"
    params = [idU, idP]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                return(idL)