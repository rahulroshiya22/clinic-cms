import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      login(data.token, data.user);
      const role = data.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'patient') navigate('/patient');
      else if (role === 'receptionist') navigate('/receptionist');
      else if (role === 'doctor') navigate('/doctor');
      else navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '1rem' }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-1">Clinic Queue Management</h4>
          <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Login to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label-modern">Email Address</label>
              <input
                type="email"
                className="form-control-modern"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enrollment@darshan.ac.in"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label-modern">Password</label>
              <input
                type="password"
                className="form-control-modern"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <div className="p-3 mb-4 rounded" style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #F87171', fontSize: '0.9rem' }}>{error}</div>}
            <button type="submit" className="btn-modern btn-primary-modern w-100" disabled={loading} style={{ padding: '0.8rem' }}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
