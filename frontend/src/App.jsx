import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import ErrorPage from './pages/Error';
import Support from './pages/Support';
import AdminSignIn from './pages/admin/auth/AdminSignIn';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminAuth from './pages/admin/auth/AdminAuth';
import AdminDashboardHome from './pages/admin/dashboard/Home';
import Courses from './pages/admin/dashboard/courses/Programs';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <Routes>
      {/* lecturers auth */}
      <Route path="/admin" element={<AdminAuth />}>
        <Route path="" element={<AdminSignIn />} />
      </Route>

      {/* lecturers dashboard */}
      <Route path="/admin/dashboard" element={<AdminDashboard />}>
        <Route path="" element={<AdminDashboardHome />} />
        <Route path="courses" element={<Courses />} />
      </Route>

      {/* error page */}
      <Route path="*" element={<ErrorPage />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;
