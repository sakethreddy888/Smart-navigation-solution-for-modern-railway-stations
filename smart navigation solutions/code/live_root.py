from flask import Blueprint, render_template, request
from db_config import get_live_train_db_connection

live_root = Blueprint("live_root", __name__)

@live_root.route('/live_tracking', methods=['GET', 'POST'])
def live_tracking():
    train_data = None

    if request.method == 'POST':
        train_no = request.form.get('train_no')

        if not train_no.isdigit():
            return "Invalid train number!", 400

        db = get_live_train_db_connection()
        cursor = db.cursor(dictionary=True)

        query = """
        SELECT station_name, day, date, arrival_time, departure_time, status 
        FROM status  -- Ensure this matches your actual table name
        WHERE train_no = %s
        ORDER BY date, arrival_time;
        """

        cursor.execute(query, (train_no,))
        train_data = cursor.fetchall()

        cursor.close()
        db.close()

    return render_template('live_root.html', train_data=train_data)
