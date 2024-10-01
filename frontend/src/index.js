import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EventList from './page/events/EventList.js'
import CreateEvent from './page/events/CreateEvent.js';
import EditEvent from './page/events/EditEvent.js'
import Login from './page/users/Login.js';
import Register from './page/users/Register.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  document.title = "Lịch Sự Kiện"
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={
          <ProtectedRoute>
            <EventList />
          </ProtectedRoute>
        } />
        <Route path='/create' element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        } />
        <Route path='/edit/:id' element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
