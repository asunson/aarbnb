from . import bcrypt, db, app
from .utils import date_to_iso_string


class AppRequest(db.Model):
    __tablename__ = "app_request"

    id = db.Column(db.String, primary_key=True)
    subject = db.Column(db.String)
    description = db.Column(db.String)
    user = db.Column(db.String)
    timestamp = db.Column(db.Integer)

    def __init__(self, id, subject, description, user, timestamp):
        self.id = id
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

class Booking(db.Model):
    __tablename__ = "booking"

    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.String)
    created_at = db.Column(db.Integer)


    def __init__(self, id, user_id, start_date, end_date, status, created_at):
        self.id = id
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.status = status
        self.created_at = created_at

    def serialize(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "startDate": date_to_iso_string(self.start_date),
            "endDate": date_to_iso_string(self.end_date),
            "status": self.status,
            "createdAt": self.created_at,
        }

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.String, primary_key=True)
    email = db.Column(db.String, unique=True)
    name = db.Column(db.String)
    phone = db.Column(db.String)
    password = db.Column(db.String)
    is_host = db.Column(db.Boolean)

    def __init__(self, id, email, name, phone, password, is_host):
        self.id = id
        self.email = email
        self.name = name
        self.phone = phone
        self.password = bcrypt.generate_password_hash(password)
        self.is_host = is_host

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "phone": self.phone,
            "isHost": self.is_host,
        }

    def validate(self, candidate: str) -> bool:
        return bcrypt.check_password_hash(self.password, candidate)

# Important! This code to instantiate the sqlite db mmust follow all model definitions
with app.app_context():
    db.create_all()