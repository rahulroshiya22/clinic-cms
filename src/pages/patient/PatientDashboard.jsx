import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();

  const cards = [
    { to: '/patient/book', title: 'Book Appointment', desc: 'Schedule a new appointment', color: 'primary' },
    { to: '/patient/appointments', title: 'My Appointments', desc: 'View your appointment history', color: 'success' },
    { to: '/patient/prescriptions', title: 'Prescriptions', desc: 'View your medicines', color: 'info' },
    { to: '/patient/reports', title: 'Reports', desc: 'View diagnosis & test reports', color: 'warning' },
  ];

  return (
    <div className="container mt-4">
      <h4>Patient Dashboard</h4>
      <p className="text-muted">Welcome, {user.name}</p>

      <div className="row mt-3">
        {cards.map((c) => (
          <div className="col-sm-6 col-md-3 mb-3" key={c.to}>
            <Link to={c.to} className="text-decoration-none">
              <div className={`card border-${c.color} text-center h-100`}>
                <div className="card-body">
                  <h6 className={`card-title text-${c.color}`}>{c.title}</h6>
                  <p className="card-text text-muted" style={{ fontSize: '13px' }}>{c.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
