import React, { useState, useEffect } from 'react';
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
  Mail,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'Attendance', icon: CalendarCheck, path: '/attendance', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'History', icon: Clock, path: '/history', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'Leave Requests', icon: Mail, path: '/leaves', roles: ['admin', 'headmaster', 'teacher', 'student'] },
    { title: 'Class Management', icon: Users, path: '/class-management', roles: ['admin', 'headmaster'] },
    { title: 'User Management', icon: ShieldCheck, path: '/users', roles: ['admin', 'headmaster'] },
    { title: 'Promotions', icon: TrendingUp, path: '/promotion', roles: ['admin', 'headmaster'] },
    { title: 'Settings', icon: SettingsIcon, path: '/settings', roles: ['admin', 'headmaster', 'teacher', 'student'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  const bottomNavItems = [
    { title: 'Home', icon: Home, path: '/dashboard' },
    { title: 'Attend', icon: CalendarCheck, path: '/attendance' },
    { title: 'Leaves', icon: Mail, path: '/leaves' },
    { title: 'History', icon: Clock, path: '/history' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)', paddingBottom: isMobile ? '70px' : '0' }}>
      {/* Sidebar Drawer for Mobile & Desktop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay for mobile */}
            {isMobile && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, backdropFilter: 'blur(4px)' }}
              />
            )}
            
            <motion.aside
              initial={isMobile ? { x: -280 } : { width: 0 }}
              animate={isMobile ? { x: 0 } : { width: 280 }}
              exit={isMobile ? { x: -280 } : { width: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                backgroundColor: 'white',
                borderRight: '1px solid var(--border)',
                position: isMobile ? 'fixed' : 'sticky',
                top: 0,
                bottom: 0,
                left: 0,
                width: 280,
                zIndex: 110,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="gradient-blue" style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <CalendarCheck size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>AttendEase</h2>
                </div>
                {isMobile && <button onClick={() => setSidebarOpen(false)} style={{ color: 'var(--text-muted)' }}><X size={20}/></button>}
              </div>

              <nav style={{ flex: 1, padding: '0.5rem 1rem' }}>
                {filteredMenu.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); if(isMobile) setSidebarOpen(false); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '12px',
                        backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                        marginBottom: '0.4rem',
                        fontWeight: isActive ? '700' : '500',
                        textAlign: 'left',
                        fontSize: '0.95rem'
                      }}
                    >
                      <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </nav>

              <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={logout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    color: 'var(--error)',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile Header */}
        <header style={{
          height: isMobile ? '64px' : '80px',
          backgroundColor: 'white',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 1.25rem' : '0 2.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255,255,255,0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="mobile-only"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'var(--background)' }}
            >
              <Menu size={22} />
            </button>
            <div className="desktop-only" style={{ visibility: isSidebarOpen ? 'hidden' : 'visible' }}>
               <button onClick={() => setSidebarOpen(true)} style={{ color: 'var(--text-muted)' }}><Menu size={24}/></button>
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--background)', padding: '0.7rem 1.25rem', borderRadius: '14px', width: '350px' }}>
                <Search size={18} color="var(--text-muted)" />
                <input type="text" placeholder="Search data..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: '500' }} />
              </div>
            )}
            {isMobile && <h1 style={{ fontSize: '1.25rem', fontWeight: '800', background: 'linear-gradient(to right, var(--primary), #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{filteredMenu.find(m => m.path === location.pathname)?.title || 'AttendEase'}</h1>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', background: 'var(--background)', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 10, right: 10, width: '8px', height: '8px', backgroundColor: 'var(--error)', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: isMobile ? '0.5rem' : '1.5rem', borderLeft: isMobile ? 'none' : '1px solid var(--border)' }}>
              <div className="desktop-only" style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '-2px' }}>{user.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{user.role}</p>
              </div>
              <div 
                onClick={() => navigate('/settings')}
                style={{ width: '40px', height: '40px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', cursor: 'pointer' }}
              >
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="container-padded" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>

      {/* Flutter-like Bottom Navigation */}
      <nav className="bottom-nav">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
