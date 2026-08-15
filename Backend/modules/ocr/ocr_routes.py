import os
import re
from datetime import datetime
from bson.objectid import ObjectId
import pytesseract
import cv2

# Tesseract ka installed path (agar tera path alag hai to yaha change kar)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def preprocess_image(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    return thresh


def extract_fields(text):
    fields = {
        "vendor": None, "gstin": None, "invoice_no": None,
        "date": None, "cgst": None, "sgst": None,
        "igst": None, "total": None,
    }

    gstin_match = re.search(r'\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}\b', text)
    if gstin_match:
        fields["gstin"] = gstin_match.group()

    invoice_match = re.search(r'(Invoice|Bill)\s*(No|Number|#)?[:\-]?\s*([A-Za-z0-9\-\/]+)', text, re.IGNORECASE)
    if invoice_match:
        fields["invoice_no"] = invoice_match.group(3)

    date_match = re.search(r'\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}', text)
    if date_match:
        fields["date"] = date_match.group()

    total_match = re.search(r'(Total|Grand Total)[:\-]?\s*[₹Rs\.]*\s*([\d,]+\.?\d*)', text, re.IGNORECASE)
    if total_match:
        fields["total"] = total_match.group(2)

    lines = [l.strip() for l in text.strip().split("\n") if l.strip()]
    if lines:
        fields["vendor"] = lines[0]

    return fields


def register_ocr_routes(app, mongo):
    @app.route("/ocr", methods=["POST"])
    def run_ocr():
        from flask import request, jsonify
        data = request.get_json()
        bill_id = data.get("bill_id")

        if not bill_id:
            return jsonify({"status": "error", "message": "bill_id is required"}), 400

        bill = mongo.db.bills.find_one({"_id": ObjectId(bill_id)})
        if not bill:
            return jsonify({"status": "error", "message": "Bill not found"}), 404

        file_path = bill.get("file_path")
        if not file_path or not os.path.exists(file_path):
            return jsonify({"status": "error", "message": "Bill image not found on disk"}), 404

        try:
            processed_img = preprocess_image(file_path)
            raw_text = pytesseract.image_to_string(processed_img)
        except Exception as e:
            return jsonify({"status": "error", "message": f"OCR failed: {str(e)}"}), 500

        fields = extract_fields(raw_text)

        ocr_doc = {
            "bill_id": ObjectId(bill_id),
            **fields,
            "raw_text": raw_text,
            "confidence": None,
            "created_at": datetime.utcnow()
        }
        mongo.db.ocr_data.insert_one(ocr_doc)

        mongo.db.bills.update_one(
            {"_id": ObjectId(bill_id)},
            {"$set": {"status": "OCR Completed"}}
        )

        return jsonify({"status": "success", "message": "OCR completed", "data": fields}), 200