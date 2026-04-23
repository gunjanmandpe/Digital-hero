import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { LogOut, User, Trophy, Menu, X } from 'lucide-react';

export default function Layout({ session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log('Mocking sign out due to fetch error');
    } finally {
      localStorage.removeItem('digital_heroes_mock_session');
      window.dispatchEvent(new Event('mock_auth_change'));
      // Navigate isn't available unless we use useNavigate, so let's import it or just use window.location
      window.location.href = '/login';
    }
  };

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <header>
        <div className="container">
          <Link to="/" className="flex items-center gap-2" style={{ fontWeight: '700', fontSize: '1.25rem' }}>
            <Trophy size={24} color="var(--accent-primary)" />
            <span>Digital<span className="text-gradient">Heroes</span></span>
          </Link>
          
          <button 
            className="desktop-hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`nav-links flex items-center gap-6 ${isMobileMenuOpen ? 'mobile-menu-active' : 'mobile-hidden'}`}>
            <Link to="/">Home</Link>
            {!session ? (
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Join Now
              </Link>
            ) : (
              <>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <User size={18} /> Dashboard
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2 text-small">
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main style={{ flex: 1, padding: '3rem 0' }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', marginTop: 'auto' }}>
        <div className="container flex justify-between items-center text-small flex-col-mobile">
          <p>© 2026 Digital Heroes. Purpose-driven golf.</p>
          <div className="flex gap-4">
            <Link to="/">Terms</Link>
            <Link to="/">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
