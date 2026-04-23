import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const handleMockSession = () => {
      const mock = localStorage.getItem('digital_heroes_mock_session');
      if (mock) setSession(JSON.parse(mock));
    };

    // Check initial
    handleMockSession();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSession(session);
    }).catch(() => {
      handleMockSession(); 
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setSession(session);
    });

    window.addEventListener('mock_auth_change', handleMockSession);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('mock_auth_change', handleMockSession);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout session={session} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard session={session} />} />
          <Route path="admin" element={<Admin session={session} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
