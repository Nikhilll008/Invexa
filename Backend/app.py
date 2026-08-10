import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo

import jwt
from datetime import datetime, timedelta


from models.user import create_owner
from utils.password import hash_password,check_password


# Load .env file

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# Flask App

app = Flask(__name__)
CORS(app)


# Configuration

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "Invexa")
SECRET_KEY = os.getenv("SECRET_KEY", "secret-key")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not found in .env file")

app.config["MONGO_URI"] = MONGO_URI
app.config["MONGO_DBNAME"] = DATABASE_NAME
app.config["SECRET_KEY"] = SECRET_KEY


# MongoDB
mongo = PyMongo(app)
print("Selected DB:", mongo.db)


# Home Route

@app.route("/")
def home():
    return "INVEXA Backend Running"


# Database Test Route

@app.route("/test-db")
def test_db():
    try:
        mongo.cx.admin.command("ping")

        return jsonify({
            "status": "success",
            "message": f"MongoDB Connected Successfully ({DATABASE_NAME})"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500



# OWNER SIGNUP

@app.route("/api/owner/signup", methods=["POST"])
def owner_signup():

    data = request.get_json()

    businessName = data.get("businessName")
    ownerName = data.get("ownerName")
    gstNumber = data.get("gstNumber")
    businessEmail = data.get("businessEmail")
    mobileNumber = data.get("mobileNumber")
    state = data.get("state")
    city = data.get("city")
    pincode = data.get("pincode")
    password = data.get("password")

    if not all([
        businessName,
        ownerName,
        gstNumber,
        businessEmail,
        mobileNumber,
        state,
        city,
        pincode,
        password
    ]):

        return jsonify({
            "status":"error",
            "message":"All fields are required"
        }),400

    existing_user = mongo.db.users.find_one({
        "businessEmail": businessEmail,
        "role": "owner"
})
    if existing_user:

        return jsonify({
            "status":"error",
            "message":"Email already registered"
        }),400

    hashed_password = hash_password(password)

    owner = create_owner(

        businessName,

        ownerName,

        gstNumber,

        businessEmail,

        mobileNumber,

        state,

        city,

        pincode,

        hashed_password

    )

    mongo.db.users.insert_one(owner)

    return jsonify({
    "status": "success",
    "message": "Owner Registered Successfully",
    "owner": {
        "businessName": owner["businessName"],
        "ownerName": owner["ownerName"],
        "businessEmail": owner["businessEmail"],
        "mobileNumber": owner["mobileNumber"],
        "gstNumber": owner["gstNumber"],
        "state": owner["state"],
        "city": owner["city"],
        "pincode": owner["pincode"],
        "role": owner["role"]
    }
}), 200
    
    
    
    
    
    
    
# OWNER LOGIN

@app.route("/api/owner/login", methods=["POST"])
def owner_login():

    data = request.get_json()

    businessEmail = data.get("businessEmail")
    password = data.get("password")

    if not businessEmail or not password:
        return jsonify({
            "status": "error",
            "message": "Email and Password are required"
        }), 400

    
    owner = mongo.db.users.find_one({
        "businessEmail": businessEmail,
        "role": "owner"
    })

    if not owner:
        return jsonify({
            "status": "error",
            "message": "Invalid Email or Password"
        }), 401

    
    if not check_password(password, owner["password"]):
        return jsonify({
            "status": "error",
            "message": "Invalid Email or Password"
        }), 401

    
    token = jwt.encode(
        {
            "id": str(owner["_id"]),
            "email": owner["businessEmail"],
            "role": owner["role"],
            "exp": datetime.utcnow() + timedelta(days=1)
        },
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "status": "success",
        "message": "Login Successful",
        "token": token,
        "owner": {
            "id": str(owner["_id"]),
            "businessName": owner["businessName"],
            "ownerName": owner["ownerName"],
            "businessEmail": owner["businessEmail"],
            "mobileNumber": owner["mobileNumber"],
            "gstNumber": owner["gstNumber"],
            "state": owner["state"],
            "city": owner["city"],
            "pincode": owner["pincode"],
            "role": owner["role"]
        }
    }), 200

# Run Server

if __name__ == "__main__":
    app.run(debug=True, port=5000)