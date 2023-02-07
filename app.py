from flask import Flask, render_template, request, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
import json
import jsonpickle
import requests
import hashlib
import pathlib
import random
app = Flask(__name__, template_folder='./src/frontend/templates', static_folder='./src/frontend/static')
corps = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


import sys
sys.path.insert(0, './src/backend')
from gestionCompte import *
sys.path.append('./src/backend/mysql')
from playlist import *
from utilisateur import *
from possede import *
from video import *
from contient import *
from pub import *

TEMPLATES_AUTO_RELOAD = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

#Redirection vers la page accueil.
@app.route('/')
def index():
    return render_template('accueil.html')

#Définir les cookies pour un compte non entreprise lors de la connexion.
@app.route('/cookieConnected/', methods=["POST"])
def cookieConnected():
    resp = make_response('ok')
    resp.set_cookie('connected','true')
    resp.set_cookie('compteEntreprise','false')
    return resp

#Définir les cookies pour un compte entreprise lors de la connexion. 
@app.route('/cookieConnectedEntreprise/', methods=["POST"])
def cookieConnectedEntreprise():
    resp = make_response('ok')
    resp.set_cookie('connected','true')
    resp.set_cookie('compteEntreprise','true')
    return resp

#Récupérer les identifiants, hash le mot de passe (sha256), appel login(id,mdp) pour vérifier si l’utilisateur non compte entreprise existe en base de données.
@app.route('/testConnexion/', methods=["POST"])
def testConnexion():
    id = request.form['id']
    mdp = request.form['mdp']
    mdp = hashlib.sha256(mdp.encode('utf-8')).hexdigest()
    return login(id,mdp)

#Récupérer les identifiants, hash le mot de passe (sha256), appel loginEntreprise(login,mdp) pour vérifier si l’utilisateur compte entreprise existe en base de données.
@app.route('/testConnexionEntreprise/', methods=["POST"])
def testConnexionEntreprise():
    login = request.form['login']
    mdp = request.form['mdp']
    mdp = hashlib.sha256(mdp.encode('utf-8')).hexdigest()
    return loginEntreprise(login,mdp)

#Regarde les cookies. Vérifie que l’utilisateur soit connecté et que ce ne soit pas un compte entreprise.
@app.route('/isConnected/', methods=["POST"])
def isConnected():
    resp = make_response("false")
    if(request.cookies.get('connected') == "true"):
        if(request.cookies.get('compteEntreprise') == "true"):
            resp = make_response("entreprise")
            resp.set_cookie('connected','false')
            resp.set_cookie('compteEntreprise','false')
        else:
            resp = make_response("true")
    return resp
    
#Regarde les cookies. Vérifie que l’utilisateur soit connecté et que ce soit un compte entreprise.
@app.route('/isConnectedEntreprise/', methods=["POST"])
def isConnectedEntreprise():
    resp = make_response("false")
    if(request.cookies.get('connected') == "true"):
        if(request.cookies.get('compteEntreprise') == "true"):
            resp = make_response("true")
    else:
        resp.set_cookie('connected','false')
        resp.set_cookie('compteEntreprise','false')
    return resp

#Effectuer une recherche sur l’API serpapi qui renvoie les vidéos youtube en lien avec la recherche   
@app.route('/getDataRechercher/', methods=["POST"])
def getDataRechercher():
    input = request.form['input']
    input.replace(" ","+")
    apiKey = "45ca9844fc45d3658b9a4f230f31879951769b3722ad8cf491fb3ba18dee1d66"
    url = "https://serpapi.com/search.json?api_key=" + apiKey + "&engine=youtube&search_query=" + input
    response_API = requests.get(url)
    res = json.loads(response_API.text)
    return res

#Créer un utilisateur non entreprise
@app.route('/createUser/', methods=["POST"])
def createUser():
    login = request.form['login']
    mdp = request.form['mdp']
    mdpConfirm = request.form['mdpConfirm']
    nom = request.form['nom']
    prenom = request.form['prenom']
    email = request.form['email']
    if (mdp == mdpConfirm):
        if (getUserByLogin() == "null"):
            mdp = hashlib.sha256(mdp.encode('utf-8')).hexdigest()
            creerCompte(login, mdp, nom, prenom ,email)
            return "ok"
        else:
            return "Login déjà existant."
    else:
        return "Mot de passe différent."

