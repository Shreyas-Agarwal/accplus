 
// // Configuration
// requestAnimationFrame("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const port = 5000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
//  // Replace with your actual client ID

// const SCOPES = "data:read";
 
// /**
// * Initiate the OAuth flow by opening a popup window with the Autodesk authorization URL
// */
// function initiateOAuthFlow() {
//   // Generate random state for security
//   const state = crypto.randomUUID();
//   localStorage.setItem("oauth_state", state);
//   // Construct the authorization URL according to Autodesk APS docs
//   const authUrl = 
//     `https://developer.api.autodesk.com/authentication/v2/authorize` +
//     `?response_type=code` +
//     `&client_id=${OAUTH_CLIENT_ID}` +
//     `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//     `&scope=${encodeURIComponent(SCOPES)}` +
//     `&state=${state}`;
//   // Open the auth URL in a popup window
//   const authWindow = window.open(authUrl, "AutodeskAuth", 
//     "width=800,height=600,menubar=no,toolbar=no,location=no,status=no");
//   // Monitor if the auth window is closed
//   const authCheckInterval = setInterval(() => {
//     if (authWindow.closed) {
//       clearInterval(authCheckInterval);
//       console.log("Authorization window closed by user");
//       showFeedback("Authorization canceled", "info");
//     }
//   }, 500);
//   // Listen for message from the popup window (this would be set up in your callback page)
//   window.addEventListener("message", function(event) {
//     // Verify origin for security
//     if (event.origin !== new URL(REDIRECT_URI).origin) return;
//     clearInterval(authCheckInterval);
//     if (event.data.error) {
//       showFeedback(`Auth error: ${event.data.error}`, "error");
//       return;
//     }
//     if (event.data.code && event.data.state) {
//       // Verify state to prevent CSRF attacks
//       if (event.data.state !== localStorage.getItem("oauth_state")) {
//         showFeedback("Security error: Invalid state parameter", "error");
//         return;
//       }
//       // Send auth code to backend
//       sendAuthCodeToBackend(event.data.code);
//       authWindow.close();
//     }
//   }, false);
// }
 
// /**
// * Send the authorization code to the backend
// */
// async function sendAuthCodeToBackend(code) {
//   try {
//     showFeedback("Sending authorization code to server...", "info");
//     const response = await fetch(`${REDIRECT_URI}/exchange-code`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//       body: JSON.stringify({ code })
//     });
//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status}`);
//     }
//     const data = await response.json();
//     showFeedback("Authorization successful!", "success");
//     // Call any functions that should happen after successful auth
//     // For example: fetchUserData(data.token);
//   } catch (error) {
//     console.error("Error sending auth code:", error);
//     showFeedback(`Error: ${error.message}`, "error");
//   }
// }
 
// /**
// * Show feedback to the user
// */
// function showFeedback(message, type = "info") {
//   console.log(`[Feedback] ${type}: ${message}`);
//   // Remove any existing feedback
//   const existing = document.getElementById("auth-feedback");
//   if (existing) existing.remove();
//   // Create feedback element
//   const feedback = document.createElement("div");
//   feedback.id = "auth-feedback";
//   feedback.textContent = message;
//   // Style based on type
//   let backgroundColor = "#2196F3"; // info (blue)
//   if (type === "success") backgroundColor = "#4CAF50"; // green
//   if (type === "error") backgroundColor = "#F44336"; // red
//   feedback.style.cssText = `
//     position: fixed;
//     bottom: 80px;
//     right: 20px;
//     background: ${backgroundColor};
//     color: white;
//     padding: 12px 20px;
//     border-radius: 8px;
//     z-index: 10000;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//   `;
//   document.body.appendChild(feedback);
//   // Auto-remove non-error messages after 5 seconds
//   if (type !== "error") {
//     setTimeout(() => feedback.remove(), 5000);
//   }
// }
 
// // Add click event to your button
// document.addEventListener('DOMContentLoaded', function() {
//   const authButton = document.getElementById('authorize-button');
//   if (authButton) {
//     authButton.addEventListener('click', function() {
//       // Start OAuth flow when button is clicked
//       initiateOAuthFlow();
//     });
//   }
// });
 
