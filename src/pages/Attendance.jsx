import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  XSquare, 
  Send, 
  MessageSquare, 
  MapPin, 
  Wifi, 
  WifiOff, 
  Search,
  UserCheck,
  Smartphone,
  Users,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Attendance = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState('offline');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', roll: '101', status: 'present' },
    { id: 2, name: 'Sarah Miller', roll: '102', status: 'present' },
    { id: 3, name: 'James Wilson', roll: '103', status: 'present' },
    { id: 4, name: 'Emily Brown', roll: '104', status: 'present' },
    { id: 5, name: 'Michael Davis', roll: '105', status: 'present' },
    { id: 6, name: 'John Smith', roll: '106', status: 'present' },
    { id: 7, name: 'Linda White', roll: '107', status: 'present' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
    ));
  };

  const handleCheckIn = () => setIsCheckedIn(true);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setNotificationSent(true);
      setTimeout(() => setNotificationSent(false), 5000);
    }, 1500);
  };

  const absentees = students.filter(s => s.status === 'absent');

  if (!isCheckedIn && user.role === 'teacher') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '1rem' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card" style={{ textAlign: 'center', maxWidth: '400px', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-light)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)', transform: 'rotate(-10deg)' }}>
            <MapPin size={40} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Secure Check-in</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Confirm your presence at school to unlock the attendance register for today's session.
          </p>
          <button onClick={handleCheckIn} className="btn-primary" style={{ width: '100%', height: '54px' }}>
            Confirm Check-in
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900' }}>Mark Attendance</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Grade 10-A • Mathematics</p>
        </div>
        <div style={{ display: 'flex', backgroundColor: 'white', padding: '0.3rem', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <button onClick={() => setAttendanceMode('offline')} style={{ padding: '0.6rem 1.25rem', borderRadius: '11px', backgroundColor: attendanceMode === 'offline' ? 'var(--primary)' : 'transparent', color: attendanceMode === 'offline' ? 'white' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><WifiOff size={16} /> Offline</button>
          <button onClick={() => setAttendanceMode('online')} style={{ padding: '0.6rem 1.25rem', borderRadius: '11px', backgroundColor: attendanceMode === 'online' ? 'var(--primary)' : 'transparent', color: attendanceMode === 'online' ? 'white' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wifi size={16} /> Online</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
           <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px' }}><Users size={22} /></div>
           <div><p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL</p><p style={{ fontSize: '1.25rem', fontWeight: '800' }}>{students.length}</p></div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
           <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', color: 'var(--success)', borderRadius: '12px' }}><UserCheck size={22} /></div>
           <div><p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>PRESENT</p><p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--success)' }}>{students.filter(s => s.status === 'present').length}</p></div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
           <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: 'var(--error)', borderRadius: '12px' }}><XSquare size={22} /></div>
           <div><p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>ABSENT</p><p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--error)' }}>{absentees.length}</p></div>
        </div>
      </div>

      <div className="card" style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.1rem' }}>Roll Call</h3>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search..." style={{ padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '10px', border: '1px solid var(--border)', width: isMobile ? '120px' : '200px', fontSize: '0.85rem' }} />
          </div>
        </div>

        {isMobile ? (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {students.map((student) => (
              <div key={student.id} onClick={() => toggleStatus(student.id)} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: student.status === 'present' ? 'white' : '#fef2f2', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>{student.roll}</div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '1rem' }}>{student.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{student.status.toUpperCase()}</p>
                  </div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid', borderColor: student.status === 'present' ? 'var(--success)' : 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: student.status === 'present' ? 'var(--success)' : 'var(--error)' }}>
                  {student.status === 'present' ? <CheckCircle2 size={20} /> : <XSquare size={20} />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--background)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Roll No</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--background)' }}>
                    <td style={{ padding: '1rem', fontWeight: '800' }}>{student.roll}</td>
                    <td style={{ padding: '1rem', fontWeight: '700' }}>{student.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', backgroundColor: student.status === 'present' ? '#ecfdf5' : '#fef2f2', color: student.status === 'present' ? '#059669' : '#dc2626' }}>{student.status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => toggleStatus(student.id)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', backgroundColor: student.status === 'present' ? 'var(--error)' : 'var(--success)', color: 'white' }}>{student.status === 'present' ? 'Mark Absent' : 'Mark Present'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
            <Smartphone size={18} /> <MessageSquare size={18} /> Notify Parents ({absentees.length})
          </div>
          <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting} style={{ height: '54px' }}>
            {isSubmitting ? 'Processing...' : <><ClipboardCheck size={20} /> Submit Attendance</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
