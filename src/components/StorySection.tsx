import {motion} from 'motion/react';
import {Sparkles, Heart, MessageCircle, Star, Laptop, Stethoscope, ChevronRight} from 'lucide-react';
import Typewriter from './Typewriter.tsx';

const memories = [
  {
    icon: <Heart className="text-romantic-500" />,
    title: "Your smile feels peaceful",
    desc: "A single look at you can calm my busiest days. It's magic.",
    emoji: "😊"
  },
  {
    icon: <MessageCircle className="text-purple-500" />,
    title: "Talking feels easy",
    desc: "We can talk for hours or just stay silent, and it never feels weird.",
    emoji: "💬"
  },
  {
    icon: <Star className="text-yellow-500" />,
    title: "You stay in my mind",
    desc: "Unexpectedly, throughout the day, you're the thought that makes me smile.",
    emoji: "💭"
  },
  {
    icon: <Sparkles className="text-blue-500" />,
    title: "You make it special",
    desc: "Even the most ordinary moments become memories when you are there.",
    emoji: "✨"
  }
];

interface StorySectionProps {
  onNext: () => void;
}

export default function StorySection({onNext}: StorySectionProps) {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto space-y-40">
      <div className="flex flex-col items-center text-center space-y-12">
        <div className="glass p-12 md:p-24 rounded-[4rem] max-w-5xl w-full border-t border-white/80 shadow-2xl relative overflow-hidden group">
           <Typewriter 
              text="You study to save lives... I build things with code... You heal hearts... But somehow... you captured mine."
              delay={60}
              className="text-3xl md:text-6xl font-display font-black text-slate-950 leading-tight italic"
           />
           <div className="absolute -bottom-20 -right-20 text-slate-50 opacity-5 group-hover:opacity-10 transition-opacity">
              <Stethoscope size={300} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <motion.div
           initial={{opacity: 0, x: -30}}
           whileInView={{opacity: 1, x: 0}}
           viewport={{once: true}}
           className="glass p-12 rounded-[3.5rem] space-y-8 flex flex-col items-center text-center border-l-8 border-indigo-500 relative overflow-hidden bg-mesh"
        >
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shadow-lg">
             <Laptop size={48} />
          </div>
          <div className="space-y-4 relative z-10">
             <h3 className="font-display text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none">Sandip Hembram</h3>
             <div className="flex flex-wrap gap-2 justify-center">
               <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black font-mono border border-indigo-100 shadow-sm">COMPUTER ENGINEER</span>
             </div>
             <p className="text-slate-500 text-lg font-medium leading-relaxed">Dreamer. Builder. Someone who truly likes you and believes in the beauty of your soul.</p>
          </div>
        </motion.div>

        <motion.div
           initial={{opacity: 0, x: 30}}
           whileInView={{opacity: 1, x: 0}}
           viewport={{once: true}}
           className="glass p-12 rounded-[3.5rem] space-y-8 flex flex-col items-center text-center border-r-8 border-romantic-500 relative overflow-hidden bg-mesh"
        >
          <div className="w-24 h-24 bg-romantic-50 rounded-3xl flex items-center justify-center text-romantic-600 shadow-lg">
             <Stethoscope size={48} />
          </div>
          <div className="space-y-4 relative z-10">
             <h3 className="font-display text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none">Ranjana Soren</h3>
             <div className="flex flex-wrap gap-2 justify-center">
               <span className="px-5 py-2 bg-romantic-50 text-romantic-600 rounded-2xl text-xs font-black font-mono border border-romantic-100 shadow-sm">FUTURE DOCTOR</span>
             </div>
             <p className="text-slate-500 text-lg font-medium leading-relaxed">Strong. Smart. A beautiful soul whose intelligence and grace brighten every room.</p>
          </div>
        </motion.div>
      </div>

      <div className="space-y-20 relative">
        <div className="text-center space-y-6">
          <motion.h2 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="font-display text-5xl md:text-8xl font-black text-slate-950 tracking-tight leading-none"
          >
            WHY <span className="text-gradient underline decoration-romantic-200 underline-offset-8">YOU?</span>
          </motion.h2>
          <p className="text-slate-400 font-mono tracking-widest text-sm uppercase">Selected insights of my feelings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {memories.map((memo, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.1}}
              whileHover={{
                y: -15,
                rotate: idx % 2 === 0 ? 1.5 : -1.5,
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.15)"
              }}
              className="glass p-12 rounded-[3rem] space-y-6 flex flex-col items-center text-center group transition-all duration-500 border border-white/20"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {memo.icon}
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-black text-slate-900 leading-tight">{memo.title} {memo.emoji}</h3>
                <p className="text-slate-500 leading-relaxed font-semibold">{memo.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{opacity: 0}}
           whileInView={{opacity: 1}}
           viewport={{once: true}}
           className="flex justify-center pt-20"
        >
           <button 
             onClick={onNext}
             className="render-button bg-slate-950 text-white rounded-2xl py-6 px-12 text-2xl font-bold hover:bg-slate-800 shadow-2xl transition-all flex items-center gap-4 group cursor-pointer"
           >
             Ready for the Reveal? <ChevronRight className="group-hover:translate-x-2 transition-transform" />
           </button>
        </motion.div>
      </div>
    </section>
  );
}
