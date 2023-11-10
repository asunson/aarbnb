from decouple import config
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path="", static_folder="../aarbnb-frontend/build")
app.config.from_object(config("APP_SETTINGS"))

login_manager = LoginManager()
login_manager.init_app(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)
