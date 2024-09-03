from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
from logging.config import dictConfig

dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            },
              "file": {
                "class": "logging.FileHandler",
                "filename": "flask.log",
                "formatter": "default",
            },
        },
      
        "root": {"level": "INFO", "handlers": ["console", "file"]},
    }
)



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