#Créer un utilisateur entreprise
@app.route('/createUserEntreprise/', methods=["POST"])
def createUserEntreprise():
    login = request.form['login']
    mdp = request.form['mdp']
    mdpConfirm = request.form['mdpConfirm']
    entreprise = request.form['entreprise']
    email = request.form['email']
    if (mdp == mdpConfirm):
        if (getUserByLogin() == "null"):
            mdp = hashlib.sha256(mdp.encode('utf-8')).hexdigest()
            creerCompteEntreprise(login, mdp, entreprise, email)
            return "ok"
        else:
            return "Login déjà existant."
    else:
        return "Mot de passe différent."

#Récupérer un utilisateur dans la base de données grâce au login.
@app.route('/getUserByLogin/', methods=["POST"])
def getUserByLogin():
    login = request.form['login']
    liste = getUtilisateurByLoginSQL(login)
    return jsonpickle.encode(liste)

#Récupérer un utilisateur dans la base de données grâce à l’identifiant.
@app.route('/getUserById/', methods=["POST"])
def getUserById():
    res = []
    id = request.form['id']
    user = getUtilisateurByIdSQL(id)
    if(user == None):
        return "Erreur"
    else:
        for i in range(len(user)):
            res.append(user[i])
    return (res)

#Récupérer les playlists d’un utilisateur grâce à son identifiant.
@app.route('/getPlaylist/', methods=["POST"])
def getPlaylist():
    res = []
    id = request.form['id']
    liste = getListPlaylist(id)
    i=0
    for playlist in liste:
        res.append([])
        res[i].append(playlist[0])
        res[i].append(playlist[1])
        res[i].append(playlist[2])
        res[i].append(playlist[3])
        res[i].append(nbVideosPlaylist(playlist[0])[0])
        i=i+1

    return (res)

#Créer une nouvelle playlist dans la table ‘playlist’ et une nouvelle ligne dans la table ‘possede’ (table liant les playlists aux utilisateurs).
@app.route('/creationPlaylist/', methods=["POST"])
def creationPlaylist():
    idUser = request.form['id']
    nomPlaylist = request.form['nom']
    nomCreateur = getNomByID(idUser)[0]
    idPlaylist = createPlaylist(nomPlaylist, nomCreateur)[0]
    createPossede(idUser, idPlaylist)
    return "ok"

#Ajouter une vidéo dans une playlist d’un utilisateur. Si la vidéo n’existe pas dans la table ‘video’, ajoute la vidéo à la table.
@app.route('/addVideoPlaylist/', methods=["POST"])
def addVideoPlaylist():
    idUser = request.form['id']
    idPlaylist = request.form['idPlaylist']
    titreVideo = request.form['titre']
    lienVideo = request.form['lien']
    dureeVideo = request.form['duree']
    siteVideo = request.form['site']
    thumbnailVideo = request.form['thumbnail']
    vuesVideo = request.form['vues']
    if(getVideoByURL(lienVideo) == None):
        createVideo(titreVideo, lienVideo, dureeVideo, siteVideo, thumbnailVideo, vuesVideo)
    if(getContient(getVideoByURL(lienVideo)[0], idPlaylist) == None):
        createContient(getVideoByURL(lienVideo)[0], idPlaylist)
        if(getPlaylistById(idPlaylist)[2] == None):
            modifierThumbnailPlaylistById(thumbnailVideo, idPlaylist)
        return "ok"
    else:
        return "alreadyExist"

#Vérifier si un utilisateur possède bien une playlist.
@app.route('/verifPossede/', methods=["POST"])
def verifPossede():
    idUser = request.form['id']
    idPlaylist = request.form['idPlaylist']
    if(verificationPossede(idUser, idPlaylist) == None):
        return "Playlist n'appartenant pas à l'utilisateur"
    return "ok"

#Renvoyer une playlist grâce à son identifiant.
@app.route('/playlistById/', methods=["POST"])
def playlistById():
    idPlaylist = request.form['id']
    playlist = getPlaylistById(idPlaylist)
    if(playlist == None):
        return "Playlist vide"
    else:
        res = []
        res.append(playlist[0])
        res.append(playlist[1])
        res.append(playlist[2])
        res.append(playlist[3])
    return res

