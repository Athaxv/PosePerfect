import React from "react";

const Feedback: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden mb-16 mt-16" id="feedback-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0" id="feedback-grid">
        <div className="p-8 md:p-10" id="feedback-options">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6" id="feedback-heading">
            Two Ways to Get Feedback
          </h3>

          <div className="space-y-6" id="feedback-methods">
            <div className="flex items-start" id="upload-video-option">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-lg mr-4" id="upload-video-icon">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <div id="upload-video-details">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2" id="upload-video-title">Upload a Video</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3" id="upload-video-description">
                  Record your practice and upload it for comprehensive analysis and detailed reports.
                </p>
                <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-sm flex items-center" id="upload-video-cta">
                  How to upload
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-start" id="live-session-option">
              <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-lg mr-4" id="live-session-icon">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div id="live-session-details">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2" id="live-session-title">Live Session</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3" id="live-session-description">
                  Get real-time feedback as you practice with our live assessment technology.
                </p>
                <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors text-sm flex items-center" id="live-session-cta">
                  Start a session
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 p-8 md:p-10 flex items-center justify-center" id="assessment-start">
          <div className="text-center max-w-sm" id="assessment-start-content">
            <div className="mb-6" id="assessment-start-header">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-4" id="assessment-start-icon">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2" id="assessment-start-title">Start Your Assessment Now</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6" id="assessment-start-description">
                Experience the power of AI-driven pose assessment and receive personalized feedback.
              </p>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full mb-3" id="upload-video-button">
              Upload a Video
            </button>

            <button className="bg-white dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-600 text-indigo-600 dark:text-indigo-300 font-medium py-2.5 px-6 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full" id="start-live-session-button">
              Start Live Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;