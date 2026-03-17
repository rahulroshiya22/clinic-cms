# Clinic Queue Management System

This is a frontend project I made for the **Clinic Queue Management System (CMS)** as part of my college assignment. It is built using **React + Vite** and uses **Bootstrap** for styling.

## About the Project

This app connects to a backend API and provides separate dashboards for 4 types of users:
- **Admin** – Can view clinic info, list all users, and create new users (doctor, patient, receptionist)
- **Patient** – Can book appointments, view queue token, see prescriptions and reports
- **Receptionist** – Can view daily patient queue and update status (waiting → in-progress → done/skipped)
- **Doctor** – Can see today's patients and add prescription + medical report for each

## Tech Used

- React (with Vite)
- React Router
- Bootstrap 5
- Fetch API for calling backend

## Login

```
Email:    enrollment@darshan.ac.in
Password: password123
```

After login, the app automatically takes you to the correct dashboard based on your role.

## API

Backend: `https://cmsback.sampaarsh.cloud`

## How to Run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Folder Structure

```
src/
├── api.js               # all API calls
├── context/
│   └── AuthContext.jsx  # login/logout state
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
└── pages/
    ├── Login.jsx
    ├── admin/
    ├── patient/
    ├── receptionist/
    └── doctor/
```

## Student Info

- **Name:** Rahul Roshiya
- **College:** Darshan University
