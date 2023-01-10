import mysql.connector
import sys

sys.path.append('./src/backend/mysql')
from config import *

db = mysql.connector.connect(**connection_params)
# db = mysql.connector.connect(host= "mysql.pedaweb.univ-amu.fr",
#     user= "c17016430",
#     password= "v6D67FxS9JyVFQW",
#     database= "c17016430")
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
