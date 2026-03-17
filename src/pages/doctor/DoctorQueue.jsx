import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function DoctorQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
  const [notes, setNotes] = useState('');
  const [pressLoading, setPressLoading] = useState(false);
  const [pressMsg, setPressMsg] = useState('');

  const [diagnosis, setDiagnosis] = useState('');
  const [tests, setTests] = useState('');
  const [remarks, setRemarks] = useState('');
  const [repLoading, setRepLoading] = useState(false);
  const [repMsg, setRepMsg] = useState('');

  const loadQueue = () => {
    setLoading(true);
    api.doctorQueue()
      .then(setQueue)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadQueue(); }, []);

  const selectPatient = (q) => {
    setSelected(q);
    setPressMsg(''); setRepMsg('');
    setMedicines([{ name: '', dosage: '', duration: '' }]);
    setNotes('');
    setDiagnosis(''); setTests(''); setRemarks('');
  };

  const handleMedChange = (i, field, value) => {
    setMedicines((prev) => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m));
  };
  const addMed = () => setMedicines((prev) => [...prev, { name: '', dosage: '', duration: '' }]);
  const removeMed = (i) => setMedicines((prev) => prev.filter((_, idx) => idx !== i));

  const submitPrescription = async (e) => {
    e.preventDefault();
    setPressMsg(''); setPressLoading(true);
    try {
      await api.addPrescription(selected.appointmentId, { medicines, notes });
      setPressMsg('Prescription saved successfully!');
      setMedicines([{ name: '', dosage: '', duration: '' }]);
      setNotes('');
    } catch (err) {
      setPressMsg('Error: ' + err.message);
    } finally {
      setPressLoading(false);
    }
  };

  const submitReport = async (e) => {
    e.preventDefault();
    setRepMsg(''); setRepLoading(true);
    try {
      await api.addReport(selected.appointmentId, { diagnosis, testRecommended: tests, remarks });
      setRepMsg('Report saved successfully!');
      setDiagnosis(''); setTests(''); setRemarks('');
    } catch (err) {
      setRepMsg('Error: ' + err.message);
    } finally {
      setRepLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Today's Queue</h4>
        <button className="btn-modern btn-outline-modern" onClick={loadQueue}>Refresh</button>
      </div>

      {error && <div className="alert alert-danger mt-2">{error}</div>}

      {loading ? (
        <p className="mt-3">Loading...</p>
      ) : (
        <div className="row mt-3">
          {/* Left: patient list */}
          <div className="col-md-5">
            <div className="table-modern-wrapper">
              <table className="table-modern">
              <thead className="table-light">
                <tr><th>Token</th><th>Patient</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {queue.length === 0 ? (
                  <tr><td colSpan={4} className="text-center text-muted">No patients today.</td></tr>
                ) : queue.map((q) => (
                  <tr key={q.id} className={selected?.id === q.id ? 'table-active' : ''}>
                    <td><strong>#{q.tokenNumber}</strong></td>
                    <td>{q.patientName}</td>
                    <td>{q.status}</td>
                    <td>
                      <button className="btn-modern btn-primary-modern btn-sm" onClick={() => selectPatient(q)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>

          {/* Right: forms */}
          {selected && (
            <div className="col-md-7">
              <h5 className="mb-4">Patient: {selected.patientName} &nbsp; <span className="badge-modern badge-blue">Token #{selected.tokenNumber}</span></h5>

              {/* Prescription form */}
              <div className="card-glass mb-4">
                <div className="card-header-clean">Add Prescription</div>
                <div className="card-body">
                  <form onSubmit={submitPrescription}>
                    {medicines.map((m, i) => (
                      <div className="row g-2 mb-3" key={i}>
                        <div className="col">
                          <input className="form-control-modern" placeholder="Medicine name"
                            value={m.name} onChange={(e) => handleMedChange(i, 'name', e.target.value)} required />
                        </div>
                        <div className="col">
                          <input className="form-control-modern" placeholder="Dosage"
                            value={m.dosage} onChange={(e) => handleMedChange(i, 'dosage', e.target.value)} required />
                        </div>
                        <div className="col">
                          <input className="form-control-modern" placeholder="Duration"
                            value={m.duration} onChange={(e) => handleMedChange(i, 'duration', e.target.value)} required />
                        </div>
                        <div className="col-auto">
                          {medicines.length > 1 && (
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeMed(i)}>✕</button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button type="button" className="btn btn-sm btn-link ps-0" onClick={addMed}>+ Add Medicine</button>

                    <div className="mb-4 mt-3">
                      <label className="form-label-modern">Notes</label>
                      <input className="form-control-modern" placeholder="e.g. After food"
                        value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    {pressMsg && (
                      <div className={`alert py-2 ${pressMsg.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>
                        {pressMsg}
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-custom btn-sm" disabled={pressLoading}>
                      {pressLoading ? 'Saving...' : 'Save Prescription'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Report form */}
              <div className="card-glass mb-4">
                <div className="card-header-clean">Add Report</div>
                <div className="card-body">
                  <form onSubmit={submitReport}>
                    <div className="mb-4">
                      <label className="form-label-modern">Diagnosis <span className="text-danger">*</span></label>
                      <input className="form-control-modern" placeholder="e.g. Viral Fever"
                        value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label-modern">Tests Recommended</label>
                      <input className="form-control-modern" placeholder="e.g. Blood Test"
                        value={tests} onChange={(e) => setTests(e.target.value)} />
                    </div>
                    <div className="mb-4">
                      <label className="form-label-modern">Remarks</label>
                      <input className="form-control-modern" placeholder="e.g. Rest for 3 days"
                        value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                    </div>

                    {repMsg && (
                      <div className={`alert py-2 ${repMsg.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>
                        {repMsg}
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-custom btn-sm" disabled={repLoading}>
                      {repLoading ? 'Saving...' : 'Save Report'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
