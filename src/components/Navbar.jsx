import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleLinks = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: 'bi-grid-fill' },
    { to: '/admin/users', label: 'Users', icon: 'bi-people-fill' },
    { to: '/admin/create-user', label: 'Create User', icon: 'bi-person-plus-fill' },
  ],
  patient: [
    { to: '/patient', label: 'Dashboard', icon: 'bi-house-heart-fill' },
    { to: '/patient/appointments', label: 'My Appointments', icon: 'bi-calendar2-check-fill' },
    { to: '/patient/book', label: 'Book Appointment', icon: 'bi-calendar-plus-fill' },
    { to: '/patient/prescriptions', label: 'Prescriptions', icon: 'bi-capsule' },
    { to: '/patient/reports', label: 'Reports', icon: 'bi-file-earmark-medical-fill' },
  ],
  receptionist: [
    { to: '/receptionist', label: 'Dashboard', icon: 'bi-grid-fill' },
    { to: '/receptionist/queue', label: 'Queue', icon: 'bi-list-ul' },
  ],
  doctor: [
    { to: '/doctor', label: 'Dashboard', icon: 'bi-grid-fill' },
    { to: '/doctor/queue', label: "Today's Queue", icon: 'bi-people-fill' },
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
    <nav className="navbar navbar-expand-lg border-bottom px-4 py-3" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <span className="navbar-brand fw-bold" style={{ color: 'var(--primary)', letterSpacing: '-0.5px' }}>
        {user.clinicName || 'Clinic CMS'}
        <span className="badge-modern badge-gray ms-2" style={{ fontSize: '10px' }}>
          {user.clinicCode}
        </span>
      </span>

      <button
        className="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navLinks"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navLinks">
        <ul className="navbar-nav me-auto ps-lg-4">
          {links.map((l) => (
            <li className="nav-item" key={l.to}>
              <Link className="nav-link d-flex align-items-center gap-2" style={{ fontWeight: 600, color: 'var(--text-main)', padding: '0.8rem 1rem' }} to={l.to}>
                <i className={`bi ${l.icon} text-primary`}></i> {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 pb-3 pb-lg-0">
          <div className="dropdown">
            <button className="btn-modern btn-outline-modern dropdown-toggle d-flex align-items-center gap-2 border-0 bg-light shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: '50px', padding: '0.4rem 1rem 0.4rem 0.4rem' }}>
              <div className="bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', borderRadius: '50%' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="fw-semibold" style={{ fontSize: '14px', color: 'var(--text-main)' }}>
                {user.name.split(' ')[0]}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2" style={{ borderRadius: '12px', width: '220px', padding: '0.5rem' }}>
              <li className="px-3 py-2 border-bottom mb-2">
                <div className="fw-bold" style={{ color: 'var(--text-main)' }}>{user.name}</div>
                <div className="text-muted" style={{ fontSize: '12px' }}>{user.email}</div>
                <div className="mt-1"><span className="badge-modern badge-blue w-100 text-center">{user.role}</span></div>
              </li>
              <li>
                <button className="dropdown-item text-danger d-flex align-items-center gap-2 rounded" onClick={handleLogout} style={{ padding: '0.6rem 1rem', fontWeight: 500 }}>
                  <i className="bi bi-box-arrow-right"></i> Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
