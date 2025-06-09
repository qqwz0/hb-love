import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

interface CountdownProps {
  targetDate: string;
  title?: string;
  className?: string;
  isLoaded: boolean;
}

const Countdown = ({
  targetDate,
  className = '',
  isLoaded,
}: CountdownProps) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const hasTriggeredConfetti = useRef(false);

  useEffect(() => {
    if (isExpired && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;

      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff69b4', '#9d4edd', '#3b82f6', '#10b981'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff69b4', '#9d4edd', '#3b82f6', '#10b981'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isExpired]);

  const timeUnits = [
    { label: 'Днів', value: days, color: 'text-pink-400' },
    { label: 'Годин', value: hours, color: 'text-purple-400' },
    { label: 'Хвилин', value: minutes, color: 'text-blue-400' },
    { label: 'Секунд', value: seconds, color: 'text-green-400' },
  ];

  if (isExpired) {
    return (
      <>
        <div className={`text-center py-12 ${className}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isLoaded ? 0.5 : 0, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 2 }}
            className="space-y-4"
          >
            <h2 className="text-8xl md:text-8xl font-bold bg-gradient-to-r from-orange-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🎉 ВІТАЮ!!!! 🎉
            </h2>
            <p className="text-5xl md:text-5xl text-white-600 font-light">
              З днем народження, сонце! ✨
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col items-center"
        >
          <p className="text-white/60 text-sm mb-4 tracking-wide">ГОРТАЙ</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/60 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <div className={`text-center py-12 ${className}`}>
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="text-2xl md:text-3xl font-light text-white mb-8 tracking-wide"
      >
        Залишилося
      </motion.h2>

      {/* Countdown Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {timeUnits.map((unit) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            {/* Number */}
            <motion.div
              key={unit.value} // Re-animate when value changes
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${unit.color} mb-2`}
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>

            {/* Label */}
            <div className="text-gray-600 text-sm md:text-base font-medium tracking-wider uppercase">
              {unit.label}
            </div>

            {/* Decorative line */}
            <div
              className={`w-12 h-1 ${unit.color.replace('text-', 'bg-')} mx-auto mt-3 rounded-full opacity-60`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
