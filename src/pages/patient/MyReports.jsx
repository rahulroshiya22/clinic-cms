import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.myReports()
      .then(setReports)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h4>My Reports</h4>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {loading && <p>Loading...</p>}
      {!loading && reports.length === 0 && (
        <p className="text-muted mt-3">No reports found.</p>
      )}

      {!loading && reports.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Slot</th>
                <th>Diagnosis</th>
                <th>Tests</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.appointment?.appointmentDate || '-'}</td>
                  <td>{r.appointment?.timeSlot || '-'}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.testRecommended || '-'}</td>
                  <td>{r.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
