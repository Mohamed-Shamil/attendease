import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import ClassManagement from './pages/ClassManagement';
import Promotion from './pages/Promotion';
import AttendanceHistory from './pages/AttendanceHistory';
import LeaveManagement from './pages/LeaveManagement';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Layout from './components/Layout/Layout';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/history" element={<AttendanceHistory />} />
                <Route path="/leaves" element={<LeaveManagement />} />
                <Route
                  path="/class-management"
                  element={
                    <ProtectedRoute roles={['admin', 'headmaster']}>
                      <ClassManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/promotion"
                  element={
                    <ProtectedRoute roles={['admin', 'headmaster']}>
                      <Promotion />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute roles={['admin', 'headmaster']}>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
