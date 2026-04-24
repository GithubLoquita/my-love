import {motion} from 'motion/react';
import {useEffect, useState} from 'react';

export default function LoadingScreen() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.8}}
      className="fixed inset-0 z-[100] bg-romantic-50 flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
        className="text-6xl mb-8"
      >
        ❤️
      </motion.div>
      <motion.h2
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        className="font-display text-2xl font-semibold text-romantic-600 mb-2"
      >
        Preparing something special{dots}
      </motion.h2>
      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.5}}
        className="text-slate-500 font-sans italic"
      >
        Loading real feelings. Please wait.
      </motion.p>
    </motion.div>
  );
}
