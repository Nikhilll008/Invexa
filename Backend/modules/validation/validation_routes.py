import re
from datetime import datetime
from bson.objectid import ObjectId


def validate_gstin(gstin):
    if not gstin:
        return False
    pattern = r'^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$'
    return bool(re.match(pattern, gstin))


def check_missing_fields(ocr_doc):
    required = ["vendor", "gstin", "invoice_no", "date", "total"]
    missing = [f for f in required if not ocr_doc.get(f)]
    return missing


def check_tax_valid(ocr_doc):
    cgst = ocr_doc.get("cgst")
    sgst = ocr_doc.get("sgst")
    igst = ocr_doc.get("igst")
    total = ocr_doc.get("total")

    if not total:
        return False
    try:
        total_val = float(str(total).replace(",", ""))
        return total_val > 0
    except (ValueError, TypeError):
        return False


def check_duplicate(mongo, invoice_no, current_bill_id):
    if not invoice_no:
        return False
    existing = mongo.db.ocr_data.find_one({
        "invoice_no": invoice_no,
        "bill_id": {"$ne": ObjectId(current_bill_id)}
    })
    return existing is not None


def register_validation_routes(app, mongo):
    @app.route("/validate", methods=["POST"])
    def run_validation():
        from flask import request, jsonify
        data = request.get_json()
        bill_id = data.get("bill_id")

        if not bill_id:
            return jsonify({"status": "error", "message": "bill_id is required"}), 400

        ocr_doc = mongo.db.ocr_data.find_one({"bill_id": ObjectId(bill_id)})
        if not ocr_doc:
            return jsonify({"status": "error", "message": "OCR data not found for this bill. Run /ocr first."}), 404

        gst_valid = validate_gstin(ocr_doc.get("gstin"))
        missing_fields = check_missing_fields(ocr_doc)
        tax_valid = check_tax_valid(ocr_doc)
        duplicate = check_duplicate(mongo, ocr_doc.get("invoice_no"), bill_id)

        remarks = []
        if not gst_valid:
            remarks.append("Invalid or missing GSTIN format")
        if missing_fields:
            remarks.append(f"Missing fields: {', '.join(missing_fields)}")
        if not tax_valid:
            remarks.append("Total amount invalid or missing")
        if duplicate:
            remarks.append("Duplicate invoice number detected")

        validation_doc = {
            "bill_id": ObjectId(bill_id),
            "gst_valid": gst_valid,
            "duplicate": duplicate,
            "missing_fields": missing_fields,
            "tax_valid": tax_valid,
            "amount_valid": tax_valid,
            "remarks": "; ".join(remarks) if remarks else "All checks passed",
            "validated_at": datetime.utcnow()
        }

        mongo.db.validation.insert_one(validation_doc)
        mongo.db.bills.update_one(
            {"_id": ObjectId(bill_id)},
            {"$set": {"status": "Validated"}}
        )

        return jsonify({
            "status": "success",
            "message": "Validation completed",
            "data": {
                "gst_valid": gst_valid,
                "duplicate": duplicate,
                "missing_fields": missing_fields,
                "tax_valid": tax_valid,
                "remarks": validation_doc["remarks"]
            }
        }), 200