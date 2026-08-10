from datetime import datetime

def create_owner(
    businessName,
    ownerName,
    gstNumber,
    businessEmail,
    mobileNumber,
    state,
    city,
    pincode,
    password
):
    return {

        "businessName": businessName,

        "ownerName": ownerName,

        "gstNumber": gstNumber,

        "businessEmail": businessEmail,

        "mobileNumber": mobileNumber,

        "state": state,

        "city": city,

        "pincode": pincode,

        "password": password,

        "role": "owner",

        "createdAt": datetime.utcnow()

    }