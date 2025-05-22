//TESTING

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import connectDB from './db.js';
import { userSchema } from './models/User.js';
import { hubSchema } from './models/Hub.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import User from './models/User.js';

// Load environment variables from .env file
dotenv.config();
const app = express();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  PORT = 8080,
  FRONTEND_URL = 'http://localhost:5173',
  CALLBACK_URL,
} = process.env;

const { db1, db2 } = await connectDB();


const User = db1.model('User', userSchema);

const Hub = db2.model('Hub', hubSchema);

// Middleware Order is CRUCIAL:
 
// 1. Cookie Parser (required for express-session)
app.use(cookieParser());
 
// 2. Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_very_secret_key', // **IMPORTANT: Change this to a strong, random key from .env**
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    httpOnly: true,
    sameSite: 'lax', // 'none' if cross-site, but requires secure: true
  }
}));

// app.use((req, res, next) => {
//   const subdomain = req.subdomains[0]; // Express parses it for you
//   req.subdomain = subdomain;
//   console.log(`🧭 Subdomain: ${subdomain}`); // for debugging
//   next();
// });

app.use((req, res, next) => {
  const requestHost = req.headers.host; // e.g., "abc.localhost:8080"
  let dynamicFrontendUrl;
 
  // Determine the frontend URL based on the request host
  if (requestHost && requestHost.includes('localhost')) {
    // If it's a subdomain of localhost, build the frontend URL with that subdomain
    // Assuming frontend runs on 5173
    const [hostnameWithoutPort] = requestHost.split(':');
    dynamicFrontendUrl = `http://${hostnameWithoutPort}:5173`;
  } else {
    // Fallback or production setup
    dynamicFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  }
 
  // Set FRONTEND_URL in a way that's accessible to subsequent middleware and routes
  req.frontendUrl = dynamicFrontendUrl; // Make it available on the request object
  // Also store it in session if needed for the callback.html.
  // This is crucial for the postMessage to work from the callback.html served by the backend.
  req.session.currentFrontendUrl = dynamicFrontendUrl;
 
  console.log(`Dynamic FRONTEND_URL for this request: ${req.frontendUrl}`);
 
  next();
});



// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true
// }));


// app.use(cors({
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     const allowedOrigins = [
//       FRONTEND_URL, // e.g., 'http://localhost:5173'
//       // Or a regex for all *.localhost subdomains
//       /^http:\/\/(.+\.)?localhost:5173$/,
//       req.frontendUrl
//     ];
//     if (allowedOrigins.some(ao => origin.match(ao))) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }))

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    const allowedOrigins = [
      FRONTEND_URL, // e.g., 'http://localhost:5173'
      /^http:\/\/([a-z0-9-]+\.)?localhost:5173$/i // allow all subdomains of localhost:5173
    ];
    if (
      allowedOrigins.some(ao =>
        typeof ao === 'string' ? origin === ao : ao.test(origin)
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.set('subdomain offset', 1);

// console.log(CLIENT_ID);
// console.log(CLIENT_SECRET);

// Define required scopes for Autodesk API
const SCOPES = 'data:read';

let accessToken = null;
let tokenExpiry = null;





// connectDB()
// const { db1, db2 } = await connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// app.post('/api/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Save user to DB1
    const user = new User({ name, email, password });
    await user.save();

    // Save hub to DB2
    const hub = new Hub({
      action: 'User Registered',
      userEmail: email,
    });
    await hub.save();

    res.status(201).json({ message: 'User registered and logged successfully.' });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// Helper: Basic Auth header for token exchange
function getBasicAuthHeader(id, secret) {
  const creds = Buffer.from(`${id}:${secret}`).toString('base64');
  // console.log(creds);
  return `Basic ${creds}`;
}

// Helper: Check if token is expired
function isTokenExpired() {
  if (!tokenExpiry) return true;
  return Date.now() >= tokenExpiry;
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
    const response = await axios.post(tokenUrl, params.toString(), { headers, timeout: 10000 });
    accessToken = response.data.access_token;
    // Set token expiry time
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return accessToken;
  } catch (err) {
    console.error('Token exchange error response data:', err.response?.data || err.message);
    throw err;
  }
}

// Get hubs from Autodesk API
async function getHubs(token) {
  const url = 'https://developer.api.autodesk.com/project/v1/hubs';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  
  try {
    const response = await axios.get(url, { headers, timeout: 10000 });
    const hubsData = response.data;
    // Extract name and id
    return hubsData.data.map(hub => ({
      name: hub.attributes.name,
      id: hub.id
    }));
  } catch (err) {
    console.error('Hubs fetch error:', err.response?.data || err.message);
    throw err;
  }
}

// Create public directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
}

// Create callback.html
const callbackHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Autodesk Authentication</title>
</head>
<body>
  <h2>Authorization successful!</h2>
  <p>You can close this window now.</p>
  <script>
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    // Send message back to opener (main window)
    if (window.opener) {
      window.opener.postMessage(
        { code, state, error },
        "${FRONTEND_URL}"
      );
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'public', 'callback.html'), callbackHtml);

// 1) Get auth URL for frontend
app.get('/get-auth-url', (req, res) => {
  const { state } = req.query;
  if (!state) {
    return res.status(400).json({ error: 'Missing state parameter' });
  }
  
  const authUrl = 
    `https://developer.api.autodesk.com/authentication/v2/authorize` +
    `?response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPES)}` +
    `&state=${state}`;
  
  console.log(`🔐 Generated auth URL with state: ${state}`);
  res.json({ 
    authUrl,
    redirectUri: REDIRECT_URI
  });
});

