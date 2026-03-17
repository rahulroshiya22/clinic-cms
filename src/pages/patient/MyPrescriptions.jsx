import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function MyPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.myPrescriptions()
      .then(setPrescriptions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h4>My Prescriptions</h4>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {loading && <p className="mt-2">Loading...</p>}
      {!loading && prescriptions.length === 0 && (
        <p className="text-muted mt-3">No prescriptions found.</p>
      )}

      {prescriptions.map((p, i) => (
        <div className="card mt-3" key={p.id}>
          <div className="card-header d-flex justify-content-between">
            <span>Prescription #{i + 1}</span>
            <span className="text-muted" style={{ fontSize: '13px' }}>
              {p.appointment?.appointmentDate} &nbsp;|&nbsp; {p.appointment?.timeSlot}
            </span>
          </div>
          <div className="card-body">
            {p.notes && <p className="mb-2"><strong>Notes:</strong> {p.notes}</p>}
            <table className="table table-bordered mb-0">
              <thead className="table-light">
                <tr><th>Medicine</th><th>Dosage</th><th>Duration</th></tr>
              </thead>
              <tbody>
                {(p.medicines || []).map((m, j) => (
                  <tr key={j}>
                    <td>{m.name}</td>
                    <td>{m.dosage}</td>
                    <td>{m.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
