import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [clinic, setClinic] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getClinic()
      .then(setClinic)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="container mt-4">
      <h4>Admin Dashboard</h4>
      <p className="text-muted">Welcome, {user.name}</p>

      {error && <div className="alert alert-danger">{error}</div>}

      {clinic && (
        <div className="card-glass mt-3" style={{ maxWidth: '500px' }}>
          <div className="card-header-clean">Clinic Information</div>
          <div className="card-body p-0">
            <table className="table-modern">
              <tbody>
                <tr><th width="160">Clinic Name</th><td>{clinic.name}</td></tr>
                <tr><th>Clinic Code</th><td>{clinic.code}</td></tr>
                
                {clinic.userCount !== undefined && (
                  <tr><th>Total Users</th><td>{clinic.userCount} <span className="text-muted" style={{fontSize: '12px'}}>(including Admin)</span></td></tr>
                )}
                {clinic.appointmentCount !== undefined && (
                  <tr><th>Total Appointments</th><td>{clinic.appointmentCount}</td></tr>
                )}
                {clinic.queueCount !== undefined && (
                  <tr><th>Total Queues</th><td>{clinic.queueCount}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
