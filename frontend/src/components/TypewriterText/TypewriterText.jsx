import { useState, useEffect } from 'react';

function TypewriterText({ text, speed = 30, startDelay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? startDelay : speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, startDelay]);

  return <span>{displayText}</span>;
}

export default TypewriterText;