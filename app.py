import os
import random

from flask import Flask, render_template, request, json, jsonify, send_from_directory
from flaskext.mysql import MySQL
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from datetime import datetime, date
import pandas
from urllib.parse import urlparse
from flask import send_file








import yaml

db = yaml.load(open('db.yaml'))

app = Flask(__name__, static_folder='build', static_url_path='')

if 'CLEARDB_DATABASE_URL' in os.environ:

    url = urlparse(os.environ['CLEARDB_DATABASE_URL'])
    app.config['MYSQL_DATABASE_HOST'] = url.hostname
    app.config['MYSQL_DATABASE_USER'] = url.username
    app.config['MYSQL_DATABASE_PASSWORD'] = url.password
    app.config['MYSQL_DATABASE_DB'] = url.path[1:]

else:
    app.config['MYSQL_DATABASE_HOST'] = db['mysql_host']
    app.config['MYSQL_DATABASE_USER'] = db['mysql_user']
    app.config['MYSQL_DATABASE_PASSWORD'] = db['mysql_password']
    app.config['MYSQL_DATABASE_DB'] = db['mysql_db']


app.config['MYSQL_DATABASE_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/', methods = ['GET'])
def home():
    return app.send_static_file('index.html')

@app.route('/users/register', methods = ['POST'])
def register():
    con = mysql.connect()
    cursor = con.cursor()

    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']

    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')

    created = datetime.utcnow()
    role = "client"

    sql = "INSERT INTO users (first_name, created, last_name, password, email, role) VALUES (%s,%s,%s,%s,%s,%s)"

    data = (first_name, created, last_name, password, email, role)
    cursor.execute(sql, data)
    con.commit()
    result = {
        'first_name': first_name,
        'created': created,
        'last_name': last_name,
        'password': password,
        'email': email,
        'role': role
    }

    return jsonify({'result': result})

@app.route('/admin/add/user', methods = ['POST'])
def addUser():
    con = mysql.connect()
    cursor = con.cursor()

    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    start_date = request.get_json()['start_date']
    pass_type_id = request.get_json()['pass_type_id']
    role = request.get_json()['role']


    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')

    created = datetime.utcnow()

    sql = "INSERT INTO users (first_name, created, last_name, password, email, role) VALUES (%s,%s,%s,%s,%s,%s)"

    data = (first_name, created, last_name, password, email, role)
    cursor.execute(sql, data)
    con.commit()


    date_time_obj = datetime.strptime(start_date, '%Y-%m-%d')


    print(datetime.now())
    print(date_time_obj)


    if date_time_obj <= datetime.now():
        active = 1
    else:
        active = 0

    date_time_obj.strftime('%Y-%m-%d  %H:%M:%S')
    print(date_time_obj)
    sql = "SELECT id FROM users WHERE email = %s"
    data = (email)
    cursor.execute(sql, data)


    rv = cursor.fetchone()
    user_id = rv[0]
    print(user_id)
    print(pass_type_id)
    print(active)

    sql = "INSERT INTO pass (type_id, active, user_id, start_date) VALUES (%s,%s,%s,%s)"
    data = (pass_type_id, active, user_id, date_time_obj)
    cursor.execute(sql, data)
    con.commit()
    result = {
        'done':'done'
    }

    return jsonify({'result': result})




@app.route('/users/login', methods = ['POST'])
def login():
    con = mysql.connect()
    cursor = con.cursor()

    email = request.get_json()['email']
    password = request.get_json()['password']


    sql = "SELECT * FROM users where email = %s"
    data = email

    cursor.execute(sql,data)

    rv = cursor.fetchone()
    print(rv)



    if bcrypt.check_password_hash(rv[3], password):
        access_token = create_access_token(identity= {'id': rv[0], 'role': rv[6]})
        result = access_token
    else:
        result = jsonify({"error": "Invalid username and password"})

    return result


@app.route('/profile/<int:id>', methods = ['GET'])
def get_user_profile(id):
    con = mysql.connect()
    cursor = con.cursor()

    sql = "SELECT * FROM users where id = %s"
    data = id

    cursor.execute(sql,data)

    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/admin/last_users', methods = ['GET'])
