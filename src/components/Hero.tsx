import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import backGroundImage from '../assets/images/hero-bg.png';
import Countdown from './Countdown';
import { HeartParticle } from './ui/HeartParticles';
import Envelope from './ui/Envelope';

interface HeroProps {
  name?: string;
  backgroundImage?: string;
  birthdayDate?: string;
}

const Hero = ({
  backgroundImage = backGroundImage,
  //   birthdayDate = '2025-12-25',
}: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for dramatic effect
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const heartbeatVariants = {
    beat: {
      scale: [1, 1.3, 1.1, 1.4, 1],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.8,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image*/}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black/50 blur[1px]" />

      {/* Heart Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <HeartParticle key={i} delay={i * 2} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Happy Birthday Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -50 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-4xl font-light text-white/90 mb-2 tracking-widest">
            Happy 19th, коханий{' '}
            <motion.span
              variants={heartbeatVariants}
              animate="beat"
              className="inline-block"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.8))',
              }}
            >
              ❤️
            </motion.span>
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Я дуже сильно тебе кохаю, і сподіваюсь, що в тебе буде найкращий
          <br />
          ДЕНЬ НАРОДЖЕННЯ ✨
        </motion.p>

        <Countdown targetDate="06-09-2025" isLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default Hero;
