from flask import Flask, render_template, request, make_response
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
import jsonpickle
import hashlib
app = Flask(__name__, template_folder='./src/frontend/templates', static_folder='./src/frontend/static')


import sys
sys.path.insert(0, './src/backend')
from gestionCompte import *
sys.path.append('./src/backend/mysql')
from playlist import *
from utilisateur import *
from possede import *
from video import *
from contient import *

TEMPLATES_AUTO_RELOAD = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route('/')
def index():
    return render_template('accueil.html')

@app.route('/cookieConnected/', methods=["POST"])
def cookieConnected():
    resp = make_response('ok')
    resp.set_cookie('connected','true')
    return resp

@app.route('/testConnexion/', methods=["POST"])
def testConnexion():
    id = request.form['id']
    mdp = request.form['mdp']
    mdp = hashlib.sha256(mdp.encode('utf-8')).hexdigest()
    return login(id,mdp)

@app.route('/testConnexionEntreprise/', methods=["POST"])
def testConnexionEntreprise():
    login = request.form['login']
    mdp = request.form['mdp']
    mdp = hashlib.sha256(mdp.encode('utf-8')).hexdigest()
    return loginEntreprise(login,mdp)

@app.route('/isConnected/', methods=["POST"])
def isConnected():
    if(request.cookies.get('connected') == "true"):
        resp = make_response("true")
    else:
        resp = make_response("false")
    return resp

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

@app.route('/getUserByLogin/', methods=["POST"])
def getUserByLogin():
    login = request.form['login']
    liste = getUtilisateurByLoginSQL(login)
    return jsonpickle.encode(liste)

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
        res[i].append(nbVideosPlaylist(playlist[0])[0])
        i=i+1

    return (res)

@app.route('/creationPlaylist/', methods=["POST"])
def creationPlaylist():
    idUser = request.form['id']
    nomPlaylist = request.form['nom']
    nomCreateur = getNomByID(idUser)[0]
    idPlaylist = createPlaylist(nomPlaylist, nomCreateur)[0]
    createPossede(idUser, idPlaylist)
    return "ok"

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
        return "ok"
    else:
        return "alreadyExist"

@app.route('/verifPossede/', methods=["POST"])
def verifPossede():
    idUser = request.form['id']
    idPlaylist = request.form['idPlaylist']
    if(verificationPossede(idUser, idPlaylist) == None):
        return "Playlist n'appartenant pas à l'utilisateur"
    return "ok"

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
    return res

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
    
@app.route('/supprimerVideoPlaylist/', methods=["POST"])
def supprimerVideoPlaylist():
    idVideo = request.form['idVideo']
    idPlaylist = request.form['idPlaylist']
    if(getVideoById(idVideo) == None):
        return "Video déjà supprimée"
    else:
        print(idVideo)
        print(idPlaylist)
        supprimerContient(idVideo, idPlaylist)
    return "ok"
  
@app.route('/modifierTitrePlaylist/', methods=["POST"])
def modifierTitrePlaylist():
    idPlaylist = request.form['idPlaylist']
    titre = request.form['titre']
    modifierTitrePlaylistById(idPlaylist, titre)
    return "ok"

@app.route('/updateUser/', methods=["POST"])
def updateUser():
    id = request.form['id']
    login = request.form['login']
    nom = request.form['nom']
    prenom = request.form['prenom']
    email = request.form['email']
    modifierUser(id, login, nom, prenom, email)
    return "ok"
	
@app.route('/uploaderEntreprise/', methods = ['GET', 'POST'])
def uploaderEntreprise():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
        f.save('./src/frontend/static/data/pub')
        return render_template("entreprise/uploaderEntreprise.html")

@app.route('/connexion/', methods=["GET","POST"])
def connexion():
    resp = make_response(render_template('connexion.html'))
    resp.set_cookie('connected','false')
    return resp

@app.route('/inscription/', methods=["GET","POST"])
def inscription():
    resp = make_response(render_template('inscription.html'))
    resp.set_cookie('connected','false')
    resp.set_cookie('admin','false')
    return resp

@app.route('/video/', methods=["GET","POST"])
def video():
    return render_template("video.html")

@app.route('/playlist/', methods=["GET","POST"])
def playlist():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('playlist.html'))
    else:
        resp = make_response(render_template("accueil.html"))
    return resp

@app.route('/compte/', methods=["GET","POST"])
def compte():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('compte.html'))
    else:
        resp = make_response(render_template("accueil.html"))
    return resp
    
@app.route('/modifierPlaylist/', methods=["GET","POST"])
def modifierPlaylist():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('modifierPlaylist.html'))
    else:
        resp = make_response(render_template("accueil.html"))
    return resp    

@app.route('/connexionEntreprise/', methods=["GET","POST"])
def connexionEntreprise():
    resp = make_response(render_template('entreprise/connexionEntreprise.html'))
    resp.set_cookie('connected','false')
    return resp

@app.route('/inscriptionEntreprise/', methods=["GET","POST"])
def inscriptionEntreprise():
    resp = make_response(render_template('entreprise/inscriptionEntreprise.html'))
    resp.set_cookie('connected','false')
    return resp
    
@app.route('/accueilEntreprise/', methods=["GET","POST"])
def accueilEntreprise():
    if(request.cookies.get('connected') == "true"):
        resp = make_response(render_template('entreprise/accueilEntreprise.html'))
    else:
        resp = make_response(render_template("entreprise/connexionEntreprise.html"))
    return resp    
    
if __name__ == "__main__":
    app.run(debug=True)