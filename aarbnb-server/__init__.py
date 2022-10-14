from flask import Flask, request, send_from_directory, Blueprint
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path="",
            static_folder="../aarbnb-frontend/build")
app.config["SECRET_KEY"] = "some-secret for now"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

db = SQLAlchemy(app)