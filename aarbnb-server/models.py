from . import db
import random


class AppRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String)
    description = db.Column(db.String)
    user = db.Column(db.String)
    timestamp = db.Column(db.Integer)

    def __init__(self, subject, description, user, timestamp):
        self.id = random.randint(0, 999999999)
        self.subject = subject
        self.description = description
        self.user = user
        self.timestamp = timestamp

    def serialize(self):
        return {
            "id": self.id,
            "subject": self.subject,
            "description": self.description,
            "user": self.user,
            "timestamp": self.timestamp,
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    name = db.Column(db.String)
    phone = db.Column(db.String)

# with app.app_context():
#     db.create_all()