// // Optional: This code should be in your callback page (redirect URI)
// // In the page at REDIRECT_URI location:
// /*
// window.addEventListener('DOMContentLoaded', function() {
//   // Parse the URL parameters
//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get('code');
//   const state = urlParams.get('state');
//   const error = urlParams.get('error');
//   // Send message back to opener (main window)
//   if (window.opener) {
//     window.opener.postMessage(
//       { code, state, error },
//       new URL(window.location.href).origin
//     );
//   }
//   // Show success message in callback page
//   document.body.innerHTML = '<h2>Authorization successful!</h2><p>You can close this window now.</p>';
// });
// */


import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
 
// Load environment variables from .env file
dotenv.config();
 
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  PORT = 8080
} = process.env;
 
let accessToken = null;
BACKEND_URL="http://localhost:8080"
 
const app = express();
 
// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
 
// Helper: Basic Auth header for token exchange
function getBasicAuthHeader(id, secret) {
  const creds = Buffer.from(`${id}:${secret}`).toString('base64');
  return `Basic ${creds}`;
}
 
// Exchange authorization code for access token
async function exchangeCodeForToken(code) {
  const tokenUrl = 'https://developer.api.autodesk.com/authentication/v2/token';
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI
  });
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': getBasicAuthHeader(CLIENT_ID, CLIENT_SECRET)
  };
 
  try {
    const response = await axios.post(tokenUrl, params.toString(), { headers, timeout: 5000 });
    return response.data.access_token;
  } catch (err) {
    console.error('Token exchange error response data:', err.response?.data || err.message);
    throw err;
  }
}
 
// Get hubs from Autodesk API
async function getHubs(accessToken) {
  const url = 'https://developer.api.autodesk.com/project/v1/hubs';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };
  const response = await axios.get(url, { headers, timeout: 5000 });
  const hubsData = response.data;
  // Extract name and id
  return hubsData.data.map(hub => ({
    name: hub.attributes.name,
    id: hub.id
  }));
}
 
// 1) OAuth callback
app.get('/oauth/callback/', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Missing code parameter');
  }
  try {
    accessToken = await exchangeCodeForToken(code);
    console.log('✅ Obtained access token');
    return res.status(200).send('<html><body><h2>Authorization successful. You may close this window.</h2></body></html>');
  } catch (err) {
    console.error('Token exchange failed:', err.response?.data || err.message);
    return res.status(err.response?.status || 500).send('Token exchange failed');
  }
});
 
// 2) Check token status
app.get('/check-token', (req, res) => {
  res.json({ valid: !!accessToken, token: accessToken });
});
 
// 3) Hubs endpoint - fetch real hubs
app.get('/hubs', async (req, res) => {
  if (!accessToken) {
    console.log('🚨 No access token when fetching hubs');
    return res.status(401).json({ error: 'no_token' });
  }
  const { assetId, assetName } = req.query;
  console.log(`⚙️ Received request for assetId=${assetId}, assetName=${assetName}`);
  try {
    const hubs = await getHubs(accessToken);
    // Log hub names to terminal as demo
    hubs.forEach(hub => console.log(`🔹 Hub: ${hub.name} (ID: ${hub.id})`));
    return res.json({ hubs });
  } catch (err) {
    console.error('Hubs fetch error:', err.response?.data || err.message);
    // If unauthorized or expired token, reset
    if (err.response && err.response.status === 401) {
      accessToken = null;
    }
    return res.status(err.response?.status || 500).json({ error: 'hubs_fetch_failed' });
  }
});
 
// 4) Exchange token via POST
app.post('/exchange-token', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, error: 'No code provided' });
  try {
    accessToken = await exchangeCodeForToken(code);
    console.log('✅ Obtained access token via POST exchange');
    return res.json({ success: true, access_token: accessToken });
  } catch (err) {
    console.error('Token exchange error:', err.response?.data || err.message);
    return res.status(500).json({ success: false, error: 'token_exchange_failed' });
  }
});
 
// Start server
app.listen(PORT, () => {
  console.log(`🚀 OAuth server listening on http://localhost:${PORT}`);
  console.log(`▶️ Redirect URI: ${REDIRECT_URI}`);
});