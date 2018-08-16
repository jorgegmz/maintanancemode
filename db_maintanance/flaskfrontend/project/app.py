#!/bin/bash/python flask

from flask import Flask, render_template
from flask_cors import CORS
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
import urllib

import pymssql

app = Flask(__name__)
db = SQLAlchemy(app)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def connection_client_string():
    cnxn = None
    connection_string = []
    cnxn = pymssql.connect(host='qasql01\in_dev'
        , user='Resonance'
        , password='NSpace'
        , database='Resonance_Administration'
        )
    cursor = cnxn.cursor()
    cursor.execute("select connection_string from Account_Connections where Account_ID = %s","activelife")
    connectionString = cursor.fetchone()
    cnxn.close()
    return connectionString


#def hello():
#    # talk to db make connections
#    return render_template('hello.html')


if __name__ == '__main__':
    app.run(debug=True)