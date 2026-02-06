import { useState, useEffect, useRef } from 'react';

const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText('');
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
}

export default useTypewriter;
