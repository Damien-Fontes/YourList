import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

#Créer une nouvelle ligne pub
#Entrée : Nom de la pub, moyen de paiement, extension de la pub (.png/jpg), format de la pub(728x90/320x50), url de redirection, idUtilisateur
def creerPubSQL(titre, moyenPaiement, extension, format, lien, idUser):
    request = (
        "INSERT INTO pub(titre, clics, moyenPaiement, extension, format, url, idUtilisateur) VALUES(%s,0,%s,%s,%s,%s,%s)")

    params = [titre, moyenPaiement, extension, format, lien, idUser]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

#Sortie : Toutes les pubs de la table                     
def getPubSQL():
    request = (
        "SELECT * FROM pub")

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request)
            resultats = c.fetchall()
            return(resultats)    

#Entrée : idPub
#Sortie : Pub correspondant à l'id
def getPubByIdSQL(id):
    request = (
        "SELECT * FROM pub WHERE id=%s")
    params = [id]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return(resultats)

#Entrée : idUtilisateur
#Sortie : Toutes les pubs de l'utilisateur
def getPubByIdUtilisateurSQL(idU):
    request = (
        "SELECT * FROM pub WHERE idUtilisateur=%s")
    params = [idU]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return(resultats)

#Entrée : idUtilisateur, idPub
#Sortie : La pub correspondant aux ids                  
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
    
#Sortie : ID de la dernière pub créée                                 
def getMaxIdPub():
    request = ("SELECT MAX(id) FROM pub")
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)

#Entrée : format de la pub (728x90/320x50)
#Sortie : Les pubs correspondant au format
def getPubByFormatSQL(format):
    request = (
        "SELECT * FROM pub WHERE format=%s")
    params = [format]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            return(resultats)

#Modifie le nombre de clics de la pub correspondant à l'idPub
#Entrée : Nombre de clics, idPub
def modifierClicsByIdSQL(clics, id):
    request = (
        "UPDATE pub SET clics = %s WHERE id=%s")
    params = [clics, id]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()