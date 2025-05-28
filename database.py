from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=False)
    subject = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Contact {self.name}>'
