import { memo } from 'react';
import Hero from './components/Hero';
import Envelope from './components/Envelope';
import TimelineSlider from './components/Timeline';
import BirthdayAffirmations from './components/Affirmations';
import { useCountdown } from './hooks/useCountdown';

// Memoize components that don't need to re-render
const MemoizedHero = memo(Hero);
const MemoizedEnvelope = memo(Envelope);
const MemoizedTimelineSlider = memo(TimelineSlider);
const MemoizedBirthdayAffirmations = memo(BirthdayAffirmations);

function App() {
  const { isExpired } = useCountdown('2025-06-12');

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section className="h-screen snap-start">
        <MemoizedHero />
      </section>
      {isExpired && (
        <>
          <section className="h-screen snap-start">
            <MemoizedEnvelope />
          </section>
          <section className="h-screen snap-start">
            <MemoizedTimelineSlider />
          </section>
          <section className="h-screen snap-start">
            <MemoizedBirthdayAffirmations />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
