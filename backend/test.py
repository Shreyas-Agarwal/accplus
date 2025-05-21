from flask import Flask, jsonify, request
from flask_cors import CORS
 
app = Flask(__name__)
 
# Proper CORS configuration
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
 
@app.route('/check-token', methods=["GET"])
def check_token():
    return jsonify({"valid": True})
 
# Optional: Manually confirm headers are attached
@app.after_request
def log_headers(response):
    print("🧪 Origin:", request.headers.get("Origin"))
    print("✅ Response Headers:", dict(response.headers))
    return response
 
if __name__ == '__main__':
    app.run(host="localhost", port=8080)