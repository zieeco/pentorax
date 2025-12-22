
import React, { useState } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gray-100 border-b border-gray-200 text-center text-sm text-gray-700 py-2 px-4 shadow-sm">
      <span>
        May we use cookies to track your activities? We take your privacy very seriously. Please see our privacy policy for details and any questions.
      </span>
      <button onClick={() => setIsVisible(false)} className="text-blue-600 font-semibold ml-2 hover:underline">Yes</button>
      <button onClick={() => setIsVisible(false)} className="text-blue-600 font-semibold ml-2 hover:underline">No</button>
    </div>
  );
};

export default CookieBanner;
