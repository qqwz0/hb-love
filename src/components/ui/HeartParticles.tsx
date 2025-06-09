import { motion } from 'framer-motion';

export const HeartParticle = ({ delay = 0 }: { delay?: number }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 8 + Math.random() * 4; // 8-12 seconds
  const randomSize = 0.5 + Math.random() * 1; // 0.5-1.5 scale
  const randomOpacity = 0.3 + Math.random() * 0.4; // 0.3-0.7 opacity

  return (
    <motion.div
      initial={{
        x: `${randomX}vw`,
        y: '110vh',
        opacity: 0,
        scale: randomSize,
        rotate: Math.random() * 360,
      }}
      animate={{
        x: `${randomX + (Math.random() - 0.5) * 20}vw`,
        y: '-10vh',
        opacity: [0, randomOpacity, randomOpacity, 0],
        rotate: Math.random() * 360 + 180,
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute text-pink-300 pointer-events-none"
      style={{
        fontSize: `${16 + Math.random() * 8}px`,
        filter: 'drop-shadow(0 0 6px rgba(255, 182, 193, 0.6))',
      }}
    >
      ❤️
    </motion.div>
  );
};
