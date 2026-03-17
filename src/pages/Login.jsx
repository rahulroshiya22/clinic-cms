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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="card shadow-sm" style={{ width: '380px' }}>
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-1">Clinic Queue Management</h4>
          <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Login to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
