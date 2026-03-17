import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.myAppointments()
      .then(setAppointments)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = (status) => {
    const map = {
      queued: 'bg-warning text-dark',
      scheduled: 'bg-secondary',
      in_progress: 'bg-primary',
      done: 'bg-success',
      cancelled: 'bg-danger',
    };
    return <span className={`badge-modern ${map[status] || 'badge-gray'}`}>{status}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4>My Appointments</h4>
        <Link to="/patient/book" className="btn-modern btn-primary-modern btn-sm">+ Book New</Link>
      </div>

      {error && <div className="alert alert-danger mt-2">{error}</div>}

      {loading ? (
        <p className="mt-3">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="mt-3 text-muted">No appointments yet. <Link to="/patient/book">Book one now</Link>.</p>
      ) : (
        <div className="table-modern-wrapper mt-3">
          <div className="table-responsive">
            <table className="table-modern">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th>Token</th>
                  <th>Queue Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.appointmentDate}</td>
                    <td>{a.timeSlot}</td>
                    <td>{statusBadge(a.status)}</td>
                    <td>{a.queueEntry ? <strong>#{a.queueEntry.tokenNumber}</strong> : '-'}</td>
                    <td>{a.queueEntry?.status || '-'}</td>
                    <td><Link to={`/patient/appointments/${a.id}`} className="btn-modern btn-outline-modern btn-sm">View</Link></td>
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
