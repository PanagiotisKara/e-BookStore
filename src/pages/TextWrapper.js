import React, { useState } from 'react';

const TextWrapper = ({ text, maxLength = 100 }) => {
  const [isWrapped, setIsWrapped] = useState(true);

  const toggleWrap = () => {
    setIsWrapped(!isWrapped);
  };

  // Add null check to prevent accessing length property of null
  const displayedText = text && (isWrapped && text.length > maxLength ? text.slice(0, maxLength) + '...' : text);

  return (
    <div>
      <p onClick={toggleWrap} style={{ cursor: 'pointer'}}>
        <b>Description:</b> {displayedText}
      </p>
    </div>
  );
};

export default TextWrapper;