import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

def createVideo(titre, lien, duree, site, thumbnail, vues):
    request = "INSERT INTO video (titre, lien, duree, site, thumbnail, vues) VALUES (%s, %s, %s, %s, %s, %s)"
    params = [titre, lien, duree, site, thumbnail, vues]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()
            
    request = "SELECT id FROM video WHERE lien = %s"
    params = [lien]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                return(idL)
                
def getVideoByURL(url):
    request = (
        "SELECT id FROM video WHERE lien=%s")
    params = [url]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)
                
def getVideoById(idV):
    request = (
        "SELECT * FROM video WHERE id=%s")
    params = [idV]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)

def supprimerVideo(idV):
    request = (
        "DELETE FROM video WHERE id=%s")
    params = [idV]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)