def get_last_registred_users():
    con = mysql.connect()
    cursor = con.cursor()

    sql = "SELECT first_name, last_name, id, created FROM users WHERE role!= 'admin' ORDER BY created LIMIT 10 ; "

    cursor.execute(sql)

    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/admin/staticstic', methods = ['GET'])
def get_statistics():
    con = mysql.connect()
    cursor = con.cursor()

    sql = "SELECT g.name as name, (SELECT count(uw.user_id) FROM users_workouts as uw" \
          " WHERE uw.wourkout_id = g.id) as value FROM workout as g " \
          "WHERE  g.date > DATE_ADD(now(), INTERVAL -30 DAY); "

    cursor.execute(sql)

    row_headers = [x[0] for x in cursor.description]
    row_headers.append('color')
    print(row_headers)
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        l = list(result)
        r = lambda: random.randint(0,255)
        color =('#%02X%02X%02X' % (r(),r(),r()))
        l.append(color)
        tuple(l)
        print(l)
        json_data.append(dict(zip(row_headers, l)))
        print(json_data)
    print(json.dumps(json_data))
    return json.dumps(json_data)


@app.route('/admin/login', methods = ['POST'])
def admin_login():
    con = mysql.connect()
    cursor = con.cursor()

    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    print(str(password))
    print(str(email))


    sql = "SELECT * FROM users where email = %s"
    data = email
    cursor.execute(sql, data)
    rv = cursor.fetchone()



    if bcrypt.check_password_hash(rv[3], password):
        access_token = create_access_token(identity={'id': rv[0], 'role': rv[6]})
        result = access_token
    else:
        result = jsonify({"error": "Invalid username and password"})

    return result


@app.route('/trainers', methods = ['GET'])
def getTrainers():
    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("SELECT id, first_name, last_name  FROM trainer;")

    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)


@app.route('/passTypes', methods = ['GET'])
def getPassTypes():
    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("SELECT * FROM pass_type;")

    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/users', methods = ['GET'])
def getUsers():
    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("SELECT u.first_name, u.last_name, u.id, DATE_FORMAT(p.start_date,'%m/%d/%Y') as start_date, t.type, IF(p.active, 'active', 'inactive') as active from users as u "
                   "left join pass as p on u.id = p.user_id "
                   "left join pass_type as t on p.type_id = t.id where u.role = 'client';")

    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/user/<int:id>', methods = ['GET'])
def getUser(id):
    con = mysql.connect()
    cursor = con.cursor()

    sql = "SELECT u.first_name, u.last_name, u.email, u.id from users as u  where u.id=%s;"
    cursor.execute(sql, id)
    con.commit()



    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)


@app.route('/admin/user/delete' , methods = ['POST'])
def deleteUser():
    con = mysql.connect()
    cursor = con.cursor()

    id = request.get_json()["id"]
    print(id)

    sql = "DELETE FROM users where id = %s"
    cursor.execute(sql, id)
    con.commit()
    result = "user deleted"

    return jsonify({'result': result})


@app.route('/admin/user/update/<int:id>', methods=['PUT'])
def updateUser(id):
    con = mysql.connect()
    cursor = con.cursor()

    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']





    sql = "UPDATE  users SET first_name = %s, last_name = %s, " \
          "email = %s WHERE id = %s"
    data = (first_name, last_name, email, id)

    cursor.execute(sql, data)
    con.commit()

    result = {
       'done': 'done'

 }
    return jsonify({'result': result})


@app.route('/admin/workouts', methods = ['POST', 'GET'])
def showWorkouts():

    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("SELECT g.id, g.name, g.duration,g.limits,"
                   "DATE_FORMAT(g.date,'%Y-%m-%d') as date, g.time, t.first_name as trainer_first_name,"
                   "(SELECT count(uw.user_id) FROM users_workouts as uw WHERE uw.wourkout_id = g.id) as sign_up_users, t.last_name as trainer_last_name FROM workout as g JOIN trainer as t ON g.trainer_id = t.id ORDER BY g.date;")

    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)





