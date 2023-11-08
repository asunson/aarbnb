from flask import Flask, jsonify, request, send_from_directory, Blueprint
# import request_store
import uuid
import time
from .models import AppRequest, User
from . import app, db


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/api/requests", methods=["GET", "POST"])
def handleRequests():
    if request.method == "GET":
        appRequests = AppRequest.query.all()
        return jsonify([a.serialize() for a in appRequests])

    elif request.method == "POST":
        # savedId = request_store.saveRequest(request.data)
        newId = str(uuid.uuid1())

        appRequest = request.json

        newRequest = AppRequest(
            subject=appRequest["subject"],
            description=appRequest["description"],
            user=appRequest["user"],
            timestamp=int(time.time()) * 1000
        )

        db.session.add(newRequest)
        db.session.commit()

        return newId


@app.route("/api/users", methods=["GET", "POST"])
def handleUsers():
    if request.method == "GET":
        return User.query.all()

    elif request.method == "POST":
        return ""
