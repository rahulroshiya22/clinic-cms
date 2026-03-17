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
        <div className="card mt-3" style={{ maxWidth: '500px' }}>
          <div className="card-header">Clinic Information</div>
          <div className="card-body p-0">
            <table className="table table-bordered mb-0">
              <tbody>
                <tr><th width="160">Name</th><td>{clinic.name}</td></tr>
                <tr><th>Code</th><td>{clinic.code}</td></tr>
                {clinic.address && <tr><th>Address</th><td>{clinic.address}</td></tr>}
                {clinic.totalDoctors !== undefined && <tr><th>Doctors</th><td>{clinic.totalDoctors}</td></tr>}
                {clinic.totalPatients !== undefined && <tr><th>Patients</th><td>{clinic.totalPatients}</td></tr>}
                {clinic.totalReceptionists !== undefined && <tr><th>Receptionists</th><td>{clinic.totalReceptionists}</td></tr>}
                {clinic.totalAppointments !== undefined && <tr><th>Appointments</th><td>{clinic.totalAppointments}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
