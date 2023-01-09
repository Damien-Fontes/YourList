import mysql/utilisateur.py as user
from flask import Flask, redirect, url_for, request
app = Flask(__name__)

@app.route('/login',method=['POST'])
def login():
    id=request.form['id']
    mdp=request.form['mdp']
    conn = user.connexion(id,mdp)
    return conn