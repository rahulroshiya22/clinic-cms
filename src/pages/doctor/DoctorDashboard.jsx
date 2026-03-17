import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DoctorDashboard() {
  const { user } = useAuth();
  return (
    <div className="container mt-4">
      <h4>Doctor Dashboard</h4>
      <p className="text-muted">Welcome, Dr. {user.name}</p>
      <Link to="/doctor/queue" className="btn btn-dark mt-2">
        View Today's Queue
      </Link>
    </div>
  );
}
