import { useState } from 'react';
import { api } from '../../api';

function generateSlots() {
  const slots = [];
  for (let h = 9; h < 17; h++) {
    for (let m = 0; m < 60; m += 15) {
      const start = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const endMin = m + 15;
      const endH = endMin >= 60 ? h + 1 : h;
      const endM = endMin >= 60 ? endMin - 60 : endMin;
      const end = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
      slots.push(`${start}-${end}`);
    }
  }
  return slots;
}

const SLOTS = generateSlots();

export default function BookAppointment() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const res = await api.bookAppointment(date, slot);
      setSuccess(`Appointment booked! Your token number is #${res.queueEntry?.tokenNumber || 'N/A'}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Book Appointment</h4>

      <div className="card mt-3" style={{ maxWidth: '420px' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Time Slot (15 min)</label>
              <select className="form-select" value={slot} onChange={(e) => setSlot(e.target.value)}>
                {SLOTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
