import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

<Navbar />
const AccNotifications = () => {
  const [authStatus, setAuthStatus] = useState('idle');
  const BACKEND_URL = "http://localhost:8080"; // Match your server port

  // Check if we already have a valid token on component mount
  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch(`${BACKEND_URL}/check-token`, {
          credentials: 'include',
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        if (data.valid) {
          setAuthStatus('authenticated');
        }
      } catch (error) {
        console.error("Error checking token status:", error);
      }
    }
    
    checkToken();
  }, []);

  const handleAuthClick = () => {
    // Initialize OAuth flow with proper parameters
    initiateOAuthFlow();
  };

  function initiateOAuthFlow() {
    setAuthStatus('authenticating');
    
    // Generate random state for security
    const state = crypto.randomUUID();
    localStorage.setItem("oauth_state", state);
    
    // Get these values from your backend to avoid exposing client ID
    fetch(`${BACKEND_URL}/get-auth-url?state=${state}`)
      .then(response => response.json())
      .then(data => {
        if (data.authUrl) {
          // Open the auth URL in a popup window
          const authWindow = window.open(
            data.authUrl, 
            "AutodeskAuth", 
            "width=800,height=600,menubar=no,toolbar=no,location=no,status=no"
          );
          
          // Monitor if the auth window is closed
          const authCheckInterval = setInterval(() => {
            if (authWindow.closed) {
              clearInterval(authCheckInterval);
              console.log("Authorization window closed by user");
              setAuthStatus('idle');
            }
          }, 500);
          
          // Listen for message from the popup window
          window.addEventListener("message", function(event) {
            // Verify origin for security
            const redirectOrigin = new URL(data.redirectUri).origin;
            if (event.origin !== redirectOrigin) return;
            
            clearInterval(authCheckInterval);
            if (event.data.error) {
              console.error(`Auth error: ${event.data.error}`);
              setAuthStatus('error');
              return;
            }
            
            if (event.data.code && event.data.state) {
              // Verify state to prevent CSRF attacks
              if (event.data.state !== localStorage.getItem("oauth_state")) {
                console.error("Security error: Invalid state parameter");
                setAuthStatus('error');
                return;
              }
              
              // Send auth code to backend
              sendAuthCodeToBackend(event.data.code);
              authWindow.close();
            }
          }, false);
        } else {
          console.error("Failed to get auth URL");
          setAuthStatus('error');
        }
      })
      .catch(error => {
        console.error("Error initiating OAuth flow:", error);
        setAuthStatus('error');
      });
  }

  async function sendAuthCodeToBackend(code) {
    try {
      console.log("Sending authorization code to server...");
      const response = await fetch(`${BACKEND_URL}/exchange-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ code })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        console.log("Authorization successful!");
        setAuthStatus('authenticated');
        // You could fetch hubs or other data here
      } else {
        console.error("Token exchange failed:", data.error);
        setAuthStatus('error');
      }
    } catch (error) {
      console.error("Error sending auth code:", error);
      setAuthStatus('error');
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">ACC Notifications</h1>
      
      {authStatus === 'authenticated' ? (
        <div className="text-center">
          <div className="mb-4 text-green-600 font-medium">✅ Successfully authenticated with Autodesk</div>


          {/* <button
            onClick={() => fetch(`${BACKEND_URL}/user-profile`).then(res => res.json()).then(data => console.log(data))}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Fetch Hubs (Check Console)
          </button> */}

            <button
  onClick={() => {
    Promise.all([
      fetch(`${BACKEND_URL}/user-profile`).then(res => res.json()),
      fetch(`${BACKEND_URL}/hubs`).then(res => res.json())
    ])
      .then(([userProfileData, hubsData]) => {
        console.log("User Profile:", userProfileData);
        console.log("Hubs Data:", hubsData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
>
  Fetch Hubs (Check Console)
</button>

        </div>
      ) : (
        <button
          onClick={handleAuthClick}
          disabled={authStatus === 'authenticating'}
          className={`px-6 py-3 ${
            authStatus === 'authenticating' ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-lg transition duration-300`}
        >
          {authStatus === 'authenticating' ? 'Authenticating...' : 'Login with Autodesk'}
        </button>
      )}
      
      {authStatus === 'error' && (
        <div className="mt-4 text-red-500">
          Authentication failed. Please check console for details.
        </div>
      )}
    </div>
  );
};

export default AccNotifications;