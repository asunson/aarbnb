from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv


app = Flask(__name__, static_url_path="", static_folder="../aarbnb-frontend/build")
app.config["SECRET_KEY"] = "some-secret for now"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)
db.init_app(app)
load_dotenv()
