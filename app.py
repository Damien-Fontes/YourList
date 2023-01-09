from flask import Flask, render_template, request
app = Flask(__name__, template_folder='./src/frontend/templates', static_folder='./src/frontend/static')
import src

TEMPLATES_AUTO_RELOAD = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route('/')
def index():
    return render_template('connexion.html')

@app.route('/accueil/')
def accueil():
    return render_template('accueil.html')

@app.route('/testConnexion', methods=["POST"])
def testConnexion():
    id = request.form['id']
    mdp = request.form['mdp']
    if (id=="Jean" and mdp=="test"):
        return "True"
    else:
        return "False"

@app.route('/connexion/', methods=["GET","POST"])
def connexion():
    return render_template('connexion.html')

@app.route('/inscription/', methods=["GET","POST"])
def inscription():
    return render_template('inscription.html')

@app.route('/video/', methods=["GET","POST"])
def video():
    return render_template("video.html")

if __name__ == "__main__":
    app.run(debug=True)