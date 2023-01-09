import mysql.connector
#import config.py


#db = mysql.connector.connect(**connection_params)
db = mysql.connector.connect(host= "projet-yourlist.mysql.database.azure.com",
    user= "yourlist_admin@projet-yourlist",
    password= "AeHg9SG2eS6TSeC",
    database= "yourlist")
db.close()

"""
request = "select password from Utilisateur"

with mysql.connector.connect(**connection_params) as db :
    with db.cursor() as c:
        c.execute(request)
        while True:
            resultats = c.fetchmany(10)
            if not resultats:
                break
            for utilisateur in resultats:
                print(utilisateur)
db.close()

"""
