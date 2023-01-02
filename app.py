from flask import Flask, render_template, request

app = Flask(__name__, template_folder='./src/frontend/templates', static_folder='./src/frontend/static')
TEMPLATES_AUTO_RELOAD = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route('/')
def index():
    return render_template('connexion.html')

@app.route('/testConnexion', methods=["POST"])
def testConnexion():
    id = request.form['id']
    mdp = request.form['mdp']
    if (id=="Luc" and mdp=="Vinrouge"):
        return "True"
    else:
        return "False"

@app.route('/connexion/', methods=["GET","POST"])
def connexion():
    return render_template('connexion.html')

@app.route('/menuPrincipal/', methods=["GET","POST"])
def menuPrincpal():
    return render_template('menuPrincipal.html')

@app.route('/synchro/', methods=["GET","POST"])
def synchro():
    return render_template('synchro.html')

if __name__ == "__main__":
    app.run(debug=True)