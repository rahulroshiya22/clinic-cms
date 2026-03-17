import { useEffect, useState } from 'react';
import { api } from '../../api';

const STATUS_TRANSITIONS = {
  waiting: ['in-progress', 'skipped'],
  in_progress: ['done'],
};

export default function QueueManagement() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});

  const loadQueue = async () => {
    setLoading(true); setError('');
    try {
      const data = await api.getQueue(date);
      setQueue(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQueue(); }, [date]);

  const handleUpdate = async (id, status) => {
    setUpdating((u) => ({ ...u, [id]: true }));
    try {
      await api.updateQueue(id, status);
      await loadQueue();
    } catch (e) {
      setError(e.message);
    } finally {
      setUpdating((u) => ({ ...u, [id]: false }));
    }
  };

  const rowColor = (status) => {
    if (status === 'in_progress') return 'table-primary';
    if (status === 'done') return 'table-success';
    if (status === 'skipped') return 'table-secondary';
    return '';
  };

  return (
    <div className="container mt-4">
      <h4>Queue Management</h4>

      <div className="d-flex align-items-center gap-2 mt-3">
        <label className="form-label mb-0">Date:</label>
        <input
          type="date"
          className="form-control"
          style={{ width: '180px' }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn btn-outline-secondary btn-sm" onClick={loadQueue}>Refresh</button>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {loading ? (
        <p className="mt-3">Loading...</p>
      ) : queue.length === 0 ? (
        <p className="mt-3 text-muted">No queue entries for {date}.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Token</th>
                <th>Patient</th>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((q) => {
                const transitions = STATUS_TRANSITIONS[q.status] || [];
                return (
                  <tr key={q.id} className={rowColor(q.status)}>
                    <td><strong>#{q.tokenNumber}</strong></td>
                    <td>{q.appointment?.patient?.name || '-'}</td>
                    <td>{q.appointment?.timeSlot || '-'}</td>
                    <td>{q.status}</td>
                    <td>
                      {transitions.length === 0 ? (
                        <span className="text-muted">-</span>
                      ) : transitions.map((s) => (
                        <button
                          key={s}
                          className="btn btn-sm btn-outline-dark me-1"
                          disabled={updating[q.id]}
                          onClick={() => handleUpdate(q.id, s)}
                        >
                          → {s}
                        </button>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
