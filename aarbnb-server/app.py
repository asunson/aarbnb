import json
import time

# import request_store
import uuid
from datetime import datetime, timedelta, timezone

from flask import jsonify, request, send_from_directory
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
    unset_jwt_cookies,
)

from . import app, db
from .models import AppRequest, User

print("registering routes...")


@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/requests", methods=["GET", "POST"])
@jwt_required()
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
            timestamp=int(time.time()) * 1000,
        )

        db.session.add(newRequest)
        db.session.commit()

        return newId


@app.route("/api/users", methods=["GET", "POST"])
@jwt_required()
def handleUsers():
    if request.method == "GET":
        return User.query.all()

    elif request.method == "POST":
        return []


@app.route("/api/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"success": "False"}, 401

    access_token = create_access_token(identity=email)
    response = {"token": access_token, "success": True}
    return response, 200


@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"success": True})
    unset_jwt_cookies(response)
    return response, 200


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if isinstance(data, dict):
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
