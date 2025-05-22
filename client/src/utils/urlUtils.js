// src/utils/urlUtils.js
 export function getBackendUrl() {
  const frontendHostname = window.location.hostname; // e.g., "abc.localhost"
  const backendPort = 8080; // Your backend port
 
  if (frontendHostname.includes('localhost')) {
    // If it's localhost or a subdomain of localhost (e.g., abc.localhost)
    return `http://${frontendHostname}:${backendPort}`;
  }
  // Fallback for production or other environments
  // This should probably be an environment variable in your frontend build
  return 'http://localhost:8080'; // Or process.env.VITE_APP_BACKEND_URL
}