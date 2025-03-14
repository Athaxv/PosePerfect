import React from 'react';

interface WebcamControlsProps {
  isActive: boolean;
  onToggle: () => void;
  score?: number;
  feedbackType?: 'correct' | 'warning' | 'incorrect';
  feedback?: string | null;
}

const WebcamControls: React.FC<WebcamControlsProps> = ({ 
  isActive, 
  onToggle, 
  score, 
  feedbackType = 'correct',
  feedback 
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="6" y="6" width="12" height="12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
          <div>
            <p className="text-white text-sm font-medium">
              {isActive ? 'Analyzing posture...' : 'Start analysis'}
            </p>
            <p className="text-white/70 text-xs">
              {isActive ? 'Click to stop' : 'Click to begin'}
            </p>
          </div>
        </div>
        
        {isActive && typeof score !== 'undefined' && (
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-28 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  feedbackType === 'correct' ? 'bg-posture-correct' : 
                  feedbackType === 'warning' ? 'bg-posture-warning' : 'bg-posture-incorrect'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-white text-sm font-medium">
              {score}%
            </span>
          </div>
        )}
      </div>
      
      {/* Feedback message */}
      {isActive && feedback && (
        <div className="mt-3 p-2.5 rounded-lg bg-black/40 backdrop-blur-sm animate-slide-up">
          <p 
            className={`text-sm ${
              feedbackType === 'correct' ? 'text-posture-correct' : 
              feedbackType === 'warning' ? 'text-posture-warning' : 'text-posture-incorrect'
            }`}
          >
            {feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default WebcamControls;
