import React, { useState, useEffect, useMemo } from 'react';
import { affirmations } from '../data/affirmations';
import type { Affirmation } from '../data/affirmations';

import { Heart } from 'lucide-react';

const BirthdayAffirmations: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextAffirmation = (): void => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevAffirmation = (): void => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAffirmation(
        (prev) => (prev - 1 + affirmations.length) % affirmations.length
      );
      setIsAnimating(false);
    }, 300);
  };

  // Auto-advance every 8 seconds
  useEffect((): (() => void) => {
    const interval = setInterval(nextAffirmation, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentItem: Affirmation = affirmations[currentAffirmation];

  const bgHearts = useMemo(() => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i: number) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Heart
              className="text-pink-300 opacity-30"
              size={Math.random() > 0.5 ? 24 : 16}
              fill="currentColor"
            />
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 relative overflow-hidden">
      {/* Floating Hearts Background */}
      {bgHearts}

      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-5xl font-bold text-gray-800 mb-4">
              Мої побажання тобі на цей рік 🌟
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Я впевнена, що ти досягнеш всього, що побажаєш!
            </p>
          </div>

          {/* Main Affirmation Card */}
          <div className="relative">
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-white/50 transition-all duration-300 ${
                isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
              }`}
            >
              <div className="text-center">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${currentItem.color} text-white mb-6 shadow-lg`}
                >
                  {currentItem.icon}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {currentItem.title}
                </h2>

                {/* Affirmation Text */}
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
                  {currentItem.text}
                </p>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={prevAffirmation}
                    className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex gap-2">
                    {affirmations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAnimating(true);
                          setTimeout(() => {
                            setCurrentAffirmation(index);
                            setIsAnimating(false);
                          }, 300);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentAffirmation
                            ? 'bg-pink-500 scale-125'
                            : 'bg-pink-200 hover:bg-pink-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextAffirmation}
                    className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="text-sm text-gray-500">
                  {currentAffirmation + 1} з {affirmations.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayAffirmations;
