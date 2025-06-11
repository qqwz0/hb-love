import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { timelineData } from '../data/timelineData';

// Типи для даних timeline
interface BaseMedia {
  id: string;
  caption?: string;
}

interface Photo extends BaseMedia {
  type: 'photo';
  src: string;
  alt?: string;
}

interface Video extends BaseMedia {
  type: 'video';
  src: string;
  poster?: string;
}

type Media = Photo | Video;

export interface TimelineSlide {
  id: string;
  date?: string;
  title: string;
  description: string;
  location?: string;
  media: Media[];
  mood: 'sweet' | 'romantic' | 'fun' | 'milestone' | 'adventure';
}

const moodColors = {
  sweet: 'from-pink-100 to-rose-100 border-pink-200',
  romantic: 'from-red-100 to-pink-100 border-red-200',
  fun: 'from-yellow-100 to-orange-100 border-yellow-200',
  milestone: 'from-purple-100 to-pink-100 border-purple-200',
  adventure: 'from-green-100 to-teal-100 border-green-200',
};

const moodIcons = {
  sweet: '🍯',
  romantic: '💖',
  fun: '🎉',
  milestone: '⭐',
  adventure: '🌟',
};

const TimelineSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Автопрокрутка
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % timelineData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % timelineData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + timelineData.length) % timelineData.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const current = timelineData[currentSlide];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-amber-50">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-pink-200 text-opacity-30 select-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                fontSize: `${12 + Math.random() * 16}px`,
              }}
            >
              {
                ['💕', '💖', '💗', '💝', '💘', '💞', '💓'][
                  Math.floor(Math.random() * 7)
                ]
              }
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-50/50 via-transparent to-rose-50/50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-48 h-48 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-36 h-36 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 min-h-screen flex flex-col justify-center">
        {/* Основний слайдер */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/50">
          {/* Навігаційні кнопки */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Контент слайду */}
          <div
            className={`p-8 bg-gradient-to-br ${moodColors[current.mood]} min-h-96`}
          >
            {/* Хедер слайду */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{moodIcons[current.mood]}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {current.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {current.date ? formatDate(current.date) : '?'}
                      </span>
                    </div>
                    {current.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{current.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Автоплей toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  isAutoPlay
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isAutoPlay ? 'Пауза' : 'Авто'}
              </button>
            </div>

            {/* Опис */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Фотогалерея */}
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns:
                  current.media.length === 1
                    ? '1fr'
                    : current.media.length === 2
                      ? 'repeat(2, 1fr)'
                      : 'repeat(auto-fit, minmax(200px, 1fr))',
              }}
            >
              {current.media.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {item.type === 'photo' ? (
                      <img
                        src={item.src}
                        className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <video
                        src={item.src}
                        poster={item.poster}
                        controls
                        autoPlay
                        loop
                        muted={true}
                        className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {item.caption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline навігація */}
        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {timelineData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-pink-500 scale-125 shadow-lg'
                    : 'bg-white/60 hover:bg-white/80 backdrop-blur-sm'
                }`}
              />
            ))}
          </div>

          {/* Прогрес бар */}
          <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 shadow-inner">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: `${((currentSlide + 1) / timelineData.length) * 100}%`,
              }}
            />
          </div>

          <div className="text-center mt-2 text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
            {currentSlide + 1} з {timelineData.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSlider;
