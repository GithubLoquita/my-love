import {motion} from 'motion/react';
import {Heart, Music, Music2} from 'lucide-react';
import {useRef, useState} from 'react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Autoplay prevented", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
      <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={toggleMusic}
        className="p-3 glass rounded-full text-romantic-600 cursor-pointer shadow-lg hover:bg-white/60 transition-colors"
      >
        {isPlaying ? <Music2 size={24} /> : <Music size={24} />}
      </motion.button>
      
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replacing with a neutral pleasant track or user can provide
      />
    </div>
  );
}
