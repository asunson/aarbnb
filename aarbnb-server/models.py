from . import bcrypt, db


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