// 2) OAuth callback
app.get('/oauth/callback', (req, res) => {
  // Serve the callback HTML file which will pass the code to the main window
  // res.sendFile(path.join(__dirname, 'public', 'callback.html'));
  // Use the dynamic frontend URL stored in session (set by earlier middleware)
  const targetOrigin = req.session.currentFrontendUrl || FRONTEND_URL;

  // Serve a dynamic HTML page with the correct postMessage target
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Autodesk Authentication</title>
    </head>
    <body>
      <h2>Authorization successful!</h2>
      <p>You can close this window now.</p>
      <script>
        // Parse the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        
        // Send message back to opener (main window)
        if (window.opener) {
          window.opener.postMessage(
            { code, state, error },
            "${targetOrigin}"
          );
        }
      </script>
    </body>
    </html>
  `);
});

// 3) Check token status
app.get('/check-token', (req, res) => {
  res.json({ 
    valid: !!accessToken && !isTokenExpired(),
    token: accessToken 
  });
});

// HUBS

app.get('/hubs', async (req, res) => {
  if (!accessToken || isTokenExpired()) {
    console.log('🚨 No valid access token when fetching hubs');
    return res.status(401).json({ error: 'no_token' });
  }

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const callbackUrl = process.env.CALLBACK_URL;

  try {
    const hubs = await getHubs(accessToken);

    // Save each hub in Log collection
const logPromises = hubs.map(hub => {
  console.log(`🔹 Hub: ${hub.name} (ID: ${hub.id}) Client ID: ${clientId}`);
  return Hub.findOneAndUpdate(
    { hubID: hub.id }, // filter: match by hubID
    {
      hubID: hub.id,
      hubName: hub.name,
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl
    },
    {
      upsert: true,   // insert if not found
      new: true,      // return the updated document
      setDefaultsOnInsert: true
    }
  );
});
    await Promise.all(logPromises);

    return res.json({ hubs });
  } catch (err) {
    console.error('Hubs fetch error:', err.response?.data || err.message);
    if (err.response && err.response.status === 401) {
      accessToken = null;
      tokenExpiry = null;
    }
    return res.status(err.response?.status || 500).json({ error: 'hubs_fetch_failed' });
  }
});

// USER PROFILE

app.get('/user-profile', async (req, res) => {

  console.log(accessToken);

  if (!accessToken || isTokenExpired()) {
    console.log('🚨 No valid access token for user profile');
    return res.status(401).json({ error: 'no_token' });
  }

  try {
    const response = await axios.get('https://developer.api.autodesk.com/userprofile/v1/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const user = response.data;

  const updateData = {   userID: user.userId,   firstName: user.firstName,   lastName: user.lastName};
  if(user.emailId && user.emailId.trim() !== ''){
    updateData.emailID = user.emailId;
  }

    
    console.log('🧑‍💻 Autodesk User Info:', user);

    const savedUser = await User.findOneAndUpdate(
      { userID: user.userId },

      updateData,
      { upsert:true, new: true }
    );


    console.log('✅ User saved to MongoDB:', savedUser);
    return res.json({ user: savedUser });

  } catch (err) {
    console.error('❌ Error fetching user profile:', err);
  return res.status(err.response?.status || 500).json({ error: 'user_profile_fetch_failed', details: err.message });
  }
});

app.post('/set-token', (req, res) => {
  const { token, expires_in } = req.body;
  accessToken = token;
  tokenExpiry = Date.now() + expires_in * 1000;
  console.log('✅ Access token set');
  res.json({ message: 'Token set' });
});

// POST /save-user - expects user data from frontend
app.post('/save-user', async (req, res) => {
  try {
    const { userId, firstName, lastName, emailId, phone } = req.body;

    const user = new User({ userId, firstName, lastName, emailId, phone });
    await user.save();

    console.log(`✅ User saved: ${firstName} ${lastName}`);
    res.status(201).json({ success: true, message: 'User data saved to MongoDB' });
  } catch (error) {
    console.error('❌ Error saving user:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});





app.get('/auth/refresh', async (req, res) => {
  try {
    const refreshToken = req.session.refreshToken;
    const response = await axios.post('https://developer.api.autodesk.com/authentication/v1/refreshtoken',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    req.session.accessToken = response.data.access_token;
    req.session.refreshToken = response.data.refresh_token;
    res.json({ accessToken: response.data.access_token });
  } catch (error) {
    console.error('Refresh failed:', error.response?.data || error.message);
    res.status(500).send('Failed to refresh token.');
  }
});








// 5) Exchange token via POST
app.post('/exchange-token', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, error: 'No code provided' });
  
  try {
    const token = await exchangeCodeForToken(code);
    console.log('✅ Obtained access token via POST exchange');
    return res.json({ success: true });
  } catch (err) {
    console.error('Token exchange error:', err.response?.data || err.message);
    return res.status(500).json({ success: false, error: 'token_exchange_failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 OAuth server listening on http://localhost:${PORT}`);
  console.log(`▶️ Redirect URI: ${REDIRECT_URI}`);
  console.log(`🔗 Frontend URL: ${FRONTEND_URL}`);
});





