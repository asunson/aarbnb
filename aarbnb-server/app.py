import json
import time
import os
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
from .utils import date_to_iso_string

from . import app, db
from .models import AppRequest, Booking, User


@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/requests", methods=["GET", "POST"])
@jwt_required()
def handleRequests():
    if request.method == "GET":
        appRequests = AppRequest.query.all()
        return jsonify([])
        return jsonify([a.serialize() for a in appRequests])

    elif request.method == "POST":
        # return jsonify("success"), 200
        appRequest = request.json
        newId = get_new_id()
        print("something is happening")

        print(get_jwt_identity())
        # user: User | None = User.query.filter_by(email=email).first()

        newRequest = AppRequest(
            id=newId,
            subject=appRequest["subject"],
            description=appRequest["description"],
            user=appRequest["user"],
            timestamp=get_now_millis(),
        )

        db.session.add(newRequest)
        db.session.commit()

        return newId


@app.route("/api/bookings", methods=["GET", "POST"])
@jwt_required()
def handleBookings():
    if request.method == "GET":
        bookings = Booking.query.all()
        return jsonify([b.serialize() for b in bookings])

    if request.method == "POST":
        return jsonify("success"), 200

        booking_request = request.json
        start_date = date_to_iso_string(booking_request["startDate"])
        end_date = date_to_iso_string(booking_request["endDate"])

        id = get_new_id()

        booking = Booking(
            id=id,
            user_id=booking_request["userId"],
            start_date=start_date,
            start_time=booking_request["startTime"],
            end_date=end_date,
            end_time=booking_request["endTime"],
            status=booking_request["status"],
            created_at=get_now_millis(),
        )

        db.session.add(booking)
        db.session.commit()

        return id


@app.route("/api/users", methods=["GET", "PUT"])
@jwt_required()
def handleUsers():
    if request.method == "GET":
        email = request.args.get("email")

        if email is None:
            return User.query.all()

        user: User | None = User.query.filter_by(email=email).first()
        if user is None:
            return FAILURE, 400
        return user.serialize()

    if request.method == "PUT":
        user_request = request.json
        id = user_request["id"]
        existing_user = User.query.get(id)
        if existing_user is None:
            return FAILURE, 400

        # TODO refactor to be smarter here and handle undefined/empty fields
        existing_user.email = user_request["email"]
        existing_user.name = user_request["name"]
        existing_user.phone = user_request["phone"]
        existing_user.password = user_request["password"]
        existing_user.is_host = user_request["isHost"]

        db.session.commit()


# TODO: figure out a better flow to this - maybe some static phrase I need to hand out to everyone
# store the default pass on in an .env file somewhere
@app.route("/api/users/new", methods=["POST"])
def create_user():
    create_user_request = request.json
    if create_user_request["code"] != os.getenv("NEW_ACCOUNT_CODE"):
        return FAILURE, 401

    newId = get_new_id()
    new_user = User(
        id=newId,
        email=create_user_request["email"],
        name=create_user_request["name"],
        phone=create_user_request["phone"],
        password=create_user_request["password"],
        is_host=create_user_request["isHost"],
    )
    db.session.add(new_user)
    db.session.commit()
    return newId


@app.route("/api/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    if email is None:
        return FAILURE, 400

    password = request.json.get("password", None)
    if password is None:
        return FAILURE, 400

    # TODO: dedup code
    if email == "test" and password == "test":
        access_token = create_access_token(identity=email)
        response = {"token": access_token, "success": True}
        return response, 200

    user: User | None = User.query.filter_by(email=email).first()
    if user is None:
        return FAILURE, 400

    if user.validate(password):
        access_token = create_access_token(identity=email)
        response = {
            "token": access_token,
            "user": user.serialize(),
            "success": True,
        }
        return jsonify(response), 200

    return FAILURE, 401


@app.route("/api/logout", methods=["POST"])
def logout():
    app.logger.debug("this is a DEBUG message")
    app.logger.info("this is an INFO message")
    app.logger.warning("this is a WARNING message")
    app.logger.error("this is an ERROR message")
    app.logger.critical("this is a CRITICAL message")
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
                data["token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


FAILURE = {"success": False}


def get_now_millis():
    return int(time.time()) * 1000


def get_new_id():
    return str(uuid.uuid4())
