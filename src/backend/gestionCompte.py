import sys

sys.path.append('./src/backend/mysql')
from utilisateur import *

# from __main__ import app
# from flask import Flask, redirect, url_for, request

def creerCompte(password,login,nom,prenom,entreprise):
    creerCompte(password,login,nom,prenom,entreprise)
    return "true"
     

def login(id,mdp):
    conn = connexion(id,mdp)
    return conn
    
def loginEntreprise(id,mdp):
    conn = connexionEntreprise(id,mdp)
    return conn