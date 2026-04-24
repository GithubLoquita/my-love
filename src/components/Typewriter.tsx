import {motion} from 'motion/react';
import {useEffect, useState} from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function Typewriter({text, delay = 50, className}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, isStarted]);

  return (
    <motion.p
      className={className}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
      {displayText}
      {isStarted && !isComplete && (
        <motion.span
          animate={{opacity: [0, 1, 0]}}
          transition={{duration: 0.8, repeat: Infinity}}
          className="inline-block w-0.5 h-6 bg-romantic-500 ml-1 translate-y-1"
        />
      )}
    </motion.p>
  );
}
