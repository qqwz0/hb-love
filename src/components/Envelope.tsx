import React, { useState /*useMemo */ } from 'react';
// import { HeartParticle } from './ui/HeartParticles';

interface EnvelopeProps {
  message?: string;
  from?: string;
  className?: string;
}

const Envelope: React.FC<EnvelopeProps> = ({
  from = 'Твоя Настуня',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  const message: string =
    'Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом. Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою mogли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.Коханий, з днем народження тебе!! Я дуже сильно тебе люблю, і рада шо ми з тобою могли подорослішати разом.💕';

  //   const heartParticles = useMemo(() => {
  //     return (
  //       <div className="absolute inset-0 pointer-events-none">
  //         {[...Array(25)].map((_, i) => (
  //           <HeartParticle key={i} delay={i * 2} />
  //         ))}
  //       </div>
  //     );
  //   }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 p-4 ${className}`}
    >
      {/* {heartParticles} */}
      <div className="relative cursor-pointer" onClick={toggleEnvelope}>
        {/* Envelope Container */}
        <div className="relative w-200 h-90">
          {/* Envelope Body (always visible) */}
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-rose-100 rounded-sm shadow-lg border border-rose-200">
            {/* Bottom fold lines */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-200"></div>
          </div>

          {/* Left Triangle */}
          <div
            className="absolute left-0 top-0 w-0 h-0 border-solid border-transparent"
            style={{
              borderRightWidth: '160px',
              borderRightColor: '#fce7f3',
              borderTopWidth: '112px',
              borderTopColor: '#f9a8d4',
            }}
          ></div>

          {/* Right Triangle */}
          <div
            className="absolute right-0 top-0 w-0 h-0 border-solid border-transparent"
            style={{
              borderLeftWidth: '160px',
              borderLeftColor: '#fce7f3',
              borderTopWidth: '112px',
              borderTopColor: '#f9a8d4',
            }}
          ></div>

          {/* Envelope Flap */}
          <div
            className={`absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-rose-200 to-pink-200 transition-all duration-600 ease-out transform-gpu ${
              isOpen ? '-rotate-180' : ''
            }`}
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              transformOrigin: '50% 100%',
            }}
          >
            {/* Wax Seal */}
            <div
              className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg border-2 border-red-300 transition-transform duration-600 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <span className="text-white text-xl">💕</span>
            </div>
          </div>

          {/* Letter inside envelope */}
          <div
            className={`absolute top-8 left-4 right-4 bottom-4 bg-white rounded-sm shadow-inner transition-all duration-400 ease-out overflow-hidden ${
              isOpen
                ? 'transform translate-y-0 opacity-100'
                : 'transform translate-y-4 opacity-0'
            }`}
          >
            {/* Letter Content - Fixed scrolling container */}
            <div className="h-full overflow-y-auto envelope">
              <div className="p-6 min-h-full flex flex-col">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-pink-400 text-sm">✨</span>
                    <span className="text-2xl">💕</span>
                    <span className="text-pink-400 text-sm">✨</span>
                  </div>
                </div>

                <div className="text-gray-700 leading-relaxed text-center font-light text-xl flex-grow envelope">
                  {message}
                </div>

                <div className="flex items-center justify-center space-x-2 pt-4 mt-4">
                  <span className="text-rose-400 text-xs">❤️</span>
                  <div className="text-rose-500 text-l italic font-medium">
                    {from}
                  </div>
                  <span className="text-rose-400 text-xs">❤️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Click hint (only when closed) */}
          {!isOpen && (
            <div className="absolute -bottom-8 left-0 right-0 text-center text-rose-400 text-sm font-light">
              Click to open
            </div>
          )}

          {/* Close hint (only when open) */}
          {isOpen && (
            <div className="absolute -bottom-8 left-0 right-0 text-center text-rose-400 text-sm font-light">
              Click to close
            </div>
          )}
        </div>

        {/* Floating hearts (only when open) */}
        {isOpen && (
          <>
            <div className="absolute -top-4 -left-4 text-pink-300 text-sm animate-pulse">
              💖
            </div>
            <div
              className="absolute -top-2 -right-6 text-rose-300 text-sm animate-pulse"
              style={{ animationDelay: '0.5s' }}
            >
              💕
            </div>
            <div
              className="absolute -bottom-12 -left-6 text-red-300 text-sm animate-pulse"
              style={{ animationDelay: '1s' }}
            >
              💗
            </div>
            <div
              className="absolute -bottom-10 -right-4 text-pink-400 text-sm animate-pulse"
              style={{ animationDelay: '1.5s' }}
            >
              💝
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Envelope;
