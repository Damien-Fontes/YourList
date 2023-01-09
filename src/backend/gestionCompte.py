import mysql/utilisateur.py as user
from flask import Flask, redirect, url_for, request
app = Flask(__name__)


def creerCompte(password,login,nom,prenom,entreprise):
    user.creerCompte(password,login,nom,prenom,entreprise)
     

def login(id,mdp):
    conn = user.connexion(id,mdp)
    return conn

@app.route('/test',methods = ['POST'])
def test():
    return "yes"