import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ShieldCheck, UserCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate('/dashboard');
  };

  const roles = [
    { id: 'admin', title: 'Administrator', icon: ShieldCheck, color: 'rgb(37, 99, 235)' },
    { id: 'headmaster', title: 'Headmaster', icon: GraduationCap, color: 'rgb(29, 78, 216)' },
    { id: 'teacher', title: 'Teacher', icon: Users, color: 'rgb(30, 64, 175)' },
    { id: 'student', title: 'Parent/Student', icon: UserCircle, color: 'rgb(30, 58, 138)' },
  ];

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card" 
        style={{ width: '100%', maxWidth: '500px', padding: '3rem', textAlign: 'center' }}
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="gradient-blue" style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'white'
          }}>
            <GraduationCap size={36} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            AttendEase
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Select your role to continue to the portal</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {roles.map((role) => (
            <motion.button
              key={role.id}
              whileHover={{ scale: 1.03, translateY: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin(role.id)}
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ color: role.color }}>
                <role.icon size={32} />
              </div>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                {role.title}
              </span>
            </motion.button>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            &copy; 2024 AttendEase SaaS. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
