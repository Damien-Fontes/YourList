from flask import Flask, render_template, request
import jsonpickle
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

@app.route('/testConnexion/', methods=["POST"])
def testConnexion():
    id = request.form['id']
    mdp = request.form['mdp']
    return login(id,mdp)
    #  if (id=="Jean" and mdp=="test"):
    #      return "True"
    #  else:
    #      return "False"


@app.route('/getUserByLogin/', methods=["POST"])
def getUserByLogin():
    login = request.form['login']
    liste = getUtilisateurByLoginSQL(login)
    return jsonpickle.encode(liste)

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
    return "ok"

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

@app.route('/connexion/', methods=["GET","POST"])
def connexion():
    return render_template('connexion.html')

@app.route('/inscription/', methods=["GET","POST"])
def inscription():
    return render_template('inscription.html')

@app.route('/video/', methods=["GET","POST"])
def video():
    return render_template("video.html")

@app.route('/playlist/', methods=["GET","POST"])
def playlist():
    return render_template('playlist.html')

@app.route('/compte/', methods=["GET","POST"])
def compte():
    return render_template('compte.html')
    
@app.route('/modifierPlaylist/', methods=["GET","POST"])
def modifierPlaylist():
    return render_template('modifierPlaylist.html')
    
if __name__ == "__main__":
    app.run(debug=True)