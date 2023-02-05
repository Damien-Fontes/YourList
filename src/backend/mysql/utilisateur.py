import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

def creerCompte(login, mdp, nom, prenom ,email):
    request = (
        "INSERT INTO utilisateur(login, password, nom, prenom, entreprise, compteEntreprise, email) VALUES(%s,%s,%s,%s,NULL,0,%s)")

    params = [login, mdp, nom, prenom ,email]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()
            
def creerCompteEntreprise(login, mdp, entreprise, email):
    request = (
        "INSERT INTO utilisateur(login, password, nom, prenom, entreprise, compteEntreprise, email) VALUES(%s,%s,NULL,NULL,%s,1,%s)")

    params = [login, mdp, entreprise, email]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

def modifierUser(id, login, nom, prenom, email):
    request = "UPDATE utilisateur SET login = %s, nom=%s, prenom=%s, email=%s WHERE id = %s"
    params = [login, nom, prenom, email, id]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

def connexion(login,password):
    request = (
        "SELECT password FROM utilisateur WHERE login = %s AND compteEntreprise = 0")

    params = [login]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                if(idL[0] == password):
                    return "True"
            return "False"

def connexionEntreprise(login,password):
    request = (
        "SELECT password FROM utilisateur WHERE login = %s AND compteEntreprise = 1")

    params = [login]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                if(idL[0] == password):
                    return "True"
            return "False"

def getUtilisateurByLoginSQL(login):
    request = (
        "SELECT * FROM utilisateur WHERE login=%s")
    params = [login]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)

def getUtilisateurByIdSQL(id):
    request = (
        "SELECT * FROM utilisateur WHERE id=%s")
    params = [id]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)

def getNomByID(id):
    request = (
        "SELECT login FROM utilisateur WHERE id=%s")
    params = [id]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idU in resultats:
                return(idU)