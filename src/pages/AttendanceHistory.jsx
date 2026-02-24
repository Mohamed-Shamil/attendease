import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Search, 
  Download, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Briefcase,
  FileText,
  X,
  User,
  Users,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AttendanceHistory = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('2024-02-23');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [viewingDetails, setViewingDetails] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock historical data
  const historyData = [
    { id: 1, date: '2024-02-23', displayDate: 'Feb 23, 2024', grade: '9', division: 'A', present: 30, absent: 2, total: 32, teacher: 'John Doe', type: 'Offline' },
    { id: 2, date: '2024-02-23', displayDate: 'Feb 23, 2024', grade: '9', division: 'B', present: 28, absent: 5, total: 33, teacher: 'Jane Smith', type: 'Online' },
    { id: 3, date: '2024-02-22', displayDate: 'Feb 22, 2024', grade: '10', division: 'A', present: 31, absent: 1, total: 32, teacher: 'Sarah Lee', type: 'Offline' },
    { id: 4, date: '2024-02-22', displayDate: 'Feb 22, 2024', grade: '9', division: 'A', present: 29, absent: 3, total: 32, teacher: 'John Doe', type: 'Offline' },
    { id: 5, date: '2024-02-21', displayDate: 'Feb 21, 2024', grade: '9', division: 'C', present: 34, absent: 0, total: 34, teacher: 'Michael Chen', type: 'Offline' },
  ];

  const studentHistory = [
    { date: '2024-02-23', status: 'present', checkIn: '08:45 AM', subject: 'Mathematics' },
    { date: '2024-02-22', status: 'present', checkIn: '08:50 AM', subject: 'English' },
    { date: '2024-02-21', status: 'absent', checkIn: '-', subject: 'Science' },
    { date: '2024-02-20', status: 'present', checkIn: '08:42 AM', subject: 'History' },
    { date: '2024-02-19', status: 'present', checkIn: '08:55 AM', subject: 'Geography' },
  ];

  const filteredHistory = useMemo(() => {
    return historyData.filter(item => {
      const matchGrade = selectedGrade === 'All' || item.grade === selectedGrade;
      const matchDiv = selectedDivision === 'All' || item.division === selectedDivision;
      const matchDate = !selectedDate || item.date === selectedDate;
      return matchGrade && matchDiv && matchDate;
    });
  }, [selectedGrade, selectedDivision, selectedDate]);

  const renderDetailsModal = () => (
    <AnimatePresence>
      {viewingDetails && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <motion.div 
            initial={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }}
            className="card" 
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              backgroundColor: 'white', 
              position: 'relative', 
              maxHeight: '90vh', 
              overflowY: 'auto',
              borderRadius: isMobile ? '32px 32px 0 0' : '24px',
              padding: '2.5rem 1.5rem 1.5rem'
            }}
          >
            {isMobile && <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', margin: '-1rem auto 1.5rem' }} />}
            <button onClick={() => setViewingDetails(null)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'var(--background)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '50%', padding: '0.4rem' }}><X size={20} /></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.25rem' }}>Log Details</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '2rem' }}>Grade {viewingDetails.grade}-{viewingDetails.division} • {viewingDetails.displayDate}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div className="card" style={{ border: 'none', background: '#ecfdf5', padding: '1.25rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>Present</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#059669' }}>{viewingDetails.present}</p>
              </div>
              <div className="card" style={{ border: 'none', background: '#fef2f2', padding: '1.25rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase' }}>Absent</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#dc2626' }}>{viewingDetails.absent}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Absentees List</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[...Array(viewingDetails.absent)].map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} /></div>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Student Name #{i + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const renderAdminHistory = () => (
    <div className="animate-slide-up">
      {/* Search and Filter Trigger for Mobile */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '14px', border: '1px solid var(--border)', outline: 'none', fontWeight: '600' }} />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} style={{ width: '48px', height: '48px', borderRadius: '14px', background: showFilters ? 'var(--primary)' : 'white', color: showFilters ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SlidersHorizontal size={20} /></button>
      </div>

      <AnimatePresence>
        {(showFilters || !isMobile) && (
          <motion.div initial={isMobile ? { height: 0, opacity: 0 } : {}} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', overflow: 'hidden' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>GRADE</label>
              <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', fontWeight: '600' }}>
                <option value="All">All Grades</option><option value="9">Grade 9</option><option value="10">Grade 10</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>DIVISION</label>
              <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', fontWeight: '600' }}>
                <option value="All">All Divisions</option><option value="A">Division A</option><option value="B">Division B</option>
              </select>
            </div>
            <button onClick={() => { setSelectedDate(''); setSelectedGrade('All'); setSelectedDivision('All'); }} style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', background: 'var(--background)', fontWeight: '700', color: 'var(--text-muted)', alignSelf: 'flex-end' }}>Reset</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.1rem' }}>Historical Records</h3>
          <button style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '700' }}>Download All</button>
        </div>
        {filteredHistory.map((log) => (
          <div key={log.id} onClick={() => setViewingDetails(log)} className="card animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>
                {log.grade}-{log.division}
              </div>
              <div>
                <p style={{ fontWeight: '800', fontSize: '1rem' }}>{log.displayDate}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{log.teacher}</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '800', color: 'var(--success)', fontSize: '1rem' }}>{Math.round((log.present/log.total)*100)}%</p>
              <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)' }}>{log.present} / {log.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentHistory = () => (
    <div className="animate-slide-up">
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', background: 'white' }}>
        <h3 style={{ fontWeight: '900', fontSize: '1.2rem' }}>Attendance Journal</h3>
        <select style={{ padding: '0.5rem 1rem', borderRadius: '12px', border: 'none', background: 'var(--background)', fontWeight: '700', fontSize: '0.85rem' }}>
          <option>February 2024</option><option>January 2024</option>
        </select>
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {studentHistory.map((item, idx) => (
          <div key={idx} className="card animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', background: 'white' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '16px', backgroundColor: item.status === 'present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: item.status === 'present' ? 'var(--success)' : 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.status === 'present' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              </div>
              <div>
                <p style={{ fontWeight: '800', fontSize: '1.05rem' }}>{item.date}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{item.subject} • {item.checkIn}</p>
              </div>
            </div>
            <span style={{ padding: '0.4rem 0.75rem', borderRadius: '10px', backgroundColor: item.status === 'present' ? 'var(--primary-light)' : 'rgba(239, 68, 68, 0.1)', color: item.status === 'present' ? 'var(--primary)' : 'var(--error)', fontWeight: '800', fontSize: '0.7rem' }}>{item.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      {renderDetailsModal()}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Attendance History</h1>
        <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Records & Performance Analytics</p>
      </div>
      {user.role === 'admin' || user.role === 'headmaster' ? renderAdminHistory() : renderStudentHistory()}
    </div>
  );
};

export default AttendanceHistory;
