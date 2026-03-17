import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api';

export default function AppointmentDetails() {
  const { id } = useParams();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.appointmentDetails(id)
      .then(setAppt)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">{error}</div></div>;
  if (!appt) return null;

  const { prescription, report, queueEntry } = appt;

  return (
    <div className="container mt-4">
      <Link to="/patient/appointments" className="text-decoration-none">← Back</Link>
      <h4 className="mt-2">Appointment Details</h4>

      {/* Basic Info */}
      <div className="card-glass mt-3" style={{ maxWidth: '500px' }}>
        <div className="card-header-clean">Appointment Info</div>
        <div className="card-body p-0">
          <table className="table-modern">
            <tbody>
              <tr><th width="140">Date</th><td>{appt.appointmentDate}</td></tr>
              <tr><th>Time Slot</th><td>{appt.timeSlot}</td></tr>
              <tr><th>Status</th><td>{appt.status}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Queue Info */}
      {queueEntry && (
        <div className="card-glass mt-3" style={{ maxWidth: '500px' }}>
          <div className="card-header-clean">Queue Info</div>
          <div className="card-body p-0">
            <table className="table-modern">
              <tbody>
                <tr><th width="140">Token Number</th><td><strong>#{queueEntry.tokenNumber}</strong></td></tr>
                <tr><th>Queue Status</th><td>{queueEntry.status}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prescription */}
      <div className="card-glass mt-3">
        <div className="card-header-clean">Prescription</div>
        <div className="card-body">
          {prescription ? (
            <>
              {prescription.notes && <p><strong>Notes:</strong> {prescription.notes}</p>}
              <table className="table-modern">
                <thead className="table-light">
                  <tr><th>Medicine</th><th>Dosage</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  {(prescription.medicines || []).map((m, i) => (
                    <tr key={i}>
                      <td>{m.name}</td>
                      <td>{m.dosage}</td>
                      <td>{m.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : <p className="text-muted mb-0">No prescription added yet.</p>}
        </div>
      </div>

      {/* Report */}
      <div className="card-glass mt-3 mb-4">
        <div className="card-header-clean">Report</div>
        <div className="card-body p-0">
          {report ? (
            <table className="table-modern">
              <tbody>
                <tr><th width="160">Diagnosis</th><td>{report.diagnosis}</td></tr>
                {report.testRecommended && <tr><th>Tests</th><td>{report.testRecommended}</td></tr>}
                {report.remarks && <tr><th>Remarks</th><td>{report.remarks}</td></tr>}
              </tbody>
            </table>
          ) : <p className="text-muted mb-0">No report added yet.</p>}
        </div>
      </div>
    </div>
  );
}
