import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

def creerPubSQL(titre, moyenPaiement, extension, idUser):
    request = (
        "INSERT INTO pub(titre, clics, moyenPaiement, extension, idUtilisateur) VALUES(%s,0,%s,%s,%s)")

    params = [titre, moyenPaiement, extension, idUser]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()
                     
def getPubByIdUtilisateurSQL(idU):
    request = (
        "SELECT * FROM pub WHERE idUtilisateur=%s")
    params = [idU]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return(resultats)
                     
def getPubByIdUIdPSQL(idU, idP):
    request = (
        "SELECT * FROM pub WHERE idUtilisateur=%s AND id=%s")
    params = [idU, idP]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)
                                     
def getMaxIdPub():
    request = ("SELECT MAX(id) FROM pub")
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)