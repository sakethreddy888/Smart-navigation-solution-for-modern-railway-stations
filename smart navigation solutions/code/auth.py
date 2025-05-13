from flask import Blueprint, request, render_template, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from db_config import create_mysql_auth
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask import current_app
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

auth_bp = Blueprint('auth', __name__)
mysql = None  # This will be initialized in app.py

@auth_bp.record_once
def on_load(state):
    global mysql
    mysql = create_mysql_auth(state.app)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        email = request.form['email']
        dob = request.form['dob']
        mobile = request.form['mobile']
        address = request.form['address']
        password = generate_password_hash(request.form['password'])

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO users (name, age, email, dob, mobile, address, password) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (name, age, email, dob, mobile, address, password))
        mysql.connection.commit()
        cursor.close()
        
        flash('Registration successful! Please login.', 'success')
        return redirect(url_for('auth.login'))

    return render_template('register.html')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if user is None:
            flash('User not found. Please register.', 'danger')
            return redirect(url_for('auth.register'))

        # Ensure 'password' key exists in the user dictionary
        if 'password' not in user:
            flash('Invalid user data. Please contact support.', 'danger')
            return redirect(url_for('auth.login'))

        if check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['name'] = user['name']
            return redirect(url_for('home'))

        flash('Invalid email or password', 'danger')

    return render_template('login.html')


@auth_bp.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully', 'info')
    return redirect(url_for('auth.login'))


