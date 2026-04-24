import {motion} from 'motion/react';
import {useEffect, useState} from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{id: number; left: string; size: number; duration: number; delay: number}[]>([]);

  useEffect(() => {
    const newHearts = Array.from({length: 20}).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{bottom: -20, opacity: 0}}
          animate={{
            bottom: '120%',
            opacity: [0, 0.4, 0.4, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute text-romantic-300/30 select-none"
          style={{left: heart.left, fontSize: `${heart.size}px`}}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
