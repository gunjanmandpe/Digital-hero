import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Trophy, Plus, Target, CheckCircle, CreditCard, Activity } from 'lucide-react';

export default function Dashboard({ session }) {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState('');
  const [scoreDate, setScoreDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (session) {
      fetchProfile();
      fetchScores();
    }
  }, [session]);

  const fetchProfile = async () => {
    // In a real app, we would query the `profiles` table.
    // For now we mock it if Supabase isn't fully set up.
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (data) setProfile(data);
    } catch (e) {
      console.log('Mocking profile...');
      setProfile({
        subscription_status: 'active',
        charity_id: 1,
        charity_percentage: 15,
        total_won: 1500
      });
    }
  };

  const fetchScores = async () => {
    try {
      const { data, error } = await supabase
        .from('golf_scores')
        .select('*')
        .eq('user_id', session.user.id)
        .order('played_at', { ascending: false })
        .limit(5);
        
      if (data) setScores(data);
    } catch (e) {
      console.log('Mocking scores...');
      setScores([
        { id: 1, score: 36, played_at: '2026-03-10' },
        { id: 2, score: 40, played_at: '2026-02-22' },
        { id: 3, score: 38, played_at: '2026-02-15' },
      ]);
    }
  };

  const handleAddScore = async (e) => {
    e.preventDefault();
    if (newScore < 1 || newScore > 45) return alert('Score must be between 1 and 45.');
    
    setLoading(true);
    try {
      await supabase.from('golf_scores').insert([
        { user_id: session.user.id, score: parseInt(newScore), played_at: scoreDate }
      ]);
      fetchScores();
      setNewScore('');
    } catch (e) {
      console.error(e);
      // Mock UI update
      setScores([{ id: Date.now(), score: newScore, played_at: scoreDate }, ...scores].slice(0, 5));
    } finally {
      setLoading(false);
      setNewScore('');
    }
  };

  if (!session) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Please log in.</div>;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="flex justify-between items-center flex-col-mobile" style={{ marginBottom: '2rem' }}>
        <h1 className="h2">Player Dashboard</h1>
        {profile?.subscription_status === 'active' ? (
          <span className="flex items-center gap-2" style={{ color: 'var(--success)', fontSize: '0.875rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <CheckCircle size={16} /> Active Subscriber
          </span>
        ) : (
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <CreditCard size={18} style={{ marginRight: '0.5rem' }}/> Subscribe Now
          </button>
        )}
      </div>

      <div className="flex gap-6" style={{ flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div className="card" style={{ flex: '1 1 250px' }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-lg)' }}>
              <Trophy size={24} color="var(--accent-primary)" />
            </div>
            <div>
              <p className="text-small">Total Winnings</p>
              <h3 className="h3">${profile?.total_won || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ flex: '1 1 250px' }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-lg)' }}>
              <Target size={24} color="var(--error)" />
            </div>
            <div>
              <p className="text-small">Charity Contribution</p>
              <h3 className="h3">{profile?.charity_percentage || 10}%</h3>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ flex: '1 1 250px' }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-lg)' }}>
              <Activity size={24} color="var(--success)" />
            </div>
            <div>
              <p className="text-small">Active Draws</p>
              <h3 className="h3">March 2026</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6" style={{ flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '2 1 400px' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Recent Scores</h3>
          <p className="text-body" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Only your last 5 scores are retained.</p>
          
          {scores.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              No scores recorded yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {scores.map((s, idx) => (
                <div key={s.id} className="flex justify-between items-center" style={{ padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div className="flex items-center gap-4">
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', fontSize: '0.875rem' }}>
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{s.score} <span style={{ color: 'var(--text-secondary)', fontWeight: '400', fontSize: '0.875rem' }}>pts</span></div>
                      <div className="text-small">{new Date(s.played_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ flex: '1 1 300px', height: 'fit-content' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Log New Score</h3>
          <form onSubmit={handleAddScore} className="flex flex-col gap-4">
            <div>
              <label className="label">Stableford Score (1-45)</label>
              <input 
                type="number" 
                min="1" 
                max="45" 
                className="input" 
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Date Played</label>
              <input 
                type="date" 
                className="input" 
                value={scoreDate}
                onChange={(e) => setScoreDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              <Plus size={18} style={{ marginRight: '0.5rem' }}/> {loading ? 'Saving...' : 'Add Score'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
