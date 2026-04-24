import {motion, AnimatePresence} from 'motion/react';
import {useState} from 'react';
import {Heart, ChevronRight, XCircle, CheckCircle2} from 'lucide-react';
import confetti from 'canvas-confetti';

const questions = [
  {id: 1, text: "Coffee date with a coder? ☕💻", emoji: "👩‍⚕️"},
  {id: 2, text: "Long drive after hospital duty? 🚗", emoji: "🌅"},
  {id: 3, text: "Someone who waits for your replies deserves a chance? 😄", emoji: "✨"},
  {id: 4, text: "Can a doctor heal an engineer’s heart? ❤️🩹", emoji: "🩺"},
  {id: 5, text: "Ready for the biggest surprise?", emoji: "🎁"},
];

interface SwipeCardsProps {
  onComplete: () => void;
}

export default function SwipeCards({onComplete}: SwipeCardsProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: {y: 0.6},
        colors: ['#f43f5e', '#ffffff']
      });
    }
    
    setDirection(isYes ? 1 : -1);
    
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setDirection(0);
      } else {
        onComplete();
      }
    }, 300);
  };

  return (
    <div className="relative h-[500px] w-full max-w-md mx-auto flex flex-col items-center justify-center pt-8">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-2">
        {questions.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i <= currentIdx ? 'w-8 bg-romantic-500' : 'w-4 bg-slate-200'}`}
          />
        ))}
      </div>

      <div className="relative w-full h-[400px] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{scale: 0.9, opacity: 0, y: 20}}
            animate={{scale: 1, opacity: 1, y: 0}}
            exit={{
              x: direction * 500,
              opacity: 0,
              rotate: direction * 20,
              scale: 0.5
            }}
            transition={{type: "spring", stiffness: 300, damping: 25}}
            className="absolute inset-0 glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-8 shadow-xl border-t border-white/50"
          >
            <div className="text-6xl mb-4 transform hover:scale-110 transition-transform cursor-default">
              {questions[currentIdx].emoji}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              {questions[currentIdx].text}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-12 w-full justify-center">
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => handleAnswer(false)}
          className="w-16 h-16 rounded-full glass flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors shadow-lg border border-slate-100"
        >
          <XCircle size={32} />
        </motion.button>
        
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => handleAnswer(true)}
          className="w-20 h-20 rounded-full bg-romantic-600 text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(244,63,94,0.4)] hover:bg-romantic-500 transition-colors"
        >
          <Heart size={36} fill="currentColor" />
        </motion.button>

        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => handleAnswer(true)}
          className="w-16 h-16 rounded-full glass flex items-center justify-center text-romantic-500 hover:text-romantic-600 transition-colors shadow-lg border border-romantic-50"
        >
          <ChevronRight size={32} />
        </motion.button>
      </div>
    </div>
  );
}
