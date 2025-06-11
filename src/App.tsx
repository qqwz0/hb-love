import Hero from './components/Hero';
import Envelope from './components/Envelope';
import TimelineSlider from './components/Timeline';
import { HeartParticle } from './components/ui/HeartParticles';
import { useMemo } from 'react';

function App() {
  const heartParticles = useMemo(() => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <HeartParticle key={i} delay={i * 2} />
        ))}
      </div>
    );
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {heartParticles}
      <section className="h-screen snap-start">
        <Hero />
      </section>
      <section className="h-screen snap-start">
        <Envelope />
      </section>
      <section className="h-screen snap-start">
        <TimelineSlider />
      </section>
    </div>
  );
}

export default App;
