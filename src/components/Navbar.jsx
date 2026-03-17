import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleLinks = {
  admin: [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/create-user', label: 'Create User' },
  ],
  patient: [
    { to: '/patient', label: 'Dashboard' },
    { to: '/patient/appointments', label: 'My Appointments' },
    { to: '/patient/book', label: 'Book Appointment' },
    { to: '/patient/prescriptions', label: 'Prescriptions' },
    { to: '/patient/reports', label: 'Reports' },
  ],
  receptionist: [
    { to: '/receptionist', label: 'Dashboard' },
    { to: '/receptionist/queue', label: 'Queue' },
  ],
  doctor: [
    { to: '/doctor', label: 'Dashboard' },
    { to: '/doctor/queue', label: "Today's Queue" },
  ],
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const links = roleLinks[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
      <span className="navbar-brand fw-bold">
        {user.clinicName || 'Clinic'}
        <span className="badge bg-secondary ms-2" style={{ fontSize: '11px' }}>
          {user.clinicCode}
        </span>
      </span>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navLinks"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navLinks">
        <ul className="navbar-nav me-auto">
          {links.map((l) => (
            <li className="nav-item" key={l.to}>
              <Link className="nav-link" to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted" style={{ fontSize: '13px' }}>
            {user.name} <span className="badge bg-light text-dark border">{user.role}</span>
          </span>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