#Renvoyer toutes les vidéos d’une playlist
@app.route('/getVideoPlaylist/', methods=["POST"])
def getVideoPlaylist():
    idPlaylist = request.form['id']
    videos = getVideoByPlaylist(idPlaylist)
    res=[]
    if(videos == None):
        return "Playlist vide"
    else:
        for video in videos:
            res.append(getVideoById(video[0]))
    return res
    
#Supprimer une vidéo d’une playlist. Il faut donc supprimer une ligne de la table contient (table liant les playlists aux vidéos)
@app.route('/supprimerVideoPlaylist/', methods=["POST"])
def supprimerVideoPlaylist():
    idVideo = request.form['idVideo']
    idPlaylist = request.form['idPlaylist']
    if(getVideoById(idVideo) == None):
        return "Video déjà supprimée"
    else:
        supprimerContient(idVideo, idPlaylist)
    return "ok"
  
#Modifier le nom d’une playlist grâce à son identifiant.
@app.route('/modifierTitrePlaylist/', methods=["POST"])
def modifierTitrePlaylist():
    idPlaylist = request.form['idPlaylist']
    titre = request.form['titre']
    modifierTitrePlaylistById(idPlaylist, titre)
    return "ok"

#Supprimer une playlist. Il faut aussi supprimer toutes les lignes où son identifiant apparaît dans les tables ‘contient’ et ‘possede’.
@app.route('/supprimerPlaylist/', methods=["POST"])
def supprimerPlaylist():
    idPlaylist = request.form['idPlaylist']
    idUtilisateur = request.form['idUtilisateur']
    supprimerPlaylistSQL(idPlaylist)
    supprimerPossedeSQL(idPlaylist, idUtilisateur)
    contients = getContientPlaylistByIdP(idPlaylist)
    if(contients == None):
        return "Playlist Vide"
    else:
        for contient in contients:
            supprimerContient(contient[0], contient[1])
    return "ok"

#Modifier un utilisateur avec les nouvelles valeurs.
@app.route('/updateUser/', methods=["POST"])
def updateUser():
    id = request.form['id']
    login = request.form['login']
    nom = request.form['nom']
    prenom = request.form['prenom']
    email = request.form['email']
    modifierUser(id, login, nom, prenom, email)
    return "ok"
	
#Créer une nouvelle publicité dans la table ‘pub’.
@app.route('/uploaderEntreprise/', methods = ['GET', 'POST'])
def uploaderEntreprise():
    if request.method == 'POST':
        nom = request.form["titrePub"]
        lien = request.form["lienPub"]
        idU = request.form["idUser"]
        f = request.files['file']
        format = request.form['format']
        creerPubSQL(nom, "NULL", pathlib.Path(f.filename).suffix, format, lien, idU)
        id = getMaxIdPub()[0]
        path = "./src/frontend/static/data/pub/" + format + "/" + str(id) + pathlib.Path(f.filename).suffix
        f.save(path)
        return render_template("entreprise/uploaderEntreprise.html")

#Renvoyer toutes les publicités liées à un compte entreprise.	
@app.route('/getPubByIdUtilisateur/', methods = ['GET', 'POST'])
def getPubByIdUtilisateur():
    if request.method == 'POST':
        res=[]
        id = request.form["id"]
        pubs = getPubByIdUtilisateurSQL(id)
        i=0
        for pub in pubs:
            res.append([])
            res[i].append(pub[0])
            res[i].append(pub[1])
            res[i].append(pub[2])
            res[i].append(pub[3])
            res[i].append(pub[4])
            res[i].append(pub[5])
            res[i].append(pub[6])
            res[i].append(pub[7])
            i=i+1
        return res

#Renvoyer une publicité en fonction de son identifiant et de l’identifiant de l’utilisateur.	
@app.route('/getPubByIdUIdP/', methods = ['GET', 'POST'])
def getPubByIdUIdP():
    if request.method == 'POST':
        res=[]
        idU = request.form["id"]
        idP = request.form["idPub"]
        pub = getPubByIdUIdPSQL(idU,idP)
        res.append(pub[0])
        res.append(pub[1])
        res.append(pub[2])
        res.append(pub[3])
        res.append(pub[4])
        res.append(pub[5])
        res.append(pub[6])
        res.append(pub[7])
        return res

