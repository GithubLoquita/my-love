import {motion, AnimatePresence} from 'motion/react';
import {useState, useEffect} from 'react';
import LoadingScreen from './components/LoadingScreen.tsx';
import FloatingHearts from './components/FloatingHearts.tsx';
import FloatingIcons from './components/FloatingIcons.tsx';
import HeroSection from './components/HeroSection.tsx';
import StorySection from './components/StorySection.tsx';
import ProposalSection from './components/ProposalSection.tsx';
import MusicToggle from './components/MusicToggle.tsx';
import SwipeCards from './components/SwipeCards.tsx';

enum Scene {
  HERO,
  QUESTIONS,
  STORY,
  PROPOSAL
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scene, setScene] = useState<Scene>(Scene.HERO);
  const [isCelebration, setIsCelebration] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
     setIsCelebration(true);
  };

  return (
    <div className="relative font-sans overflow-x-hidden selection:bg-romantic-200 min-h-screen bg-mesh">
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <MusicToggle />
      <FloatingHearts />
      <FloatingIcons />

      <main className={`transition-all duration-1000 relative z-10 ${isCelebration ? 'bg-romantic-100/30' : ''}`}>
        <AnimatePresence mode="wait">
          {scene === Scene.HERO && (
            <motion.div
              key="hero"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0, y: -50}}
              transition={{duration: 0.8}}
            >
              <HeroSection onStart={() => setScene(Scene.QUESTIONS)} />
            </motion.div>
          )}

          {scene === Scene.QUESTIONS && (
            <motion.div
              key="questions"
              initial={{opacity: 0, x: 100}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -100}}
              transition={{duration: 0.8}}
              className="min-h-screen flex items-center justify-center p-6"
            >
              <SwipeCards onComplete={() => setScene(Scene.STORY)} />
            </motion.div>
          )}

          {scene === Scene.STORY && (
            <motion.div
              key="story"
              initial={{opacity: 0, scale: 1.1}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, y: 50}}
              transition={{duration: 1}}
            >
              <StorySection onNext={() => setScene(Scene.PROPOSAL)} />
            </motion.div>
          )}

          {scene === Scene.PROPOSAL && (
            <motion.div
              key="proposal"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1}}
            >
              <ProposalSection onYes={handleYes} isCelebration={isCelebration} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="py-12 text-center text-slate-400 font-display text-xs tracking-[0.2em] uppercase">
           <div className="flex items-center justify-center gap-3 mb-3">
             <span className="w-8 h-px bg-slate-200" />
             <span>Made with love, code, courage & respect</span>
             <span className="w-8 h-px bg-slate-200" />
           </div>
           <div className="flex items-center justify-center gap-2">
             <span>From</span>
             <span className="font-bold text-slate-900 tracking-tighter">Sandip Hembram</span>
             <motion.div
               animate={{scale: [1, 1.3, 1]}}
               transition={{duration: 1.5, repeat: Infinity}}
               className="text-romantic-500"
             >
               ❤️
             </motion.div>
           </div>
        </footer>
      </main>
    </div>
  );
}
