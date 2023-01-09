import connexion.py

def creerCompte(password,login,nom,prenom,entreprise):
    request = (
        "INSERT INTO utilisateur(password,login,nom,prenom,entreprise) VALUES(%s,%s,%s,%s,%s)")

    params = [password,login,nom,prenom,entreprise]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            db.commit()


def connexion(login,password):
    request = (
        "SELECT password FROM utilisateur WHERE login = %s")

    params = [login]

    with mysql.connector.connect(**connection_params) as db :
        with db.cursor() as c:
            c.execute(request, params)
            resultats = c.fetchall()
            for idL in resultats:
                if(idL[0] == password):
                    return "Connexion OK"
            return "Connexion failed"
