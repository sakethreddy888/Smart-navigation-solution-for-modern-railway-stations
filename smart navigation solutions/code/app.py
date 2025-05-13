from flask import Flask, render_template, redirect, url_for, session
from auth import auth_bp
from db_config import create_mysql_auth
from flask import Flask, render_template, request, redirect, url_for, jsonify
from auth import auth_bp
import qrcode
import io
import base64
from flask import Blueprint, request, render_template
from datetime import datetime


app = Flask(__name__)
app.secret_key = 'your_secret_key'

mysql = create_mysql_auth(app)

app.register_blueprint(auth_bp, url_prefix='/auth')



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    return render_template('home.html', name=session['name'])
 
@app.route('/mainpt')
def mainpt_page():
    return render_template('mainpt.html')

@app.route('/ticket_booking')  # Fixed name for consistency
def ticket_booking_page():
    return render_template('ticketbooking.html')

@app.route('/show_ticket')  # Fixed name for consistency
def show_ticket_page():
    return render_template('showticket.html')

@app.route('/cancel')  
def cancel_page():
    return render_template('cancel.html')

@app.route('/platform_ticket')  # Fixed spelling mistake
def platform_ticket_page():
    return render_template('platformticket.html')

@app.route('/qr')  # Fixed spelling mistake
def searchButton_page():
    return render_template('qr.html')

@app.route('/directionstoplatfrom')  # Fixed spelling mistake
def directionstoplatfrom_page():
    return render_template('directionstoplatfrom.html')
    
@app.route('/foodcourt')  # Fixed spelling mistake
def foodcourt_page():
    return render_template('foodcourt.html')

@app.route('/restrooms')  # Fixed spelling mistake
def restrooms_page():
    return render_template('restrooms.html')

@app.route('/hotel')  # Fixed spelling mistake
def hotel_page():
    return render_template('hotel.html')

@app.route('/live-tracking')
def live_tracking():
    return render_template('live_tracking.html')

@app.route('/train_search')  # Fixed spelling mistake
def train_search_page():
    return render_template('train_search.html')

@app.route('/helpcall')  # Fixed spelling mistake
def helpcall_page():
    return render_template('helpcall.html')
#qrconnect 

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    try:
        # Get form data from AJAX request
        station = request.form.get('station')
        tickets = request.form.get('tickets')
        total_price = request.form.get('total_price')

        # Validate inputs
        if not station or not tickets or not total_price:
            return jsonify({"error": "Invalid input"}), 400

        return jsonify({
            "station": station,
            "tickets": tickets,
            "total_price": total_price,
            "redirect_url": url_for('qr_page', station=station, tickets=tickets, total_price=total_price)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/qr')
def qr_page():
    return render_template('qr.html')

# Route to handle form submission and generate QR code
@app.route('/ticketbooking', methods=['GET', 'POST'])
def ticket_booking():
    if request.method == 'POST':
        from_station = request.form.get("from-station", "").strip()
        to_station = request.form.get("to-station", "").strip()
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        travel_class = request.form.get("class", "")
        date = request.form.get("date", "")
        train_number = request.form.get("train-number", "").strip()
        seats = request.form.get("seats", "1").strip()  # Fix missing `seats` variable

        # Convert seats to integer safely
        try:
            seats = int(seats)
        except ValueError:
            return "Invalid seat number.", 400

        # Restrict past dates
        from datetime import datetime
        today = datetime.today().strftime('%Y-%m-%d')
        if date < today:
            return "You cannot book tickets for past dates.", 400

        # Restrict seat limit
        if seats > 4:
            return "You cannot book more than 4 tickets.", 400

        # Ensure train number is provided for certain classes
        if travel_class in ["first", "second", "sleeper", "chair"] and not train_number:
            return "Please enter the Train Number for the selected class.", 400

        # Ticket pricing logic
        base_fare = 500
        price_multiplier = {
            "first": 2.5,
            "second": 2.0,
            "sleeper": 1.5,
            "chair": 1.2,
            "general": 1.0
        }
        total_price = base_fare * price_multiplier.get(travel_class, 1) * seats

        # Redirect to QR code page with booking details
        return redirect(url_for("ticket_booking_qrcode", 
                                name=name,
                                from_station=from_station,
                                to_station=to_station,
                                date=date,
                                travel_class=travel_class,
                                seats=seats,
                                price=total_price,
                                train=train_number if train_number else None))
    
    return render_template('ticketbooking.html')

@app.route('/bookingqrcode')
def ticket_booking_qrcode():
    name = request.args.get("name", "Unknown")
    from_station = request.args.get("from_station")
    to_station = request.args.get("to_station")
    travel_date = request.args.get("date", "Not Specified")
    seats = request.args.get("seats", "1")
    travel_class = request.args.get('travel_class', 'Not Provided')
    train_number = request.args.get("train", "Not Required")
    total_price = request.args.get("price", "0")

    return render_template("bookingqrcode.html",
                           name=name,
                           from_station=from_station,
                           to_station=to_station,
                           travel_date=travel_date,
                           seats=seats,
                           travel_class=travel_class,
                           train_number=train_number,
                           total_price=total_price)

if __name__ == '__main__':
    app.run(debug=True)
