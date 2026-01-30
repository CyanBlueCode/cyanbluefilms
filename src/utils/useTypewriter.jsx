import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState(text);
  const [index, setIndex] = useState(0);

  // REVIEW LandingPage has hydration runtime error likely caused by typewriter desync;
  // this initializes the state so it doesn't start blank. unsure if fixed
  useEffect(() => {
    setDisplayText('');
    setIndex(0);
  }, []);

  useEffect(() => {
    const handle = () => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }
    };

    const interval = setInterval(handle, speed);
    return () => clearInterval(interval);
  }, [index, text, speed]);

  return displayText;
}

export default useTypewriter;
