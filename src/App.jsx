import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCreateUser from './pages/admin/AdminCreateUser';

import PatientDashboard from './pages/patient/PatientDashboard';
import MyAppointments from './pages/patient/MyAppointments';
import AppointmentDetails from './pages/patient/AppointmentDetails';
import BookAppointment from './pages/patient/BookAppointment';
import MyPrescriptions from './pages/patient/MyPrescriptions';
import MyReports from './pages/patient/MyReports';

import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard';
import QueueManagement from './pages/receptionist/QueueManagement';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorQueue from './pages/doctor/DoctorQueue';

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'patient') return <Navigate to="/patient" replace />;
  if (user.role === 'receptionist') return <Navigate to="/receptionist" replace />;
  if (user.role === 'doctor') return <Navigate to="/doctor" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/create-user" element={<ProtectedRoute role="admin"><AdminCreateUser /></ProtectedRoute>} />

          {/* Patient */}
          <Route path="/patient" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
          <Route path="/patient/appointments" element={<ProtectedRoute role="patient"><MyAppointments /></ProtectedRoute>} />
          <Route path="/patient/appointments/:id" element={<ProtectedRoute role="patient"><AppointmentDetails /></ProtectedRoute>} />
          <Route path="/patient/book" element={<ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>} />
          <Route path="/patient/prescriptions" element={<ProtectedRoute role="patient"><MyPrescriptions /></ProtectedRoute>} />
          <Route path="/patient/reports" element={<ProtectedRoute role="patient"><MyReports /></ProtectedRoute>} />

          {/* Receptionist */}
          <Route path="/receptionist" element={<ProtectedRoute role="receptionist"><ReceptionistDashboard /></ProtectedRoute>} />
          <Route path="/receptionist/queue" element={<ProtectedRoute role="receptionist"><QueueManagement /></ProtectedRoute>} />

          {/* Doctor */}
          <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/doctor/queue" element={<ProtectedRoute role="doctor"><DoctorQueue /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
