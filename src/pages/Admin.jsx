import { useState } from 'react';
import { Users, AlertCircle, PlayCircle, Settings, Gift } from 'lucide-react';

export default function Admin({ session }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Let's assume there's an admin check. Mocking for UI demonstration purposes.
  // if (profile?.role !== 'admin') return <div>Access Denied</div>

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="flex justify-between items-center flex-col-mobile" style={{ marginBottom: '2rem' }}>
        <h1 className="h2 flex items-center gap-3">
          <Settings size={32} color="var(--accent-primary)" /> Control Center
        </h1>
      </div>

      <div className="flex gap-4" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '0.5rem' }}>
        {['overview', 'draws', 'users'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '1rem 0',
              marginRight: '2rem',
              fontWeight: activeTab === tab ? '600' : '400',
              color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="flex gap-6" style={{ flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1 1 200px' }}>
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Total Users</h3>
            <div className="flex items-center gap-2">
              <Users size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '2rem', fontWeight: '700' }}>1,245</span>
            </div>
          </div>
          <div className="card" style={{ flex: '1 1 200px' }}>
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Prize Pool</h3>
            <div className="flex items-center gap-2">
              <Gift size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '2rem', fontWeight: '700' }}>$12,450</span>
            </div>
          </div>
          <div className="card" style={{ flex: '1 1 200px' }}>
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Charity Total</h3>
            <div className="flex items-center gap-2">
              <AlertCircle size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '2rem', fontWeight: '700' }}>$4,150</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'draws' && (
        <div className="card">
          <h3 className="h3 flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <PlayCircle size={24} color="var(--accent-primary)"/> Execute Monthly Draw
          </h3>
          <p className="text-body" style={{ marginBottom: '2rem' }}>
            Run the algorithm-powered or random monthly draw. This will calculate winners based on their 5 tracked scores.
          </p>
          
          <div className="flex gap-4 flex-col-mobile" style={{ marginBottom: '2rem' }}>
            <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
              <input type="radio" name="drawLogic" defaultChecked /> Algorithmic (Weighted)
            </label>
            <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
              <input type="radio" name="drawLogic" /> Random
            </label>
          </div>

          <div className="flex gap-4 flex-col-mobile">
            <button className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', width: '100%' }}>Run Simulation</button>
            <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', background: 'var(--success)', width: '100%' }}>Publish Official Results</button>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Recent Users</h3>
          <div style={{ minWidth: '600px' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '1rem 0' }}>Email</th>
                  <th style={{ padding: '1rem 0' }}>Plan</th>
                  <th style={{ padding: '1rem 0' }}>Scores Logged</th>
                </tr>
              </thead>
              <tbody>
                {['john@example.com', 'sarah@example.com', 'mike@test.com'].map((email, idx) => (
                  <tr key={email} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem 0' }}>{email}</td>
                    <td style={{ padding: '1rem 0' }}>{idx === 1 ? 'Yearly' : 'Monthly'}</td>
                    <td style={{ padding: '1rem 0' }}>{5 - idx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
