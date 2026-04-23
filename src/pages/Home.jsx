import { Link } from 'react-router-dom';
import { Heart, Trophy, Target, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container animate-fade-in">
      <section className="flex flex-col items-center justify-center text-center" style={{ padding: '4rem 0 8rem' }}>
        <h1 className="h1" style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
          Play with Purpose. <br />
          <span className="text-gradient">Impact Lives.</span>
        </h1>
        <p className="text-body" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
          Turn your golf handicap into charitable impact. Compete in monthly prize draws while supporting causes that matter.
        </p>
        <div className="flex gap-4 flex-col-mobile" style={{ width: '100%', maxWidth: '400px' }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', width: '100%' }}>
            Start Your Journey <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </Link>
          <a href="#how-it-works" className="btn btn-secondary" style={{ padding: '1rem 2rem', width: '100%', textAlign: 'center' }}>
            Learn More
          </a>
        </div>
      </section>

      <section id="how-it-works" style={{ marginBottom: '6rem' }}>
        <div className="flex justify-between items-center flex-col-mobile" style={{ marginBottom: '3rem' }}>
          <h2 className="h2" style={{ textAlign: 'center', width: '100%' }}>How it works</h2>
        </div>
        <div className="flex gap-6" style={{ flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1 1 300px' }}>
            <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-lg)' }}>
              <Target size={32} color="var(--accent-primary)" />
            </div>
            <h3 className="h3" style={{ marginBottom: '1rem' }}>1. Track Your Scores</h3>
            <p className="text-body">Log your last 5 Stableford scores. Our system tracks your performance seamlessly.</p>
          </div>
          
          <div className="card" style={{ flex: '1 1 300px' }}>
            <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-lg)' }}>
              <Heart size={32} color="var(--error)" />
            </div>
            <h3 className="h3" style={{ marginBottom: '1rem' }}>2. Support a Charity</h3>
            <p className="text-body">A portion of your subscription goes directly to a cause of your choosing. Make an impact every month.</p>
          </div>
          
          <div className="card" style={{ flex: '1 1 300px' }}>
            <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-lg)' }}>
              <Trophy size={32} color="var(--success)" />
            </div>
            <h3 className="h3" style={{ marginBottom: '1rem' }}>3. Win the Prize Pool</h3>
            <p className="text-body">Match 3, 4, or 5 numbers in our monthly automated draws to win a share of the progressive jackpot.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
