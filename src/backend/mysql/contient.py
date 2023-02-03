import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

def createContient(idV, idP):
    request = "INSERT INTO contient (idVideo, idPlaylist) VALUES (%s, %s)"
    params = [idV, idP]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

def supprimerContient(idV, idP):
    request = ("DELETE FROM contient WHERE idVideo=%s AND idPlaylist=%s")
    params = [idV, idP]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

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
                
def nbVideosPlaylist(idPlaylist):
    request = "SELECT COUNT(*) FROM contient WHERE idPlaylist = %s"
    params = [idPlaylist]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                return(idL)

def getVideoByPlaylist(idPlaylist):
    request = "SELECT * FROM contient WHERE idPlaylist = %s"
    params = [idPlaylist]
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return resultats