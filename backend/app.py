import os
import json
import time
import base64
from urllib.parse import urlencode
from flask import Flask, request, jsonify, send_from_directory
import requests
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/oauth/callback/"
PORT = int(os.getenv("PORT", 8080))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
SCOPES = "data:read"

access_token = None
token_expiry = None
print(REDIRECT_URI)
 
app = Flask(__name__, static_folder="public", static_url_path="")
 
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response


# Ensure callback.html exists
if not os.path.exists('public'):
    os.makedirs('public')

callback_html = f"""
<!DOCTYPE html>
<html>
<head><title>Autodesk Authentication</title></head>
<body>
  <h2>Authorization successful!</h2>
  <p>You can close this window now.</p>
  <script>
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (window.opener) {{
      window.opener.postMessage({{ code, state, error }}, "{FRONTEND_URL}");
    }}
  </script>
</body>
</html>
"""
with open('public/callback.html', 'w') as f:
    f.write(callback_html)

def get_basic_auth_header():
    credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
    encoded = base64.b64encode(credentials.encode()).decode()
    return f"Basic {encoded}"

def is_token_expired():
    return not token_expiry or time.time() >= token_expiry

@app.route('/get-auth-url', methods=['GET'])
def get_auth_url():
    state = request.args.get('state')
    # redirect_uri = {REDIRECT_URI}
    # auth_url = f"https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={redirect_uri}&scope=data:read"
    # if not state:
        # return jsonify({"error": "Missing state parameter"}), 400

    query = urlencode({
        "response_type": "code",
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": SCOPES,
        "state": state
    })

    print(REDIRECT_URI)
    auth_url = f"https://developer.api.autodesk.com/authentication/v2/authorize?{query}"
    print(f"🔐 Generated auth URL with state: {state}")
    return jsonify({"authUrl": auth_url, "redirectUri": REDIRECT_URI})

@app.route('/oauth/callback')
def oauth_callback():
    return send_from_directory('public', 'callback.html')

@app.route('/check-token', methods=["GET"])
def check_token():
    return jsonify({"valid": True})
        # "valid": access_token is not None and not is_token_expired(),
        # "token": access_token
        


@app.route('/exchange-token', methods=['POST'])
def exchange_token():
    global access_token, token_expiry

    data = request.get_json()
    code = data.get('code')
    if not code:
        return jsonify({"success": False, "error": "No code provided"}), 400

    token_url = "https://developer.api.autodesk.com/authentication/v2/token"
    headers = {
        "Authorization": get_basic_auth_header(),
        "Content-Type": "application/x-www-form-urlencoded"
    }
    payload = urlencode({
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI
    })

    try:
        response = requests.post(token_url, data=payload, headers=headers, timeout=10)
        response.raise_for_status()
        result = response.json()
        access_token = result['access_token']
        token_expiry = time.time() + result['expires_in'] - 300
        print("✅ Access token obtained:")
        print(access_token)
        return jsonify({"success": True})
    except requests.exceptions.RequestException as e:
        print("❌ Token exchange error:", str(e))
        return jsonify({"success": False, "error": "token_exchange_failed"}), 500

@app.after_request
def add_cors_headers(response):
    print(f"Sending CORS headers to: {request.origin}")
    return response

@app.route('/hubs')
def get_hubs():
    global access_token, token_expiry

    if not access_token or is_token_expired():
        print("🚨 No valid access token when fetching hubs")
        return jsonify({"error": "no_token"}), 401

    try:
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        response = requests.get("https://developer.api.autodesk.com/project/v1/hubs", headers=headers, timeout=10)
        response.raise_for_status()
        hubs = response.json().get("data", [])
        simplified_hubs = [{"name": hub["attributes"]["name"], "id": hub["id"]} for hub in hubs]
        for hub in simplified_hubs:
            print(f"🔹 Hub: {hub['name']} (ID: {hub['id']})")
        return jsonify({"hubs": simplified_hubs})
    except requests.exceptions.RequestException as e:
        print("❌ Hubs fetch error:", str(e))
        access_token = None
        token_expiry = None
        return jsonify({"error": "hubs_fetch_failed"}), 500

if __name__ == '__main__':
    print(f"🚀 OAuth server listening on http://localhost:{PORT}")
    print(f"▶️ Redirect URI: {REDIRECT_URI}")
    print(f"🔗 Frontend URL: {FRONTEND_URL}")
    app.run(port=PORT, host = "localhost")
