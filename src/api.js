const BASE_URL = 'https://cmsback.sampaarsh.cloud';

function getToken() {
  return localStorage.getItem('token');
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

export const api = {
  login: (email, password) => request('POST', '/auth/login', { email, password }),

  bookAppointment: (appointmentDate, timeSlot) =>
    request('POST', '/appointments', { appointmentDate, timeSlot }),
  myAppointments: () => request('GET', '/appointments/my'),
  appointmentDetails: (id) => request('GET', `/appointments/${id}`),

  getQueue: (date) => request('GET', `/queue?date=${date}`),
  updateQueue: (id, status) => request('PATCH', `/queue/${id}`, { status }),

  doctorQueue: () => request('GET', '/doctor/queue'),
  addPrescription: (appointmentId, body) =>
    request('POST', `/prescriptions/${appointmentId}`, body),
  addReport: (appointmentId, body) =>
    request('POST', `/reports/${appointmentId}`, body),

  myPrescriptions: () => request('GET', '/prescriptions/my'),
  myReports: () => request('GET', '/reports/my'),

  getClinic: () => request('GET', '/admin/clinic'),
  getUsers: () => request('GET', '/admin/users'),
  createUser: (body) => request('POST', '/admin/users', body),
};
