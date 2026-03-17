import { useState } from 'react';
import { api } from '../../api';

export default function AdminCreateUser() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient', phone: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const body = { name: form.name, email: form.email, password: form.password, role: form.role };
      if (form.phone) body.phone = form.phone;
      await api.createUser(body);
      setSuccess('User created successfully!');
      setForm({ name: '', email: '', password: '', role: 'patient', phone: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Create New User</h4>

      <div className="card-glass mt-3" style={{ maxWidth: '450px' }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label-modern">Full Name</label>
              <input name="name" className="form-control-modern" value={form.name}
                onChange={handleChange} required minLength={3} placeholder="e.g. John Doe" />
            </div>
            <div className="mb-3">
              <label className="form-label-modern">Email</label>
              <input name="email" type="email" className="form-control-modern" value={form.email}
                onChange={handleChange} required placeholder="email@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label-modern">Password</label>
              <input name="password" type="password" className="form-control-modern" value={form.password}
                onChange={handleChange} required minLength={6} placeholder="Min. 6 characters" />
            </div>
            <div className="mb-3">
              <label className="form-label-modern">Role</label>
              <select name="role" className="form-control-modern" value={form.role} onChange={handleChange}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label-modern">Phone <span className="text-muted">(optional)</span></label>
              <input name="phone" className="form-control-modern" value={form.phone}
                onChange={handleChange} placeholder="Phone number" />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <button type="submit" className="btn-modern btn-primary-modern w-100 mt-2" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}    