@app.route('/user/workouts', methods = ['POST'])
def showUserWorkouts():
    user_id = request.get_json()['user_id']
    print(user_id)
    con = mysql.connect()
    cursor = con.cursor()

    sql ="SELECT g.id, g.name, g.duration,g.limits," \
         "DATE_FORMAT(g.date,'%Y-%m-%d') as date, g.time, t.first_name as trainer_first_name," \
         "(SELECT count(uw.user_id) FROM users_workouts as uw WHERE uw.wourkout_id = g.id) as sign_up_users," \
         "(SELECT count(uw.user_id) FROM users_workouts as uw WHERE uw.wourkout_id = g.id and uw.user_id ="+str(user_id) +") as is_sign_up," \
         " t.last_name as trainer_last_name FROM workout as g JOIN trainer as t ON g.trainer_id = t.id ORDER BY g.date;"

    data = (user_id)
    print(data)

    cursor.execute(sql)

    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/admin/workout/details/<int:id>', methods = ['GET'])
def workoutDetails(id):
    print(id)
    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("Select u.first_name, u.last_name, uw.user_id, uw.persent from users_workouts as uw left join users as u on u.id=uw.user_id where uw.wourkout_id=" + str(id) + ";")



    #extract row headers for json

    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/admin/workout/details/<int:id>', methods = ['GET'])
def workoutInfo(id):
    print(id)
    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("Select w.name, w.limits, w.duration, w.time, t.first_name as trainer_first_name, t.last_name as trainer_last_name"
                   "from workout left join trainer as t on t.id=w.trainer_id where w.id="+str(id)+";")



    #extract row headers for json
    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/admin/add/workout', methods = ['POST'])
def addWorkout():
    con = mysql.connect()
    cursor = con.cursor()

    print(request.get_json())

    name = request.get_json()['name']
    duration = request.get_json()['duration']
    limits = request.get_json()['limits']
    date = request.get_json()['date']
    trainer_id = request.get_json()['trainer_id']
    time = request.get_json()['time']



    if( int(duration)< 0 or int( limits) <0 ):
        return 'error'




    sql="INSERT INTO workout (name, duration, limits, date, time, trainer_id) VALUES (%s,%s,%s,%s,%s,%s)"
    data = (name, duration, limits, date, time, trainer_id)
    cursor.execute(sql, data)
    con.commit()
    result = {
        'name': name,
        'duration': duration,
        'limits': limits,
        'date': date,
        'time': time

    }

    return jsonify({'result': result})

