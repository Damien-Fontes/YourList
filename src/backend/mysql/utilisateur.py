import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from connexion import *
from config import *

#Ajoute une nouvelle ligne utilisateur (non Entreprise)
#Entrée : login de l'utilisateur, mot de passe, nom, prénom, email (de l'utilisateur à chaque fois)
def creerCompte(login, mdp, nom, prenom ,email):
    request = (
        "INSERT INTO utilisateur(login, password, nom, prenom, entreprise, compteEntreprise, email) VALUES(%s,%s,%s,%s,NULL,0,%s)")

    params = [login, mdp, nom, prenom ,email]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

#Ajoute une nouvelle ligne utilisateur entreprise
#Entrée : login de l'utilisateur, mot de passe, nom de l'entreprise, email de l'entreprise            
def creerCompteEntreprise(login, mdp, entreprise, email):
    request = (
        "INSERT INTO utilisateur(login, password, nom, prenom, entreprise, compteEntreprise, email) VALUES(%s,%s,NULL,NULL,%s,1,%s)")

    params = [login, mdp, entreprise, email]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

#Modifie un utilisateur
#Entrée : id de l'utilisateur, nouveau login, nouveau nom, nouveau prénom, nouvel email     
def modifierUser(id, login, nom, prenom, email):
    request = "UPDATE utilisateur SET login = %s, nom=%s, prenom=%s, email=%s WHERE id = %s"
    params = [login, nom, prenom, email, id]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()

#Entrée : login de l'utilisateur, mot de passe de l'utilisateur
#Sortie : mot de passe de l'utisateur non entreprise
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

#Entrée : login de l'utilisateur, mot de passe de l'utilisateur
#Sortie : mot de passe de l'utisateur entreprise
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

#Entrée : login de l'utilisateur
#Sortie : L'utisateur correspondant au login
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

#Entrée : id de l'utilisateur
#Sortie : L'utisateur correspondant à l'id
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

#Entrée : id de l'utilisateur
#Sortie : Le login de l'utilisateur correspondant à l'id
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