#Renvoyer un nombre de publicités choisies aléatoirement en fonction de leur format
@app.route('/getRandomPubByFormat/', methods = ['GET', 'POST'])
def getRandomPubByFormat():
    if request.method == 'POST':
        res = []
        pubNmb = request.form["pubNmb"]
        format = request.form["format"]
        pubs = getPubByFormatSQL(format)
        for i in range(int(pubNmb)):
            res.append(pubs[random.randint(0, len(pubs)-1)])
        return res

#Ajouter 1 au nombre de fois qu’un utilisateur à cliquer sur la publicité.
@app.route('/clickPub/', methods = ['GET', 'POST'])
def clickPub():
    if request.method == 'POST':
        idPub = request.form["idPub"]
        pub = getPubByIdSQL(idPub)
        modifierClicsByIdSQL(pub[0][2]+1, idPub)
        res = [(getPubByIdSQL(idPub)[0])]
        return res

#Permet de se rendre sur la page connexion.html
@app.route('/connexion/', methods=["GET","POST"])
def connexion():
    resp = make_response(render_template('connexion.html'))
    resp.set_cookie('connected','false')
    resp.set_cookie('compteEntreprise','false')
    return resp

#Permet de se rendre sur la page inscription.html
@app.route('/inscription/', methods=["GET","POST"])
def inscription():
    resp = make_response(render_template('inscription.html'))
    resp.set_cookie('connected','false')
    resp.set_cookie('compteEntreprise','false')
    return resp

#Permet de se rendre sur la page video.html
@app.route('/video/', methods=["GET","POST"])
def video():
    return render_template("video.html")

#Permet de se rendre sur la page playlist.html
@app.route('/playlist/', methods=["GET","POST"])
def playlist():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('playlist.html'))
    else:
        resp = make_response(render_template("accueil.html"))
    return resp

#Permet de se rendre sur la page compte.html
@app.route('/compte/', methods=["GET","POST"])
def compte():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('compte.html'))
    else:
        resp = make_response(render_template("accueil.html"))
    return resp
 
#Permet de se rendre sur la page modifierPlaylist.html   
@app.route('/modifierPlaylist/', methods=["GET","POST"])
def modifierPlaylist():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('modifierPlaylist.html'))
    else:
        resp = make_response(render_template("accueil.html"))
    return resp    

#Permet de se rendre sur la page connexionEntreprise.html
@app.route('/connexionEntreprise/', methods=["GET","POST"])
def connexionEntreprise():
    resp = make_response(render_template('entreprise/connexionEntreprise.html'))
    resp.set_cookie('connected','false')
    return resp

#Permet de se rendre sur la page inscriptionEntreprise.html
@app.route('/inscriptionEntreprise/', methods=["GET","POST"])
def inscriptionEntreprise():
    resp = make_response(render_template('entreprise/inscriptionEntreprise.html'))
    resp.set_cookie('connected','false')
    return resp

#Permet de se rendre sur la page accueilEntreprise.html    
@app.route('/accueilEntreprise/', methods=["GET","POST"])
def accueilEntreprise():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('entreprise/accueilEntreprise.html'))
    else:
        resp = make_response(render_template("entreprise/connexionEntreprise.html"))
    return resp   
  
#Permet de se rendre sur la page compteEntreprise.html      
@app.route('/compteEntreprise/', methods=["GET","POST"])
def compteEntreprise():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('entreprise/compteEntreprise.html'))
    else:
        resp = make_response(render_template("entreprise/connexionEntreprise.html"))
    return resp    

#Permet de se rendre sur la page pubEntreprise.html    
@app.route('/pubEntreprise/', methods=["GET","POST"])
def pubEntreprise():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('entreprise/pubEntreprise.html'))
    else:
        resp = make_response(render_template("entreprise/connexionEntreprise.html"))
    return resp    

if __name__ == "__main__":
    app.run(debug=True)
