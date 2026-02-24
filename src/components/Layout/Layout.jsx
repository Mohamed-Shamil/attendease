import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  TrendingUp, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User,
  Settings as SettingsIcon,
  ShieldCheck,
  Clock,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'Attendance', icon: CalendarCheck, path: '/attendance', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'History', icon: Clock, path: '/history', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'Leave Requests', icon: Mail, path: '/leaves', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'Class Management', icon: Users, path: '/class-management', roles: ['admin', 'headmaster'] },
    { title: 'User Management', icon: ShieldCheck, path: '/users', roles: ['admin', 'headmaster'] },
    { title: 'Promotions', icon: TrendingUp, path: '/promotion', roles: ['admin', 'headmaster'] },
    { title: 'Settings', icon: SettingsIcon, path: '/settings', roles: ['admin', 'headmaster'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="mobile-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 40,
              display: window.innerWidth < 1024 ? 'block' : 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
        style={{
          backgroundColor: 'white',
          borderRight: '1px solid var(--border)',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="gradient-blue" style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <CalendarCheck size={24} style={{ margin: 'auto' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>AttendEase</h2>
        </div>

        <nav style={{ flex: 1, padding: '1rem' }}>
          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  marginBottom: '0.5rem',
                  fontWeight: isActive ? '600' : '400',
                  textAlign: 'left'
                }}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              color: 'var(--error)',
              fontWeight: '600'
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: isSidebarOpen && window.innerWidth >= 1024 ? '280px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Navbar */}
        <header style={{
          height: '80px',
          backgroundColor: 'white',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleSidebar} style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--text-muted)' }}>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="search-bar" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: 'var(--background)',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              width: '300px'
            }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ position: 'relative', color: 'var(--text-muted)' }}>
              <Bell size={22} />
              <span style={{ position: 'absolute', top: -4, right: -4, width: '10px', height: '10px', backgroundColor: 'var(--error)', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>{user.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</p>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
