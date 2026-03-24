import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';

interface UserProfile {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string | null;
  createdAt: string;
}

export default function Home() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<UserProfile>('/users/me')
      .then((res) => setProfile(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '100px auto', padding: 20 }}>
      <h1>Home</h1>
      <p>Logged in as: {user?.email}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile && (
        <div>
          <h2>Profile from API</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
      <button onClick={handleLogout} style={{ padding: '8px 24px', marginTop: 16 }}>
        Logout
      </button>
    </div>
  );
}
