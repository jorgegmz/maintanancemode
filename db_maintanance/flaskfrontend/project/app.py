#!/bin/bash/python flask

from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
import urllib
import json

import pymssql

app = Flask(__name__)
db = SQLAlchemy(app)
CORS(app)

def get_list_acc_id(server_name):
    cnxn = None
    connection_string = []
    cnxn = pymssql.connect(host='Some_Host'
            , user='Some_User_Name'
            , password='Some_Password'
            , database='Some_Database'
            )

    cursor = cnxn.cursor()
    cursor.execute('select Account_ID from serveraccount where ServerOut like %s',server_name+'%')
    connectionString = cursor.fetchall()
    cnxn.close()
    return connectionString

def enable_maintenance_update_db(arr_acc_id):
    cnxn = None
    connection_string = []
    cnxn = pymssql.connect(host='Some_Host'
            , user='Some_User_Name'
            , password='Some_Password'
            , database='Some_Database'
            )

    cursor = cnxn.cursor()
    for val in arr_acc_id:
        ''.join(val.lower())
        cursor.execute("select Account_ID from smworkflow where Account_ID in %s", val)
        connectionString = cursor.fetchall()
    cnxn.close()

def disable_maintenance_update_db(arr_acc_id):
    cnxn = None
    connection_string = []
    cnxn = pymssql.connect(host='Some_Host'
            , user='Some_User_Name'
            , password='Some_Password'
            , database='Some_Database'
            )

    cursor = cnxn.cursor()
    for val in arr_acc_id:
        ''.join(val.lower())
        cursor.execute("select Account_ID from smworkflow where Account_ID in %s", val)
        connectionString = cursor.fetchall()
    cnxn.close()

def enable_update_url(arr_acc_id):
    cnxn = None
    connection_string = []
    cnxn = pymssql.connect(host='Some_Host'
            , user='Some_User_Name'
            , password='Some_Password'
            , database='Some_Database'
            )

    cursor = cnxn.cursor()
    for val in arr_acc_id:
        cursor.execute("select Account_ID from serveraccount where Account_ID in %s", val)
        connectionString = cursor.fetchall()
    cnxn.close()

def disable_update_url(arr_acc_id):
    cnxn = None
    connection_string = []
    cnxn = pymssql.connect(host='Some_Host'
            , user='Some_User_Name'
            , password='Some_Password'
            , database='Some_Database'
            )

    cursor = cnxn.cursor()
    for val in arr_acc_id:
        cursor.execute("select Account_ID from serveraccount where Account_ID in %s", val)
        connectionString = cursor.fetchall()
    cnxn.close()

@app.route('/dbenablemain/<string:server>')
def db_enable_maintenance(server):
    acc_id_arr = get_list_acc_id(server)
    print acc_id_arr
    # TODO send array of acc id's to enable db
    #enable_maintenance_update_db(acc_id_arr)
    #enable_update_url(acc_id_arr)
    return jsonify({'task':acc_id_arr})

@app.route('/dbdisablemain/<string:server>')
def db_disable_maintenance(server):
    acc_id_arr = get_list_acc_id(server)
    print acc_id_arr
    # TODO send array of acc id's to enable db
    #disable_maintenance_update_db(acc_id_arr)
    #disable_update_url(acc_id_arr)
    return jsonify({'task':acc_id_arr})

@app.route('/dbservers')
def connection_client_string():
    cnxn = None
    connection_string = []
    distinct_server = []
    cnxn = pymssql.connect(host='Some_Host'
        , user='Some_User_Name'
        , password='Some_Password'
        , database='Some_Database'
        )
    cursor = cnxn.cursor()
    cursor.execute("select ServerOut, Account_ID from serveraccount")
    connectionString = cursor.fetchall()

    for servers, acc_id in connectionString:
        server = servers.split('\\')[0]
        #print servers
        #print acc_id
        if server in distinct_server:
            continue
        else:
            distinct_server.append(server)
            item = {
                    'label': server,
                    'value': acc_id
                    }
            connection_string.append(item)

    cnxn.close()
    return jsonify({'task':connection_string})


#def hello():
#    # talk to db make connections
#    return render_template('hello.html')


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
