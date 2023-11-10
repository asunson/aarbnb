from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path="", static_folder="../aarbnb-frontend/build")
app.config["SECRET_KEY"] = "some-secret for now"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