@app.route('/admin/workout/getWorkout/<int:id>', methods = ['GET'])
def getWorkoutDetails(id):
    print(id)
    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute( "SELECT g.id, g.name, g.duration," \
          " g.limits, DATE_FORMAT(g.date,'%Y-%m-%d') as date, g.time, (SELECT count(uw.user_id) FROM users_workouts as uw WHERE uw.wourkout_id = g.id) as sign_up_users, t.first_name as trainer_first_name," \
          "t.last_name as trainer_last_name, t.id as trainer_id FROM workout as g" \
          " JOIN trainer as t ON g.trainer_id = t.id WHERE g.id = "+str(id)+";")

    row_headers = [x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    return json.dumps(json_data)

@app.route('/admin/addTrainer', methods = ['POST'])
def addTrainer():
    con = mysql.connect()
    cursor = con.cursor()

    print(request.get_json())

    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']


    sql="INSERT INTO trainer (first_name, last_name) VALUES (%s,%s);"
    data = (first_name, last_name)
    cursor.execute(sql, data)
    con.commit()
    result = {
        'first_name': first_name,
        'last_name': last_name,

    }

    return jsonify({'result': result})

@app.route('/admin/workout/attendance', methods = ['POST'])
def markAttendance():
    con = mysql.connect()
    cursor = con.cursor()

    print(request.get_json())

    user_id = request.get_json()['user_id']
    workout_id = request.get_json()['workout_id']
    present = request.get_json()['present']




    sql = "UPDATE users_workouts SET persent = %s where user_id = %s and wourkout_id = %s"
    data = (present, user_id, workout_id)

    cursor.execute(sql, data)
    con.commit()
    result = 'done'

    return jsonify({'result': result})

@app.route('/admin/workout/update/<int:id>', methods=['PUT'])
def updateWorkout(id):
    con = mysql.connect()
    cursor = con.cursor()

    name = request.get_json()['name']
    duration = request.get_json()['duration']
    limits = request.get_json()['limits']
    date = request.get_json()['date']
    trainer_id = request.get_json()['trainer']
    time = request.get_json()['time']



    sql = "UPDATE  workout SET name = %s, duration = %s, " \
          "limits = %s, date = %s, time = %s, trainer_id = %s WHERE id = %s"
    data = (name, duration, limits, date, time, trainer_id, id)

    cursor.execute(sql, data)
    con.commit()

    result = {
        'name': name,
        'duration': duration,
        'limits': limits,
        'date': date,
        'id': id,
        'time': time


    }
    return jsonify({'result': result})

@app.route('/admin/workout/delete'  , methods = ['POST'])
def deleteWorkout():
    con = mysql.connect()
    cursor = con.cursor()

    id = request.get_json()['id']

    sql = "DELETE FROM workout where id = %s"
    cursor.execute(sql, id)
    con.commit()

    result = "workout deleted"

    return jsonify({'result': result})

@app.route('/signup/class', methods = ['POST'])
def signUpUser():
    con = mysql.connect()
    cursor = con.cursor()

    user_id = request.get_json()['user_id']
    workout_id = request.get_json()['workout_id']
    limits = request.get_json()['limits']
    enrolled_users = request.get_json()['sign_up_users']

    if(int(enrolled_users) == int(limits)):
        return jsonify({'error'})


    elif (int(limits)-int(enrolled_users)) <0:
        return jsonify({'error'})
    else:

        sql= "INSERT INTO users_workouts (user_id, wourkout_id) VALUES (%s,%s)"
        data = (user_id, workout_id)

        cursor.execute(sql,data)
        con.commit()
        result = {
            'user_id': user_id,
            'workout_id': workout_id

        }

        return jsonify({'result': result})

@app.route('/signout/class', methods = ['POST'])
def signOutFromWorkout():
    con = mysql.connect()
    cursor = con.cursor()

    user_id = request.get_json()['user_id']
    workout_id = request.get_json()['workout_id']

    print(user_id)
    print(workout_id)

    sql="DELETE FROM users_workouts WHERE user_id = %s AND wourkout_id = %s"
    data = (user_id, workout_id)



    cursor.execute(sql, data)
    con.commit()
    result = {
        'user_id': user_id,
        'workout_id': workout_id

    }

    return jsonify({'result': result})

@app.route('/workout/getHistory', methods = ['GET'])
def saveToExcel():

    con = mysql.connect()
    cursor = con.cursor()

    cursor.execute("SELECT u.first_name, u.last_name, IF(uw.persent, 'present','absent') as present,  w.name, DATE_FORMAT(w.date,'%Y-%m-%d') as date,"
                   "w.time, t.first_name as trainer_first_name,t.last_name as trainer_last_name "
                   "FROM users_workouts as uw left join users as u on uw.user_id = u.id "
                   "join workout  as w on uw.wourkout_id = w.id inner join trainer as t on t.id = t.id where persent is not null ORDER BY date, w.name, trainer_last_name;")
    row_headers = [x[0] for x in cursor.description]

    rv = cursor.fetchall()
    print(rv)


    json_data =[]
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    print(json.dumps(json_data))
    pandas.read_json(json.dumps(json_data)).to_excel(str(date.today())+'.xlsx', index=False)
    file = str(date.today())+'.xlsx'
    path = "/Desktop/"
    uploads = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
    return send_from_directory(directory=uploads, filename=file)






if __name__ == '__main__':
    app.run(debug=True)








