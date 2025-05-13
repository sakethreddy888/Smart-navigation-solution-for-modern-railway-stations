from flask_mysqldb import MySQL
import mysql.connector

def create_mysql_auth(app):
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = '1234567890'
    app.config['MYSQL_DB'] = 'user_name'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
    
    return MySQL(app)
