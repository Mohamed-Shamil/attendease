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
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Attendance = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState('offline'); // 'offline' or 'online'
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', roll: '101', status: 'present' },
    { id: 2, name: 'Sarah Miller', roll: '102', status: 'present' },
    { id: 3, name: 'James Wilson', roll: '103', status: 'present' },
    { id: 4, name: 'Emily Brown', roll: '104', status: 'present' },
    { id: 5, name: 'Michael Davis', roll: '105', status: 'present' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
    ));
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setNotificationSent(true);
      // Reset notifications after 5 seconds
      setTimeout(() => setNotificationSent(false), 5000);
    }, 1500);
  };

  const absentees = students.filter(s => s.status === 'absent');

  if (!isCheckedIn && user.role === 'teacher') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card" 
          style={{ textAlign: 'center', maxWidth: '450px' }}
        >
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
            <MapPin size={40} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Check-in Required</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            To ensure security and location accuracy, please check-in before taking attendance for your assigned class.
          </p>
          <button onClick={handleCheckIn} className="btn-primary" style={{ width: '100%' }}>
            Confirm Attendance Check-in
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Mark Attendance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Class: Grade 10-A | Subject: Mathematics</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'white', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <button 
            onClick={() => setAttendanceMode('offline')}
            style={{ 
              padding: '0.6rem 1.2rem', 
              borderRadius: '8px', 
              backgroundColor: attendanceMode === 'offline' ? 'var(--primary)' : 'transparent',
              color: attendanceMode === 'offline' ? 'white' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <WifiOff size={18} /> Offline
          </button>
          <button 
            onClick={() => setAttendanceMode('online')}
            style={{ 
              padding: '0.6rem 1.2rem', 
              borderRadius: '8px', 
              backgroundColor: attendanceMode === 'online' ? 'var(--primary)' : 'transparent',
              color: attendanceMode === 'online' ? 'white' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Wifi size={18} /> Online
          </button>
        </div>
      </div>

      {notificationSent && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ 
            position: 'fixed', 
            top: '100px', 
            right: '20px', 
            backgroundColor: 'var(--success)', 
            color: 'white', 
            padding: '1rem 2rem', 
            borderRadius: '12px', 
            boxShadow: 'var(--shadow-lg)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <CheckCircle2 size={24} />
          <div>
            <p style={{ fontWeight: '600' }}>Attendance Saved!</p>
            <p style={{ fontSize: '0.8rem' }}>Parent notifications & WhatsApp messages sent to {absentees.length} absentees.</p>
          </div>
        </motion.div>
      )}

      {/* Stats Summary */}
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'var(--primary)' }}><Users size={32} /></div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Students</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{students.length}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'var(--success)' }}><UserCheck size={32} /></div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Present</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{students.filter(s => s.status === 'present').length}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'var(--error)' }}><XSquare size={32} /></div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Absent</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{absentees.length}</p>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: '700' }}>Student List</h3>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border)' }} />
            <input 
              type="text" 
              placeholder="Filter names..." 
              style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--background)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Roll No</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--background)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>{student.roll}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {student.name}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      backgroundColor: student.status === 'present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: student.status === 'present' ? 'var(--success)' : 'var(--error)'
                    }}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => toggleStatus(student.id)}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: '8px', 
                        fontSize: '0.8rem', 
                        fontWeight: '600',
                        backgroundColor: student.status === 'present' ? 'var(--error)' : 'var(--success)',
                        color: 'white'
                      }}
                    >
                      Mark {student.status === 'present' ? 'Absent' : 'Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          {absentees.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Smartphone size={18} />
                <MessageSquare size={18} />
              </div>
              Auto-send SMS & WhatsApp to {absentees.length} parents
            </div>
          )}
          <button 
            className="btn-primary" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            {isSubmitting ? 'Submitting...' : (
              <>
                <Send size={18} /> Finalize Attendance
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
