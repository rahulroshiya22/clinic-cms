import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ReceptionistDashboard() {
  const { user } = useAuth();
  return (
    <div className="container mt-4">
      <h4>Receptionist Dashboard</h4>
      <p className="text-muted">Welcome, {user.name}</p>
      <Link to="/receptionist/queue" className="btn btn-dark mt-2">
        Go to Queue Management
      </Link>
    </div>
  );
}
