import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2},
      colors: ['#f43f5e', '#fb7185', '#e11d48', '#ffffff'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2},
      colors: ['#f43f5e', '#fb7185', '#e11d48', '#ffffff'],
    });
  }, 250);
};

export const rainHearts = () => {
  const end = Date.now() + 2 * 1000;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: {x: 0},
      shapes: ['circle'],
      colors: ['#f43f5e'],
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: {x: 1},
      shapes: ['circle'],
      colors: ['#f43f5e'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};
