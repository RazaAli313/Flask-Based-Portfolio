from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
from datetime import datetime
from database import db, Contacts
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# App Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/portfolio_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')

app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
db.init_app(app)
mail = Mail(app)
date = datetime.now().year

@app.route('/')
@app.route('/<path:path>')
def home(path=None):
    return render_template("partials/layout.html", date=date)

@app.route('/section/<path:section>')
def section(section):
    return render_template(f"partials/{section}.html")

@app.route('/contact', methods=['POST'])
@app.route('/contact', methods=['POST'])

def contact():
    try:
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")

        print(f"Received: {name}, {email}, {subject}, {message}")  # Debug log

        new_contact = Contacts(name=name, email=email, subject=subject, message=message)
        db.session.add(new_contact)
        db.session.commit()
        print("Saved to database ✅")

        msg = Message(
            subject=f"New Contact Form Submission: {subject}",
            sender='razaali.services@gmail.com',
            recipients=['razaalipk313@gmail.com']
        )
        msg.body = f'''
        Name: {name}
        Email: {email}
        Subject: {subject}
        Message: {message}
        '''

        mail.send(msg)
        print("Email sent ✅")

        flash('Your message has been sent successfully!', 'success')
        return redirect(url_for('home'))

    except Exception as e:
        db.session.rollback()
        print("❌ ERROR:", e)  # Most important line!
        flash('An error occurred. Please try again later.', 'danger')
        return redirect(url_for('home'))
def vercel_handler(request):
    from werkzeug.wrappers import Response
    with app.request_context(request.environ):
        response = app.full_dispatch_request()
    return Response(response.get_data(), status=response.status_code, headers=dict(response.headers))

if __name__ == '__main__':
    app.run(debug=True)
