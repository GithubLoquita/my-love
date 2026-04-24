import {motion} from 'motion/react';
import {Heart, ChevronRight, Laptop, Stethoscope} from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({onStart}: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 strobe-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white/80 text-sm font-medium border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-romantic-500 animate-pulse" />
          Special Announcement
        </motion.div>

        <div className="space-y-6">
          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            className="font-display text-5xl md:text-8xl font-extrabold tracking-tight text-slate-950"
          >
            Dear <span className="text-gradient">Ranjana Soren</span> 💖
          </motion.h1>
          
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
            className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            A <span className="text-indigo-600 font-semibold px-2 py-0.5 bg-indigo-50 rounded italic border border-indigo-100 flex items-center gap-1 inline-flex"><Laptop size={18} /> Computer Engineer</span> has something special to tell an <br className="hidden md:block" /> amazing <span className="text-romantic-600 font-semibold px-2 py-0.5 bg-romantic-50 rounded italic border border-romantic-100 flex items-center gap-1 inline-flex"><Stethoscope size={18} /> future doctor…</span>
          </motion.p>
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.6}}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={onStart}
            className="render-button bg-slate-950 text-white hover:bg-slate-800 scale-110 shadow-2xl group relative overflow-hidden py-4 px-10 rounded-2xl cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2 text-xl tracking-tight">
              Start Surprise <Heart size={24} fill="currentColor" className="text-romantic-500 group-hover:scale-125 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-romantic-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
          
          <p className="text-sm text-slate-400 font-mono flex items-center gap-2">
            Designed for better healing & faster compiling
          </p>
        </motion.div>
      </div>

      {/* Floating Elements Corner Decor */}
      <motion.div
        animate={{y: [40, 60, 40], x: [0, 10, 0]}}
        transition={{duration: 8, repeat: Infinity}}
        className="absolute bottom-10 right-10 text-slate-200 pointer-events-none hidden lg:block"
      >
        <div className="glass p-6 rounded-3xl space-y-4">
          <div className="flex gap-3">
             <div className="w-12 h-2 bg-slate-200 rounded-full" />
             <div className="w-12 h-2 bg-slate-200 rounded-full" />
          </div>
          <div className="flex gap-3">
             <div className="w-8 h-2 bg-slate-200 rounded-full" />
             <div className="w-16 h-2 bg-slate-200 rounded-full" />
          </div>
          <div className="absolute -top-6 -left-6 bg-romantic-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Heart size={24} fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
