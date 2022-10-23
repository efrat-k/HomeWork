import pyodbc
from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=LAPTOP-JE1KDMQ2\EFRAT;'
                      'Database=HMO;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()



@app.route('/')
def return_all_customer():
    conn = pyodbc.connect('Driver={SQL Server};'
                          'Server=LAPTOP-JE1KDMQ2\EFRAT;'
                          'Database=HMO;'
                          'Trusted_Connection=yes;')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM customers')
    cursors=cursor.fetchall()
    a=[]
    for row in cursors:
        a.append({'id':str(row[0]),'name_coustumer':str(row[1]),'adrress':str(row[2]),'Date_of_birth':str(row[3]),'phone_number':"0"+str(row[4]),'mobile_number':"0"+str(row[5]),'picture':str(row[6])})
    print(a)
    return json.dumps(a)

@app.route('/allVaccination')
def return_all_Vaccination():
    cursor.execute('''SELECT * FROM Vaccination''')
    cursors=cursor.fetchall()
    a=[]
    for row in cursors:
        a.append({'id_vac':str(row[0]),'id':str(row[1]),'vac_date':str(row[2]),'vac_type':str(row[3])})
    print(a)
    return json.dumps(a)

@app.route('/insertCustomer', methods=['PUT'])
def insert():
    args = request.args
    print(args)

    #sql =  "INSERT INTO customers ( id,name, adrress, birth_day,phone_number,mobile_number) VALUES (%s, %s, %s, %s, %s, %s)"
    #val = (input_json['id'], input_json['name'],input_json['adrress'],input_json['birth_day'],input_json['phone_number'],input_json['mobile_number'])
    id=args['id']
    name= args['name_coustumer']
    adrress= args['adrress']
    birth_day=args['Date_of_birth']
    phone_number=args['phone_number']
    mobile_number=args['mobile_number']
    if len(id)!= 9:
        return json.dumps([{'ans': "invalide param"}])
    date = birth_day.split('-')
    if len(date[0]) != 4 or (len(date[1]) != 2 or int(date[1]) > 12) or (len(date[2]) != 2 or int(date[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    if phone_number[0]!='0' or len(phone_number)>10:
        return json.dumps([{'ans': "invalide param"}])
    if mobile_number[0]!='0' or len(mobile_number)>10:
        return json.dumps([{'ans': "invalide param"}])
    try:
        cursor.execute('''INSERT INTO customers ( id,name, adrress, birth_day,phone_number,mobile_number) VALUES (?,?,?,?,?,?)''',id,name,adrress,birth_day,phone_number,mobile_number)
        conn.commit()
    except():
        return json.dumps([{'ans':"no"}])
    return json.dumps([{'ans':"yes"}])


@app.route('/insertVaccination', methods=['PUT'])
def insertVaccinations():
    args = request.args
    cursor.execute('select max(id_vac) from Vaccination')
    (result,) = cursor.fetchone()
    id_vac =  result + 1
    id =args['id']
    vac_date= args['vac_date']
    vac_type=args['vac_type']
    date =vac_date.split('-')
    if len(date[0]) != 4 or (len(date[1]) != 2 or int(date[1]) > 12) or (len(date[2]) != 2 or int(date[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    if vac_type != 'moderna' and vac_type != 'fizer':
        return json.dumps([{'ans': "no"}])
    cursor.execute('SELECT count(*) FROM Vaccination where id = ?',id )
    (result,)=cursor.fetchone()
    if int(result) <4:

        cursor.execute('''INSERT INTO Vaccination ( id_vac,id,vac_date, vac_type) VALUES (?,?,?,?)''',id_vac, id, vac_date,vac_type)
        conn.commit()
        return json.dumps([{'ans':"ADD SSECSSES"}])
    return json.dumps([{'ans':"can't doing more than 4 Vaccination"}])

@app.route('/insertDisease', methods=['PUT'])
def insertDisease():
    args = request.args
    print(args)
    id =args['id']
    sick_date= args['sick_date']
    recovercy_date=args['recovercy_date']
    dateC = sick_date.split('-')
    if len(dateC[0]) != 4 or (len(dateC[1]) != 2 or int(dateC[1]) > 12) or (len(dateC[2]) != 2 or int(dateC[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    dateR = recovercy_date.split('-')
    if len(dateR[0]) != 4 or (len(dateR[1]) != 2 or int(dateR[1]) > 12) or (len(dateR[2]) != 2 or int(dateR[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    if dateR[0] < dateC[0] or (dateC[0] == dateR[0] and dateR[1] < dateC[1]) or (
            dateC[0] == dateR[0] and dateR[1] == dateC[1] and dateR[2] < dateC[2]):
        return json.dumps([{'ans': "invalide param"}])
    cursor.execute('SELECT count(*) FROM Disease where id = ?',id )
    (result,)=cursor.fetchone()

    if int(result) <1:

        cursor.execute('''INSERT INTO Disease ( id,sick_date, recovercy_date) VALUES (?,?,?)''', id, sick_date,recovercy_date)
        conn.commit()
        return json.dumps([{'ans': "ADD SSECSSES"}])
    return json.dumps([{'ans': "can't doing more than 1 Disease"}])


@app.route('/getVacSpecific')
def getVacSpecific():
    #input_json = request.get_json(force=True)
    args = request.args
    print(args)
    id =args.get('id')
    cursor.execute('SELECT  * FROM Vaccination where id = ?', id)
    a=[]
    cursors = cursor.fetchall()
    for row in cursors:
        a.append({'id_vac': str(row[0]),'vac_date': str(row[2]), 'vac_type': str(row[3])})

    print(a)
    return json.dumps(a)

@app.route('/getDisSpecific')
def getDisSpecific():
    args = request.args
    print(args)
    id = args.get('id')
    conn = pyodbc.connect('Driver={SQL Server};'
                          'Server=LAPTOP-JE1KDMQ2\EFRAT;'
                          'Database=HMO;'
                          'Trusted_Connection=yes;')
    cursor = conn.cursor()
    cursor.execute('SELECT  * FROM Disease where id = ?', id)
    a=[]
    cursors = cursor.fetchall()
    for row in cursors:
        a.append({'sick_date':str(row[1]),'recovercy_date':str(row[2])})

    print(a)
    return json.dumps(a)


@app.route('/deleteCustomer', methods=['DELETE'])
def remove():
    args = request.args
    print(args)
    id = args.get('id')
    try:
        cursor.execute('DELETE FROM Disease WHERE id = ?', id)
        cursor.execute('DELETE FROM Vaccination WHERE id = ?', id)
        cursor.execute('DELETE FROM customers WHERE id = ?', id)
        print("yes")
        conn.commit()
    except():
        return json.dumps([{'ans':"no"}])
    return json.dumps([{'ans':"yes"}])
    conn.commit()

@app.route('/updateCoustumer', methods=['POST'])
def updateCoustumer():
    args = request.args
    print(args)
    id = args['id']
    name = args['name_coustumer']
    adrress = args['adrress']
    birth_day = args['Date_of_birth']
    phone_number = args['phone_number']
    mobile_number=args['mobile_number']
    if len(id) != 9:
        return json.dumps([{'ans': "invalide param"}])
    date = birth_day.split('-')
    if len(date[0]) != 4 or (len(date[1]) != 2 or int(date[1]) > 12) or (len(date[2]) != 2 or int(date[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    if phone_number[0] != '0' or len(phone_number) > 10:
        return json.dumps([{'ans': "invalide param"}])
    if mobile_number[0] != '0' or len(mobile_number) > 10:
        return json.dumps([{'ans': "invalide param"}])
    try:
        cursor.execute('''UPDATE customers
                    SET  name= ?, adrress= ?, birth_day = ?,phone_number = ?,mobile_number= ?
                    WHERE id = ?
                            ''', name,adrress,birth_day, phone_number,mobile_number, id)
        conn.commit()
    except():
        return json.dumps([{'ans':"no"}])
    return json.dumps([{'ans':"yes"}])

@app.route('/updateVaction', methods=['POST'])
def updateVaction():
    args = request.args
    print(args)
    id_vac = args['id_vac']
    id = args['id']
    vac_date = args['vac_date']
    vac_type = args['vac_type']
    date = vac_date.split('-')
    if len(date[0]) != 4 or (len(date[1]) != 2 or int(date[1]) > 12) or (len(date[2]) != 2 or int(date[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    if vac_type != 'moderna' and vac_type !='fizer':
        return json.dumps([{'ans': "no"}])
    try:
        conn = pyodbc.connect('Driver={SQL Server};'
                              'Server=LAPTOP-JE1KDMQ2\EFRAT;'
                              'Database=HMO;'
                              'Trusted_Connection=yes;')
        cursor = conn.cursor()
        cursor.execute('''
                        UPDATE Vaccination
                        SET  id = ?, vac_date= ?, vac_type= ?
                        WHERE id_vac=?
                        ''', id,vac_date,vac_type, id_vac)
        conn.commit()
    except():
        return json.dumps([{'ans':"no"}])
    return json.dumps([{'ans':"yes"}])

@app.route('/updateDisease', methods=['POST'])
def updateDisease():
    args = request.args
    print(args)
    id = args['id']
    sick_date = args['sick_date']
    recovercy_date = args['recovercy_date']
    dateC = sick_date.split('-')
    if len(dateC[0]) != 4 or (len(dateC[1]) != 2 or int(dateC[1]) > 12) or (len(dateC[2]) != 2 or int(dateC[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    dateR = recovercy_date.split('-')
    if len(dateR[0]) != 4 or (len(dateR[1]) != 2 or int(dateR[1]) > 12) or (len(dateR[2]) != 2 or int(dateR[2]) > 31):
        return json.dumps([{'ans': "invalide param"}])
    if dateR[0]<dateC[0] or (dateC[0]==dateR[0] and dateR[1]<dateC[1]) or (dateC[0]==dateR[0] and dateR[1]==dateC[1] and dateR[2]<dateC[2]):
        return json.dumps([{'ans': "invalide param"}])
    try:
        cursor.execute('''
                        UPDATE Disease
                        SET  sick_date= ?, recovercy_date= ?
                        WHERE id = ?
                        ''', sick_date,recovercy_date,id)
        conn.commit()
    except():
        return json.dumps([{'ans':"no"}])
    return json.dumps([{'ans':"yes"}])

@app.route('/updatetPicture', methods=['POST'])
def updatetPicture():
    args = request.args
    print(args)
    id = args['id']
    urlPic =args['urlPic']
    try:
        cursor.execute('''
                        UPDATE customers
                        SET  picture =?
                        WHERE id = ?
                        ''', urlPic,id)
        conn.commit()
    except():
        return json.dumps([{'ans':"no"}])
    return json.dumps([{'ans':"yes"}])


@app.route('/getCountNOTvac')
def getCountNOTvac():

    cursor.execute('select count(*) from customers where id not in (select id from Vaccination) ')
    (result,)=cursor.fetchone()
    return json.dumps([{'ans':result}])

@app.route('/getDisMonth')
def getDisMonth():
    args = request.args
    print(args)
    month = args['month']
    setDate = month.split('-')
    a = []
    for i in range(1, 31):
        if i < 10:
            date = setDate[0] + "-" + setDate[1] + "-" + "0" + str(i)
        else:
            date = setDate[0] + "-" + setDate[1] + "-" + str(i)
        cursor.execute('select count(*) from disease where (? >=sick_date and ? < recovercy_date)',date,date)
        (result,)=cursor.fetchone()
        a.append({'day':date,'sum':result})

    print(a)
    return json.dumps(a)





if __name__ == "__main__":
    app.run()


