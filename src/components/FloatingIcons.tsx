import {motion} from 'motion/react';
import {Stethoscope, Heart, Laptop, Code, Activity, Terminal} from 'lucide-react';
import {useEffect, useState} from 'react';

const icons = [
  {icon: <Stethoscope size={24} />, color: "text-romantic-400"},
  {icon: <Heart size={20} />, color: "text-romantic-500"},
  {icon: <Laptop size={24} />, color: "text-indigo-400"},
  {icon: <Code size={20} />, color: "text-indigo-500"},
  {icon: <Activity size={22} />, color: "text-romantic-300"},
  {icon: <Terminal size={22} />, color: "text-slate-400"},
];

export default function FloatingIcons() {
  const [elements, setElements] = useState<{id: number; left: string; top: string; delay: number; duration: number; iconIdx: number}[]>([]);

  useEffect(() => {
    const newElements = Array.from({length: 15}).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 20,
      iconIdx: Math.floor(Math.random() * icons.length),
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{opacity: 0, scale: 0.5}}
          animate={{
            opacity: [0, 0.2, 0.2, 0],
            y: [-20, 20, -20],
            x: [-20, 20, -20],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${icons[el.iconIdx].color}`}
          style={{left: el.left, top: el.top}}
        >
          {icons[el.iconIdx].icon}
        </motion.div>
      ))}
    </div>
  );
}
