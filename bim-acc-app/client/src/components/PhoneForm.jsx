import { useState, useEffect } from "react";

export default function NotificationsCenter() {
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Simulating fetching user data from login
  useEffect(() => {
    // This would normally be a fetch request to your API
    // For demo purposes, we're just setting a sample name
    setUserName("John");
  }, []);

  const handleSubmit = () => {
    if (!mobileNumber) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Mobile number submitted:", mobileNumber);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-md w-full mx-auto mt-10 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-gray-800">ACC Notifications Centre</h1>
          {/* Your company logo */}
          <div className="w-12 h-12 bg-black">
            {/* Replace with your actual logo */}
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Hello, {userName}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h2>
            <p className="text-gray-600 mb-4">Please provide your mobile number to receive notifications</p>
            
            <div className="mb-6">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your mobile number"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Allow"}
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't want to receive notifications?</span>{" "}
          <a href="#" className="text-black font-medium">Cancel</a>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-600">Your account for everything ACC</p>
          <a href="#" className="text-black font-medium">Learn more</a>
        </div>
      </div>
    </div>
  );
}