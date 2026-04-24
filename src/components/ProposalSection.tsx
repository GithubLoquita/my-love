import {motion, AnimatePresence} from 'motion/react';
import {useState, useRef} from 'react';
import {Heart, Sparkles, CheckCircle2, ChevronRight, Undo2} from 'lucide-react';
import {triggerConfetti, rainHearts} from '../lib/confetti.ts';

const NO_TEXTS = [
  "Not yet? 🙈",
  "Are you sure? 😏",
  "Think again 😄",
  "Impossible 😌",
  "Try Yes 😍",
  "Nice try 😜",
  "Need time? 😊",
  "Really? 🥺"
];

interface ProposalSectionProps {
  onYes: () => void;
  isCelebration: boolean;
}

export default function ProposalSection({onYes, isCelebration}: ProposalSectionProps) {
  const [noPos, setNoPos] = useState({x: 0, y: 0});
  const [noTextIdx, setNoTextIdx] = useState(0);
  const [noSize, setNoSize] = useState(1);
  const [needTime, setNeedTime] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const btnWidth = 140;
    const btnHeight = 60;

    const maxX = container.width / 2 - btnWidth;
    const maxY = container.height / 2 - btnHeight;

    const newX = (Math.random() - 0.5) * maxX * 1.5;
    const newY = (Math.random() - 0.5) * maxY * 1.5;

    setNoPos({x: newX, y: newY});
    setNoTextIdx((prev) => (prev + 1) % NO_TEXTS.length);
    setNoSize((prev) => Math.max(0.6, prev - 0.05));
    
    if (noTextIdx === NO_TEXTS.findIndex(t => t.includes("Need time"))) {
       // Just a hint
    }
  };

  const handleYes = () => {
    onYes();
    triggerConfetti();
    setTimeout(() => setShowCelebrationModal(true), 2000);
  };

  const handleNeedTime = () => {
    setNeedTime(true);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-mesh">
      <AnimatePresence mode="wait">
        {!isCelebration && !needTime ? (
          <motion.div
            key="proposal-card"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, scale: 1.2}}
            className="glass max-w-4xl w-full p-10 md:p-20 rounded-[3rem] text-center space-y-12 relative z-10 border-t border-white/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)]"
          >
            <motion.div 
               animate={{scale: [1, 1.1, 1]}}
               transition={{duration: 2, repeat: Infinity}}
               className="w-24 h-24 bg-romantic-50 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer relative group"
               onClick={() => rainHearts()}
            >
               <Heart className="text-romantic-600 fill-romantic-500" size={48} />
               <Sparkles className="absolute -top-3 -right-3 text-romantic-400 animate-bounce" size={28} />
               <div className="absolute inset-0 rounded-full border-4 border-romantic-200 animate-ping opacity-20" />
            </motion.div>

            <div className="space-y-6">
              <h2 className="font-display text-4xl md:text-6xl font-extrabold text-slate-950 leading-tight">
                Ranjana Soren, <br/>
                <span className="text-gradient">Will you be mine? 💍❤️</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                You are beautiful, hardworking, caring, intelligent, and rare. <br className="hidden md:block" />
                From every conversation, every smile... I realized: <br/>
                <span className="text-slate-900 font-bold block mt-4">I really like you.</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 relative pb-4">
              <motion.button
                whileHover={{scale: 1.05, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)"}}
                whileTap={{scale: 0.95}}
                onClick={handleYes}
                className="render-button bg-slate-950 text-white min-w-[240px] py-6 px-10 rounded-2xl font-bold text-2xl shadow-xl flex items-center gap-3 relative z-20 group overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">Yes, Sandip 💖</span>
                <div className="absolute inset-0 bg-linear-to-r from-romantic-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-inner" />
              </motion.button>

              <motion.button
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                  scale: noSize,
                  rotate: noPos.x / 12,
                }}
                className="render-button glass bg-white/40 text-slate-700 min-w-[200px] py-6 px-10 rounded-2xl font-bold text-xl hover:bg-white/60 transition-colors shadow-lg border border-white/50 cursor-pointer"
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={handleNeedTime}
              >
                {NO_TEXTS[noTextIdx]}
              </motion.button>
            </div>
          </motion.div>
        ) : needTime ? (
          <motion.div
            key="need-time"
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            className="text-center space-y-8 glass p-16 rounded-[3rem] max-w-2xl"
          >
             <div className="text-8xl mb-4">🌸</div>
             <h2 className="font-display text-4xl font-bold text-slate-900">I’ll wait patiently.</h2>
             <p className="text-xl text-slate-600">You’re worth it, and I respect your space. Take all the time you need, Future Doctor. 😊</p>
             <motion.button
               whileHover={{scale: 1.05}}
               onClick={() => setNeedTime(false)}
               className="render-button glass text-romantic-600 border-romantic-100 flex items-center gap-2 mx-auto cursor-pointer"
             >
               <Undo2 size={20} /> Back to Proposal
             </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            className="flex flex-col items-center justify-center text-center space-y-12 py-20"
          >
            <motion.div
               animate={{
                 rotate: [0, 360],
                 scale: [1, 1.2, 1]
               }}
               transition={{duration: 1, repeat: 1}}
               className="text-[12rem] md:text-[15rem] drop-shadow-2xl"
            >
              💖
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.5}}
              className="space-y-6"
            >
              <h2 className="font-display text-6xl md:text-9xl font-black tracking-tight leading-none">
                You made the <br/>
                <span className="text-gradient">engineer happiest alive 💕</span>
              </h2>
              <p className="text-2xl text-slate-500 font-medium">Our journey as Tech & Medicine starts now.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surprise Modal */}
      <AnimatePresence>
        {showCelebrationModal && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-slate-950/40 backdrop-blur-xl"
          >
            <motion.div
              initial={{scale: 0.5, y: 100, rotate: -5}}
              animate={{scale: 1, y: 0, rotate: 0}}
              className="glass p-16 rounded-[3.5rem] max-w-xl w-full text-center space-y-10 shadow-[0_32px_128px_-12px_rgba(0,0,0,0.3)] border-t border-white/80"
            >
              <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto rotate-12">
                <CheckCircle2 className="text-green-500" size={56} />
              </div>
              <div className="space-y-6">
                <h3 className="font-display text-4xl font-black text-slate-950">Officially Reserved!</h3>
                <p className="text-2xl font-bold bg-romantic-50 text-romantic-600 py-4 px-6 rounded-2xl inline-block">
                  Reserved for Sandip Hembram ❤️
                </p>
                <p className="text-slate-500 text-lg leading-relaxed">
                  The documentation is signed, the deployment is live, and the heart is healing. 
                  I promise to always be your strongest support system.
                </p>
              </div>
              <button 
                onClick={() => setShowCelebrationModal(false)}
                className="w-full py-5 bg-slate-950 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition-colors shadow-xl group flex items-center justify-center gap-2 cursor-pointer"
              >
                Let's Celebrate <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
